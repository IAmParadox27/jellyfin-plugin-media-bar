/*
 * Jellyfin Slideshow by M0RPH3US v6.1.0
 */

const CONFIG = {
  IMAGE_SVG: {
    freshTomato:
      '<svg id="svg3390" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 138.75 141.25" width="18" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><metadata id="metadata3396"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><g id="layer1" fill="#f93208"><path id="path3412" d="m20.154 40.829c-28.149 27.622-13.657 61.011-5.734 71.931 35.254 41.954 92.792 25.339 111.89-5.9071 4.7608-8.2027 22.554-53.467-23.976-78.009z"/><path id="path3471" d="m39.613 39.265 4.7778-8.8607 28.406-5.0384 11.119 9.2082z"/></g><g id="layer2"><path id="path3437" d="m39.436 8.5696 8.9682-5.2826 6.7569 15.479c3.7925-6.3226 13.79-16.316 24.939-4.6684-4.7281 1.2636-7.5161 3.8553-7.7397 8.4768 15.145-4.1697 31.343 3.2127 33.539 9.0911-10.951-4.314-27.695 10.377-41.771 2.334 0.009 15.045-12.617 16.636-19.902 17.076 2.077-4.996 5.591-9.994 1.474-14.987-7.618 8.171-13.874 10.668-33.17 4.668 4.876-1.679 14.843-11.39 24.448-11.425-6.775-2.467-12.29-2.087-17.814-1.475 2.917-3.961 12.149-15.197 28.625-8.476z" fill="#02902e"/></g></svg>',
    rottenTomato:
      '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 145 140" width="20" height="18"><path fill="#0fc755" d="M47.4 35.342c-13.607-7.935-12.32-25.203 2.097-31.88 26.124-6.531 29.117 13.78 22.652 30.412-6.542 24.11 18.095 23.662 19.925 10.067 3.605-18.412 19.394-26.695 31.67-16.359 12.598 12.135 7.074 36.581-17.827 34.187-16.03-1.545-19.552 19.585.839 21.183 32.228 1.915 42.49 22.167 31.04 35.865-15.993 15.15-37.691-4.439-45.512-19.505-6.8-9.307-17.321.11-13.423 6.502 12.983 19.465 2.923 31.229-10.906 30.62-13.37-.85-20.96-9.06-13.214-29.15 3.897-12.481-8.595-15.386-16.57-5.45-11.707 19.61-28.865 13.68-33.976 4.19-3.243-7.621-2.921-25.846 24.119-23.696 16.688 4.137 11.776-12.561-.63-13.633-9.245-.443-30.501-7.304-22.86-24.54 7.34-11.056 24.958-11.768 33.348 6.293 3.037 4.232 8.361 11.042 18.037 5.033 3.51-5.197 1.21-13.9-8.809-20.135z"/></svg>',
  },
  // ms each slide is shown before advancing. 12000 = 12s.
  shuffleInterval: 12000,
  // ms between retries when waiting on Jellyfin. 250-1000.
  retryInterval: 500,
  // px of horizontal travel before a swipe counts. Lower = twitchier.
  minSwipeDistance: 50,
  // ms between checks for the app being ready (loading screen only).
  loadingCheckInterval: 100,
  // legacy character cap for the synopsis. The CSS line-clamp does the real work.
  maxPlotLength: 360,
  // how many titles to pull from the library. Items without logo art are dropped after this.
  maxItems: 50,

  // movies per run when quotas are on. 0 = off (or none, if maxSeries > 0).
  maxMovies: 0,
  // series per run when quotas are on. 0 = off (or none, if maxMovies > 0).
  maxSeries: 0,

  // library display names the bar may draw from, e.g. ["Movies","4K Movies"]. Empty = all.
  libraries: [],

  // library display names allowed to autoplay trailers. Empty = wherever trailers are otherwise enabled.
  trailerLibraries: [],
  // slides built ahead of the current one. 1 = next only; >1 also builds the previous.
  preloadCount: 1,

  // upper bound on pagination dots. Fewer titles than this show one dot each.
  maxDots: 5,

  // leading slides that must include every item type present. 0 = off (plain proportional shuffle).
  mixTypesInFirst: 3,
  // ms of the crossfade between slides. Must match the CSS transition.
  fadeTransitionDuration: 500,
  // true|false. Ken Burns zoom and blur-in on the backdrop and logo.
  slideAnimationEnabled: true,
  // true|false. Master switch for trailer playback, local and YouTube.
  enableTrailers: true,

  // true|false. Also play trailers on the small/touch layout. Off by default; only useful if the phone layout has a landscape frame.
  allowTrailersOnTouch: false,

  // name fragments that demote a trailer (sign language, vertical crops, etc).
  trailerAlternateCutTerms: [
    "sign language",
    "asl trailer",
    "audio description",
    "audio described",
    "described audio",
    "vertical",
  ],

  // true|false. Mirror the slide onto Jellyfin's page backdrop. Intrusive: it deletes Jellyfin's own backdrop layers while active.
  syncPageBackdrop: false,
  // ms to wait for the YouTube iframe API before giving up and carrying on.
  youtubeApiLoadTimeoutMs: 8000,
  // highest official rating (e.g. "PG-13") allowed in the randomly populated bar. Empty = no limit.
  maxOfficialRating: "",

  // ms the backdrop is shown before the trailer starts. 0 = immediately.
  trailerStartDelayMs: 3500,

  // ms to wait for playback to actually begin before resuming the slideshow. Guards a silent failure.
  trailerPlaybackWatchdogMs: 4000,
  // 0-100. Volume once unmuted. Trailers always start muted.
  trailerVolume: 50,

  // px. At or below this width the layout is swipe-only: no arrows, no trailer, no volume.
  touchLayoutMaxWidth: 767,

  // true|false. Black overlay hiding the app until the slideshow is ready. Not needed since the early start.
  showLoadingScreen: false,

  // ms before the overlay lifts regardless. Prevents a permanent black screen.
  loadingScreenTimeoutMs: 10000,

  // ms to wait for a signed-in user before giving up entirely.
  authWaitTimeoutMs: 30000,

  // ms between sign-in checks during the first moments. Cheap, so it is tight.
  authFastPollIntervalMs: 30,
  // ms of fast polling before backing off to retryInterval.
  authFastPollWindowMs: 8000,

  // true|false. Start from Jellyfin's stored credentials instead of waiting for window.ApiClient (~2.4s earlier).
  earlyStartFromStoredCredentials: true,

  // true|false. Paint a blurred approximation of the backdrop while the real image loads. Costs no request.
  useBlurHashPlaceholder: true,

  // "marquee" | "plate" | "classic". marquee = spec line + progress rule, panel on phone. plate = type on a tinted panel. classic = the original.
  layout: "marquee",

  // 0-1. Plate layout only. Target lightness of the panel. 0.035 holds white text near 12:1.
  plateLuminance: 0.035,
  // 0-1. Plate layout only. Lightness of the accent taken from the artwork.
  plateAccentLuminance: 0.42,

  // CSS colour. Plate panel when an item has no BlurHash to derive from.
  plateFallback: "rgb(28 30 34)",
  // CSS colour. Accent when an item has no BlurHash.
  plateAccentFallback: "rgb(150 156 166)",

  // max rows in the plate layout's spec table. Fields are added in priority order.
  plateSpecRows: 4,

  // true|false. Prefer a trailer file on the server over the YouTube embed. Avoids embed blocks and autoplay refusals.
  preferLocalTrailers: true,

  // true|false. Hold the rotation while the pointer is over the stage. Resumes mid-period, does not restart.
  pauseOnHover: true,

  // true|false. Keep the shuffled order and position for the browser session, so returning to home resumes.
  rememberOrderForSession: true,

  // true|false. Skip trailers when the browser reports a metered connection.
  respectDataSaver: true,

  // true|false. Also time Jellyfin's own rows for comparison. Costs a body-wide observer; read marks via performance.getEntriesByType('mark').
  measureStartup: false,

  // true|false. Look up trailer intros via sponsor.ajay.app. Sends the video id to a third party, so off by default.
  enableSponsorBlock: false,
};

const STORED_CONFIG_KEY = "mediabar.config";
const STORED_CONFIG_VERSION = 1;

const CONFIG_RULES = {
  shuffleInterval: [2000, 600000],
  retryInterval: [50, 10000],
  minSwipeDistance: [10, 400],
  loadingCheckInterval: [16, 5000],
  maxPlotLength: [40, 4000],
  maxItems: [1, 500],
  maxMovies: [0, 500],
  maxSeries: [0, 500],
  preloadCount: [0, 10],
  maxDots: [1, 40],
  mixTypesInFirst: [0, 20],
  fadeTransitionDuration: [0, 5000],
  youtubeApiLoadTimeoutMs: [1000, 60000],
  trailerStartDelayMs: [0, 60000],
  trailerPlaybackWatchdogMs: [500, 60000],
  trailerVolume: [0, 100],
  touchLayoutMaxWidth: [320, 2000],
  loadingScreenTimeoutMs: [1000, 120000],
  authWaitTimeoutMs: [1000, 300000],
  authFastPollIntervalMs: [10, 5000],
  authFastPollWindowMs: [0, 60000],
  plateLuminance: [0, 1],
  plateAccentLuminance: [0, 1],
  plateSpecRows: [1, 8],
  layout: ["classic", "marquee", "plate"],
  plateFallback: "colour",
  plateAccentFallback: "colour",
};

const STRUCTURAL_CONFIG_KEYS = new Set([
  "layout",
  "maxItems",
  "maxMovies",
  "maxSeries",
  "maxDots",
  "mixTypesInFirst",
  "preloadCount",
  "plateLuminance",
  "plateAccentLuminance",
  "plateFallback",
  "plateAccentFallback",
  "plateSpecRows",
  "useBlurHashPlaceholder",
  "libraries",
  "trailerLibraries",
]);

const lockedConfigKeys = new Set();

const validateConfigValue = (key, value) => {
  const current = CONFIG[key];
  const rule = CONFIG_RULES[key];

  if (typeof current === "boolean") {
    if (typeof value === "boolean") return value;

    if (value === "true" || value === "1") return true;
    if (value === "false" || value === "0") return false;
    return null;
  }

  if (typeof current === "number") {
    const parsed = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(parsed)) return null;
    if (!Array.isArray(rule)) return parsed;
    return Math.min(rule[1], Math.max(rule[0], parsed));
  }

  if (typeof current === "string") {
    const text = String(value);
    if (Array.isArray(rule)) return rule.includes(text) ? text : null;

    if (rule === "colour") {
      return window.CSS?.supports("color", text) ? text : null;
    }
    return text;
  }

  if (Array.isArray(current)) {
    return Array.isArray(value) ? value.map(String) : null;
  }

  return null;
};

const applyImageSvgOverrides = (svgs) => {
  if (!svgs || typeof svgs !== "object") return false;

  let changed = false;
  for (const [rawKey, value] of Object.entries(svgs)) {
    const key = rawKey.charAt(0).toLowerCase() + rawKey.slice(1);
    if (!(key in CONFIG.IMAGE_SVG)) continue;
    if (typeof value !== "string" || !/^\s*<svg[\s>]/i.test(value)) continue;
    CONFIG.IMAGE_SVG[key] = value;
    changed = true;
  }
  return changed;
};

const applyConfig = (source, options = {}) => {
  if (!source || typeof source !== "object") return [];

  const { trusted = false, sentinel = null, label = "override" } = options;
  const changed = [];

  if (trusted && Array.isArray(source.lock)) {
    source.lock.forEach((key) => lockedConfigKeys.add(String(key)));
  }

  for (const [rawKey, value] of Object.entries(source)) {
    if (rawKey === "lock" || rawKey === "__v") continue;

    if (rawKey === "IMAGE_SVG" || rawKey === "ImageSvgs" || rawKey === "imageSvgs") {
      if (trusted && applyImageSvgOverrides(value)) changed.push("IMAGE_SVG");
      continue;
    }

    const key =
      rawKey in CONFIG ? rawKey : rawKey.charAt(0).toLowerCase() + rawKey.slice(1);

    if (!(key in CONFIG)) continue;
    if (!trusted && lockedConfigKeys.has(key)) continue;
    if (sentinel !== null && value === sentinel) continue;

    const clean = validateConfigValue(key, value);
    if (clean === null) {
      console.warn(
        `[slideshow] ignoring ${label}.${rawKey} =`,
        value,
        "(invalid; keeping",
        CONFIG[key],
        ")",
      );
      continue;
    }

    if (CONFIG[key] !== clean) {
      CONFIG[key] = clean;
      changed.push(key);
    }
  }

  return changed;
};

const readStoredConfig = () => {
  try {
    const raw = localStorage.getItem(STORED_CONFIG_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    if (parsed.__v !== STORED_CONFIG_VERSION) {
      localStorage.removeItem(STORED_CONFIG_KEY);
      return null;
    }
    return parsed;
  } catch {

    return null;
  }
};

const saveStoredConfig = (patch) => {
  const next = {
    ...(readStoredConfig() || {}),
    ...patch,
    __v: STORED_CONFIG_VERSION,
  };
  try {
    localStorage.setItem(STORED_CONFIG_KEY, JSON.stringify(next));
  } catch {

  }
  return next;
};

const readUrlConfig = () => {
  const found = {};
  try {
    const hash = window.location.hash;
    const hashQuery = hash.includes("?")
      ? hash.slice(hash.indexOf("?") + 1)
      : "";

    for (const params of [
      new URLSearchParams(window.location.search),
      new URLSearchParams(hashQuery),
    ]) {
      for (const [key, value] of params) {
        if (key.startsWith("ss_")) found[key.slice(3)] = value;
      }
    }
  } catch {
    return found;
  }
  return found;
};

const setConfig = (patch) => {
  saveStoredConfig(patch);
  const changed = applyConfig(patch, { label: "runtime" });

  if (changed.some((key) => STRUCTURAL_CONFIG_KEYS.has(key))) {
    resetSlideshowState();
    bootstrap();
  }
  return changed;
};

const clearStoredConfig = () => {
  try {
    localStorage.removeItem(STORED_CONFIG_KEY);
  } catch {

  }
};

applyConfig(window.MediaBarConfig, {
  trusted: true,
  sentinel: -1,
  label: "plugin",
});
applyConfig(window.SlideshowConfig, { trusted: true, label: "index.html" });

const CONFIG_SERVER_DEFAULTS = JSON.parse(JSON.stringify(CONFIG));

applyConfig(readStoredConfig(), { label: "localStorage" });
applyConfig(readUrlConfig(), { label: "url" });

const STATE = {
  jellyfinData: {
    userId: null,
    appName: null,
    appVersion: null,
    deviceName: null,
    deviceId: null,
    accessToken: null,
    serverAddress: null,

    views: null,
  },
  slideshow: {
    hasInitialized: false,
    isBootstrapping: false,
    signOutWatcherAttached: false,
    listenersAttached: false,
    isTransitioning: false,
    isPaused: false,
    currentSlideIndex: 0,
    containerFocused: false,
    slideInterval: null,
    itemIds: [],
    loadedItems: {},
    createdSlides: {},

    slideVideoIds: {},
    trailerStartTimer: null,
    trailerWatchdog: null,

    trailerLibraryIds: null,
    firstSlideShown: false,
    hoverHeld: false,
    resumeIndex: 0,
    startedFromStoredCredentials: false,
    credentialsRejected: false,
    homeRenderWatched: false,
    totalItems: 0,
    isLoading: false,
    players: {},
    ytPromise: null,
    isMuted: true,
    isVideoPlaying: false,
  },
};

const loadYouTubeAPI = () => {
  if (STATE.slideshow.ytPromise) return STATE.slideshow.ytPromise;

  STATE.slideshow.ytPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }

    let timeout;
    let settled = false;
    const previousReady = window.onYouTubeIframeAPIReady;
    const finish = (YT = null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve(YT && YT.Player ? YT : null);
    };

    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === "function") {
        previousReady();
      }
      finish(window.YT);
    };

    let tag = document.querySelector('script[src*="youtube.com/iframe_api"]');
    if (!tag) {
      tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      tag.onerror = () => {
        console.warn(
          "YouTube iframe API failed to load; continuing without trailers.",
        );
        finish();
      };
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    timeout = setTimeout(() => {
      console.warn(
        "Timed out loading YouTube iframe API; continuing without trailers.",
      );
      finish();
    }, CONFIG.youtubeApiLoadTimeoutMs);
  });
  return STATE.slideshow.ytPromise;
};

