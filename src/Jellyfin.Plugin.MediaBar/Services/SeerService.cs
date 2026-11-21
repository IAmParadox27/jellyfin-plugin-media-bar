using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Jellyfin.Plugin.MediaBar.Configuration;
using Jellyfin.Plugin.MediaBar.Model;
using Microsoft.Extensions.Logging;

namespace Jellyfin.Plugin.MediaBar.Services
{
    /// <summary>
    /// Server-side Seer client. The API key never leaves this process: browsers call
    /// MediaBar/Seer/Discover and get back a trimmed list with only public TMDB data.
    /// </summary>
    public class SeerService
    {
        private static readonly TimeSpan CacheLifetime = TimeSpan.FromMinutes(15);
        private static readonly TimeSpan FailureBackoff = TimeSpan.FromMinutes(1);
        private static readonly TimeSpan UserMapLifetime = TimeSpan.FromMinutes(10);
        private static readonly TimeSpan UserMapMinRefresh = TimeSpan.FromSeconds(30);

        private static readonly Dictionary<string, string> CategoryPaths = new(StringComparer.OrdinalIgnoreCase)
        {
            ["trending"] = "discover/trending",
            ["movies"] = "discover/movies",
            ["tv"] = "discover/tv",
            ["upcoming-movies"] = "discover/movies/upcoming",
            ["upcoming-tv"] = "discover/tv/upcoming",
        };

        // Seer MediaStatus: 1 unknown, 2 pending, 3 processing, 4 partially available,
        // 5 available, 6+ blocklisted/deleted.
        private const int StatusPartiallyAvailable = 4;
        private const int StatusBlocklisted = 6;

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<SeerService> _logger;
        private readonly SemaphoreSlim _refreshLock = new(1, 1);

        private string? _cacheKey;
        private DateTime _cacheExpiresUtc = DateTime.MinValue;
        private IReadOnlyList<SeerItemDto> _pool = Array.Empty<SeerItemDto>();

        // Jellyfin user id -> Seer user id, from Seer's own account links.
        private readonly SemaphoreSlim _userMapLock = new(1, 1);
        private Dictionary<Guid, int> _userMap = new();
        private string? _userMapKey;
        private DateTime _userMapLoadedUtc = DateTime.MinValue;

        public SeerService(IHttpClientFactory httpClientFactory, ILogger<SeerService> logger)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
        }

        public static bool IsConfigured(SeerConfig config) =>
            config.Enabled &&
            !string.IsNullOrWhiteSpace(config.ApiKey) &&
            Uri.TryCreate(config.Url?.Trim(), UriKind.Absolute, out Uri? uri) &&
            (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);

        /// <summary>A random sample of up to MaxItems from the cached discover pool.</summary>
        public async Task<IReadOnlyList<SeerItemDto>> GetItemsAsync(SeerConfig config, CancellationToken cancellationToken)
        {
            IReadOnlyList<SeerItemDto> pool = await GetPoolAsync(config, cancellationToken).ConfigureAwait(false);

            int count = Math.Clamp(config.MaxItems, 0, 50);
            return pool.OrderBy(_ => Random.Shared.Next()).Take(count).ToList();
        }

        private async Task<IReadOnlyList<SeerItemDto>> GetPoolAsync(SeerConfig config, CancellationToken cancellationToken)
        {
            // Any settings change (including a new key) invalidates the cache. The key is
            // hashed into the cache key rather than stored in plain text twice.
            string cacheKey = string.Join('|',
                config.Url.Trim(), config.ApiKey.GetHashCode(), config.Categories, config.HideAvailable);

            if (cacheKey == _cacheKey && DateTime.UtcNow < _cacheExpiresUtc)
            {
                return _pool;
            }

            await _refreshLock.WaitAsync(cancellationToken).ConfigureAwait(false);
            try
            {
                if (cacheKey == _cacheKey && DateTime.UtcNow < _cacheExpiresUtc)
                {
                    return _pool;
                }

                // Deliberately not the request's token: the browser gives up after 5s,
                // and if that cancelled the refresh it would look like Seer being down
                // (empty pool + backoff). Let it finish (HttpClient's 10s timeout bounds
                // it) so the next page load gets the results.
                IReadOnlyList<SeerItemDto>? fresh = await FetchPoolAsync(config, CancellationToken.None).ConfigureAwait(false);

                if (fresh is null)
                {
                    // Seer unreachable: keep serving the previous pool if it was for the
                    // same settings, and back off so every page load doesn't retry.
                    if (cacheKey != _cacheKey) _pool = Array.Empty<SeerItemDto>();
                    _cacheKey = cacheKey;
                    _cacheExpiresUtc = DateTime.UtcNow + FailureBackoff;
                    return _pool;
                }

                _pool = fresh;
                _cacheKey = cacheKey;
                _cacheExpiresUtc = DateTime.UtcNow + CacheLifetime;
                return _pool;
            }
            finally
            {
                _refreshLock.Release();
            }
        }

