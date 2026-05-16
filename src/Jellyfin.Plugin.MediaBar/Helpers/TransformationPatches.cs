using System.Globalization;
using System.Reflection;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Jellyfin.Extensions;
using Jellyfin.Plugin.MediaBar.Attributes;
using Jellyfin.Plugin.MediaBar.Configuration;
using Jellyfin.Plugin.MediaBar.Model;
using Jellyfin.Plugin.MediaBar.ScheduledTasks;
using MediaBrowser.Controller.Entities;
using MediaBrowser.Controller.Entities.TV;
using MediaBrowser.Controller.Library;
using MediaBrowser.Controller.Playlists;
using Microsoft.AspNetCore.Http;
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
            // Recommendations take priority over all other sources
            if (MediaBarPlugin.Instance.Configuration.RecommendationsEnabled)
            {
                Guid? requestingUserId = GetRequestingUserId();
                if (requestingUserId.HasValue)
                {
                    string recoName = UpdateRecommendationsTask.PlaylistPrefix
                        + requestingUserId.Value.ToString("N", CultureInfo.InvariantCulture);

                    Playlist? recoPlaylist = playlistManager.GetPlaylists(requestingUserId.Value)
                        .FirstOrDefault(x => x.Name == recoName);

                    if (recoPlaylist is not null)
                    {
                        IUserDataManager userDataManager = MediaBarPlugin.Instance.ServiceProvider.GetRequiredService<IUserDataManager>();
                        return BuildPlaylistResponse(recoPlaylist, requestingUserId.Value, userManager, userDataManager, shuffle: false);
                    }
                }
            }

            if (MediaBarPlugin.Instance.Configuration.UseAvatarsFile)
            {
                return payload.Contents;
            }

            // Fall back to the globally configured playlist (existing behaviour)
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

            return BuildPlaylistResponse(playlist, userIdToUse.Value, userManager, userDataManager: null, shuffle: true);
        }

        private static string BuildPlaylistResponse(Playlist playlist, Guid userId, IUserManager userManager, IUserDataManager? userDataManager, bool shuffle)
        {
            var user = userManager.GetUserById(userId);
            IEnumerable<Tuple<LinkedChild, BaseItem>> itemsRaw = playlist.GetManageableItems()
                .Where(i => i.Item2.IsVisible(user));

            if (userDataManager is not null && user is not null)
                itemsRaw = itemsRaw.Where(i => !userDataManager.GetUserData(user, i.Item2).Played);

            StringWriter stringWriter = new StringWriter();
            stringWriter.WriteLine(playlist.Name);

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

            if (shuffle)
            {
                idsWritten.Shuffle();
            }

            foreach (Guid id in idsWritten)
            {
                // For some reason the JF api doesn't treat GUIDs correctly
                stringWriter.WriteLine(id.ToString().Replace("-", ""));
            }

            return stringWriter.ToString();
        }

        private static Guid? GetRequestingUserId()
        {
            try
            {
                IHttpContextAccessor httpContextAccessor =
                    MediaBarPlugin.Instance.ServiceProvider.GetRequiredService<IHttpContextAccessor>();

                string? userIdString = httpContextAccessor.HttpContext?.User
                    ?.FindFirst("Jellyfin-userId")?.Value
                    ?? httpContextAccessor.HttpContext?.User
                    ?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (Guid.TryParse(userIdString, out Guid userId))
                {
                    return userId;
                }
            }
            catch
            {
                // IHttpContextAccessor not available — not critical, fall through to global playlist
            }

            return null;
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