const mark = (name) => {
  try {
    performance.mark(`sspure:${name}`);
  } catch (error) {

  }
};

const markJellyfinHomeRender = () => {

  if (!CONFIG.measureStartup) return;
  if (STATE.slideshow.homeRenderWatched) return;
  STATE.slideshow.homeRenderWatched = true;

  const alreadyRendered = () =>
    document.querySelector(".homeSectionsContainer .sectionTitle, .homeSectionsContainer .card");

  if (alreadyRendered()) {
    mark("jellyfin-home-rows");
    return;
  }

  const observer = new MutationObserver(() => {
    if (!alreadyRendered()) return;
    mark("jellyfin-home-rows");
    observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => observer.disconnect(), 30000);
};

const isUserLoggedIn = () => {
  try {
    const apiClient = window.ApiClient;
    return Boolean(
      apiClient &&
        typeof apiClient.isLoggedIn === "function" &&
        apiClient.isLoggedIn() &&
        apiClient.accessToken() &&
        apiClient.getCurrentUserId(),
    );
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};

const hasUsableCredentials = () => {
  try {
    const apiClient = window.ApiClient;
    return Boolean(
      apiClient &&
        typeof apiClient.accessToken === "function" &&
        apiClient.accessToken() &&
        apiClient.serverAddress() &&
        apiClient.getCurrentUserId(),
    );
  } catch (error) {
    return false;
  }
};

const readStoredCredentials = () => {
  if (!CONFIG.earlyStartFromStoredCredentials) return null;

  try {
    const raw = localStorage.getItem("jellyfin_credentials");
    if (!raw) return null;

    const server = JSON.parse(raw)?.Servers?.[0];
    if (!server?.AccessToken || !server?.UserId) return null;

    const serverAddress =
      server.ManualAddress || server.LocalAddress || window.location.origin;
    if (!serverAddress) return null;

    return {
      userId: server.UserId,
      accessToken: server.AccessToken,
      serverAddress: serverAddress.replace(/\/$/, ""),
      serverId: server.Id || null,
    };
  } catch (error) {
    return null;
  }
};

const initJellyfinData = () => {
  try {

    if (hasUsableCredentials()) {
      const apiClient = window.ApiClient;
      STATE.jellyfinData = {
        userId: apiClient.getCurrentUserId() || null,
        appName: apiClient.appName() || "Jellyfin Web",
        appVersion: apiClient.appVersion() || "unknown",
        deviceName: apiClient.deviceName() || "Browser",
        deviceId: apiClient.deviceId() || null,
        accessToken: apiClient.accessToken() || null,
        serverId: apiClient.serverId() || null,
        serverAddress: apiClient.serverAddress() || null,
      };
      STATE.slideshow.startedFromStoredCredentials = false;
    } else {

      const stored = readStoredCredentials();
      if (!stored) return false;

      STATE.jellyfinData = {
        userId: stored.userId,
        appName: "Jellyfin Web",
        appVersion: "unknown",
        deviceName: "Browser",
        deviceId: localStorage.getItem("_deviceId2") || null,
        accessToken: stored.accessToken,
        serverId: stored.serverId,
        serverAddress: stored.serverAddress,
      };
      STATE.slideshow.startedFromStoredCredentials = true;
    }

    return Boolean(
      STATE.jellyfinData.userId &&
        STATE.jellyfinData.accessToken &&
        STATE.jellyfinData.serverAddress,
    );
  } catch (error) {
    console.error("Error reading Jellyfin client data:", error);
    return false;
  }
};

const initLocalization = async () => {
  try {
    const locale = await LocalizationUtils.getCurrentLocale();
    await LocalizationUtils.loadTranslations(locale);
    console.log("✅ Localization initialized");
  } catch (error) {
    console.error("Error initializing localization:", error);
  }
};

const initLoadingScreen = () => {
  if (!CONFIG.showLoadingScreen) return;

  const currentPath = window.location.href.toLowerCase();
  const isHomePage =
    currentPath.includes("/web/#/home.html") ||
    currentPath.includes("/web/#/home") ||
    currentPath.includes("/web/index.html#/home.html") ||
    currentPath.endsWith("/web/index.html#/home") ||
    currentPath.endsWith("/web/");

  if (!isHomePage) return;

  const loadingDiv = document.createElement("div");
  loadingDiv.className = "bar-loading";
  loadingDiv.id = "page-loader";
  loadingDiv.innerHTML = `
    <div class="loader-content">
      <h1>
        <div class="splashLogo"></div>
      </h1>
      <div class="progress-container">
        <div class="progress-bar" id="progress-bar"></div>
        <div class="progress-gap" id="progress-gap"></div>
        <div class="unfilled-bar" id="unfilled-bar"></div>
      </div>
    </div>
  `;
  document.body.appendChild(loadingDiv);

  requestAnimationFrame(() => {
    document.querySelector(".bar-loading h1 div").style.opacity = "1";
  });

  const progressBar = document.getElementById("progress-bar");
  const unfilledBar = document.getElementById("unfilled-bar");

  let progress = 0;
  let lastIncrement = 5;

  const progressInterval = setInterval(() => {
    if (progress < 95) {
      lastIncrement = Math.max(0.5, lastIncrement * 0.98);
      const randomFactor = 0.8 + Math.random() * 0.4;
      const increment = lastIncrement * randomFactor;
      progress += increment;
      progress = Math.min(progress, 95);

      progressBar.style.width = `${progress}%`;
      unfilledBar.style.width = `${100 - progress}%`;
    }
  }, 150);

  const checkInterval = setInterval(() => {
    const loginFormLoaded = document.querySelector(".manualLoginForm");
    const activeTab = document.querySelector(".pageTabContent.is-active");

    if (loginFormLoaded) {
      finishLoading();
      return;
    }

    if (activeTab) {
      const tabIndex = activeTab.getAttribute("data-index");

      if (tabIndex === "0") {
        const homeSections = document.querySelector(".homeSectionsContainer");
        const slidesContainer = document.querySelector("#slides-container");

        if (homeSections && slidesContainer) {
          finishLoading();
        }
      } else {
        if (
          activeTab.children.length > 0 ||
          activeTab.innerText.trim().length > 0
        ) {
          finishLoading();
        }
      }
    }
  }, CONFIG.loadingCheckInterval);

  let finished = false;
  const finishLoading = () => {
    if (finished) return;
    finished = true;

    clearInterval(progressInterval);
    clearInterval(checkInterval);
    clearTimeout(safetyTimeout);

    progressBar.style.transition = "width 300ms ease-in-out";
    progressBar.style.width = "100%";
    unfilledBar.style.width = "0%";

    const loader = document.getElementById("page-loader");
    if (!loader) return;

    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 300);
    }, 300);
  };

  const safetyTimeout = setTimeout(() => {
    console.warn(
      "Loading screen timed out after " +
        CONFIG.loadingScreenTimeoutMs +
        "ms; removing overlay.",
    );
    finishLoading();
  }, CONFIG.loadingScreenTimeoutMs);
};

const resetSlideshowState = () => {
  console.log("🔄 Resetting slideshow state...");

  if (STATE.slideshow.slideInterval) {
    STATE.slideshow.slideInterval.stop();
  }

  destroyAllPlayers();

  PageBackdrop.clear();

  const container = document.getElementById("slides-container");
  if (container) {
    container.remove();
  }

  STATE.slideshow.hasInitialized = false;
  STATE.slideshow.isTransitioning = false;
  STATE.slideshow.isPaused = false;
  STATE.slideshow.currentSlideIndex = 0;
  STATE.slideshow.containerFocused = false;
  STATE.slideshow.slideInterval = null;
  STATE.slideshow.itemIds = [];
  STATE.slideshow.loadedItems = {};
  STATE.slideshow.createdSlides = {};
  STATE.slideshow.totalItems = 0;
  STATE.slideshow.isVideoPlaying = false;
  STATE.slideshow.trailerLibraryIds = null;

  STATE.jellyfinData.views = null;
};

const destroyAllPlayers = () => {
  Object.keys(STATE.slideshow.players).forEach((itemId) => {
    const player = STATE.slideshow.players[itemId];
    if (player && typeof player.destroy === "function") {
      try {
        player.destroy();
      } catch (error) {
        console.warn("Error destroying player:", error);
      }
    }
  });
  STATE.slideshow.players = {};
  STATE.slideshow.isVideoPlaying = false;
};

const waitForSignIn = () => {
  if (isUserLoggedIn()) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const deadline = Date.now() + CONFIG.authWaitTimeoutMs;
    const started = Date.now();

    const tick = () => {

      if (isUserLoggedIn() || readStoredCredentials()) {
        mark("credentials-available");
        resolve();
        return;
      }

      if (Date.now() > deadline) {
        reject(new Error("Timed out waiting for sign-in"));
        return;
      }

      const elapsed = Date.now() - started;
      const interval =
        elapsed < CONFIG.authFastPollWindowMs
          ? CONFIG.authFastPollIntervalMs
          : CONFIG.retryInterval;
      setTimeout(tick, interval);
    };

    tick();
  });
};

const bootstrap = async () => {
  if (STATE.slideshow.hasInitialized || STATE.slideshow.isBootstrapping) return;
  STATE.slideshow.isBootstrapping = true;

  mark("bootstrap-start");
  markJellyfinHomeRender();
  initLoadingScreen();
  watchForSignOut();

  try {
    await waitForSignIn();
    mark("signed-in");

    if (!initJellyfinData()) {
      console.warn("Slideshow: ApiClient data incomplete, not starting.");
      return;
    }

    await initLocalization();
    mark("localization-ready");

    await slidesInit();

    if (
      STATE.slideshow.credentialsRejected &&
      STATE.slideshow.startedFromStoredCredentials
    ) {
      STATE.slideshow.credentialsRejected = false;
      resetSlideshowState();
      STATE.slideshow.isBootstrapping = false;

      await new Promise((resolve) => {
        const waitForApiClient = () => {
          if (hasUsableCredentials()) resolve();
          else setTimeout(waitForApiClient, CONFIG.retryInterval);
        };
        waitForApiClient();
      });

      console.log("Slideshow: retrying with ApiClient credentials.");
      await bootstrap();
    }
  } catch (error) {
    console.warn("Slideshow: not starting —", error.message);
  } finally {
    STATE.slideshow.isBootstrapping = false;
  }
};

const watchForSignOut = () => {
  if (STATE.slideshow.signOutWatcherAttached) return;
  STATE.slideshow.signOutWatcherAttached = true;

  window.addEventListener("hashchange", () => {
    if (STATE.slideshow.hasInitialized && !isUserLoggedIn()) {
      console.log("Slideshow: signed out, tearing down.");
      resetSlideshowState();
    } else if (!STATE.slideshow.hasInitialized && isUserLoggedIn()) {
      bootstrap();
    }
  });
};

bootstrap();

const SlideUtils = {

  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  mixTypesInHead(items, windowSize) {
    if (!windowSize || items.length <= windowSize) return items;

    const result = [...items];
    const presentTypes = new Set(result.map((item) => item.Type));
    if (presentTypes.size < 2) return result;

    for (const type of presentTypes) {
      const head = result.slice(0, windowSize);
      if (head.some((item) => item.Type === type)) continue;

      const from = result.findIndex(
        (item, index) => index >= windowSize && item.Type === type,
      );
      if (from === -1) continue;

      const counts = {};
      head.forEach((item) => {
        counts[item.Type] = (counts[item.Type] || 0) + 1;
      });
      const spare = head
        .map((item, index) => (counts[item.Type] > 1 ? index : -1))
        .filter((index) => index !== -1);
      if (!spare.length) break;

      const to = spare[Math.floor(Math.random() * spare.length)];
      [result[from], result[to]] = [result[to], result[from]];
    }

    return result;
  },

  createSeparator() {
    const separator = document.createElement("i");
    separator.className = "material-icons fiber_manual_record separator-icon";
    return separator;
  },

  createElement(tag, attributes = {}, content = null) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "style" && typeof value === "object") {
        Object.entries(value).forEach(([prop, val]) => {
          element.style[prop] = val;
        });
      } else if (key === "className") {
        element.className = value;
      } else if (key === "innerHTML") {
        element.innerHTML = value;
      } else if (key === "textContent") {
        element.textContent = value;
      } else if (key.startsWith("on") && typeof value === "function") {
        element.addEventListener(key.slice(2), value);
      } else if (typeof value === "boolean") {

        element[key] = value;
      } else {
        element.setAttribute(key, value);
      }
    });

    if (content) {
      if (typeof content === "string") {
        element.textContent = content;
      } else {
        element.appendChild(content);
      }
    }

    return element;
  },

  getOrCreateSlidesContainer() {
    let container = document.getElementById("slides-container");
    if (!container) {
      container = this.createElement("div", { id: "slides-container" });
      document.body.appendChild(container);
    }

    container.classList.toggle("layout-plate", CONFIG.layout === "plate");
    container.classList.toggle("layout-marquee", CONFIG.layout === "marquee");

    const root = document.documentElement;
    root.classList.toggle("sspure-plate", CONFIG.layout === "plate");
    root.classList.toggle("sspure-marquee", CONFIG.layout === "marquee");

    return container;
  },

  buildGenres(genresArray) {
    if (!Array.isArray(genresArray) || genresArray.length === 0) return null;

    const genres = genresArray.slice(0, 3).filter(Boolean);
    if (!genres.length) return null;

    const fragment = document.createDocumentFragment();
    genres.forEach((genre, index) => {
      if (index > 0) fragment.appendChild(this.createSeparator());
      const span = document.createElement("span");
      span.textContent = genre;
      fragment.appendChild(span);
    });
    return fragment;
  },
};

const isDataSaverOn = () => {
  if (!CONFIG.respectDataSaver) return false;
  try {
    return Boolean(navigator.connection?.saveData);
  } catch (error) {
    return false;
  }
};

const LIST_FILTER_PARAMS = {
  genre: "Genres",
  tag: "Tags",
  studio: "Studios",
  year: "Years",
  person: "Person",
  rating: "OfficialRatings",
};

const EMPTY_LIST = Object.freeze({ ids: [], filters: [] });