        private async Task<IReadOnlyList<SeerItemDto>?> FetchPoolAsync(SeerConfig config, CancellationToken cancellationToken)
        {
            List<string> paths = config.Categories
                .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Select(c => CategoryPaths.GetValueOrDefault(c))
                .OfType<string>()
                .Distinct()
                .ToList();

            if (paths.Count == 0) paths.Add(CategoryPaths["trending"]);

            HttpClient client = CreateClient(config);

            try
            {
                Task<Dictionary<int, string>> movieGenres = FetchGenresAsync(client, "genres/movie", cancellationToken);
                Task<Dictionary<int, string>> tvGenres = FetchGenresAsync(client, "genres/tv", cancellationToken);

                // Two pages per category gives enough variety after filtering.
                List<Task<JsonElement[]>> pages = paths
                    .SelectMany(path => new[] { 1, 2 }.Select(page => FetchResultsAsync(client, $"{path}?page={page}", cancellationToken)))
                    .ToList();

                await Task.WhenAll(pages.Cast<Task>().Append(movieGenres).Append(tvGenres)).ConfigureAwait(false);

                var seen = new HashSet<string>();
                var items = new List<SeerItemDto>();

                foreach (JsonElement result in pages.SelectMany(p => p.Result))
                {
                    SeerItemDto? item = Map(result, movieGenres.Result, tvGenres.Result, config.HideAvailable);
                    if (item is not null && seen.Add($"{item.MediaType}:{item.TmdbId}"))
                    {
                        items.Add(item);
                    }
                }

                _logger.LogInformation("Media Bar: loaded {Count} Seer suggestions from {Categories}", items.Count, string.Join(", ", paths));
                return items;
            }
            catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException or JsonException)
            {
                // ex.Message never contains request headers, so the key can't leak here.
                _logger.LogWarning("Media Bar: could not reach Seer at {Url}: {Message}", config.Url, ex.Message);
                return null;
            }
        }

        private HttpClient CreateClient(SeerConfig config)
        {
            HttpClient client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(config.Url.Trim().TrimEnd('/') + "/api/v1/");
            client.Timeout = TimeSpan.FromSeconds(10);
            client.DefaultRequestHeaders.Add("X-Api-Key", config.ApiKey.Trim());
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            return client;
        }

        /// <summary>
        /// Files a Seer request on behalf of a Jellyfin user. It is sent as that user's
        /// linked Seer account (X-API-User), never as the admin the API key belongs to,
        /// so Seer applies the user's own permissions, quotas and auto-approval rules.
        /// </summary>
        public async Task<(HttpStatusCode Code, SeerRequestResult Result)> RequestAsync(
            SeerConfig config, Guid jellyfinUserId, string mediaType, int tmdbId, CancellationToken cancellationToken)
        {
            HttpClient client = CreateClient(config);

            try
            {
                int? seerUserId = await GetSeerUserIdAsync(client, config, jellyfinUserId, cancellationToken).ConfigureAwait(false);
                if (seerUserId is null)
                {
                    return (HttpStatusCode.Forbidden, Fail("Your Jellyfin account isn't linked to a Seer account. Sign in to Seer once with Jellyfin to link it."));
                }

                object body = mediaType == "tv"
                    ? new { mediaType, mediaId = tmdbId, seasons = "all" }
                    : new { mediaType, mediaId = tmdbId };

                using var message = new HttpRequestMessage(HttpMethod.Post, "request")
                {
                    Content = JsonContent.Create(body),
                };
                message.Headers.Add("X-API-User", seerUserId.Value.ToString(System.Globalization.CultureInfo.InvariantCulture));

                using HttpResponseMessage response = await client.SendAsync(message, cancellationToken).ConfigureAwait(false);
                string? seerMessage = await ReadMessageAsync(response, cancellationToken).ConfigureAwait(false);

                switch (response.StatusCode)
                {
                    case HttpStatusCode.Created:
                        _logger.LogInformation("Media Bar: Seer request for {MediaType} {TmdbId} filed by Seer user {SeerUser}", mediaType, tmdbId, seerUserId);
                        MarkRequested(mediaType, tmdbId);
                        return (HttpStatusCode.OK, new SeerRequestResult { Success = true, Status = 2, Message = "Requested" });

                    case HttpStatusCode.Conflict:
                        MarkRequested(mediaType, tmdbId);
                        return (HttpStatusCode.OK, new SeerRequestResult { Success = true, Status = 2, Message = "Already requested" });

                    case HttpStatusCode.Accepted:
                        // Seer's NoSeasonsAvailableError: every season is already requested or available.
                        return (HttpStatusCode.OK, new SeerRequestResult { Success = true, Status = 2, Message = "Nothing left to request" });

                    case HttpStatusCode.Forbidden:
                        return (HttpStatusCode.Forbidden, Fail(seerMessage ?? "Seer didn't allow this request."));

                    default:
                        _logger.LogWarning("Media Bar: Seer rejected a request for {MediaType} {TmdbId}: {Status} {Message}", mediaType, tmdbId, (int)response.StatusCode, seerMessage);
                        return (HttpStatusCode.BadGateway, Fail("Seer couldn't take the request."));
                }
            }
            catch (Exception ex) when (ex is HttpRequestException or TaskCanceledException or JsonException)
            {
                _logger.LogWarning("Media Bar: could not reach Seer at {Url} to request: {Message}", config.Url, ex.Message);
                return (HttpStatusCode.BadGateway, Fail("Couldn't reach Seer."));
            }

            static SeerRequestResult Fail(string message) => new() { Success = false, Message = message };
        }

        // So the next page load shows the title as requested without waiting for the cache.
        private void MarkRequested(string mediaType, int tmdbId)
        {
            foreach (SeerItemDto item in _pool)
            {
                if (item.TmdbId == tmdbId && item.MediaType == mediaType && (item.Status is null or < 2))
                {
                    item.Status = 2;
                }
            }
        }

        private async Task<int?> GetSeerUserIdAsync(HttpClient client, SeerConfig config, Guid jellyfinUserId, CancellationToken cancellationToken)
        {
            string key = string.Join('|', config.Url.Trim(), config.ApiKey.GetHashCode());

            await _userMapLock.WaitAsync(cancellationToken).ConfigureAwait(false);
            try
            {
                TimeSpan age = DateTime.UtcNow - _userMapLoadedUtc;
                bool stale = key != _userMapKey || age > UserMapLifetime;
                // A miss may be a newly linked account; re-read, but not on every click.
                bool missRefresh = !_userMap.ContainsKey(jellyfinUserId) && age > UserMapMinRefresh;

                if (stale || missRefresh)
                {
                    _userMap = await FetchUserMapAsync(client, cancellationToken).ConfigureAwait(false);
                    _userMapKey = key;
                    _userMapLoadedUtc = DateTime.UtcNow;
                }

                return _userMap.TryGetValue(jellyfinUserId, out int id) ? id : null;
            }
            finally
            {
                _userMapLock.Release();
            }
        }

        private static async Task<Dictionary<Guid, int>> FetchUserMapAsync(HttpClient client, CancellationToken cancellationToken)
        {
            using HttpResponseMessage response = await client.GetAsync("user?take=1000", cancellationToken).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();

            using Stream stream = await response.Content.ReadAsStreamAsync(cancellationToken).ConfigureAwait(false);
            using JsonDocument doc = await JsonDocument.ParseAsync(stream, cancellationToken: cancellationToken).ConfigureAwait(false);

            var map = new Dictionary<Guid, int>();
            if (!doc.RootElement.TryGetProperty("results", out JsonElement users) || users.ValueKind != JsonValueKind.Array)
            {
                return map;
            }

            foreach (JsonElement user in users.EnumerateArray())
            {
                // Guid.TryParse accepts Seer's dashless ids and Jellyfin's dashed ones alike.
                if (user.TryGetProperty("id", out JsonElement idEl) && idEl.TryGetInt32(out int seerId) &&
                    Guid.TryParse(GetString(user, "jellyfinUserId"), out Guid jellyfinId))
                {
                    map[jellyfinId] = seerId;
                }
            }

            return map;
        }

        private static async Task<string?> ReadMessageAsync(HttpResponseMessage response, CancellationToken cancellationToken)
        {
            try
            {
                string text = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
                using JsonDocument doc = JsonDocument.Parse(text);
                return doc.RootElement.ValueKind == JsonValueKind.Object ? GetString(doc.RootElement, "message") : null;
            }
            catch (JsonException)
            {
                return null;
            }
        }

        private static async Task<JsonElement[]> FetchResultsAsync(HttpClient client, string path, CancellationToken cancellationToken)
        {
            using HttpResponseMessage response = await client.GetAsync(path, cancellationToken).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();

            using Stream stream = await response.Content.ReadAsStreamAsync(cancellationToken).ConfigureAwait(false);
            using JsonDocument doc = await JsonDocument.ParseAsync(stream, cancellationToken: cancellationToken).ConfigureAwait(false);

            return doc.RootElement.TryGetProperty("results", out JsonElement results) && results.ValueKind == JsonValueKind.Array
                ? results.EnumerateArray().Select(e => e.Clone()).ToArray()
                : Array.Empty<JsonElement>();
        }

        private static async Task<Dictionary<int, string>> FetchGenresAsync(HttpClient client, string path, CancellationToken cancellationToken)
        {
            using HttpResponseMessage response = await client.GetAsync(path, cancellationToken).ConfigureAwait(false);
            if (!response.IsSuccessStatusCode) return new Dictionary<int, string>();

            using Stream stream = await response.Content.ReadAsStreamAsync(cancellationToken).ConfigureAwait(false);
            using JsonDocument doc = await JsonDocument.ParseAsync(stream, cancellationToken: cancellationToken).ConfigureAwait(false);

            var genres = new Dictionary<int, string>();
            if (doc.RootElement.ValueKind != JsonValueKind.Array) return genres;

            foreach (JsonElement genre in doc.RootElement.EnumerateArray())
            {
                if (genre.TryGetProperty("id", out JsonElement id) && id.TryGetInt32(out int genreId) &&
                    GetString(genre, "name") is { } name)
                {
                    genres[genreId] = name;
                }
            }

            return genres;
        }

        private static SeerItemDto? Map(JsonElement r, Dictionary<int, string> movieGenres, Dictionary<int, string> tvGenres, bool hideAvailable)
        {
            string? mediaType = GetString(r, "mediaType");
            if (mediaType is not ("movie" or "tv")) return null; // trending also returns people

            if (r.TryGetProperty("adult", out JsonElement adult) && adult.ValueKind == JsonValueKind.True) return null;

            if (!r.TryGetProperty("id", out JsonElement idEl) || !idEl.TryGetInt32(out int tmdbId)) return null;

            // The bar is a backdrop showcase; a slide without one would be blank.
            string? backdropPath = GetString(r, "backdropPath");
            if (string.IsNullOrEmpty(backdropPath)) return null;

            int? status = null;
            if (r.TryGetProperty("mediaInfo", out JsonElement info) && info.ValueKind == JsonValueKind.Object &&
                info.TryGetProperty("status", out JsonElement statusEl) && statusEl.TryGetInt32(out int s))
            {
                status = s;
            }

            if (status >= StatusBlocklisted) return null;
            if (hideAvailable && status >= StatusPartiallyAvailable) return null;

            Dictionary<int, string> genreNames = mediaType == "movie" ? movieGenres : tvGenres;
            List<string> genres = r.TryGetProperty("genreIds", out JsonElement ids) && ids.ValueKind == JsonValueKind.Array
                ? ids.EnumerateArray()
                    .Select(g => g.TryGetInt32(out int gid) ? genreNames.GetValueOrDefault(gid) : null)
                    .OfType<string>()
                    .ToList()
                : new List<string>();

            double? vote = r.TryGetProperty("voteAverage", out JsonElement v) && v.TryGetDouble(out double d) && d > 0 ? d : null;

            return new SeerItemDto
            {
                TmdbId = tmdbId,
                MediaType = mediaType,
                Title = GetString(r, mediaType == "movie" ? "title" : "name") ?? string.Empty,
                Overview = GetString(r, "overview"),
                BackdropPath = backdropPath,
                PosterPath = GetString(r, "posterPath"),
                VoteAverage = vote,
                ReleaseDate = GetString(r, mediaType == "movie" ? "releaseDate" : "firstAirDate"),
                Genres = genres,
                Status = status,
            };
        }

        private static string? GetString(JsonElement element, string property) =>
            element.TryGetProperty(property, out JsonElement value) && value.ValueKind == JsonValueKind.String
                ? value.GetString()
                : null;
    }
}
