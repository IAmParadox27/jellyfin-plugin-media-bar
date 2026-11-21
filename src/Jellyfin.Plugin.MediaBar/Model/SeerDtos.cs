namespace Jellyfin.Plugin.MediaBar.Model
{
    /// <summary>
    /// What the browser receives. Deliberately narrow: Seer's own mediaInfo carries
    /// internal service URLs (Radarr/Sonarr addresses) that must not reach clients.
    /// </summary>
    public class SeerDiscoverResponse
    {
        public bool Enabled { get; set; }

        public string? PublicUrl { get; set; }

        // Whether to offer the Request button. Seer still decides per user on click.
        public bool CanRequest { get; set; }

        public IReadOnlyList<SeerItemDto> Items { get; set; } = Array.Empty<SeerItemDto>();
    }

    public class SeerItemDto
    {
        public int TmdbId { get; set; }

        // "movie" or "tv", as Seer and TMDB name them.
        public string MediaType { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string? Overview { get; set; }

        // TMDB image paths (e.g. "/abc.jpg"). The browser loads them straight from
        // image.tmdb.org, so neither Jellyfin nor Seer stores any image.
        public string? BackdropPath { get; set; }

        public string? PosterPath { get; set; }

        public double? VoteAverage { get; set; }

        public string? ReleaseDate { get; set; }

        public IReadOnlyList<string> Genres { get; set; } = Array.Empty<string>();

        // Seer MediaStatus, null when Seer has no record of the title.
        public int? Status { get; set; }
    }

    public class SeerRequestBody
    {
        // "movie" or "tv".
        public string MediaType { get; set; } = string.Empty;

        public int TmdbId { get; set; }
    }

    public class SeerRequestResult
    {
        public bool Success { get; set; }

        // Seer MediaStatus after the request (2 = pending, 3 = processing), when known.
        public int? Status { get; set; }

        public string Message { get; set; } = string.Empty;
    }
}