const parseListFilter = (line) => {
  const colon = line.indexOf(":");
  if (colon < 1) return null;

  const key = line.slice(0, colon).trim().toLowerCase();
  const param = LIST_FILTER_PARAMS[key];
  if (!param) return null;

  const value = line
    .slice(colon + 1)
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .join("|");

  if (!value) return null;
  return { key, param, value };
};

const trailersAllowedFor = (item) => {
  const allowed = STATE.slideshow.trailerLibraryIds;
  if (!allowed || !allowed.size) return true;
  if (!item.LibraryId) return true;
  return allowed.has(item.LibraryId);
};

const createLocalPlayer = (video) => ({
  isLocal: true,
  element: video,
  playVideo() {

    const started = video.play();
    if (started && typeof started.catch === "function") {
      started.catch(() => {
        video.dispatchEvent(new Event("error"));
      });
    }
  },
  pauseVideo() {
    video.pause();
  },
  seekTo(seconds) {
    try {
      video.currentTime = seconds || 0;
    } catch (error) {

    }
  },
  mute() {
    video.muted = true;
  },
  unMute() {
    video.muted = false;
  },
  setVolume(percent) {
    video.volume = Math.max(0, Math.min(1, (percent || 0) / 100));
  },
  getPlayerState() {
    return video.paused ? 2 : 1;
  },
  destroy() {
    try {
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.remove();
    } catch (error) {

    }
  },
});

const BlurHash = {
  DIGITS:
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~",

  decode83(str, start, end) {
    let value = 0;
    for (let i = start; i < end; i++) {
      const digit = this.DIGITS.indexOf(str[i]);
      if (digit === -1) return NaN;
      value = value * 83 + digit;
    }
    return value;
  },

  toLinear(value) {
    const v = value / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  },

  fromLinear(value) {
    const v = Math.max(0, Math.min(1, value));
    return Math.round(
      (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055) * 255,
    );
  },

  decodeDC(value) {
    return [
      this.toLinear(value >> 16),
      this.toLinear((value >> 8) & 255),
      this.toLinear(value & 255),
    ];
  },

  decodeAC(value, maxValue) {
    const quant = (v) => {
      const n = Math.floor(v);
      return Math.sign(n - 9) * Math.pow(Math.abs(n - 9) / 9, 2) * maxValue;
    };
    return [
      quant(value / (19 * 19)),
      quant((value / 19) % 19),
      quant(value % 19),
    ];
  },

  toDataURL(hash, width = 32, height = 18) {
    try {
      if (typeof hash !== "string" || hash.length < 6) return null;

      const sizeFlag = this.decode83(hash, 0, 1);
      const numX = (sizeFlag % 9) + 1;
      const numY = Math.floor(sizeFlag / 9) + 1;
      if (hash.length !== 4 + 2 * numX * numY) return null;

      const maxValue = (this.decode83(hash, 1, 2) + 1) / 166;
      const colours = new Array(numX * numY);
      colours[0] = this.decodeDC(this.decode83(hash, 2, 6));
      for (let i = 1; i < colours.length; i++) {
        const from = 4 + i * 2;
        colours[i] = this.decodeAC(
          this.decode83(hash, from, from + 2),
          maxValue,
        );
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) return null;

      const imageData = context.createImageData(width, height);
      const pixels = imageData.data;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let r = 0;
          let g = 0;
          let b = 0;
          for (let j = 0; j < numY; j++) {
            for (let i = 0; i < numX; i++) {
              const basis =
                Math.cos((Math.PI * x * i) / width) *
                Math.cos((Math.PI * y * j) / height);
              const colour = colours[i + j * numX];
              r += colour[0] * basis;
              g += colour[1] * basis;
              b += colour[2] * basis;
            }
          }
          const index = 4 * (x + y * width);
          pixels[index] = this.fromLinear(r);
          pixels[index + 1] = this.fromLinear(g);
          pixels[index + 2] = this.fromLinear(b);
          pixels[index + 3] = 255;
        }
      }

      context.putImageData(imageData, 0, 0);
      return canvas.toDataURL();
    } catch (error) {
      return null;
    }
  },

  plateColours(item) {
    const hashes = item?.ImageBlurHashes?.Backdrop;
    const hash = hashes ? Object.values(hashes)[0] : null;
    if (typeof hash !== "string" || hash.length < 6) return null;

    try {
      const dc = this.decodeDC(this.decode83(hash, 2, 6));
      if (dc.some((channel) => Number.isNaN(channel))) return null;

      const luminance = 0.2126 * dc[0] + 0.7152 * dc[1] + 0.0722 * dc[2];
      const pin = (target) => {
        const scale = target / (luminance || 1e-6);
        return dc.map((channel) => Math.min(1, channel * scale));
      };
      const toCss = (linear) =>
        `rgb(${linear.map((channel) => this.fromLinear(channel)).join(" ")})`;

      return {
        plate: toCss(pin(CONFIG.plateLuminance)),
        accent: toCss(pin(CONFIG.plateAccentLuminance)),
      };
    } catch (error) {
      return null;
    }
  },

  forItem(item, imageType, tag) {
    const hashes = item?.ImageBlurHashes?.[imageType];
    if (!hashes) return null;
    if (tag && hashes[tag]) return hashes[tag];
    const first = Object.values(hashes)[0];
    return typeof first === "string" ? first : null;
  },
};

const LocalizationUtils = {
  translations: {},
  locale: null,
  isLoading: {},
  cachedLocale: null,
  chunkUrlCache: {},

  async getCurrentLocale() {
    if (this.cachedLocale) {
      return this.cachedLocale;
    }

    let locale = document.documentElement.getAttribute("lang");

    if (!locale) {
      const navLang = navigator.language || navigator.userLanguage;
      locale = navLang || "en-us";
    }

    locale = locale.toLowerCase();

    this.cachedLocale = locale;
    return locale;
  },

  findTranslationChunkUrl(locale) {
    const localePrefix = locale.split("-")[0];

    if (this.chunkUrlCache[localePrefix]) {
      return this.chunkUrlCache[localePrefix];
    }

    if (window.performance && window.performance.getEntriesByType) {
      try {
        const resources = window.performance.getEntriesByType("resource");
        for (const resource of resources) {
          const url = resource.name || resource.url;
          if (
            url &&
            url.includes(`${localePrefix}-json`) &&
            url.includes(".chunk.js")
          ) {
            this.chunkUrlCache[localePrefix] = url;
            return url;
          }
        }
      } catch (e) {
        console.warn("Error checking performance entries:", e);
      }
    }

    this.chunkUrlCache[localePrefix] = null;
    return null;
  },

  async loadTranslations(locale) {
    if (this.translations[locale]) return;
    if (this.isLoading[locale]) {
      await this.isLoading[locale];
      return;
    }

    const loadPromise = (async () => {
      try {
        const chunkUrl = this.findTranslationChunkUrl(locale);
        if (!chunkUrl) {
          return;
        }

        const response = await fetch(chunkUrl);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch translations: ${response.statusText}`,
          );
        }

        const chunkText = await response.text();

        const replaceEscaped = (text) =>
          text
            .replace(/\\"/g, '"')
            .replace(/\\n/g, "\n")
            .replace(/\\\\/g, "\\")
            .replace(/\\'/g, "'");
        try {
          const START = /^(.*)JSON\.parse\(['"]/gms;
          const END = /['"]?\)?\s*}?(\r\n|\r|\n)?}?]?\)?;(\r\n|\r|\n)?$/gms;

          const jsonString = replaceEscaped(
            chunkText.replace(START, "").replace(END, ""),
          );
          this.translations[locale] = JSON.parse(jsonString);
          return;
        } catch (e) {
          console.error("Failed to parse JSON from standard extraction.");
        }

        let jsonMatch = chunkText.match(/JSON\.parse\(['"](.*?)['"]\)/);
        if (jsonMatch) {
          try {
            const jsonString = replaceEscaped(jsonMatch[1]);
            this.translations[locale] = JSON.parse(jsonString);
            return;
          } catch (e) {
            console.error("Failed to parse JSON from direct extraction.");
          }
        }

        const jsonStart = chunkText.indexOf("{");
        const jsonEnd = chunkText.lastIndexOf("}") + 1;
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          const jsonString = chunkText.substring(jsonStart, jsonEnd);
          try {
            this.translations[locale] = JSON.parse(jsonString);
            return;
          } catch (e) {
            console.error("Failed to parse JSON from chunk:", e);
          }
        }
      } catch (error) {
        console.error("Error loading translations:", error);
      } finally {
        delete this.isLoading[locale];
      }
    })();

    this.isLoading[locale] = loadPromise;
    await loadPromise;
  },

  getLocalizedString(key, fallback, ...args) {
    const locale = this.cachedLocale || "en-us";
    let translated = this.translations[locale]?.[key] || fallback;

    if (args.length > 0) {
      for (let i = 0; i < args.length; i++) {
        translated = translated.replace(new RegExp(`\\{${i}\\}`, "g"), args[i]);
      }
    }

    return translated;
  },
};

const ApiUtils = {

  itemFieldsQuery() {
    return [

      "fields=Overview,Genres,Taglines,RemoteTrailers,ChildCount,LocalTrailerCount",
      "enableUserData=true",
      "enableImageTypes=Backdrop,Logo,Primary",
      "enableTotalRecordCount=false",
    ].join("&");
  },

  async fetchItemsByIds(ids) {
    if (!ids.length) return [];

    try {
      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Items` +
          `?Ids=${ids.map(encodeURIComponent).join(",")}` +
          `&Recursive=true&${this.itemFieldsQuery()}`,
        { headers: this.getAuthHeaders() },
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          STATE.slideshow.credentialsRejected = true;
        }
        console.warn(`Slideshow: could not load listed items (${response.status}).`);
        return [];
      }

      const { Items: items = [] } = await response.json();
      return items;
    } catch (error) {
      console.error("Error fetching listed items:", error);
      return [];
    }
  },

  async getSkipSegments(videoId) {

    if (!CONFIG.enableSponsorBlock) return 0;

    try {

      const categories = '["intro"]';
      const response = await fetch(
        `https://sponsor.ajay.app/api/skipSegments?videoID=${videoId}&categories=${categories}`,
      );

      if (response.status === 200) {
        const segments = await response.json();
        const introSegment = segments.find((s) => s.segment[0] < 5);

        if (introSegment) {
          console.log(
            `[SponsorBlock] Skipping intro for ${videoId}. Start at: ${introSegment.segment[1]}`,
          );
          return Math.ceil(introSegment.segment[1]);
        }
      }
      return 0;
    } catch (error) {
      return 0;
    }
  },

  async fetchListEntries() {
    try {
      const listFileName = `${STATE.jellyfinData.serverAddress}/web/avatars/list.txt?userId=${STATE.jellyfinData.userId}`;
      const response = await fetch(listFileName);

      if (!response.ok) {

        if (response.status !== 404) {
          console.warn(
            `Slideshow: list.txt returned ${response.status}; using library items.`,
          );
        }
        return EMPTY_LIST;
      }

      const contentType = response.headers.get("content-type") || "";
      if (/html|xml/i.test(contentType)) {
        console.warn(
          "Slideshow: list.txt returned HTML rather than a text file " +
            "(likely a proxy fallback); using library items.",
        );
        return EMPTY_LIST;
      }

      const text = await response.text();
      if (/^\s*</.test(text)) {
        console.warn(
          "Slideshow: list.txt content looks like markup; using library items.",
        );
        return EMPTY_LIST;
      }

      const ids = [];
      const filters = [];

      text
        .split(/\r?\n/)
        .map((line) => line.trim())

        .filter((line) => line && !line.startsWith("#"))
        .forEach((line) => {

          if (/^[0-9a-f-]{32,36}$/i.test(line)) {
            ids.push(line);
            return;
          }

          const filter = parseListFilter(line);
          if (filter) {
            filters.push(filter);
            return;
          }

          console.warn(
            `Slideshow: ignoring list.txt line "${line}". Expected an item id ` +
              `or one of ${Object.keys(LIST_FILTER_PARAMS).join(", ")} ` +
              `followed by ":". Prefix a line with # to comment it out.`,
          );
        });

      return { ids, filters };
    } catch (error) {
      console.error("Error fetching list.txt:", error);
      return EMPTY_LIST;
    }
  },

  async fetchItemsByFilter(filter) {
    try {
      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Items` +
          `?IncludeItemTypes=Movie,Series&Recursive=true` +
          `&${filter.param}=${encodeURIComponent(filter.value)}` +
          `&SortBy=Random&Limit=${CONFIG.maxItems}` +
          `&${this.itemFieldsQuery()}`,
        { headers: this.getAuthHeaders() },
      );

      if (!response.ok) {
        console.warn(
          `Slideshow: ${filter.key}:${filter.value} failed (${response.status}).`,
        );
        return [];
      }

      const { Items: items = [] } = await response.json();
      if (!items.length) {
        console.warn(
          `Slideshow: ${filter.key}:${filter.value} matched nothing.`,
        );
      }
      return items;
    } catch (error) {
      console.error(`Error resolving ${filter.key}:${filter.value}:`, error);
      return [];
    }
  },

  async fetchListedItems(entries) {
    const [byId, ...byFilter] = await Promise.all([
      entries.ids.length ? this.fetchItemsByIds(entries.ids) : [],
      ...entries.filters.map((filter) => this.fetchItemsByFilter(filter)),
    ]);

    const seen = new Set();
    const merged = [];
    byId.concat(...byFilter).forEach((item) => {
      if (!item || seen.has(item.Id)) return;
      seen.add(item.Id);
      merged.push(item);
    });

    return merged;
  },

  async fetchItemPage(types, limit, library = null) {
    const maxOfficialRatingParam = CONFIG.maxOfficialRating
      ? `&MaxOfficialRating=${encodeURIComponent(CONFIG.maxOfficialRating)}`
      : "";

    const response = await fetch(
      `${STATE.jellyfinData.serverAddress}/Items` +
        `?IncludeItemTypes=${types}&Recursive=true&hasOverview=true` +
        `&imageTypes=Logo,Backdrop&SortBy=Random&isPlayed=False` +
        `&Limit=${limit}&${this.itemFieldsQuery()}` +
        maxOfficialRatingParam +
        (library ? `&ParentId=${encodeURIComponent(library.Id)}` : ""),
      {
        headers: this.getAuthHeaders(),
      },
    );

    if (!response.ok) {

      if (response.status === 401 || response.status === 403) {
        STATE.slideshow.credentialsRejected = true;
        console.warn(
          "Slideshow: stored credentials rejected; waiting for ApiClient.",
        );
        return [];
      }

      console.error(
        `Failed to fetch items: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const { Items: items = [] } = await response.json();

    const withLogos = items.filter((item) => item.ImageTags && item.ImageTags.Logo);

    if (library) withLogos.forEach((item) => (item.LibraryId = library.Id));

    return withLogos;
  },

  async fetchAcrossLibraries(types, limit, libraries) {
    if (!libraries.length) return await this.fetchItemPage(types, limit);

    const pages = await Promise.all(
      libraries.map((library) => this.fetchItemPage(types, limit, library)),
    );

    const merged = [];
    const longest = Math.max(0, ...pages.map((page) => page.length));
    for (let i = 0; i < longest; i++) {
      pages.forEach((page) => {
        if (i < page.length) merged.push(page[i]);
      });
    }

    return merged.slice(0, limit);
  },

  async fetchViews() {
    if (STATE.jellyfinData.views) return STATE.jellyfinData.views;

    try {
      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Users/${STATE.jellyfinData.userId}/Views`,
        { headers: this.getAuthHeaders() },
      );
      if (!response.ok) {
        console.warn(
          `Slideshow: could not list libraries (${response.status}); using all.`,
        );
        return [];
      }
      const { Items: views = [] } = await response.json();
      STATE.jellyfinData.views = views;
      return views;
    } catch (error) {
      console.error("Error fetching libraries:", error);
      return [];
    }
  },

  async resolveLibraries(names) {
    if (!names.length) return [];

    const views = await this.fetchViews();
    if (!views.length) return [];

    const matched = [];

    names.forEach((name) => {
      const wanted = String(name).trim().toLowerCase();
      const view = views.find((v) => (v.Name || "").toLowerCase() === wanted);
      if (view) matched.push(view);
      else {
        console.warn(
          `Slideshow: no library named "${name}". Known libraries:`,
          views.map((v) => v.Name).join(", "),
        );
      }
    });

    return matched;
  },

  async fetchItemsFromServer() {
    try {
      if (!STATE.jellyfinData.accessToken) {
        console.warn("Access token not available. Skipping API request.");
        return [];
      }

      if (!STATE.jellyfinData.serverAddress) {
        console.warn("Server address not available. Skipping API request.");
        return [];
      }

      const movieQuota = Math.max(0, CONFIG.maxMovies || 0);
      const seriesQuota = Math.max(0, CONFIG.maxSeries || 0);

      let libraries = await this.resolveLibraries(CONFIG.libraries);

      const trailerLibraries = await this.resolveLibraries(
        CONFIG.trailerLibraries,
      );
      STATE.slideshow.trailerLibraryIds = new Set(
        trailerLibraries.map((view) => view.Id),
      );
      if (!libraries.length && trailerLibraries.length) {
        libraries = await this.fetchViews();
      }

      if (!movieQuota && !seriesQuota) {
        return await this.fetchAcrossLibraries(
          "Movie,Series",
          CONFIG.maxItems,
          libraries,
        );
      }

      const [movies, series] = await Promise.all([
        movieQuota
          ? this.fetchAcrossLibraries("Movie", movieQuota, libraries)
          : [],
        seriesQuota
          ? this.fetchAcrossLibraries("Series", seriesQuota, libraries)
          : [],
      ]);

      const merged = movies.concat(series);
      if (merged.length) return merged;

      if (STATE.slideshow.credentialsRejected) return [];

      console.warn(
        "Slideshow: the configured quota matched no items; using the pooled query.",
      );
      return await this.fetchAcrossLibraries(
        "Movie,Series",
        CONFIG.maxItems,
        libraries,
      );
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  },

  async fetchLocalTrailerUrl(itemId) {
    try {
      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Items/${itemId}/LocalTrailers`,
        { headers: this.getAuthHeaders() },
      );
      if (!response.ok) return null;

      const trailers = await response.json();
      const trailer = Array.isArray(trailers) ? trailers[0] : null;
      if (!trailer?.Id) return null;

      const mediaSourceId = trailer.MediaSources?.[0]?.Id || trailer.Id;

      return (
        `${STATE.jellyfinData.serverAddress}/Videos/${trailer.Id}/stream` +
        `?static=true&mediaSourceId=${encodeURIComponent(mediaSourceId)}` +
        `&api_key=${encodeURIComponent(STATE.jellyfinData.accessToken)}`
      );
    } catch (error) {
      console.warn(`Could not resolve local trailer for ${itemId}:`, error);
      return null;
    }
  },

  getAuthHeaders() {
    return {
      Authorization: `MediaBrowser Client="${STATE.jellyfinData.appName}", Device="${STATE.jellyfinData.deviceName}", DeviceId="${STATE.jellyfinData.deviceId}", Version="${STATE.jellyfinData.appVersion}", Token="${STATE.jellyfinData.accessToken}"`,
    };
  },

  async playItem(itemId) {
    try {
      const sessionId = await this.getSessionId();
      if (!sessionId) {
        console.error("Session ID not found.");
        return false;
      }

      const playUrl = `${STATE.jellyfinData.serverAddress}/Sessions/${sessionId}/Playing?playCommand=PlayNow&itemIds=${itemId}`;
      const playResponse = await fetch(playUrl, {
        method: "POST",
        headers: this.getAuthHeaders(),
      });

      if (!playResponse.ok) {
        throw new Error(
          `Failed to send play command: ${playResponse.statusText}`,
        );
      }

      console.log("Play command sent successfully to session:", sessionId);
      return true;
    } catch (error) {
      console.error("Error sending play command:", error);
      return false;
    }
  },

  async getSessionId() {
    try {
      const response = await fetch(
        `${
          STATE.jellyfinData.serverAddress
        }/Sessions?deviceId=${encodeURIComponent(STATE.jellyfinData.deviceId)}`,
        {
          headers: this.getAuthHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch session data: ${response.statusText}`);
      }

      const sessions = await response.json();

      if (!sessions || sessions.length === 0) {
        console.warn(
          "No sessions found for deviceId:",
          STATE.jellyfinData.deviceId,
        );
        return null;
      }

      return sessions[0].Id;
    } catch (error) {
      console.error("Error fetching session data:", error);
      return null;
    }
  },

  async toggleFavorite(itemId, button) {
    try {
      const isFavorite = button.classList.contains("favorited");

      const url = `${STATE.jellyfinData.serverAddress}/UserFavoriteItems/${itemId}`;
      const method = isFavorite ? "DELETE" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          ...ApiUtils.getAuthHeaders(),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to toggle favorite: ${response.statusText}`);
      }

      button.classList.toggle("favorited", !isFavorite);

      const cached = STATE.slideshow.loadedItems[itemId];
      if (cached) {
        cached.UserData = cached.UserData || {};
        cached.UserData.IsFavorite = !isFavorite;
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  },
};

class SlideTimer {

  constructor(callback, interval) {
    this.callback = callback;
    this.interval = interval;
    this.timerId = null;

    this.resumeId = null;
    this.startedAt = null;
    this.remaining = interval;
    this.start();
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.resumeId) {
      clearTimeout(this.resumeId);
      this.resumeId = null;
    }
    this.remaining = this.interval;
    this.startedAt = null;
    return this;
  }

  start() {
    if (this.timerId || this.resumeId) return this;
    this.startedAt = Date.now();
    this.remaining = this.interval;
    this.timerId = setInterval(this.callback, this.interval);
    return this;
  }

  pause() {
    if (!this.timerId && !this.resumeId) return this;

    const elapsed = this.startedAt ? Date.now() - this.startedAt : 0;
    this.remaining = Math.max(0, this.interval - (elapsed % this.interval));

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.resumeId) {
      clearTimeout(this.resumeId);
      this.resumeId = null;
    }
    return this;
  }

  resume() {
    if (this.timerId || this.resumeId) return this;

    if (this.remaining >= this.interval) return this.start();

    this.startedAt = Date.now() - (this.interval - this.remaining);
    this.resumeId = setTimeout(() => {
      this.resumeId = null;
      this.callback();
      this.startedAt = Date.now();
      this.remaining = this.interval;
      this.timerId = setInterval(this.callback, this.interval);
    }, this.remaining);
    return this;
  }

  restart() {
    return this.stop().start();
  }
}

