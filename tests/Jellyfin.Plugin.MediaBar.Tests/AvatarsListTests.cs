using Jellyfin.Plugin.MediaBar.Configuration;
using Jellyfin.Plugin.MediaBar.Helpers;
using Jellyfin.Plugin.MediaBar.Model;
using MediaBrowser.Common.Configuration;
using MediaBrowser.Controller.Library;
using MediaBrowser.Controller.Playlists;
using MediaBrowser.Model.Serialization;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Xunit;

namespace Jellyfin.Plugin.MediaBar.Tests;

public sealed class AvatarsListTests : IDisposable
{
    private readonly DirectoryInfo _temporary = Directory.CreateTempSubdirectory();
    private readonly MediaBarPlugin? _previousInstance = MediaBarPlugin.Instance;
    private readonly ServiceProvider _services;
    private readonly MediaBarPlugin _plugin;

    public AvatarsListTests()
    {
        var paths = new Mock<IApplicationPaths>();
        paths.SetupGet(p => p.PluginConfigurationsPath).Returns(_temporary.FullName);
        paths.SetupGet(p => p.PluginsPath).Returns(_temporary.FullName);
        var serializer = new Mock<IXmlSerializer>();
        serializer.Setup(s => s.DeserializeFromFile(typeof(PluginConfiguration), It.IsAny<string>()))
            .Returns(new PluginConfiguration());
        var users = new Mock<IUserManager>();
        users.Setup(u => u.GetUsersIds()).Returns(Array.Empty<Guid>());
        _services = new ServiceCollection()
            .AddSingleton(Mock.Of<IPlaylistManager>())
            .AddSingleton(users.Object)
            .BuildServiceProvider();
        _plugin = new MediaBarPlugin(paths.Object, serializer.Object, _services);
    }

    [Theory]
    [InlineData(true, null)]
    [InlineData(true, "")]
    [InlineData(true, " \r\n\t")]
    [InlineData(false, null)]
    [InlineData(false, "")]
    [InlineData(false, " \r\n\t")]
    public void UnconfiguredList_ReturnsAValidCommentOnlyList(bool physicalFile, string? contents)
    {
        _plugin.Configuration.UseAvatarsFile = physicalFile;
        _plugin.Configuration.AvatarsPlaylist = "not present";

        var result = TransformationPatches.AvatarsList(new PatchRequestPayload { Contents = contents });

        Assert.False(string.IsNullOrWhiteSpace(result));
        Assert.All(result.Split('\n').Where(line => !string.IsNullOrWhiteSpace(line)), line => Assert.StartsWith("#", line));
    }

    [Theory]
    [InlineData(true, "# Existing empty list\n")]
    [InlineData(false, "# Existing empty list\n")]
    [InlineData(true, "0123456789abcdef0123456789abcdef\n")]
    [InlineData(false, "0123456789abcdef0123456789abcdef\n")]
    public void ExistingFileContents_ArePreserved(bool physicalFile, string contents)
    {
        _plugin.Configuration.UseAvatarsFile = physicalFile;

        var result = TransformationPatches.AvatarsList(new PatchRequestPayload { Contents = contents });

        Assert.Equal(contents, result);
    }

    public void Dispose()
    {
        typeof(MediaBarPlugin).GetProperty(nameof(MediaBarPlugin.Instance))!.SetValue(null, _previousInstance);
        _services.Dispose();
        _temporary.Delete(recursive: true);
    }
}
