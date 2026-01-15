using System.Text.Json.Serialization;

namespace Jellyfin.Plugin.MediaBar.Model
{
    public class PatchRequestPayload
    {
        [JsonPropertyName("contents")]
        public string? Contents { get; set; }
    }
}