const VisibilityObserver = {
  wasVisible: false,
  pending: false,
  lastDisplay: null,

  scheduleUpdate() {
    if (this.pending) return;
    this.pending = true;

    const run = () => {
      if (!this.pending) return;
      this.pending = false;
      this.updateVisibility();
    };

    requestAnimationFrame(run);
    setTimeout(run, 250);
  },

  updateVisibility() {
    const container = document.getElementById("slides-container");
    if (!container) return;

    const activeTab = document.querySelector(".emby-tab-button-active");
    const hash = window.location.hash;
    const onHome = hash === "#/home.html" || hash === "#/home";

    const isVisible =
      onHome &&
      (activeTab ? activeTab.getAttribute("data-index") === "0" : true);

    const display = isVisible ? "block" : "none";
    if (display !== this.lastDisplay) {
      container.style.display = display;
      this.lastDisplay = display;
    }

    if (isVisible === this.wasVisible) return;

    if (isVisible) {
      SlideshowManager.updateCurrentSlide(STATE.slideshow.currentSlideIndex);
    } else {
      if (STATE.slideshow.slideInterval) STATE.slideshow.slideInterval.stop();
      SlideshowManager.clearSlideTimers();
      destroyAllPlayers();
      container.querySelectorAll(".slide").forEach((slide) => slide.remove());
      STATE.slideshow.createdSlides = {};
      STATE.slideshow.slideVideoIds = {};
      PageBackdrop.clear();
    }

    this.wasVisible = isVisible;
  },

  handleClick(event) {
    const target = event.target;
    if (
      target.closest(".emby-tab-button") ||
      target.closest(".pageTabButton") ||
      target.closest(".navMenuOption")
    ) {
      VisibilityObserver.scheduleUpdate();
    }
  },

  init() {
    const observer = new MutationObserver(() => this.scheduleUpdate());
    observer.observe(document.body, { childList: true, subtree: true });
    document.body.addEventListener("click", this.handleClick.bind(this));
    window.addEventListener("hashchange", () => this.scheduleUpdate());

    this.updateVisibility();
  },
};

const PageBackdrop = {
  LAYER_CLASS: "slideshow-page-backdrop",
  observer: null,
  isWriting: false,
  currentItemId: null,

  surface: null,
  prevInlineImage: null,
  addedWithBackdrop: false,

  getSurface() {
    const bg = document.querySelector(".backgroundContainer");
    if (!bg) return null;
    if (document.querySelector(".backdropContainer .backdropImage")) return null;
    return bg;
  },

  updateSurface(surface, itemId, src) {
    if (this.surface !== surface) {
      this.surface = surface;
      this.prevInlineImage = surface.style.backgroundImage || "";
      this.addedWithBackdrop = !surface.classList.contains("withBackdrop");
    }
    if (this.currentItemId === itemId) return;

    surface.style.backgroundImage = `url("${src.replace(/"/g, "%22")}")`;
    surface.classList.add("withBackdrop");
    this.currentItemId = itemId;
  },

  restoreSurface() {
    if (!this.surface) return;
    if (this.prevInlineImage) {
      this.surface.style.backgroundImage = this.prevInlineImage;
    } else {
      this.surface.style.removeProperty("background-image");
    }

    if (this.addedWithBackdrop) {
      this.surface.classList.remove("withBackdrop");
    }
    this.surface = null;
    this.prevInlineImage = null;
    this.addedWithBackdrop = false;
  },

  getOrCreateContainer() {
    let container = document.querySelector(".backdropContainer");
    if (!container) {
      container = SlideUtils.createElement("div", {
        className: "backdropContainer",
      });
      document.body.insertBefore(container, document.body.firstChild);
    }
    return container;
  },

  getOrCreateLayer(container) {
    let layer = container.querySelector(`.${this.LAYER_CLASS}`);
    if (!layer || !layer.isConnected) {
      layer = SlideUtils.createElement("div", {
        className: `backdropImage ${this.LAYER_CLASS}`,
      });
      container.appendChild(layer);
    }
    return layer;
  },

  removeRotatorLayers(container) {
    const layers = container.querySelectorAll(".backdropImage");
    layers.forEach((layer) => {
      if (!layer.classList.contains(this.LAYER_CLASS)) {
        layer.remove();
      }
    });

    const slideshowLayer = container.querySelector(`.${this.LAYER_CLASS}`);
    if (slideshowLayer && slideshowLayer !== container.lastElementChild) {
      container.appendChild(slideshowLayer);
    }
  },

  startObserver(container) {
    if (this.observer) return;

    this.observer = new MutationObserver(() => {

      if (this.isWriting) return;

      this.isWriting = true;
      try {
        this.removeRotatorLayers(container);
      } finally {
        this.isWriting = false;
      }
    });

    this.observer.observe(container, { childList: true });
  },

  stopObserver() {
    if (!this.observer) return;
    this.observer.disconnect();
    this.observer = null;
  },

  update(itemId) {
    if (!CONFIG.syncPageBackdrop) return;

    const item = STATE.slideshow.loadedItems[itemId];

    if (!item) return;

    const src = SlideCreator.buildImageUrl(
      item,
      "Backdrop",
      0,
      STATE.jellyfinData.serverAddress,
      60,
    );
    if (!src) return;

    const surface = this.getSurface();
    if (surface) {
      this.updateSurface(surface, itemId, src);
      return;
    }

    const container = this.getOrCreateContainer();

    this.isWriting = true;
    try {
      const layer = this.getOrCreateLayer(container);

      if (this.currentItemId !== itemId || layer.style.backgroundImage === "") {
        layer.style.backgroundImage = `url("${src.replace(/"/g, "%22")}")`;
        layer.classList.remove("backdropImageFadeIn");

        void layer.offsetWidth;
        layer.classList.add("backdropImageFadeIn");
        this.currentItemId = itemId;
      }

      this.removeRotatorLayers(container);
    } finally {
      this.isWriting = false;
    }

    document
      .querySelector(".backgroundContainer")
      ?.classList.add("withBackdrop");
    this.startObserver(container);
  },

  clear() {
    this.stopObserver();
    this.currentItemId = null;

    if (this.surface) {
      this.restoreSurface();
      return;
    }

    const slideshowLayer = document.querySelector(`.${this.LAYER_CLASS}`);
    if (!slideshowLayer) return;

    slideshowLayer.remove();
    document
      .querySelector(".backgroundContainer")
      ?.classList.remove("withBackdrop");
  },
};

