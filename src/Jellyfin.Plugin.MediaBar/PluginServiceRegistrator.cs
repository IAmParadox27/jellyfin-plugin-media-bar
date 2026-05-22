using Jellyfin.Plugin.MediaBar.ScheduledTasks;
using Jellyfin.Plugin.MediaBar.Services;
using MediaBrowser.Controller;
using MediaBrowser.Controller.Plugins;
using MediaBrowser.Model.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Jellyfin.Plugin.MediaBar
{
    public class PluginServiceRegistrator : IPluginServiceRegistrator
    {
        public void RegisterServices(IServiceCollection serviceCollection, IServerApplicationHost applicationHost)
        {
            serviceCollection.AddHttpContextAccessor();
            serviceCollection.AddSingleton<IScheduledTask, UpdateRecommendationsTask>();
        }
    }
}