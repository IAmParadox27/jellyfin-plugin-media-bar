using System.Reflection;
using System.Text.RegularExpressions;
using Jellyfin.Extensions;
using Jellyfin.Plugin.MediaBar.Attributes;
using Jellyfin.Plugin.MediaBar.Configuration;
using Jellyfin.Plugin.MediaBar.Model;
using MediaBrowser.Controller.Entities;
using MediaBrowser.Controller.Entities.TV;
using MediaBrowser.Controller.Library;
using MediaBrowser.Controller.Playlists;
using Microsoft.Extensions.DependencyInjection;

namespace Jellyfin.Plugin.MediaBar.Helpers
{
    public static class TransformationPatches
    {
        public static string AvatarsList(PatchRequestPayload payload)
        {
            IPlaylistManager playlistManager = MediaBarPlugin.Instance.ServiceProvider.GetRequiredService<IPlaylistManager>();
            IUserManager userManager = MediaBarPlugin.Instance.ServiceProvider.GetRequiredService<IUserManager>();

            return AvatarsList(payload, playlistManager, userManager) ?? "";
        }
        
        private static string? AvatarsList(PatchRequestPayload payload, IPlaylistManager playlistManager, IUserManager userManager)
        {
            if (MediaBarPlugin.Instance.Configuration.UseAvatarsFile)
            {
                return payload.Contents;
            }
            
            IEnumerable<Guid> allUserIds = userManager.UsersIds;

            Playlist? playlist = null;
            Guid? userIdToUse = null;

            foreach (Guid userId in allUserIds)
            {
                playlist = playlistManager.GetPlaylists(userId)
                    .FirstOrDefault(x => x.Name == MediaBarPlugin.Instance.Configuration.AvatarsPlaylist);

                if (playlist != null)
                {
                    userIdToUse = userId;
                    break;
                }
            }

            if (playlist == null || userIdToUse == null)
            {
                return payload.Contents;
            }

            IEnumerable<Tuple<LinkedChild, BaseItem>> itemsRaw = playlist.GetManageableItems()
                .Where(i => i.Item2.IsVisible(userManager.GetUserById(userIdToUse.Value)));

            StringWriter stringWriter = new StringWriter();

            stringWriter.WriteLine(MediaBarPlugin.Instance.Configuration.AvatarsPlaylist);
                
            List<Guid> idsWritten = new List<Guid>();
                
            foreach (Tuple<LinkedChild, BaseItem> item in itemsRaw)
            {
                BaseItem itemToUse = item.Item2;
                if (item.Item2 is Episode episode)
                {
                    itemToUse = episode.Series;
                }

                if (!idsWritten.Contains(itemToUse.Id))
                {
                    idsWritten.Add(itemToUse.Id);
                }
            }

            idsWritten.Shuffle();

            foreach (Guid id in idsWritten)
            {
                // For some reason the JF api doesn't treat GUIDs correctly
                stringWriter.WriteLine(id.ToString().Replace("-", ""));
            }
            
            return stringWriter.ToString();
        }
        
        public static string IndexHtml(PatchRequestPayload payload)
        {
            if (MediaBarPlugin.Instance.Configuration.Enabled == MediaBarState.Disabled)
            {
                return payload.Contents ?? string.Empty;
            }
            
            Stream stream = Assembly.GetExecutingAssembly().GetManifestResourceStream($"{typeof(MediaBarPlugin).Namespace}.Inject.index.html")!;
            using TextReader reader = new StreamReader(stream);

            if (MediaBarPlugin.Instance.Configuration.VersionString == "latest")
            {
                MediaBarPlugin.Instance.Configuration.VersionString = "main";
            }

            if (MediaBarPlugin.Instance.Configuration.VersionString == "main" &&
                JellyfinVersionAttribute.GetVersion() == "10.11")
            {
                // Force 10.11 branch instead of main for now
                MediaBarPlugin.Instance.Configuration.VersionString = "10.11";
            }
            
            string importedHtml = reader
                .ReadToEnd()
                .Replace("{{Config.VersionString}}", MediaBarPlugin.Instance.Configuration.VersionString);
            
            string regex = Regex.Replace(payload.Contents!, "(</head>)", $"{importedHtml}$1");
            
            return regex;
        }

        public static string HomeHtmlChunk(PatchRequestPayload payload)
        {
            Stream stream = Assembly.GetExecutingAssembly().GetManifestResourceStream($"{typeof(MediaBarPlugin).Namespace}.Inject.home-html.chunk.js")!;
            using TextReader reader = new StreamReader(stream);

            string regex = Regex.Replace(payload.Contents!, "(id=\"homeTab\" data-index=\"0\">)", $"$1{reader.ReadToEnd()}");
            
            return regex;
        }

        public static string MainBundle(PatchRequestPayload payload)
        {
            string replacementText =
                "window.PlaybackManager=this.playbackManager;console.log(\"PlaybackManager is now globally available:\",window.PlaybackManager);";
            
            string regex = Regex.Replace(payload.Contents!, @"(this\.playbackManager=e,)", $"$1{replacementText}");

            return regex;
        }
    }
}