const SlideCreator = {

  buildImageUrl(item, imageType, index, serverAddress, quality) {
    const itemId = item.Id;
    let tag = null;

    if (imageType === "Backdrop") {
      if (
        item.BackdropImageTags &&
        Array.isArray(item.BackdropImageTags) &&
        item.BackdropImageTags.length > 0
      ) {
        const backdropIndex = index !== undefined ? index : 0;
        if (backdropIndex < item.BackdropImageTags.length) {
          tag = item.BackdropImageTags[backdropIndex];
        }
      }
      if (!tag && item.ImageTags && item.ImageTags.Backdrop) {
        tag = item.ImageTags.Backdrop;
      }
    } else {
      if (item.ImageTags && item.ImageTags[imageType]) {
        tag = item.ImageTags[imageType];
      }
    }

    let baseUrl;
    if (index !== undefined) {
      baseUrl = `${serverAddress}/Items/${itemId}/Images/${imageType}/${index}`;
    } else {
      baseUrl = `${serverAddress}/Items/${itemId}/Images/${imageType}`;
    }

    if (tag) {
      const qualityParam = quality !== undefined ? `&quality=${quality}` : "";
      return `${baseUrl}?tag=${tag}${qualityParam}`;
    } else {
      const qualityParam = quality !== undefined ? quality : 90;
      return `${baseUrl}?quality=${qualityParam}`;
    }
  },

  selectTrailerVideoId(remoteTrailers) {
    if (!Array.isArray(remoteTrailers) || remoteTrailers.length === 0) {
      return null;
    }

    const rankName = (name) => {
      const text = (name || "").toLowerCase();
      const isAlternateCut = CONFIG.trailerAlternateCutTerms.some((term) =>
        text.includes(term),
      );

      let rank;
      if (text.includes("official trailer")) rank = 5;
      else if (text.includes("final trailer") || text.includes("main trailer"))
        rank = 4;
      else if (text.includes("trailer")) rank = 3;
      else if (text.includes("teaser")) rank = 2;
      else rank = 1;

      return isAlternateCut ? rank - 0.5 : rank;
    };

    let best = null;

    for (const trailer of remoteTrailers) {
      let videoId = null;
      try {
        const urlObj = new URL(trailer.Url);
        const host = urlObj.hostname.replace(/^www\./, "");
        if (host === "youtu.be") {
          videoId = urlObj.pathname.split("/")[1] || null;
        } else if (
          (host === "youtube.com" || host === "m.youtube.com") &&
          urlObj.pathname.startsWith("/embed/")
        ) {
          videoId = urlObj.pathname.split("/")[2] || null;
        } else {
          videoId = urlObj.searchParams.get("v");
        }
      } catch (e) {}

      if (!videoId) continue;

      const rank = rankName(trailer.Name);
      if (!best || rank > best.rank) {
        best = { videoId, rank };
      }
    }

    return best ? best.videoId : null;
  },

  createSlideElement(item, title) {
    if (!item || !item.Id) {
      console.error("Invalid item data:", item);
      return null;
    }

    const itemId = item.Id;
    const serverAddress = STATE.jellyfinData.serverAddress;

    const slide = SlideUtils.createElement("div", {
      className: "slide",
      "data-item-id": itemId,
    });

    let videoId = null;
    let hasLocalTrailer = false;
    let trailerContainer = null;

    if (
      CONFIG.enableTrailers &&
      (CONFIG.allowTrailersOnTouch || !isTouchLayout()) &&
      !isDataSaverOn() &&
      trailersAllowedFor(item)
    ) {

      hasLocalTrailer =
        CONFIG.preferLocalTrailers && (item.LocalTrailerCount || 0) > 0;
      videoId = hasLocalTrailer
        ? null
        : this.selectTrailerVideoId(item.RemoteTrailers);

      if (hasLocalTrailer || videoId) {
        trailerContainer = SlideUtils.createElement("div", {
          className: "video-container",
          id: `trailer-${item.Id}`,
        });

        const playerDiv = SlideUtils.createElement("div", {
          className: "video-player",
          id: `yt-player-${item.Id}`,
        });

        trailerContainer.appendChild(playerDiv);
        slide.appendChild(trailerContainer);
      }
    }

    if (isPlateLayout()) {
      const plate = BlurHash.plateColours(item);
      slide.style.setProperty("--plate", plate?.plate || CONFIG.plateFallback);
      slide.style.setProperty(
        "--plate-accent",
        plate?.accent || CONFIG.plateAccentFallback,
      );
    }

    const backdrop = SlideUtils.createElement("img", {
      className: "backdrop high-quality",
      src: this.buildImageUrl(item, "Backdrop", 0, serverAddress, 60),
      alt: "",

      "aria-hidden": "true",
      loading: "eager",
    });

    const backdropOverlay = SlideUtils.createElement("div", {
      className: "backdrop-overlay",
    });

    const backdropContainer = SlideUtils.createElement("div", {
      className: "backdrop-container",
    });

    if (CONFIG.useBlurHashPlaceholder) {
      const backdropTag =
        item.BackdropImageTags?.[0] || item.ImageTags?.Backdrop;
      const placeholder = BlurHash.toDataURL(
        BlurHash.forItem(item, "Backdrop", backdropTag),
      );
      if (placeholder) {

        backdrop.style.backgroundImage = `url("${placeholder}")`;
        backdrop.classList.add("awaiting-image");
        const reveal = () => backdrop.classList.remove("awaiting-image");
        if (backdrop.complete) reveal();
        else {
          backdrop.addEventListener("load", reveal, { once: true });

          backdrop.addEventListener(
            "error",
            () => backdrop.classList.add("image-failed"),
            { once: true },
          );
        }
      }
    }

    backdropContainer.append(backdrop, backdropOverlay);

    const logo = SlideUtils.createElement("img", {
      className: "logo high-quality",
      src: this.buildImageUrl(item, "Logo", undefined, serverAddress, 40),
      alt: item.Name,
      loading: "eager",
    });

    const logoContainer = SlideUtils.createElement("div", {
      className: "logo-container",
    });
    logoContainer.appendChild(logo);

    const featuredContent = SlideUtils.createElement(
      "div",
      {
        className: "featured-content",
      },
      title,
    );

    const plotElement = SlideUtils.createElement(
      "div",
      { className: "plot" },
      item.Overview || "",
    );

    const plotContainer = SlideUtils.createElement("div", {
      className: "plot-container",
    });
    plotContainer.appendChild(plotElement);

    const posterContainer = SlideUtils.createElement("div", {
      className: "poster-container",
    });
    if (item.ImageTags && item.ImageTags.Primary) {
      const poster = SlideUtils.createElement("img", {
        className: "poster high-quality",
        src: this.buildImageUrl(item, "Primary", undefined, serverAddress, 70),
        alt: item.Name,
        loading: "eager",
      });
      posterContainer.appendChild(poster);
    } else {
      posterContainer.style.display = "none";
    }

    const taglineText =
      Array.isArray(item.Taglines) && item.Taglines.length
        ? item.Taglines[0]
        : "";
    const taglineElement = SlideUtils.createElement(
      "div",
      { className: "tagline" },
      taglineText,
    );
    if (!taglineText) taglineElement.style.display = "none";

    const gradientOverlay = SlideUtils.createElement("div", {
      className: "gradient-overlay",
    });

    const infoContainer = SlideUtils.createElement("div", {
      className: "info-container",
    });

    const ratingInfo = this.createRatingInfo(item);
    infoContainer.appendChild(ratingInfo);

    const genreElement = SlideUtils.createElement("div", {
      className: "genre",
    });
    const genres = SlideUtils.buildGenres(item.Genres);
    if (genres) genreElement.appendChild(genres);
    else genreElement.style.display = "none";

    const buttonContainer = SlideUtils.createElement("div", {
      className: "button-container",
    });

    const playButton = this.createPlayButton(itemId);
    const detailButton = this.createDetailButton(itemId);
    const favoriteButton = this.createFavoriteButton(item);

    detailButton.appendChild(
      SlideUtils.createElement(
        "span",
        { className: "action-label" },
        LocalizationUtils.getLocalizedString("Details", "Details"),
      ),
    );
    favoriteButton.appendChild(
      SlideUtils.createElement(
        "span",
        { className: "action-label" },
        LocalizationUtils.getLocalizedString("Favorite", "Favorite"),
      ),
    );

    if (isMarqueeLayout() || isPlateLayout()) {
      buttonContainer.append(playButton, detailButton, favoriteButton);
    } else {
      buttonContainer.append(detailButton, playButton, favoriteButton);
    }

    const content = SlideUtils.createElement("div", {
      className: "slide-content",
    });

    if (isMarqueeLayout()) {

      const rail = SlideUtils.createElement("div", {
        className: "spec-rail",
      });
      rail.appendChild(
        SlideUtils.createElement("span", { className: "spec-progress" }),
      );

      content.append(
        posterContainer,
        logoContainer,
        taglineElement,
        rail,
        this.createSpecLine(item),
        plotContainer,
        buttonContainer,
      );
    } else if (isPlateLayout()) {

      const position = STATE.slideshow.itemIds.indexOf(itemId);
      const eyebrow = SlideUtils.createElement(
        "div",
        { className: "plate-eyebrow" },
        position >= 0 && STATE.slideshow.totalItems
          ? `${LocalizationUtils.getLocalizedString("Featured", "Featured")} · ${String(position + 1).padStart(2, "0")} / ${String(STATE.slideshow.totalItems).padStart(2, "0")}`
          : LocalizationUtils.getLocalizedString("Featured", "Featured"),
      );

      const specs = this.createSpecTable(item);
      content.append(eyebrow, logoContainer, plotContainer);
      if (specs) content.appendChild(specs);
      content.appendChild(buttonContainer);
    } else {
      content.append(
        logoContainer,
        infoContainer,
        genreElement,
        plotContainer,
        buttonContainer,
      );
    }

    slide.append(backdropContainer);

    if (isPlateLayout()) {
      slide.appendChild(SlideUtils.createElement("div", { className: "plate" }));
    }

    slide.append(gradientOverlay, featuredContent, content);

    return { slide, videoId, hasLocalTrailer, trailerContainer };
  },

  createSpecTable(item) {
    const table = SlideUtils.createElement("dl", { className: "plate-specs" });

    const rows = [];
    const add = (label, value) => {
      if (value !== null && value !== undefined && value !== "") {
        rows.push([label, value]);
      }
    };

    if (typeof item.CommunityRating === "number") {
      add(
        LocalizationUtils.getLocalizedString("Rating", "Rating"),
        item.CommunityRating.toFixed(1),
      );
    }
    if (typeof item.CriticRating === "number") {
      add(
        LocalizationUtils.getLocalizedString("Critics", "Critics"),
        `${item.CriticRating.toFixed(0)}%`,
      );
    }
    if (typeof item.PremiereDate === "string") {
      const year = new Date(item.PremiereDate).getFullYear();
      if (!Number.isNaN(year)) {
        add(LocalizationUtils.getLocalizedString("Year", "Year"), String(year));
      }
    }

    if (item.ChildCount) {
      const seasonText =
        item.ChildCount <= 1
          ? LocalizationUtils.getLocalizedString("Season", "Season")
          : LocalizationUtils.getLocalizedString(
              "TypeOptionPluralSeason",
              "Seasons",
            );
      add(seasonText, String(item.ChildCount));
    } else if (typeof item.RunTimeTicks === "number" && item.RunTimeTicks > 0) {
      const totalMinutes = Math.round(item.RunTimeTicks / 600000000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      add(
        LocalizationUtils.getLocalizedString("Runtime", "Runtime"),
        hours ? `${hours}h ${minutes}m` : `${minutes}m`,
      );
    }

    if (Array.isArray(item.Genres) && item.Genres.length) {
      add(
        LocalizationUtils.getLocalizedString("Genres", "Genre"),
        item.Genres.slice(0, 2).join(", "),
      );
    }
    if (typeof item.OfficialRating === "string" && item.OfficialRating) {
      add(
        LocalizationUtils.getLocalizedString("ParentalRating", "Rated"),
        item.OfficialRating,
      );
    }

    rows.length = Math.min(rows.length, CONFIG.plateSpecRows);

    rows.forEach(([label, value], index) => {
      const row = SlideUtils.createElement("div", {
        className: index === rows.length - 1 ? "spec-row is-last" : "spec-row",
      });
      row.appendChild(
        SlideUtils.createElement("dt", { className: "spec-label" }, label),
      );
      row.appendChild(
        SlideUtils.createElement("dd", { className: "spec-value" }, value),
      );
      table.appendChild(row);
    });

    for (let i = rows.length; i < CONFIG.plateSpecRows; i++) {
      const filler = SlideUtils.createElement("div", {
        className: "spec-row is-placeholder",
        "aria-hidden": "true",
      });
      filler.appendChild(
        SlideUtils.createElement("dt", { className: "spec-label" }, " "),
      );
      filler.appendChild(
        SlideUtils.createElement("dd", { className: "spec-value" }, " "),
      );
      table.appendChild(filler);
    }

    return table;
  },

  createSpecLine(item) {
    const line = SlideUtils.createElement("div", { className: "spec-line" });

    const parts = [];
    const push = (kind, value, html) => {
      if (value) parts.push([kind, value, Boolean(html)]);
    };

    if (typeof item.PremiereDate === "string") {
      const year = new Date(item.PremiereDate).getFullYear();
      if (!Number.isNaN(year)) push("year", String(year));
    }
    if (typeof item.CommunityRating === "number") {
      push(
        "rating",
        `<span class="material-icons community-rating-star star" aria-hidden="true"></span>` +
          item.CommunityRating.toFixed(1),
        true,
      );
    }
    if (typeof item.CriticRating === "number") {

      const tomato =
        item.CriticRating < 60
          ? CONFIG.IMAGE_SVG.rottenTomato
          : CONFIG.IMAGE_SVG.freshTomato;
      push("critics", `${tomato}${item.CriticRating.toFixed(0)}%`, true);
    }

    if (item.ChildCount) {
      const seasonText =
        item.ChildCount <= 1
          ? LocalizationUtils.getLocalizedString("Season", "Season")
          : LocalizationUtils.getLocalizedString(
              "TypeOptionPluralSeason",
              "Seasons",
            );
      push("runtime", `${item.ChildCount} ${seasonText}`);
    } else if (typeof item.RunTimeTicks === "number" && item.RunTimeTicks > 0) {

      const totalMinutes = Math.round(item.RunTimeTicks / 600000000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      push("runtime", hours ? `${hours}h ${minutes}m` : `${minutes}m`);
    }

    if (Array.isArray(item.Genres) && item.Genres.length) {
      push("genre", item.Genres.slice(0, 2).join(" · "));
    }

    parts.forEach(([kind, text, isHtml]) => {
      const attrs = { className: `spec-item spec-${kind}` };
      if (isHtml) attrs.innerHTML = text;
      line.appendChild(
        SlideUtils.createElement("span", attrs, isHtml ? null : text),
      );
    });

    if (typeof item.OfficialRating === "string" && item.OfficialRating) {
      line.appendChild(
        SlideUtils.createElement(
          "span",
          { className: "spec-cert" },
          item.OfficialRating,
        ),
      );
    }

    return line;
  },

  createRatingInfo(item) {
    const {
      CommunityRating: communityRating,
      CriticRating: criticRating,
      OfficialRating: ageRating,
      PremiereDate: premiereDate,
      RunTimeTicks: runtime,
      ChildCount: seasonCount,
    } = item;

    const miscInfo = SlideUtils.createElement("div", {
      className: "misc-info",
    });

    const fields = [];

    if (typeof communityRating === "number") {
      fields.push(
        SlideUtils.createElement("div", {
          className: "star-rating-container",
          innerHTML: `<span class="material-icons community-rating-star star" aria-hidden="true"></span>${communityRating.toFixed(
            1,
          )}`,
        }),
      );
    }

    if (typeof criticRating === "number") {
      const svgIcon =
        criticRating < 60
          ? CONFIG.IMAGE_SVG.rottenTomato
          : CONFIG.IMAGE_SVG.freshTomato;
      fields.push(
        SlideUtils.createElement("div", {
          className: "critic-rating",
          innerHTML: `${svgIcon}${criticRating.toFixed(0)}%`,
        }),
      );
    }

    if (typeof premiereDate === "string") {
      const year = new Date(premiereDate).getFullYear();
      if (!Number.isNaN(year)) {
        fields.push(
          SlideUtils.createElement(
            "div",
            { className: "date" },
            String(year),
          ),
        );
      }
    }

    if (typeof ageRating === "string" && ageRating) {
      fields.push(
        SlideUtils.createElement(
          "div",
          {
            className: "age-rating mediaInfoOfficialRating",

            "aria-label": `Content rated ${ageRating}`,
            title: `Rating: ${ageRating}`,
          },
          ageRating,
        ),
      );
    }

    if (seasonCount) {
      const seasonText =
        seasonCount <= 1
          ? LocalizationUtils.getLocalizedString("Season", "Season")
          : LocalizationUtils.getLocalizedString(
              "TypeOptionPluralSeason",
              "Seasons",
            );
      fields.push(
        SlideUtils.createElement(
          "div",
          { className: "runTime" },
          `${seasonCount} ${seasonText}`,
        ),
      );
    } else if (typeof runtime === "number" && runtime > 0) {
      const endTime = new Date(Date.now() + runtime / 10000);
      const formattedEndTime = endTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      fields.push(
        SlideUtils.createElement(
          "div",
          { className: "runTime" },
          LocalizationUtils.getLocalizedString(
            "EndsAtValue",
            "Ends at {0}",
            formattedEndTime,
          ),
        ),
      );
    }

    fields.forEach((field, index) => {
      if (index > 0) miscInfo.appendChild(SlideUtils.createSeparator());
      miscInfo.appendChild(field);
    });

    return miscInfo;
  },

  createPlayButton(itemId) {

    const button = SlideUtils.createElement("button", {
      className: "detailButton btnPlay play-button",
      tabIndex: "0",
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        ApiUtils.playItem(itemId);
      },
    });

    button.appendChild(
      SlideUtils.createElement(
        "span",
        { className: "play-text" },
        LocalizationUtils.getLocalizedString("Play", "Play"),
      ),
    );

    return button;
  },

  createDetailButton(itemId) {
    return SlideUtils.createElement("button", {
      className: "detailButton detail-button",
      tabIndex: "0",
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.Emby && window.Emby.Page) {
          Emby.Page.show(
            `/details?id=${itemId}&serverId=${STATE.jellyfinData.serverId}`,
          );
        } else {
          window.location.href = `#/details?id=${itemId}&serverId=${STATE.jellyfinData.serverId}`;
        }
      },
    });
  },

  createFavoriteButton(item) {
    const isFavorite = item.UserData && item.UserData.IsFavorite === true;

    const button = SlideUtils.createElement("button", {
      className: `favorite-button ${isFavorite ? "favorited" : ""}`,
      tabIndex: "0",
      onclick: async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await ApiUtils.toggleFavorite(item.Id, button);
      },
    });

    return button;
  },

  async createSlideForItemId(itemId) {
    try {
      if (STATE.slideshow.createdSlides[itemId]) {
        return document.querySelector(`.slide[data-item-id="${itemId}"]`);
      }

      const container = SlideUtils.getOrCreateSlidesContainer();

      const item = STATE.slideshow.loadedItems[itemId];
      if (!item || !item.Id) {
        console.warn(`Slideshow: no item data for ${itemId}, skipping slide.`);
        return null;
      }

      const slideParts = this.createSlideElement(
        item,
        item.Type === "Movie" ? "Movie" : "TV Show",
      );
      if (!slideParts) return null;

      const { slide, videoId, hasLocalTrailer, trailerContainer } = slideParts;

      container.appendChild(slide);
      STATE.slideshow.createdSlides[itemId] = true;

      STATE.slideshow.slideVideoIds[itemId] = videoId || null;

      if (hasLocalTrailer) {
        const trailerUrl = await ApiUtils.fetchLocalTrailerUrl(itemId);

        if (trailerUrl && document.getElementById(`trailer-${itemId}`)) {
          const video = SlideUtils.createElement("video", {
            className: "local-trailer",
            src: trailerUrl,

            muted: "",
            playsinline: "",
            preload: "metadata",
            disablepictureinpicture: "",
            tabIndex: "-1",
          });
          video.muted = true;

          video.addEventListener("playing", () =>
            SlideshowManager.onTrailerPlaying(itemId, trailerContainer),
          );
          video.addEventListener("ended", () =>
            SlideshowManager.onTrailerEnded(itemId, trailerContainer),
          );
          video.addEventListener("error", () =>
            SlideshowManager.onPlayerError(
              { data: "local" },
              itemId,
              trailerContainer,
            ),
          );

          const host = document.getElementById(`yt-player-${itemId}`);
          host?.replaceChildren(video);
          STATE.slideshow.players[itemId] = createLocalPlayer(video);
          STATE.slideshow.slideVideoIds[itemId] = `local:${itemId}`;
        } else {

          STATE.slideshow.slideVideoIds[itemId] = null;
        }
      } else if (videoId) {
        const startTime = await ApiUtils.getSkipSegments(videoId);

        loadYouTubeAPI().then((YT) => {
          if (!YT) return;
          if (!document.getElementById(`trailer-${itemId}`)) return;

          STATE.slideshow.players[itemId] = new YT.Player(
            `yt-player-${itemId}`,
            {
              videoId: videoId,
              playerVars: {
                autoplay: 0,
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                start: startTime,
              },
              events: {
                onStateChange: (e) =>
                  SlideshowManager.onPlayerStateChange(
                    e,
                    itemId,
                    trailerContainer,
                  ),
                onReady: (e) => e.target.mute(),

                onError: (e) =>
                  SlideshowManager.onPlayerError(e, itemId, trailerContainer),
              },
            },
          );
        });
      }

      return slide;
    } catch (error) {
      console.error("Error creating slide for item:", error, itemId);
      return null;
    }
  },
};

