Run these tests against the same Jellyfin build target as the plugin:

```sh
dotnet run --project tests/Jellyfin.Plugin.MediaBar.Tests -p:JellyfinVersion=12.4.0 -- -noColor
```

The tests call the registered avatar-list callback with a temporary plugin configuration
and empty mocked library. They make no network requests or changes to a Jellyfin server.
