using Jellyfin.Plugin.MediaBar.Configuration;
using Jellyfin.Plugin.MediaBar.Model;
using Jellyfin.Plugin.MediaBar.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Jellyfin.Plugin.MediaBar.Controllers
{
    /// <summary>
    /// Proxies Seer discovery for the media bar. Requires a signed-in Jellyfin user so
    /// the endpoint can't be used anonymously to spend the server's Seer key.
    /// </summary>
    [ApiController]
    [Authorize]
    [Route("MediaBar/Seer")]
    public class SeerController : ControllerBase
    {
        private readonly SeerService _seerService;

        public SeerController(SeerService seerService)
        {
            _seerService = seerService;
        }

        [HttpGet("Discover")]
        public async Task<ActionResult<SeerDiscoverResponse>> GetDiscover(CancellationToken cancellationToken)
        {
            SeerConfig config = MediaBarPlugin.Instance.Configuration.Seer ?? new SeerConfig();

            if (!SeerService.IsConfigured(config))
            {
                return Ok(new SeerDiscoverResponse { Enabled = false });
            }

            string publicUrl = config.PublicUrl?.Trim().TrimEnd('/') ?? string.Empty;

            return Ok(new SeerDiscoverResponse
            {
                Enabled = true,
                PublicUrl = Uri.TryCreate(publicUrl, UriKind.Absolute, out _) ? publicUrl : null,
                CanRequest = config.AllowRequests,
                Items = await _seerService.GetItemsAsync(config, cancellationToken).ConfigureAwait(false),
            });
        }

        [HttpPost("Request")]
        public async Task<ActionResult<SeerRequestResult>> PostRequest([FromBody] SeerRequestBody body, CancellationToken cancellationToken)
        {
            SeerConfig config = MediaBarPlugin.Instance.Configuration.Seer ?? new SeerConfig();

            if (!SeerService.IsConfigured(config) || !config.AllowRequests)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new SeerRequestResult { Message = "Requests from the media bar are turned off." });
            }

            string mediaType = body.MediaType?.Trim().ToLowerInvariant() ?? string.Empty;
            if (mediaType is not ("movie" or "tv") || body.TmdbId <= 0)
            {
                return BadRequest(new SeerRequestResult { Message = "Unknown title." });
            }

            // Jellyfin's auth handler puts the signed-in user's id in this claim
            // (Jellyfin.Api's InternalClaimTypes.UserId, which plugins can't reference).
            if (!Guid.TryParse(User.FindFirst("Jellyfin-UserId")?.Value, out Guid userId) || userId == Guid.Empty)
            {
                return Unauthorized();
            }

            var (code, result) = await _seerService.RequestAsync(config, userId, mediaType, body.TmdbId, cancellationToken).ConfigureAwait(false);
            return StatusCode((int)code, result);
        }
    }
}