const SlideshowManager = {

  createPaginationDots() {
    const container = SlideUtils.getOrCreateSlidesContainer();

    let dotsContainer = container.querySelector(".dots-container");
    if (!dotsContainer) {
      dotsContainer = SlideUtils.createElement("div", {
        className: "dots-container",
      });
      container.appendChild(dotsContainer);
    }

    dotsContainer.replaceChildren();

    const count = Math.min(STATE.slideshow.totalItems, CONFIG.maxDots);

    dotsContainer.style.display = count > 1 ? "" : "none";

    for (let i = 0; i < count; i++) {
      dotsContainer.appendChild(
        SlideUtils.createElement("span", { className: "dot", "data-index": i }),
      );
    }

    this.updateDots();
  },

  updateDots() {
    const container = SlideUtils.getOrCreateSlidesContainer();
    const dots = container.querySelectorAll(".dot");
    const numDots = dots.length;
    if (!numDots) return;

    const currentIndex = STATE.slideshow.currentSlideIndex;
    const totalItems = STATE.slideshow.totalItems;

    const activeDotIndex =
      totalItems <= numDots
        ? currentIndex
        : Math.min(
            numDots - 1,
            Math.floor((currentIndex / totalItems) * numDots),
          );

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeDotIndex);
    });
  },

  restartProgress(slide) {
    if (!isMarqueeLayout()) return;

    const bar = slide?.querySelector(".spec-progress");
    if (!bar) return;

    bar.style.transition = "none";
    bar.style.width = "0%";
    void bar.offsetWidth;

    const running =
      !STATE.slideshow.isPaused &&
      !STATE.slideshow.hoverHeld &&
      !STATE.slideshow.isVideoPlaying;

    if (!running) return;

    bar.style.transition = `width ${CONFIG.shuffleInterval}ms linear`;
    bar.style.width = "100%";
  },

  setProgressRunning(running) {
    if (!isMarqueeLayout()) return;

    const bar = document.querySelector(".slide.active .spec-progress");
    if (!bar) return;

    if (!running) {

      const current = getComputedStyle(bar).width;
      bar.style.transition = "none";
      bar.style.width = current;
      return;
    }

    const container = bar.parentElement;
    if (!container) return;
    const done = bar.getBoundingClientRect().width;
    const total = container.getBoundingClientRect().width || 1;
    const remaining = Math.max(
      0,
      CONFIG.shuffleInterval * (1 - done / total),
    );
    bar.style.transition = `width ${remaining}ms linear`;
    bar.style.width = "100%";
  },

  repositionChrome() {
    const container = document.getElementById("slides-container");
    if (!container) return;

    const slide =
      container.querySelector(".slide.active") ||
      container.querySelector(".slide");
    if (slide) this.positionDots(slide, container);
  },

  watchContentHeight(container) {
    if (typeof ResizeObserver === "undefined") return;

    const content = container.querySelector(".slide.active .slide-content");
    if (!content) return;

    if (!this.contentObserver) {
      this.contentObserver = new ResizeObserver(() => this.repositionChrome());
    }
    this.contentObserver.disconnect();
    this.contentObserver.observe(content);
  },

  positionDots(slide, container) {
    if (!isPlateLayout() && !isMarqueeLayout()) return;

    const dots = container.querySelector(".dots-container");
    const buttons = slide?.querySelector(".button-container");
    if (!dots || !buttons) return;

    const content = slide?.querySelector(".slide-content");
    const containerTop = container.getBoundingClientRect().top;
    const anchor = Math.max(
      buttons.getBoundingClientRect().bottom,
      content ? content.getBoundingClientRect().bottom : 0,
    );

    const dotsHeight = dots.getBoundingClientRect().height || 6;
    const rows = document.querySelector(".homeSectionsContainer");
    const rowsTop = rows
      ? rows.getBoundingClientRect().top - containerTop
      : Infinity;

    const anchorTop = anchor - containerTop;
    const slack = rowsTop - anchorTop - dotsHeight;
    const gap = Math.max(
      2,
      Math.min(
        Math.round(container.clientHeight * 0.022),
        Number.isFinite(slack) ? Math.floor(slack / 2) : Infinity,
      ),
    );

    const top = Math.round(anchorTop + gap);
    dots.style.top = `${top}px`;
    dots.style.bottom = "auto";

    container.querySelectorAll(".arrow").forEach((arrow) => {
      arrow.style.top = `${top - Math.round(arrow.offsetHeight / 2) + 3}px`;
      arrow.style.bottom = "auto";
      arrow.style.transform = "none";
    });
  },

  toggleMute() {
    STATE.slideshow.isMuted = !STATE.slideshow.isMuted;

    const btnIcon = document.querySelector(".volume-toggle i");
    if (btnIcon)
      btnIcon.textContent = STATE.slideshow.isMuted
        ? "volume_off"
        : "volume_up";

    const currentId =
      STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
    const player = STATE.slideshow.players[currentId];

    if (player && typeof player.setVolume === "function") {
      if (STATE.slideshow.isMuted) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(50);
      }
    }
  },

  async updateCurrentSlide(index) {
    if (STATE.slideshow.isTransitioning) return;

    if (STATE.slideshow.slideInterval) STATE.slideshow.slideInterval.stop();
    this.clearSlideTimers();

    STATE.slideshow.isTransitioning = true;
    const container = SlideUtils.getOrCreateSlidesContainer();
    index = Math.max(0, Math.min(index, STATE.slideshow.totalItems - 1));
    const currentItemId = STATE.slideshow.itemIds[index];

    this.resetTrailerState(currentItemId);

    let currentSlide = document.querySelector(
      `.slide[data-item-id="${currentItemId}"]`,
    );
    if (!currentSlide)
      currentSlide = await SlideCreator.createSlideForItemId(currentItemId);

    if (!currentSlide) {
      console.warn(`Slideshow: could not build slide for ${currentItemId}.`);
      STATE.slideshow.isTransitioning = false;
      STATE.slideshow.currentSlideIndex = index;
      if (!STATE.slideshow.isPaused && STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.restart();
      }
      return;
    }

    const prevVisible = container.querySelector(".slide.active");
    if (prevVisible) prevVisible.classList.remove("active");

    currentSlide.classList.add("active");
    if (!STATE.slideshow.firstSlideShown) {
      STATE.slideshow.firstSlideShown = true;
      mark("first-slide-visible");

      const firstBackdrop = currentSlide.querySelector(".backdrop");
      if (firstBackdrop) {
        if (firstBackdrop.complete) mark("first-backdrop-painted");
        else
          firstBackdrop.addEventListener(
            "load",
            () => mark("first-backdrop-painted"),
            { once: true },
          );
      }
    }
    if (CONFIG.slideAnimationEnabled) {
      currentSlide.querySelector(".backdrop")?.classList.add("animate");
      currentSlide.querySelector(".logo")?.classList.add("animate");
    }

    STATE.slideshow.currentSlideIndex = index;
    this.persistSessionIndex(index);

    if (isPlateLayout()) {
      container.style.setProperty(
        "--plate",
        currentSlide.style.getPropertyValue("--plate") || CONFIG.plateFallback,
      );
      container.style.setProperty(
        "--plate-accent",
        currentSlide.style.getPropertyValue("--plate-accent") ||
          CONFIG.plateAccentFallback,
      );
    }

    this.updateDots();
    this.positionDots(currentSlide, container);
    this.restartProgress(currentSlide);
    PageBackdrop.update(currentItemId);
    this.preloadAdjacentSlides(index);
    this.pruneSlideCache();

    const videoId = STATE.slideshow.slideVideoIds[currentItemId];
    const canPlayTrailer = CONFIG.enableTrailers && Boolean(videoId);

    if (canPlayTrailer) {
      STATE.slideshow.trailerStartTimer = setTimeout(() => {
        this.startTrailer(index, currentItemId, fallbackToTimer);
      }, CONFIG.trailerStartDelayMs);
    } else {
      fallbackToTimer();
    }

    function fallbackToTimer() {
      if (!STATE.slideshow.isPaused && STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.restart();
      }
    }

    const logoImage = currentSlide.querySelector(".logo");
    if (logoImage && !logoImage.complete) {
      logoImage.addEventListener(
        "load",
        () => this.positionDots(currentSlide, container),
        { once: true },
      );
    }

    setTimeout(() => {
      STATE.slideshow.isTransitioning = false;
      this.positionDots(currentSlide, container);
      this.watchContentHeight(container);
      if (prevVisible && CONFIG.slideAnimationEnabled) {
        prevVisible.querySelector(".backdrop")?.classList.remove("animate");
        prevVisible.querySelector(".logo")?.classList.remove("animate");
      }
    }, CONFIG.fadeTransitionDuration);
  },

  startTrailer(index, itemId, resumeTimer) {

    if (STATE.slideshow.currentSlideIndex !== index) return;

    if (STATE.slideshow.isPaused || !VisibilityObserver.wasVisible) {

      return;
    }

    const player = STATE.slideshow.players[itemId];
    if (!player || typeof player.playVideo !== "function") {
      resumeTimer();
      return;
    }

    try {
      if (STATE.slideshow.isMuted) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(CONFIG.trailerVolume);
      }
      player.seekTo(0);
      player.playVideo();
    } catch (error) {
      console.warn("Trailer failed to start:", error);
      resumeTimer();
      return;
    }

    clearTimeout(STATE.slideshow.trailerWatchdog);
    STATE.slideshow.trailerWatchdog = setTimeout(() => {
      if (
        STATE.slideshow.currentSlideIndex === index &&
        !STATE.slideshow.isVideoPlaying
      ) {
        console.warn(
          `Trailer for ${itemId} did not start within ${CONFIG.trailerPlaybackWatchdogMs}ms; resuming slideshow.`,
        );
        resumeTimer();
      }
    }, CONFIG.trailerPlaybackWatchdogMs);
  },

  clearSlideTimers() {
    clearTimeout(STATE.slideshow.trailerStartTimer);
    clearTimeout(STATE.slideshow.trailerWatchdog);
    STATE.slideshow.trailerStartTimer = null;
    STATE.slideshow.trailerWatchdog = null;
  },

  resetTrailerState(keepItemId) {
    STATE.slideshow.isVideoPlaying = false;

    if (keepItemId) {
      const incoming = document.querySelector(
        `.slide[data-item-id="${keepItemId}"]`,
      );
      incoming?.querySelector(".video-container")?.classList.remove("active");
      incoming?.querySelector(".backdrop")?.classList.remove("with-video");
      incoming
        ?.querySelector(".plot-container")
        ?.classList.remove("with-video");
    }

    Object.keys(STATE.slideshow.players).forEach((itemId) => {
      if (itemId === keepItemId) return;
      const player = STATE.slideshow.players[itemId];
      try {
        if (player && typeof player.pauseVideo === "function") {
          player.pauseVideo();
          if (typeof player.seekTo === "function") player.seekTo(0);
        }
      } catch (error) {

      }
    });

    document.querySelectorAll("#slides-container .slide").forEach((slide) => {
      if (slide.getAttribute("data-item-id") === keepItemId) return;
      slide.querySelector(".video-container")?.classList.remove("active");
      slide.querySelector(".backdrop")?.classList.remove("with-video");
      slide.querySelector(".plot-container")?.classList.remove("with-video");
    });
  },

  async preloadAdjacentSlides(currentIndex) {
    const totalItems = STATE.slideshow.totalItems;
    if (!totalItems) return;

    const preloadCount = CONFIG.preloadCount;

    const nextIndex = (currentIndex + 1) % totalItems;
    const itemId = STATE.slideshow.itemIds[nextIndex];

    await SlideCreator.createSlideForItemId(itemId);

    if (preloadCount > 1) {
      const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
      const prevItemId = STATE.slideshow.itemIds[prevIndex];

      SlideCreator.createSlideForItemId(prevItemId);
    }
  },

  nextSlide() {
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const totalItems = STATE.slideshow.totalItems;
    const nextIndex = (currentIndex + 1) % totalItems;
    this.updateCurrentSlide(nextIndex);
  },

  prevSlide() {
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const totalItems = STATE.slideshow.totalItems;

    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;

    this.updateCurrentSlide(prevIndex);
  },

  pruneSlideCache() {
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const totalItems = STATE.slideshow.totalItems;
    const keepRange = 2;

    Object.keys(STATE.slideshow.createdSlides).forEach((itemId) => {
      const index = STATE.slideshow.itemIds.indexOf(itemId);
      if (index === -1) return;

      const linear = Math.abs(index - currentIndex);
      const distance = totalItems
        ? Math.min(linear, totalItems - linear)
        : linear;

      if (distance > keepRange) {
        if (STATE.slideshow.players[itemId]) {
          try {
            if (typeof STATE.slideshow.players[itemId].destroy === "function") {
              STATE.slideshow.players[itemId].destroy();
            }
          } catch (e) {
            console.warn("Error destroying player:", e);
          }
          delete STATE.slideshow.players[itemId];
        }

        const slide = document.querySelector(
          `.slide[data-item-id="${itemId}"]`,
        );
        if (slide) slide.remove();

        delete STATE.slideshow.createdSlides[itemId];
        delete STATE.slideshow.slideVideoIds[itemId];
      }
    });
  },

  togglePause() {
    STATE.slideshow.isPaused = !STATE.slideshow.isPaused;

    const paused = STATE.slideshow.isPaused;

    document
      .getElementById("slides-container")
      ?.classList.toggle("is-paused", paused);

    const currentId =
      STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
    const player = STATE.slideshow.players[currentId];

    if (paused) {
      STATE.slideshow.slideInterval?.pause();
      this.clearSlideTimers();
    } else {
      STATE.slideshow.slideInterval?.resume();
    }
    this.setProgressRunning(!paused);

    const pauseButton = document.querySelector(".pause-button");
    if (pauseButton) {
      const label = paused
        ? LocalizationUtils.getLocalizedString("Play", "Play")
        : LocalizationUtils.getLocalizedString("ButtonPause", "Pause");

      pauseButton.innerHTML = `<i class="material-icons ${
        paused ? "play_arrow" : "pause"
      }"></i>`;
      pauseButton.setAttribute("aria-label", label);
      pauseButton.setAttribute("title", label);
    }

    if (paused) {
      if (player && typeof player.pauseVideo === "function") {
        player.pauseVideo();
      }
    } else if (player && typeof player.playVideo === "function") {
      player.playVideo();
    }
  },

  SESSION_ORDER_KEY: "slideshowpure_order",

  applySessionOrder(items) {

    if (!CONFIG.rememberOrderForSession) {
      return SlideUtils.mixTypesInHead(
        SlideUtils.shuffleArray(items),
        CONFIG.mixTypesInFirst,
      );
    }

    try {
      const stored = JSON.parse(
        sessionStorage.getItem(this.SESSION_ORDER_KEY) || "null",
      );

      if (Array.isArray(stored?.ids) && stored.ids.length) {
        const byId = new Map(items.map((item) => [item.Id, item]));
        const ordered = stored.ids
          .map((id) => byId.get(id))
          .filter(Boolean);

        const known = new Set(ordered.map((item) => item.Id));
        const added = items.filter((item) => !known.has(item.Id));
        const result = ordered.concat(added);

        if (result.length) {
          STATE.slideshow.resumeIndex = Math.min(
            Math.max(0, stored.index || 0),
            result.length - 1,
          );
          this.persistSessionOrder(result, STATE.slideshow.resumeIndex);
          return result;
        }
      }
    } catch (error) {

    }

    const shuffled = SlideUtils.mixTypesInHead(
      SlideUtils.shuffleArray(items),
      CONFIG.mixTypesInFirst,
    );
    this.persistSessionOrder(shuffled, 0);
    return shuffled;
  },

  persistSessionOrder(items, index) {
    if (!CONFIG.rememberOrderForSession) return;
    try {
      sessionStorage.setItem(
        this.SESSION_ORDER_KEY,
        JSON.stringify({ ids: items.map((item) => item.Id), index }),
      );
    } catch (error) {

    }
  },

  persistSessionIndex(index) {
    if (!CONFIG.rememberOrderForSession) return;
    try {
      const stored = JSON.parse(
        sessionStorage.getItem(this.SESSION_ORDER_KEY) || "null",
      );
      if (!stored?.ids) return;
      stored.index = index;
      sessionStorage.setItem(this.SESSION_ORDER_KEY, JSON.stringify(stored));
    } catch (error) {

    }
  },

  initHoverPause() {
    if (!CONFIG.pauseOnHover) return;

    const container = SlideUtils.getOrCreateSlidesContainer();

    container.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch") return;
      STATE.slideshow.hoverHeld = true;

      STATE.slideshow.slideInterval?.pause();
      this.clearSlideTimers();
      this.setProgressRunning(false);
    });

    container.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "touch") return;
      if (!STATE.slideshow.hoverHeld) return;
      STATE.slideshow.hoverHeld = false;

      if (
        !STATE.slideshow.isPaused &&
        !STATE.slideshow.isVideoPlaying &&
        VisibilityObserver.wasVisible
      ) {
        STATE.slideshow.slideInterval?.resume();

        this.setProgressRunning(true);
      }
    });
  },

  initTouchEvents() {
    const container = SlideUtils.getOrCreateSlidesContainer();
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    container.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      },
      { passive: true },
    );
  },

  handleSwipe(startX, endX) {
    const diff = endX - startX;

    if (Math.abs(diff) < CONFIG.minSwipeDistance) {
      return;
    }

    if (diff > 0) {
      this.prevSlide();
    } else {
      this.nextSlide();
    }
  },

  initKeyboardEvents() {
    const container = SlideUtils.getOrCreateSlidesContainer();

    container.setAttribute("tabindex", "-1");
    container.addEventListener("mousedown", () => {
      container.focus({ preventScroll: true });
    });

    document.addEventListener("focusin", (event) => {
      STATE.slideshow.containerFocused = container.contains(event.target);
    });
    document.addEventListener("focusout", (event) => {
      if (!container.contains(event.relatedTarget)) {
        STATE.slideshow.containerFocused = false;
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!STATE.slideshow.containerFocused) return;
      if (!VisibilityObserver.wasVisible) return;

      const active = document.activeElement;
      if (
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable)
      ) {
        return;
      }

      const buttonRow = container.querySelector(".slide.active .button-container");
      const focusedButton =
        buttonRow && buttonRow.contains(active) ? active : null;

      switch (event.key) {
        case "ArrowRight": {
          const next = focusedButton?.nextElementSibling;
          if (next) next.focus();
          else this.nextSlide();
          event.preventDefault();
          break;
        }

        case "ArrowLeft": {
          const previous = focusedButton?.previousElementSibling;
          if (previous) previous.focus();
          else this.prevSlide();
          event.preventDefault();
          break;
        }

        case " ":
          this.togglePause();
          event.preventDefault();
          break;

        case "Enter":

          if (!focusedButton && active === container) {
            container.querySelector(".slide.active .play-button")?.click();
            event.preventDefault();
          }
          break;

        case "Escape":
          container.blur();
          STATE.slideshow.containerFocused = false;
          break;
      }
    });
  },

  setTrailerVisible(itemId, trailerContainer, on) {
    const slide = document.querySelector(`.slide[data-item-id="${itemId}"]`);
    trailerContainer?.classList.toggle("active", on);
    slide?.querySelector(".backdrop")?.classList.toggle("with-video", on);
    slide?.querySelector(".plot-container")?.classList.toggle("with-video", on);
  },

  onTrailerPlaying(itemId, trailerContainer) {

    const currentItemId =
      STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
    if (itemId !== currentItemId) {
      try {
        STATE.slideshow.players[itemId]?.pauseVideo();
      } catch (error) {

      }
      this.setTrailerVisible(itemId, trailerContainer, false);
      return;
    }

    clearTimeout(STATE.slideshow.trailerWatchdog);
    STATE.slideshow.trailerWatchdog = null;

    STATE.slideshow.isVideoPlaying = true;
    this.setTrailerVisible(itemId, trailerContainer, true);
    STATE.slideshow.slideInterval?.stop();
  },

  onTrailerEnded(itemId, trailerContainer) {
    STATE.slideshow.isVideoPlaying = false;
    this.setTrailerVisible(itemId, trailerContainer, false);
    this.nextSlide();
  },

  onPlayerStateChange(event, itemId, trailerContainer) {
    if (!document.querySelector(`.slide[data-item-id="${itemId}"]`)) return;

    const YTRef = window.YT;
    if (!YTRef || !YTRef.PlayerState) return;

    if (event.data === YTRef.PlayerState.PLAYING) {
      this.onTrailerPlaying(itemId, trailerContainer);
    } else if (event.data === YTRef.PlayerState.ENDED) {
      this.onTrailerEnded(itemId, trailerContainer);
    } else if (
      event.data === YTRef.PlayerState.PAUSED ||
      event.data === YTRef.PlayerState.CUED
    ) {
      STATE.slideshow.isVideoPlaying = false;
    }
  },

  onPlayerError(event, itemId, trailerContainer) {
    console.warn(
      `Trailer for ${itemId} failed with YouTube error ${event?.data}; continuing without it.`,
    );

    clearTimeout(STATE.slideshow.trailerWatchdog);
    STATE.slideshow.trailerWatchdog = null;
    STATE.slideshow.isVideoPlaying = false;

    const slide = document.querySelector(`.slide[data-item-id="${itemId}"]`);
    trailerContainer?.classList.remove("active");
    slide?.querySelector(".backdrop")?.classList.remove("with-video");
    slide?.querySelector(".plot-container")?.classList.remove("with-video");

    STATE.slideshow.slideVideoIds[itemId] = null;

    if (!STATE.slideshow.isPaused && STATE.slideshow.slideInterval) {
      STATE.slideshow.slideInterval.restart();
    }
  },

  async loadSlideshowData() {
    try {
      STATE.slideshow.isLoading = true;

      mark("items-fetch-start");

      const listed = await ApiUtils.fetchListEntries();
      let items =
        listed.ids.length || listed.filters.length
          ? await ApiUtils.fetchListedItems(listed)
          : await ApiUtils.fetchItemsFromServer();

      if (!items.length && (listed.ids.length || listed.filters.length)) {
        console.warn(
          "Slideshow: list.txt matched no items; using library items.",
        );
        items = await ApiUtils.fetchItemsFromServer();
      }
      mark("items-fetched");

      items = this.applySessionOrder(items);

      STATE.slideshow.loadedItems = {};
      items.forEach((item) => {
        STATE.slideshow.loadedItems[item.Id] = item;
      });

      const itemIds = items.map((item) => item.Id);
      STATE.slideshow.itemIds = itemIds;
      STATE.slideshow.totalItems = itemIds.length;

      if (!itemIds.length) {
        console.warn(
          "Slideshow: no items with a Logo image were returned; nothing to show.",
        );
        SlideUtils.getOrCreateSlidesContainer().style.display = "none";
        return;
      }

      this.createPaginationDots();

      STATE.slideshow.slideInterval = new SlideTimer(() => {
        if (
          !STATE.slideshow.isPaused &&
          !STATE.slideshow.isVideoPlaying &&
          VisibilityObserver.wasVisible
        ) {
          this.nextSlide();
        }
      }, CONFIG.shuffleInterval);
      STATE.slideshow.slideInterval.stop();
      STATE.slideshow.slideInterval = null; // Ensure that updateCurrentSlide doesn't restart the timer

      await this.updateCurrentSlide(STATE.slideshow.resumeIndex || 0);
    } catch (error) {
      console.error("Error loading slideshow data:", error);
    } finally {
      STATE.slideshow.isLoading = false;
    }
  },
};

