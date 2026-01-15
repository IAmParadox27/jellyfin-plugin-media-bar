using Jellyfin.Plugin.MediaBar.Configuration;
using MediaBrowser.Common.Configuration;
using MediaBrowser.Common.Plugins;
using MediaBrowser.Model.Plugins;
using MediaBrowser.Model.Serialization;

namespace Jellyfin.Plugin.MediaBar
{
    public class MediaBarPlugin : BasePlugin<PluginConfiguration>, IHasPluginConfiguration, IHasWebPages
    {
        public override Guid Id => Guid.Parse("08f615ea-2107-4f04-89cc-091035f54448");

        public override string Name => "Media Bar";

        public static MediaBarPlugin Instance { get; private set; } = null!;
        
        public IServiceProvider ServiceProvider { get; }
        
        public MediaBarPlugin(IApplicationPaths applicationPaths, IXmlSerializer xmlSerializer, IServiceProvider serviceProvider) : base(applicationPaths, xmlSerializer)
        {
            Instance = this;
            
            ServiceProvider = serviceProvider;
        }
        
        public IEnumerable<PluginPageInfo> GetPages()
        {
            string? prefix = GetType().Namespace;

            yield return new PluginPageInfo
            {
                Name = Name,
                EmbeddedResourcePath = $"{prefix}.Configuration.config.html"
            };
        }
    }
}