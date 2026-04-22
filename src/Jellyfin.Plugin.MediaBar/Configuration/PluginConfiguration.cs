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
        public MediaBarState Enabled { get; set; } = MediaBarState.Enabled;

        public string VersionString { get; set; } = "main";

        public bool UseAvatarsFile { get; set; } = true;

        public string AvatarsPlaylist { get; set; } = string.Empty;

        // Recommendation engine settings
        public bool RecommendationsEnabled { get; set; } = false;

        public int RecommendationTopN { get; set; } = 15;

        public double RecommendationRatingWeight { get; set; } = 0.5;

        public double RecommendationGenreWeight { get; set; } = 0.3;

        public double RecommendationRecencyWeight { get; set; } = 0.2;

        public int RecommendationRecencyDays { get; set; } = 90;

        public WebConfig WebConfig { get; set; } = new WebConfig();
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