const LayoutSync = {
  attached: false,
  published: {},

  publish(name, value) {
    if (this.published[name] === value) return false;
    this.published[name] = value;
    document.documentElement.style.setProperty(name, value);
    return true;
  },

  update() {
    const page = document.querySelector(".page");
    if (!page) return;

    const offset = Math.max(
      0,
      Math.round(
        page.getBoundingClientRect().top + document.scrollingElement.scrollTop,
      ),
    );

    let moved = this.publish("--slideshow-page-offset", `${offset}px`);

    const rows = document.querySelector(".homeSectionsContainer");
    const stage = document.getElementById("slides-container");
    if (rows && stage) {
      const rowsTop = Math.round(
        rows.getBoundingClientRect().top - stage.getBoundingClientRect().top,
      );
      if (rowsTop > 0) {
        moved = this.publish("--slideshow-rows-top", `${rowsTop}px`) || moved;
      }
    }

    if (moved) SlideshowManager.repositionChrome();
  },

  init() {
    this.update();
    if (this.attached) return;
    this.attached = true;

    window.addEventListener("resize", () => this.update(), { passive: true });
    window.addEventListener("hashchange", () => this.update());

    document.fonts?.ready?.then(() => this.update()).catch(() => {});

    const ready = () =>
      document.querySelector(".page") &&
      document.querySelector(".homeSectionsContainer");

    if (ready()) {
      this.observeRows();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!ready()) return;
      this.update();
      this.observeRows();
      observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 30000);
  },

  observeRows() {
    if (this.rowsObserver || typeof ResizeObserver === "undefined") return;

    const rows = document.querySelector(".homeSectionsContainer");
    if (!rows) return;

    this.rowsObserver = new ResizeObserver(() => this.update());
    this.rowsObserver.observe(rows);

    const page = document.querySelector(".page");
    if (page) this.rowsObserver.observe(page);
  },
};

