using System.Globalization;
using Jellyfin.Data.Enums;
using Jellyfin.Plugin.MediaBar.Configuration;
using MediaBrowser.Controller.Entities;
using MediaBrowser.Controller.Library;
using MediaBrowser.Controller.Playlists;
using MediaBrowser.Model.Entities;
using MediaBrowser.Model.Playlists;
using MediaBrowser.Model.Querying;
using MediaBrowser.Model.Tasks;
using Microsoft.Extensions.Logging;

namespace Jellyfin.Plugin.MediaBar.ScheduledTasks
{
    public class UpdateRecommendationsTask : IScheduledTask
    {
        // Internal playlist name prefix — one playlist per user, not meant to be manually configured
        internal const string PlaylistPrefix = "_mbr_";

        private readonly ILibraryManager _libraryManager;
        private readonly IUserManager _userManager;
        private readonly IUserDataManager _userDataManager;
        private readonly IPlaylistManager _playlistManager;
        private readonly ILogger<UpdateRecommendationsTask> _logger;

        public UpdateRecommendationsTask(
            ILibraryManager libraryManager,
            IUserManager userManager,
            IUserDataManager userDataManager,
            IPlaylistManager playlistManager,
            ILogger<UpdateRecommendationsTask> logger)
        {
            _libraryManager = libraryManager;
            _userManager = userManager;
            _userDataManager = userDataManager;
            _playlistManager = playlistManager;
            _logger = logger;
        }

        public string Name => "Update Media Bar Recommendations";
        public string Key => "MediaBar.UpdateRecommendations";
        public string Description => "Generates per-user personalized movie recommendations and updates the Media Bar featured playlist for each user.";
        public string Category => "Media Bar";

        public async Task ExecuteAsync(IProgress<double> progress, CancellationToken cancellationToken)
        {
            var config = MediaBarPlugin.Instance.Configuration;

            if (!config.RecommendationsEnabled)
            {
                _logger.LogInformation("[MediaBar] Recommendations disabled, skipping.");
                return;
            }

            var allUsers = _userManager.Users.ToList();
            if (allUsers.Count == 0)
            {
                return;
            }

            double step = 100.0 / allUsers.Count;

            for (int i = 0; i < allUsers.Count; i++)
            {
                var user = allUsers[i];
                cancellationToken.ThrowIfCancellationRequested();

                _logger.LogInformation("[MediaBar] Generating recommendations for user '{User}'.", user.Username);

                try
                {
                    await UpdateForUser(user.Id, config).ConfigureAwait(false);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "[MediaBar] Failed to update recommendations for user '{User}'.", user.Username);
                }

                progress.Report((i + 1) * step);
            }
        }

        private async Task UpdateForUser(Guid userId, PluginConfiguration config)
        {
            var user = _userManager.GetUserById(userId);
            if (user is null)
            {
                return;
            }

            // All movies visible to this user
            var allMovies = _libraryManager.GetItemList(new InternalItemsQuery(user)
            {
                IncludeItemTypes = [BaseItemKind.Movie],
                IsVirtualItem = false,
                Recursive = true
            });

            var watched = allMovies
                .Where(m => _userDataManager.GetUserData(user, m).Played)
                .ToList();

            var unwatched = allMovies
                .Where(m => !_userDataManager.GetUserData(user, m).Played)
                .ToList();

            // Genre frequency map from watch history (percentage-based: count / total watched)
            var genreFreq = watched
                .SelectMany(m => m.Genres ?? [])
                .GroupBy(g => g, StringComparer.OrdinalIgnoreCase)
                .ToDictionary(g => g.Key, g => g.Count(), StringComparer.OrdinalIgnoreCase);

            double totalWatched = watched.Count > 0 ? watched.Count : 1;

            var now = DateTime.UtcNow;
            var topIds = unwatched
                .Select(movie =>
                {
                    double score = 0;

                    if (movie.CommunityRating.HasValue)
                        score += (movie.CommunityRating.Value / 10.0) * config.RecommendationRatingWeight;

                    if (movie.Genres is { Length: > 0 })
                    {
                        // Sum percentage affinity across all matching genres — no cap, rewards multi-genre matches
                        var genreScore = movie.Genres
                            .Where(g => genreFreq.ContainsKey(g))
                            .Sum(g => genreFreq[g] / totalWatched);
                        score += genreScore * config.RecommendationGenreWeight;
                    }

                    var age = (now - movie.DateCreated).TotalDays;
                    if (age is >= 0 and <= 365)
                    {
                        var window = (double)config.RecommendationRecencyDays;
                        if (age <= window)
                            score += (1.0 - age / window) * config.RecommendationRecencyWeight;
                    }

                    return (Id: movie.Id, Score: score);
                })
                .OrderByDescending(x => x.Score)
                .Take(config.RecommendationTopN)
                .Select(x => x.Id)
                .ToArray();

            // Internal playlist name for this user
            string playlistName = PlaylistPrefix + userId.ToString("N", CultureInfo.InvariantCulture);

            var existing = _libraryManager.GetItemList(new InternalItemsQuery(user)
            {
                IncludeItemTypes = [BaseItemKind.Playlist],
                Name = playlistName,
                Recursive = true
            }).FirstOrDefault() as Playlist;

            if (existing is not null)
            {
                var entryIds = existing.LinkedChildren
                    .Where(c => c.ItemId.HasValue)
                    .Select(c => c.ItemId!.Value.ToString("N", CultureInfo.InvariantCulture))
                    .ToList();

                if (entryIds.Count > 0)
                    await _playlistManager.RemoveItemFromPlaylistAsync(existing.Id.ToString(), entryIds).ConfigureAwait(false);

                await _playlistManager.AddItemToPlaylistAsync(existing.Id, topIds, userId).ConfigureAwait(false);
            }
            else
            {
                await _playlistManager.CreatePlaylist(new PlaylistCreationRequest
                {
                    Name = playlistName,
                    ItemIdList = topIds,
                    UserId = userId,
                    MediaType = MediaType.Video
                }).ConfigureAwait(false);
            }

            _logger.LogInformation("[MediaBar] Playlist updated for user '{User}' with {Count} recommendations.", user.Username, topIds.Length);
        }

        public IEnumerable<TaskTriggerInfo> GetDefaultTriggers() =>
        [
            new TaskTriggerInfo
            {
                Type = TaskTriggerInfoType.DailyTrigger,
                TimeOfDayTicks = TimeSpan.FromHours(3).Ticks
            }
        ];
    }
}
