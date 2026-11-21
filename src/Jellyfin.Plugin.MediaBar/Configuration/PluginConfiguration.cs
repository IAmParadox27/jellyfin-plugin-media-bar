using MediaBrowser.Model.Plugins;

namespace Jellyfin.Plugin.MediaBar.Configuration
{
    public enum MediaBarState
    {
        Disabled,
        Enabled,
    }
    
    public class PluginConfiguration : BasePluginConfiguration
    {
        public const string EmbeddedVersion = "embedded";

        public MediaBarState Enabled { get; set; } = MediaBarState.Enabled;

        public string VersionString { get; set; } = EmbeddedVersion;

        public bool AllowUnpinnedRefs { get; set; } = false;

        public static bool UsesEmbeddedAssets(string? version, bool allowUnpinnedRefs)
        {
            version = version?.Trim();

            if (string.IsNullOrWhiteSpace(version) ||
                string.Equals(version, EmbeddedVersion, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            // main/latest predate the embedded assets; configs that saved them meant
            // "newest", which is the embedded copy unless the admin opts back in
            return !allowUnpinnedRefs &&
                   (string.Equals(version, "main", StringComparison.OrdinalIgnoreCase) ||
                    string.Equals(version, "latest", StringComparison.OrdinalIgnoreCase));
        }

        public bool UseAvatarsFile { get; set; } = true;

        public string AvatarsPlaylist { get; set; } = string.Empty;
        
        public WebConfig WebConfig { get; set; } = new WebConfig();

        // Seer discovery source. These stay server-side: WebConfig is sent to every
        // browser, so the API key must never live there.
        public SeerConfig Seer { get; set; } = new SeerConfig();
    }

    public class SeerConfig
    {
        public bool Enabled { get; set; } = false;

        // Address the Jellyfin *server* uses to reach Seer. From inside a Docker
        // container, localhost is the container itself, hence host.docker.internal.
        public string Url { get; set; } = "http://host.docker.internal:5055";

        public string ApiKey { get; set; } = string.Empty;

        // Address the *browser* uses for "View in Seer" links. Empty hides the button.
        public string PublicUrl { get; set; } = string.Empty;

        // Comma-separated: trending, movies, tv, upcoming-movies, upcoming-tv
        public string Categories { get; set; } = "trending";

        // Seer slides mixed into the bar alongside library items.
        public int MaxItems { get; set; } = 10;

        // Drop titles Seer reports as already available (they're in a library anyway).
        public bool HideAvailable { get; set; } = true;

        // Show a Request button on Seer slides. Requests are filed as the viewer's own
        // linked Seer account, so Seer's permissions, quotas and approval still apply.
        public bool AllowRequests { get; set; } = true;
    }

    public class WebConfig
    {
        public ImageSvgs ImageSvgs { get; set; } = new ImageSvgs();
        
        public int ShuffleInterval { get; set; } = -1;
        
        public int RetryInterval { get; set; } = -1;
        
        public int MinSwipeDistance { get; set; } = -1;
        
        public int LoadingCheckInterval { get; set; } = -1;
        
        public int MaxPlotLength { get; set; } = -1;

        public int MaxMovies { get; set; } = -1;
        
        public int MaxTvShows { get; set; } = -1;

        public int MaxItems { get; set; } = -1;

        public int PreloadCount { get; set; } = -1;
        
        public int FadeTransitionDuration { get; set; } = -1;

        public bool SlideAnimationEnabled { get; set; } = true;
        
        public bool SyncPageBackdrop { get; set; } = false;

        public bool EnableTrailers { get; set; } = true;
    }

    public class ImageSvgs
    {
        public string? ImdbLogo { get; set; } = null;

        public string? TomatoLogo { get; set; } = null;

        public string? FreshTomato { get; set; } = null;
        
        public string? RottenTomato { get; set; } = null;
    }
}