const SettingsPanel = {
  element: null,
  controls: new Map(),
  isOpen: false,
  pausedByPanel: false,

  FIELDS: [
    {
      key: "layout",
      label: "Layout",
      type: "choice",
      options: [
        ["plate", "Plate"],
        ["marquee", "Marquee"],
        ["classic", "Classic"],
      ],
    },
    {

      key: "contentMode",
      label: "Display",
      type: "choice",
      locks: ["maxMovies", "maxSeries"],
      options: [
        ["all", "Everything"],
        ["movies", "Movies"],
        ["series", "TV shows"],
        ["even", "Even mix"],
      ],
      read: () => {
        const movies = CONFIG.maxMovies;
        const series = CONFIG.maxSeries;
        if (!movies && !series) return "all";
        if (movies && !series) return "movies";
        if (!movies && series) return "series";

        return "even";
      },
      write: (value) => {
        const total = CONFIG.maxItems;
        const half = Math.max(1, Math.round(total / 2));
        if (value === "movies") return { maxMovies: total, maxSeries: 0 };
        if (value === "series") return { maxMovies: 0, maxSeries: total };
        if (value === "even") return { maxMovies: half, maxSeries: half };
        return { maxMovies: 0, maxSeries: 0 };
      },
    },
    {

      key: "libraries",
      label: "Libraries",
      type: "multichoice",
    },
    {
      key: "shuffleInterval",
      label: "Slide duration",
      type: "range",
      min: 3000,
      max: 60000,
      step: 1000,
      format: (value) => `${Math.round(value / 1000)}s`,
    },
    { key: "slideAnimationEnabled", label: "Motion effects", type: "switch" },

    { key: "syncPageBackdrop", label: "Sync page backdrop", type: "switch" },
    { key: "pauseOnHover", label: "Pause on hover", type: "switch" },
    { key: "enableTrailers", label: "Trailers", type: "switch" },

    {
      key: "allowTrailersOnTouch",
      label: "Trailers on phones",
      type: "switch",
    },
    {
      key: "trailerVolume",
      label: "Trailer volume",
      type: "range",
      min: 0,
      max: 100,
      step: 5,
      format: (value) => `${value}%`,
    },
    {
      key: "trailerLibraries",
      label: "Trailers from",
      type: "multichoice",
    },
    {
      key: "rememberOrderForSession",
      label: "Resume where I left off",
      type: "switch",
    },
    { key: "respectDataSaver", label: "Respect data saver", type: "switch" },
  ],

  build() {
    if (this.element) return this.element;

    const panel = SlideUtils.createElement("div", {
      className: "ss-settings",
      role: "dialog",
      "aria-label": "Slideshow settings",
      "aria-hidden": "true",
    });

    const header = SlideUtils.createElement("div", {
      className: "ss-settings-head",
      innerHTML: "<h2>Slideshow</h2>",
    });
    header.append(
      SlideUtils.createElement("button", {
        className: "ss-settings-close",
        type: "button",
        innerHTML: '<i class="material-icons">close</i>',
        "aria-label": "Close settings",
        onclick: () => this.close(),
      }),
    );
    panel.append(header);

    const body = SlideUtils.createElement("div", { className: "ss-settings-body" });
    this.FIELDS.forEach((field) => body.append(this.buildRow(field)));
    panel.append(body);

    const footer = SlideUtils.createElement("div", { className: "ss-settings-foot" });
    footer.append(
      SlideUtils.createElement("button", {
        className: "ss-settings-reset",
        type: "button",
        textContent: "Reset to server defaults",
        onclick: () => this.reset(),
      }),
    );
    panel.append(footer);

    panel.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.key === "Escape") this.close();
    });

    document.body.append(panel);
    this.element = panel;
    return panel;
  },

  buildRow(field) {
    const locked = (field.locks || [field.key]).some((key) =>
      lockedConfigKeys.has(key),
    );
    const row = SlideUtils.createElement("div", {
      className: `ss-set-row${locked ? " is-locked" : ""}`,
    });
    const label = SlideUtils.createElement("span", {
      className: "ss-set-label",
      textContent: field.label,
    });
    row.append(label);

    if (field.type === "switch") {
      const input = SlideUtils.createElement("input", {
        type: "checkbox",
        className: "ss-switch",
        disabled: locked,
        onchange: (event) => this.commit(field.key, event.target.checked),
      });
      row.append(input);
      this.controls.set(field.key, input);
    }

    if (field.type === "range") {
      const readout = SlideUtils.createElement("span", {
        className: "ss-set-value",
      });
      const input = SlideUtils.createElement("input", {
        type: "range",
        className: "ss-range",
        min: String(field.min),
        max: String(field.max),
        step: String(field.step),
        disabled: locked,

        oninput: (event) => {
          readout.textContent = field.format(Number(event.target.value));
        },
        onchange: (event) => this.commit(field.key, Number(event.target.value)),
      });
      row.append(readout, input);
      this.controls.set(field.key, input);
      input.dataset.readout = "1";
      input._readout = readout;
      input._format = field.format;
    }

    if (field.type === "choice") {
      const group = SlideUtils.createElement("div", { className: "ss-choice" });
      const buttons = field.options.map(([value, text]) => {
        const button = SlideUtils.createElement("button", {
          className: "ss-choice-btn",
          type: "button",
          textContent: text,
          disabled: locked,
          onclick: () => this.commit(field.key, value),
        });
        button.dataset.value = value;
        group.append(button);
        return button;
      });
      row.classList.add("is-stacked");
      row.append(group);
      this.controls.set(field.key, { group, buttons });
    }

    if (field.type === "multichoice") {
      const group = SlideUtils.createElement("div", { className: "ss-multi" });
      const boxes = new Map();
      row.classList.add("is-stacked");
      row.append(group);
      this.controls.set(field.key, { group, boxes });

      this.populateMultichoice(field, group, boxes, locked);
    }

    if (locked) {
      row.append(
        SlideUtils.createElement("span", {
          className: "ss-set-note",
          textContent: "Set by your server administrator",
        }),
      );
    }
    return row;
  },

  async populateMultichoice(field, group, boxes, locked) {
    if (boxes.size) return;

    const views = await ApiUtils.fetchViews();

    if (!views.length) {
      group.append(
        SlideUtils.createElement("span", {
          className: "ss-set-note",
          textContent: "Could not read your libraries.",
        }),
      );
      return;
    }

    views.forEach((view) => {
      const item = SlideUtils.createElement("label", {
        className: "ss-multi-item",
      });
      const input = SlideUtils.createElement("input", {
        type: "checkbox",
        className: "ss-multi-box",
        disabled: locked,
        onchange: () => this.commitMultichoice(field.key),
      });
      item.append(
        input,
        SlideUtils.createElement("span", { textContent: view.Name }),
      );
      group.append(item);
      boxes.set(view.Name, input);
    });

    this.sync();
  },

  commitMultichoice(key) {
    const control = this.controls.get(key);
    const names = [...control.boxes]
      .filter(([, input]) => input.checked)
      .map(([name]) => name);

    if (!names.length) {
      this.sync();
      return;
    }

    this.commit(key, names.length === control.boxes.size ? [] : names);
  },

  commit(key, value) {
    const field = this.FIELDS.find((entry) => entry.key === key);
    setConfig(field?.write ? field.write(value) : { [key]: value });

    this.sync();
  },

  sync() {
    this.controls.forEach((control, key) => {
      const field = this.FIELDS.find((entry) => entry.key === key);
      const value = field?.read ? field.read() : CONFIG[key];

      if (control instanceof HTMLInputElement) {
        if (control.type === "checkbox") {
          control.checked = Boolean(value);
        } else {
          control.value = String(value);
          if (control._readout) {
            control._readout.textContent = control._format(Number(value));
          }
        }
        return;
      }

      if (control.boxes) {
        const chosen = new Set((value || []).map(String));
        control.boxes.forEach((input, name) => {
          input.checked = chosen.size === 0 || chosen.has(name);
        });
        return;
      }

      control.buttons.forEach((button) => {
        const active = button.dataset.value === String(value);
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
    });

    const volume = this.controls.get("trailerVolume");
    if (volume instanceof HTMLInputElement) {
      const off = !CONFIG.enableTrailers;
      volume.disabled = off || lockedConfigKeys.has("trailerVolume");
      volume.closest(".ss-set-row")?.classList.toggle("is-inactive", off);
    }

    const trailerLibs = this.controls.get("trailerLibraries");
    if (trailerLibs?.boxes) {
      const off = !CONFIG.enableTrailers;
      const locked = lockedConfigKeys.has("trailerLibraries");
      trailerLibs.boxes.forEach((input) => {
        input.disabled = off || locked;
      });
      trailerLibs.group
        .closest(".ss-set-row")
        ?.classList.toggle("is-inactive", off);
    }
  },

  reset() {
    clearStoredConfig();
    applyConfig(CONFIG_SERVER_DEFAULTS, { trusted: true, label: "reset" });
    resetSlideshowState();
    bootstrap();
    this.sync();
  },

  open() {
    this.build();
    this.sync();
    this.isOpen = true;
    this.element.classList.add("is-open");

    document
      .getElementById("slides-container")
      ?.classList.add("settings-open");
    this.element.setAttribute("aria-hidden", "false");

    if (!STATE.slideshow.isPaused) {
      STATE.slideshow.slideInterval?.pause();
      this.pausedByPanel = true;
    }

    this.element.querySelector(".ss-settings-close")?.focus();
    document.addEventListener("pointerdown", this.onOutsidePointer, true);
  },

  close() {
    if (!this.element) return;
    this.isOpen = false;
    this.element.classList.remove("is-open");
    document
      .getElementById("slides-container")
      ?.classList.remove("settings-open");
    this.element.setAttribute("aria-hidden", "true");

    if (this.pausedByPanel) {
      if (!STATE.slideshow.isPaused) STATE.slideshow.slideInterval?.resume();
      this.pausedByPanel = false;
    }
    document.removeEventListener("pointerdown", this.onOutsidePointer, true);
    document.querySelector(".ss-settings-toggle")?.focus();
  },

  toggle() {
    this.isOpen ? this.close() : this.open();
  },

  onOutsidePointer: (event) => {
    const panel = SettingsPanel.element;
    if (!panel || !SettingsPanel.isOpen) return;
    if (panel.contains(event.target)) return;
    if (event.target.closest?.(".ss-settings-toggle")) return;
    SettingsPanel.close();
  },
};

const initArrowNavigation = () => {
  const container = SlideUtils.getOrCreateSlidesContainer();

  const leftArrow = SlideUtils.createElement("div", {
    className: "arrow left-arrow",
    innerHTML: '<i class="material-icons chevron_left"></i>',
    role: "button",
    tabIndex: "0",
    "aria-label": LocalizationUtils.getLocalizedString("Previous", "Previous"),
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.prevSlide();
    },
  });

  const rightArrow = SlideUtils.createElement("div", {
    className: "arrow right-arrow",
    innerHTML: '<i class="material-icons chevron_right"></i>',
    role: "button",
    tabIndex: "0",
    "aria-label": LocalizationUtils.getLocalizedString("Next", "Next"),
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.nextSlide();
    },
  });

  const volumeBtn = SlideUtils.createElement("div", {
    className: "volume-toggle ss-chrome",
    innerHTML: '<i class="material-icons">volume_off</i>',
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.toggleMute();
    },
  });

  const pauseButton = SlideUtils.createElement("div", {
    className: "pause-button ss-chrome",
    innerHTML: '<i class="material-icons">pause</i>',
    tabIndex: "0",
    "aria-label": LocalizationUtils.getLocalizedString("ButtonPause", "Pause"),
    title: LocalizationUtils.getLocalizedString("ButtonPause", "Pause"),
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.togglePause();
    },
  });

  const settingsBtn = SlideUtils.createElement("div", {
    className: "ss-settings-toggle ss-chrome",
    innerHTML: '<i class="material-icons">settings</i>',
    role: "button",
    tabIndex: "0",
    "aria-label": "Slideshow settings",
    title: "Slideshow settings",
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SettingsPanel.toggle();
    },
    onkeydown: (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      e.stopPropagation();
      SettingsPanel.toggle();
    },
  });

  container.append(leftArrow, rightArrow, volumeBtn, pauseButton, settingsBtn);
};

const isTouchLayout = () =>
  window.matchMedia(`(max-width: ${CONFIG.touchLayoutMaxWidth}px)`).matches;

const isPlateLayout = () => CONFIG.layout === "plate";

const isMarqueeLayout = () => CONFIG.layout === "marquee";

const slidesInit = async () => {
  if (STATE.slideshow.hasInitialized) {
    console.log("⚠️ Slideshow already initialized, skipping");
    return;
  }
  STATE.slideshow.hasInitialized = true;

  try {
    console.log("🌟 Initializing Enhanced Jellyfin Slideshow");

    await SlideshowManager.loadSlideshowData();

    LayoutSync.init();

    SlideshowManager.initTouchEvents();
    SlideshowManager.initHoverPause();
    initArrowNavigation();

    if (!STATE.slideshow.listenersAttached) {
      STATE.slideshow.listenersAttached = true;
      SlideshowManager.initKeyboardEvents();
      initPageVisibilityHandler();
      VisibilityObserver.init();
    } else {
      VisibilityObserver.updateVisibility();
    }

    console.log("✅ Enhanced Jellyfin Slideshow initialized successfully");
  } catch (error) {
    console.error("Error initializing slideshow:", error);
    STATE.slideshow.hasInitialized = false;
  }
};

const initPageVisibilityHandler = () => {
  let wasVideoPlayingBeforeHide = false;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      console.log("Tab inactive - pausing slideshow and videos");
      wasVideoPlayingBeforeHide = STATE.slideshow.isVideoPlaying;
      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.stop();
      }
      const currentItemId =
        STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
      if (currentItemId && STATE.slideshow.players[currentItemId]) {
        const player = STATE.slideshow.players[currentItemId];
        if (typeof player.pauseVideo === "function") {
          try {
            player.pauseVideo();
            STATE.slideshow.isVideoPlaying = false;
          } catch (e) {
            console.warn("Error pausing video on tab hide:", e);
          }
        }
      }
    } else {
      console.log("Tab active - resuming slideshow");
      if (!STATE.slideshow.isPaused && VisibilityObserver.wasVisible) {
        const currentItemId =
          STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
        if (
          wasVideoPlayingBeforeHide &&
          currentItemId &&
          STATE.slideshow.players[currentItemId]
        ) {
          const player = STATE.slideshow.players[currentItemId];
          if (typeof player.playVideo === "function") {
            try {
              player.playVideo();
              STATE.slideshow.isVideoPlaying = true;
            } catch (e) {
              console.warn("Error resuming video on tab show:", e);
              if (STATE.slideshow.slideInterval) {
                STATE.slideshow.slideInterval.start();
              }
            }
          }
        } else {
          if (STATE.slideshow.slideInterval) {
            STATE.slideshow.slideInterval.start();
          }
        }
        wasVideoPlayingBeforeHide = false;
      }
    }
  });
};

window.slideshowPure = {
  CONFIG,
  STATE,
  SlideUtils,
  ApiUtils,
  BlurHash,
  SlideCreator,
  SlideshowManager,
  VisibilityObserver,
  PageBackdrop,
  initSlideshowData: () => {
    SlideshowManager.loadSlideshowData();
  },
  nextSlide: () => {
    SlideshowManager.nextSlide();
  },
  prevSlide: () => {
    SlideshowManager.prevSlide();
  },

  reset: () => resetSlideshowState(),
  bootstrap: () => bootstrap(),

  setConfig,
  clearConfig: clearStoredConfig,
  applyConfig,
  configRules: CONFIG_RULES,
  settings: SettingsPanel,
};
