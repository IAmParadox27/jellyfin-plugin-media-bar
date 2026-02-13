/*
 * Jellyfin Slideshow by M0RPH3US v4.0.4
 */

//Core Module Configuration
const CONFIG = {
  IMAGE_SVG: {
    freshTomato:
      '<svg id="svg3390" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 138.75 141.25" width="18" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><metadata id="metadata3396"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><g id="layer1" fill="#f93208"><path id="path3412" d="m20.154 40.829c-28.149 27.622-13.657 61.011-5.734 71.931 35.254 41.954 92.792 25.339 111.89-5.9071 4.7608-8.2027 22.554-53.467-23.976-78.009z"/><path id="path3471" d="m39.613 39.265 4.7778-8.8607 28.406-5.0384 11.119 9.2082z"/></g><g id="layer2"><path id="path3437" d="m39.436 8.5696 8.9682-5.2826 6.7569 15.479c3.7925-6.3226 13.79-16.316 24.939-4.6684-4.7281 1.2636-7.5161 3.8553-7.7397 8.4768 15.145-4.1697 31.343 3.2127 33.539 9.0911-10.951-4.314-27.695 10.377-41.771 2.334 0.009 15.045-12.617 16.636-19.902 17.076 2.077-4.996 5.591-9.994 1.474-14.987-7.618 8.171-13.874 10.668-33.17 4.668 4.876-1.679 14.843-11.39 24.448-11.425-6.775-2.467-12.29-2.087-17.814-1.475 2.917-3.961 12.149-15.197 28.625-8.476z" fill="#02902e"/></g></svg>',
    rottenTomato:
      '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 145 140" width="20" height="18"><path fill="#0fc755" d="M47.4 35.342c-13.607-7.935-12.32-25.203 2.097-31.88 26.124-6.531 29.117 13.78 22.652 30.412-6.542 24.11 18.095 23.662 19.925 10.067 3.605-18.412 19.394-26.695 31.67-16.359 12.598 12.135 7.074 36.581-17.827 34.187-16.03-1.545-19.552 19.585.839 21.183 32.228 1.915 42.49 22.167 31.04 35.865-15.993 15.15-37.691-4.439-45.512-19.505-6.8-9.307-17.321.11-13.423 6.502 12.983 19.465 2.923 31.229-10.906 30.62-13.37-.85-20.96-9.06-13.214-29.15 3.897-12.481-8.595-15.386-16.57-5.45-11.707 19.61-28.865 13.68-33.976 4.19-3.243-7.621-2.921-25.846 24.119-23.696 16.688 4.137 11.776-12.561-.63-13.633-9.245-.443-30.501-7.304-22.86-24.54 7.34-11.056 24.958-11.768 33.348 6.293 3.037 4.232 8.361 11.042 18.037 5.033 3.51-5.197 1.21-13.9-8.809-20.135z"/></svg>',
  },
  shuffleInterval: 12000,
  retryInterval: 500,
  minSwipeDistance: 50,
  loadingCheckInterval: 100,
  maxPlotLength: 360,
  maxMovies: 15,
  maxTvShows: 15,
  maxItems: 500,
  preloadCount: 3,
  fadeTransitionDuration: 500,
  slideAnimationEnabled: true,
  enableTrailers: true,
};

// State management
const STATE = {
  jellyfinData: {
    userId: null,
    appName: null,
    appVersion: null,
    deviceName: null,
    deviceId: null,
    accessToken: null,
    serverAddress: null,
  },
  slideshow: {
    hasInitialized: false,
    isTransitioning: false,
    isPaused: false,
    currentSlideIndex: 0,
    focusedSlide: null,
    containerFocused: false,
    slideInterval: null,
    itemIds: [],
    loadedItems: {},
    createdSlides: {},
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
    window.onYouTubeIframeAPIReady = () => resolve(window.YT);
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  });
  return STATE.slideshow.ytPromise;
};

// Request throttling system
const requestQueue = [];
let isProcessingQueue = false;

/**
 * Process the next request in the queue with throttling
 */
const processNextRequest = () => {
  if (requestQueue.length === 0) {
    isProcessingQueue = false;
    return;
  }

  isProcessingQueue = true;
  const { url, callback } = requestQueue.shift();

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`Failed to fetch: ${response.status}`);
    })
    .then(callback)
    .catch((error) => {
      console.error("Error in throttled request:", error);
    })
    .finally(() => {
      setTimeout(processNextRequest, 100);
    });
};

/**
 * Add a request to the throttled queue
 * @param {string} url - URL to fetch
 * @param {Function} callback - Callback to run on successful fetch
 */
const addThrottledRequest = (url, callback) => {
  requestQueue.push({ url, callback });
  if (!isProcessingQueue) {
    processNextRequest();
  }
};

/**
 * Checks if the user is currently logged in
 * @returns {boolean} True if logged in, false otherwise
 */

const isUserLoggedIn = () => {
  try {
    return (
      window.ApiClient &&
      window.ApiClient._currentUser &&
      window.ApiClient._currentUser.Id &&
      window.ApiClient._serverInfo &&
      window.ApiClient._serverInfo.AccessToken
    );
  } catch (error) {
    console.error("Error checking login status:", error);
    return false;
  }
};

/**
 * Initializes Jellyfin data from ApiClient
 * @param {Function} callback - Function to call once data is initialized
 */
const initJellyfinData = (callback) => {
  if (!window.ApiClient) {
    console.warn("⏳ window.ApiClient is not available yet. Retrying...");
    setTimeout(() => initJellyfinData(callback), CONFIG.retryInterval);
    return;
  }

  try {
    const apiClient = window.ApiClient;
    STATE.jellyfinData = {
      userId: apiClient.getCurrentUserId() || "Not Found",
      appName: apiClient._appName || "Not Found",
      appVersion: apiClient._appVersion || "Not Found",
      deviceName: apiClient._deviceName || "Not Found",
      deviceId: apiClient._deviceId || "Not Found",
      accessToken: apiClient._serverInfo.AccessToken || "Not Found",
      serverId: apiClient._serverInfo.Id || "Not Found",
      serverAddress: apiClient._serverAddress || "Not Found",
    };
    if (callback && typeof callback === "function") {
      callback();
    }
  } catch (error) {
    console.error("Error initializing Jellyfin data:", error);
    setTimeout(() => initJellyfinData(callback), CONFIG.retryInterval);
  }
};

/**
 * Initializes localization by loading translation chunks
 */
const initLocalization = async () => {
  try {
    const locale = await LocalizationUtils.getCurrentLocale();
    await LocalizationUtils.loadTranslations(locale);
    console.log("✅ Localization initialized");
  } catch (error) {
    console.error("Error initializing localization:", error);
  }
};

/**
 * Creates and displays loading screen
 */

const initLoadingScreen = () => {
  const currentPath = window.location.href.toLowerCase();
  const isHomePage =
    currentPath.includes("/web/#/home.html") ||
    currentPath.includes("/web/#/home") ||
    currentPath.includes("/web/index.html#/home.html") ||
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

  const finishLoading = () => {
    clearInterval(progressInterval);
    clearInterval(checkInterval);
    progressBar.style.transition = "width 300ms ease-in-out";
    progressBar.style.width = "100%";
    unfilledBar.style.width = "0%";

    progressBar.addEventListener("transitionend", () => {
      requestAnimationFrame(() => {
        const loader = document.querySelector(".bar-loading");
        if (loader) {
          loader.style.opacity = "0";
          setTimeout(() => {
            loader.remove();
          }, 300);
        }
      });
    });
  };
};

/**
 * Resets the slideshow state completely
 */
const resetSlideshowState = () => {
  console.log("🔄 Resetting slideshow state...");

  if (STATE.slideshow.slideInterval) {
    STATE.slideshow.slideInterval.stop();
  }

  const container = document.getElementById("slides-container");
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  STATE.slideshow.hasInitialized = false;
  STATE.slideshow.isTransitioning = false;
  STATE.slideshow.isPaused = false;
  STATE.slideshow.currentSlideIndex = 0;
  STATE.slideshow.focusedSlide = null;
  STATE.slideshow.containerFocused = false;
  STATE.slideshow.slideInterval = null;
  STATE.slideshow.itemIds = [];
  STATE.slideshow.loadedItems = {};
  STATE.slideshow.createdSlides = {};
  STATE.slideshow.totalItems = 0;
  STATE.slideshow.isLoading = false;
};

/**
 * Watches for login status changes
 */
const startLoginStatusWatcher = () => {
  let wasLoggedIn = false;

  setInterval(() => {
    const isLoggedIn = isUserLoggedIn();

    if (isLoggedIn !== wasLoggedIn) {
      if (isLoggedIn) {
        console.log("👤 User logged in. Initializing slideshow...");
        if (!STATE.slideshow.hasInitialized) {
          waitForApiClientAndInitialize();
        } else {
          console.log("🔄 Slideshow already initialized, skipping");
        }
      } else {
        console.log("👋 User logged out. Stopping slideshow...");
        resetSlideshowState();
      }
      wasLoggedIn = isLoggedIn;
    }
  }, 2000);
};

/**
 * Wait for ApiClient to initialize before starting the slideshow
 */
const waitForApiClientAndInitialize = () => {
  if (window.slideshowCheckInterval) {
    clearInterval(window.slideshowCheckInterval);
  }

  window.slideshowCheckInterval = setInterval(() => {
    if (!window.ApiClient) {
      console.log("⏳ ApiClient not available yet. Waiting...");
      return;
    }

    if (
      window.ApiClient._currentUser &&
      window.ApiClient._currentUser.Id &&
      window.ApiClient._serverInfo &&
      window.ApiClient._serverInfo.AccessToken
    ) {
      console.log(
        "🔓 User is fully logged in. Starting slideshow initialization...",
      );
      clearInterval(window.slideshowCheckInterval);

      if (!STATE.slideshow.hasInitialized) {
        initJellyfinData(async () => {
          console.log("✅ Jellyfin API client initialized successfully");
          await initLocalization();
          await loadYouTubeAPI();
          slidesInit();
        });
      } else {
        console.log("🔄 Slideshow already initialized, skipping");
      }
    } else {
      console.log(
        "🔒 Authentication incomplete. Waiting for complete login...",
      );
    }
  }, CONFIG.retryInterval);
};

waitForApiClientAndInitialize();

/**
 * Utility functions for slide creation and management
 */
const SlideUtils = {
  /**
   * Shuffles array elements randomly
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array
   */
  shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  /**
   * Truncates text to specified length and adds ellipsis
   * @param {HTMLElement} element - Element containing text to truncate
   * @param {number} maxLength - Maximum length before truncation
   */
  truncateText(element, maxLength) {
    if (!element) return;

    const text = element.innerText || element.textContent;
    if (text && text.length > maxLength) {
      element.innerText = text.substring(0, maxLength) + "...";
    }
  },

  /**
   * Creates a separator icon element
   * @returns {HTMLElement} Separator element
   */
  createSeparator() {
    const separator = document.createElement("i");
    separator.className = "material-icons fiber_manual_record separator-icon"; //material-icons radio_button_off
    return separator;
  },

  /**
   * Creates a DOM element with attributes and properties
   * @param {string} tag - Element tag name
   * @param {Object} attributes - Element attributes
   * @param {string|HTMLElement} [content] - Element content
   * @returns {HTMLElement} Created element
   */
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
      } else if (key === "onclick" && typeof value === "function") {
        element.addEventListener("click", value);
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

  /**
   * Find or create the slides container
   * @returns {HTMLElement} Slides container element
   */
  getOrCreateSlidesContainer() {
    let container = document.getElementById("slides-container");
    if (!container) {
      container = this.createElement("div", { id: "slides-container" });
      document.body.appendChild(container);
    }
    return container;
  },

  /**
   * Formats genres into a readable string
   * @param {Array} genresArray - Array of genre strings
   * @returns {string} Formatted genres string
   */
  parseGenres(genresArray) {
    if (Array.isArray(genresArray) && genresArray.length > 0) {
      return genresArray.slice(0, 3).join(this.createSeparator().outerHTML);
    }
    return "No Genre Available";
  },

  /**
   * Creates a loading indicator
   * @returns {HTMLElement} Loading indicator element
   */
  createLoadingIndicator() {
    const loadingIndicator = this.createElement("div", {
      className: "slide-loading-indicator",
      innerHTML: `
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      `,
    });
    return loadingIndicator;
  },
};

/**
 * Localization utilities for fetching and using Jellyfin translations
 */
const LocalizationUtils = {
  translations: {},
  locale: null,
  isLoading: {},
  cachedLocale: null,
  chunkUrlCache: {},

  /**
   * Gets the current locale from user preference, server config, or HTML tag
   * @returns {Promise<string>} Locale code (e.g., "de", "en-us")
   */
  async getCurrentLocale() {
    if (this.cachedLocale) {
      return this.cachedLocale;
    }

    let locale = null;

    if (window.ApiClient && STATE.jellyfinData?.accessToken) {
      try {
        const userData = window.ApiClient.getCurrentUser();
        if (userData.Configuration?.AudioLanguagePreference) {
          locale = userData.Configuration.AudioLanguagePreference.toLowerCase();
        }
      } catch (error) {
        console.warn("Could not fetch user language preference:", error);
      }
    }

    if (!locale && window.ApiClient && STATE.jellyfinData?.accessToken) {
      try {
        const configUrl = window.ApiClient.getUrl("System/Configuration");
        const configResponse = await fetch(configUrl, {
          headers: ApiUtils.getAuthHeaders(),
        });
        if (configResponse.ok) {
          const configData = await configResponse.json();
          if (configData.PreferredMetadataLanguage) {
            locale = configData.PreferredMetadataLanguage.toLowerCase();
            if (configData.MetadataCountryCode) {
              locale = `${locale}-${configData.MetadataCountryCode.toLowerCase()}`;
            }
          }
        }
      } catch (error) {
        console.warn("Could not fetch server language preference:", error);
      }
    }

    if (!locale) {
      const langAttr = document.documentElement.getAttribute("lang");
      if (langAttr) {
        locale = langAttr.toLowerCase();
      }
    }

    if (!locale) {
      const navLang = navigator.language || navigator.userLanguage;
      locale = navLang ? navLang.toLowerCase() : "en-us";
    }
    if (locale.length === 3) {
      const countriesData = await window.ApiClient.getCountries();
      const countryData = Object.values(countriesData).find(
        (countryData) =>
          countryData.ThreeLetterISORegionName === locale.toUpperCase(),
      );
      if (countryData) {
        locale = countryData.TwoLetterISORegionName.toLowerCase();
      }
    }

    this.cachedLocale = locale;
    return locale;
  },

  /**
   * Finds the translation chunk URL from performance entries
   * @param {string} locale - Locale code
   * @returns {string|null} URL to translation chunk or null
   */
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

  /**
   * Fetches and loads translations from the chunk JSON
   * @param {string} locale - Locale code
   * @returns {Promise<void>}
   */
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

        /**
         * @example
         * Standard version
         * ```js
         * "use strict";
         * (self.webpackChunk = self.webpackChunk || []).push([[62634], {
         *   30985: function(e) {
         *     e.exports = JSON.parse('{"Absolute":"..."}')
         *   }
         * }]);
         * ```
         *
         * Minified version
         * ```js
         * "use strict";(self.webpackChunk=self.webpackChunk||[]).push([[24072],{60715:function(e){e.exports=JSON.parse('{"Absolute":"..."}')}}]);
         * ```
         */
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

  /**
   * Gets a localized string (synchronous - translations must be loaded first)
   * @param {string} key - Localization key (e.g., "EndsAtValue", "Play")
   * @param {string} fallback - Fallback English string
   * @param {...any} args - Optional arguments for placeholders (e.g., {0}, {1})
   * @returns {string} Localized string or fallback
   */
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

/**
 * API utilities for fetching data from Jellyfin server
 */
const ApiUtils = {
  /**
   * Fetches details for a specific item by ID
   * @param {string} itemId - Item ID
   * @returns {Promise<Object>} Item details
   */
  async fetchItemDetails(itemId) {
    try {
      if (STATE.slideshow.loadedItems[itemId]) {
        return STATE.slideshow.loadedItems[itemId];
      }

      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Items/${itemId}`,
        {
          headers: this.getAuthHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch item details: ${response.statusText}`);
      }

      const itemData = await response.json();

      STATE.slideshow.loadedItems[itemId] = itemData;

      return itemData;
    } catch (error) {
      console.error(`Error fetching details for item ${itemId}:`, error);
      return null;
    }
  },

  /**
   * API utilities for fetching SponsorBlock JSON data
   */

  async getSkipSegments(videoId) {
    try {
      const categories = '["intro","sponsor","selfpromo","interaction"]';
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

  /**
   * Fetch item IDs from the list file
   * @returns {Promise<Array>} Array of item IDs
   */
  async fetchItemIdsFromList() {
    try {
      const listFileName = `${STATE.jellyfinData.serverAddress}/web/avatars/list.txt?userId=${STATE.jellyfinData.userId}`;
      const response = await fetch(listFileName);

      if (!response.ok) {
        console.warn("list.txt not found or inaccessible. Using random items.");
        return [];
      }

      const text = await response.text();
      return text
        .split("\n")
        .map((id) => id.trim())
        .filter((id) => id)
        .slice(1);
    } catch (error) {
      console.error("Error fetching list.txt:", error);
      return [];
    }
  },

  /**
   * Fetches random items from the server
   * @returns {Promise<Array>} Array of item objects
   */
  async fetchItemIdsFromServer() {
    try {
      if (
        !STATE.jellyfinData.accessToken ||
        STATE.jellyfinData.accessToken === "Not Found"
      ) {
        console.warn("Access token not available. Delaying API request...");
        return [];
      }

      if (
        !STATE.jellyfinData.serverAddress ||
        STATE.jellyfinData.serverAddress === "Not Found"
      ) {
        console.warn("Server address not available. Delaying API request...");
        return [];
      }

      console.log("Fetching random items from server...");

      const response = await fetch(
        `${STATE.jellyfinData.serverAddress}/Items?IncludeItemTypes=Movie,Series&Recursive=true&hasOverview=true&imageTypes=Logo,Backdrop&sortBy=Random&isPlayed=False&enableUserData=true&Limit=${CONFIG.maxItems}&fields=Id,ImageTags,RemoteTrailers`,
        {
          headers: this.getAuthHeaders(),
        },
      );

      if (!response.ok) {
        console.error(
          `Failed to fetch items: ${response.status} ${response.statusText}`,
        );
        return [];
      }

      const data = await response.json();
      const items = data.Items || [];

      console.log(
        `Successfully fetched ${items.length} random items from server`,
      );

      return items
        .filter((item) => item.ImageTags && item.ImageTags.Logo)
        .map((item) => item.Id);
    } catch (error) {
      console.error("Error fetching item IDs:", error);
      return [];
    }
  },

  /**
   * Get authentication headers for API requests
   * @returns {Object} Headers object
   */
  getAuthHeaders() {
    return {
      Authorization: `MediaBrowser Client="${STATE.jellyfinData.appName}", Device="${STATE.jellyfinData.deviceName}", DeviceId="${STATE.jellyfinData.deviceId}", Version="${STATE.jellyfinData.appVersion}", Token="${STATE.jellyfinData.accessToken}"`,
    };
  },

  /**
   * Send a command to play an item
   * @param {string} itemId - Item ID to play
   * @returns {Promise<boolean>} Success status
   */
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

  /**
   * Gets current session ID
   * @returns {Promise<string|null>} Session ID or null
   */
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
      const userId = STATE.jellyfinData.userId;
      const isFavorite = button.classList.contains("favorited");

      const url = `${STATE.jellyfinData.serverAddress}/Users/${userId}/FavoriteItems/${itemId}`;
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
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  },
};

/**
 * Class for managing slide timing
 */
class SlideTimer {
  /**
   * Creates a new slide timer
   * @param {Function} callback - Function to call on interval
   * @param {number} interval - Interval in milliseconds
   */
  constructor(callback, interval) {
    this.callback = callback;
    this.interval = interval;
    this.timerId = null;
    this.start();
  }

  /**
   * Stops the timer
   * @returns {SlideTimer} This instance for chaining
   */
  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    return this;
  }

  /**
   * Starts the timer
   * @returns {SlideTimer} This instance for chaining
   */
  start() {
    if (!this.timerId) {
      this.timerId = setInterval(this.callback, this.interval);
    }
    return this;
  }

  /**
   * Restarts the timer
   * @returns {SlideTimer} This instance for chaining
   */
  restart() {
    return this.stop().start();
  }
}

/**
 * Observer for handling slideshow visibility based on current page
 */
const VisibilityObserver = {
  wasVisible: false,

  updateVisibility() {
    const activeTab = document.querySelector(".emby-tab-button-active");
    const container = document.getElementById("slides-container");

    if (!container) return;

    const isVisible =
      (window.location.hash === "#/home.html" ||
        window.location.hash === "#/home") &&
      activeTab.getAttribute("data-index") === "0";

    container.style.display = isVisible ? "block" : "none";

    if (isVisible && !this.wasVisible) {
      const currentItemId =
        STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
      const currentSlide = document.querySelector(
        `.slide[data-item-id="${currentItemId}"]`,
      );
      const player = STATE.slideshow.players[currentItemId];

      if (currentSlide && player) {
        const trailerContainer = currentSlide.querySelector(".video-container");
        const backdrop = currentSlide.querySelector(".backdrop");
        const plotContainer = currentSlide.querySelector(".plot-container");
        if (trailerContainer) trailerContainer.classList.remove("active");
        if (backdrop) backdrop.classList.remove("with-video");
        if (plotContainer) plotContainer.classList.remove("with-video");

        try {
          if (typeof player.pauseVideo === "function") {
            player.pauseVideo();
          }
          if (typeof player.seekTo === "function") {
            player.seekTo(0);
          }
        } catch (e) {
          console.warn(`Failed to reset player for ${currentItemId}:`, e);
        }
      }

      if (STATE.slideshow.slideInterval && !STATE.slideshow.isPaused) {
        STATE.slideshow.slideInterval.start();
      }
    } else if (!isVisible && this.wasVisible) {
      // Transitioning FROM visible TO hidden
      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.stop();
      }

      Object.keys(STATE.slideshow.players).forEach((itemId) => {
        const player = STATE.slideshow.players[itemId];
        if (player && typeof player.pauseVideo === "function") {
          try {
            player.pauseVideo();
          } catch (e) {
            console.warn(`Failed to pause player for ${itemId}:`, e);
          }
        }
      });
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
      VisibilityObserver.updateVisibility();
    }
  },

  init() {
    const observer = new MutationObserver(this.updateVisibility.bind(this));
    observer.observe(document.body, { childList: true, subtree: true });
    document.body.addEventListener("click", this.handleClick.bind(this));
    window.addEventListener("hashchange", this.updateVisibility.bind(this));

    this.updateVisibility();
  },
};

/**
 * Slideshow UI creation and management
 */
const SlideCreator = {
  /**
   * Builds a tag-based image URL for cache-friendly image requests
   * @param {Object} item - Item data containing ImageTags
   * @param {string} imageType - Image type (Backdrop, Logo, Primary, etc.)
   * @param {number} [index] - Image index (for Backdrop, Primary, etc.)
   * @param {string} serverAddress - Server address
   * @param {number} [quality] - Image quality (0-100). If tag is available, both tag and quality are used.
   * @returns {string} Image URL with tag parameter (and quality if tag available), or quality-only fallback
   */
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

  /**
   * Creates a slide element for an item
   * @param {Object} item - Item data
   * @param {string} title - Title type (Movie/TV Show)
   * @returns {Object} Object containing slide, videoId, and container
   */
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
    let trailerContainer = null;

    if (
      CONFIG.enableTrailers &&
      item.RemoteTrailers &&
      item.RemoteTrailers.length > 0
    ) {
      try {
        const urlObj = new URL(item.RemoteTrailers[0].Url);
        videoId = urlObj.searchParams.get("v");
      } catch (e) {}

      if (videoId) {
        // trailerContainer = SlideUtils.createElement("div", {
        //   className: "video-container",
        //   id: `trailer-${item.Id}`,
        //   style: { width: `calc(100vh * 1.777)` },
        // });
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

    const backdrop = SlideUtils.createElement("img", {
      className: "backdrop high-quality",
      src: this.buildImageUrl(item, "Backdrop", 0, serverAddress, 60),
      alt: LocalizationUtils.getLocalizedString("Backdrop", "Backdrop"),
      loading: "eager",
    });

    const backdropOverlay = SlideUtils.createElement("div", {
      className: "backdrop-overlay",
    });

    const backdropContainer = SlideUtils.createElement("div", {
      className: "backdrop-container",
    });
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

    const plot = item.Overview || "No overview available";
    const plotElement = SlideUtils.createElement(
      "div",
      {
        className: "plot",
      },
      plot,
    );
    SlideUtils.truncateText(plotElement, CONFIG.maxPlotLength);

    const plotContainer = SlideUtils.createElement("div", {
      className: "plot-container",
    });
    plotContainer.appendChild(plotElement);

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
      innerHTML: SlideUtils.parseGenres(item.Genres),
    });

    const buttonContainer = SlideUtils.createElement("div", {
      className: "button-container",
    });

    const playButton = this.createPlayButton(itemId);
    const detailButton = this.createDetailButton(itemId);
    const favoriteButton = this.createFavoriteButton(item);
    buttonContainer.append(detailButton, playButton, favoriteButton);

    slide.append(
      logoContainer,
      backdropContainer,
      gradientOverlay,
      featuredContent,
      plotContainer,
      infoContainer,
      genreElement,
      buttonContainer,
    );

    return { slide, videoId, trailerContainer };
  },

  /**
   * Creates the rating information element
   * @param {Object} item - Item data
   * @returns {HTMLElement} Rating information element
   */
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

    if (typeof communityRating === "number") {
      const container = SlideUtils.createElement("div", {
        className: "star-rating-container",
        innerHTML: `<span class="material-icons community-rating-star star" aria-hidden="true"></span>${communityRating.toFixed(
          1,
        )}`,
      });
      miscInfo.appendChild(container);
      miscInfo.appendChild(SlideUtils.createSeparator());
    }

    if (typeof criticRating === "number") {
      const svgIcon =
        criticRating < 60
          ? CONFIG.IMAGE_SVG.rottenTomato
          : CONFIG.IMAGE_SVG.freshTomato;
      const container = SlideUtils.createElement("div", {
        className: "critic-rating",
        innerHTML: `${svgIcon}${criticRating.toFixed(0)}%`,
      });
      miscInfo.appendChild(container);
      miscInfo.appendChild(SlideUtils.createSeparator());
    }

    if (typeof premiereDate === "string" && !isNaN(new Date(premiereDate))) {
      const container = SlideUtils.createElement("div", {
        className: "date",
        innerHTML: new Date(premiereDate).getFullYear(),
      });
      miscInfo.appendChild(container);
      miscInfo.appendChild(SlideUtils.createSeparator());
    }

    if (typeof ageRating === "string") {
      const container = SlideUtils.createElement("div", {
        className: "age-rating mediaInfoOfficialRating",
        rating: ageRating,
        ariaLabel: `Content rated ${ageRating}`,
        title: `Rating: ${ageRating}`,
        innerHTML: ageRating,
      });
      miscInfo.appendChild(container);
      miscInfo.appendChild(SlideUtils.createSeparator());
    }

    if (seasonCount !== undefined || runtime !== undefined) {
      const container = SlideUtils.createElement("div", {
        className: "runTime",
      });
      if (seasonCount) {
        const seasonText =
          seasonCount <= 1
            ? LocalizationUtils.getLocalizedString("Season", "Season")
            : LocalizationUtils.getLocalizedString(
                "TypeOptionPluralSeason",
                "Seasons",
              );
        container.innerHTML = `${seasonCount} ${seasonText}`;
      } else {
        const milliseconds = runtime / 10000;
        const currentTime = new Date();
        const endTime = new Date(currentTime.getTime() + milliseconds);
        const options = { hour: "2-digit", minute: "2-digit", hour12: false };
        const formattedEndTime = endTime.toLocaleTimeString([], options);
        const endsAtText = LocalizationUtils.getLocalizedString(
          "EndsAtValue",
          "Ends at {0}",
          formattedEndTime,
        );
        container.innerText = endsAtText;
      }
      miscInfo.appendChild(container);
    }

    return miscInfo;
  },

  /**
   * Creates a play button for an item
   * @param {string} itemId - Item ID
   * @returns {HTMLElement} Play button element
   */
  createPlayButton(itemId) {
    const playText = LocalizationUtils.getLocalizedString("Play", "Play");
    return SlideUtils.createElement("button", {
      className: "detailButton btnPlay play-button",
      innerHTML: `
      <span class="play-text">${playText}</span>
    `,
      tabIndex: "0",
      onclick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        ApiUtils.playItem(itemId);
      },
    });
  },

  /**
   * Creates a detail button for an item
   * @param {string} itemId - Item ID
   * @returns {HTMLElement} Detail button element
   */
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

  /**
   * Creates a favorite button for an item
   * @param {string} itemId - Item ID
   * @returns {HTMLElement} Favorite button element
   */

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

  /**
   * Creates a placeholder slide for loading
   * @param {string} itemId - Item ID to load
   * @returns {HTMLElement} Placeholder slide element
   */
  createLoadingPlaceholder(itemId) {
    const placeholder = SlideUtils.createElement("a", {
      className: "slide placeholder",
      "data-item-id": itemId,
      style: {
        display: "none",
        opacity: "0",
        transition: `opacity ${CONFIG.fadeTransitionDuration}ms ease-in-out`,
      },
    });

    const loadingIndicator = SlideUtils.createLoadingIndicator();
    placeholder.appendChild(loadingIndicator);

    return placeholder;
  },

  /**
   * Creates a slide for an item and adds it to the container
   * @param {string} itemId - Item ID
   * @returns {Promise<HTMLElement>} Created slide element
   */
  /**
   * Creates a slide for an item and adds it to the container
   * @param {string} itemId - Item ID
   * @returns {Promise<HTMLElement>} Created slide element
   */
  async createSlideForItemId(itemId) {
    try {
      if (STATE.slideshow.createdSlides[itemId]) {
        return document.querySelector(`.slide[data-item-id="${itemId}"]`);
      }

      const container = SlideUtils.getOrCreateSlidesContainer();
      const item = await ApiUtils.fetchItemDetails(itemId);

      const { slide, videoId, trailerContainer } = this.createSlideElement(
        item,
        item.Type === "Movie" ? "Movie" : "TV Show",
      );

      container.appendChild(slide);
      STATE.slideshow.createdSlides[itemId] = true;

      // if (videoId) {
      //   loadYouTubeAPI().then((YT) => {
      //     if (!document.getElementById(`trailer-${itemId}`)) return;

      //     STATE.slideshow.players[itemId] = new YT.Player(
      //       `yt-player-${itemId}`,
      //       {
      //         videoId: videoId,
      //         playerVars: {
      //           autoplay: 0,
      //           controls: 0,
      //           rel: 0,
      //           fs: 0,
      //           showinfo: 0,
      //           modestbranding: 1,
      //         },
      //         events: {
      //           onStateChange: (e) =>
      //             SlideshowManager.onPlayerStateChange(
      //               e,
      //               itemId,
      //               trailerContainer,
      //             ),
      //           onReady: (e) => e.target.mute(),
      //         },
      //       },
      //     );
      //   });
      // }

      if (videoId) {
        const startTime = await ApiUtils.getSkipSegments(videoId);

        loadYouTubeAPI().then((YT) => {
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

/**
 * Manages slideshow functionality
 */
const SlideshowManager = {
  createPaginationDots() {
    let dotsContainer = document.querySelector(".dots-container");
    if (!dotsContainer) {
      dotsContainer = document.createElement("div");
      dotsContainer.className = "dots-container";
      document.getElementById("slides-container").appendChild(dotsContainer);
    }

    for (let i = 0; i < 5; i++) {
      const dot = document.createElement("span");
      dot.className = "dot";
      dot.setAttribute("data-index", i);
      dotsContainer.appendChild(dot);
    }
    this.updateDots();
  },

  /**
   * Updates active dot based on current slide
   * Maps current slide to one of the 5 dots
   */
  updateDots() {
    const container = SlideUtils.getOrCreateSlidesContainer();
    const dots = container.querySelectorAll(".dot");
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const totalItems = STATE.slideshow.totalItems;
    const numDots = dots.length;

    let activeDotIndex;

    if (totalItems <= numDots) {
      activeDotIndex = currentIndex;
    } else {
      activeDotIndex = Math.floor(
        (currentIndex % numDots) * (numDots / numDots),
      );
    }

    dots.forEach((dot, index) => {
      if (index === activeDotIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
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

  /**
   * Updates current slide to the specified index
   * @param {number} index - Slide index to display
   */

  async updateCurrentSlide(index) {
    if (STATE.slideshow.isTransitioning) return;

    if (STATE.slideshow.slideInterval) STATE.slideshow.slideInterval.stop();

    const prevItemId =
      STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
    if (prevItemId && STATE.slideshow.players[prevItemId]) {
      try {
        if (
          typeof STATE.slideshow.players[prevItemId].pauseVideo === "function"
        ) {
          STATE.slideshow.players[prevItemId].pauseVideo();
          if (
            typeof STATE.slideshow.players[prevItemId].seekTo === "function"
          ) {
            STATE.slideshow.players[prevItemId].seekTo(0);
          }
        }
        STATE.slideshow.isVideoPlaying = false;

        const prevSlide = document.querySelector(
          `.slide[data-item-id="${prevItemId}"]`,
        );
        if (prevSlide) {
          prevSlide
            .querySelector(".video-container")
            ?.classList.remove("active");
          prevSlide.querySelector(".backdrop")?.classList.remove("with-video");
          prevSlide
            .querySelector(".plot-container")
            ?.classList.remove("with-video");
        }
      } catch (e) {}
    }

    STATE.slideshow.isTransitioning = true;
    const container = SlideUtils.getOrCreateSlidesContainer();
    index = Math.max(0, Math.min(index, STATE.slideshow.totalItems - 1));
    const currentItemId = STATE.slideshow.itemIds[index];

    let currentSlide = document.querySelector(
      `.slide[data-item-id="${currentItemId}"]`,
    );
    if (!currentSlide)
      currentSlide = await SlideCreator.createSlideForItemId(currentItemId);

    const prevVisible = container.querySelector(".slide.active");
    if (prevVisible) prevVisible.classList.remove("active");

    currentSlide.classList.add("active");
    if (CONFIG.slideAnimationEnabled) {
      currentSlide.querySelector(".backdrop")?.classList.add("animate");
      currentSlide.querySelector(".logo")?.classList.add("animate");
    }

    STATE.slideshow.currentSlideIndex = index;
    this.updateDots();
    this.preloadAdjacentSlides(index);

    const itemData = STATE.slideshow.loadedItems[currentItemId];
    const hasTrailerData =
      CONFIG.enableTrailers &&
      itemData &&
      itemData.RemoteTrailers &&
      itemData.RemoteTrailers.length > 0;

    if (hasTrailerData) {
      setTimeout(() => {
        if (
          STATE.slideshow.currentSlideIndex === index &&
          !STATE.slideshow.isPaused
        ) {
          const player = STATE.slideshow.players[currentItemId];

          if (player && typeof player.playVideo === "function") {
            try {
              if (STATE.slideshow.isMuted) {
                player.mute();
              } else {
                player.unMute();
                player.setVolume(50);
              }

              player.seekTo(0);
              player.playVideo();
            } catch (e) {
              fallbackToTimer();
            }
          } else {
            fallbackToTimer();
          }
        }
      }, 3500);
    } else {
      fallbackToTimer();
    }

    function fallbackToTimer() {
      if (!STATE.slideshow.isPaused && STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.restart();
      }
    }

    setTimeout(() => {
      STATE.slideshow.isTransitioning = false;
      if (prevVisible && CONFIG.slideAnimationEnabled) {
        prevVisible.querySelector(".backdrop")?.classList.remove("animate");
        prevVisible.querySelector(".logo")?.classList.remove("animate");
      }
    }, CONFIG.fadeTransitionDuration);
    setTimeout(() => {
      if (STATE.slideshow.isTransitioning) {
        console.warn("Forcing transition unlock");
        STATE.slideshow.isTransitioning = false;
      }
    }, 2000);
  },

  /**
   * Upgrades the image quality for all images in a slide
   * @param {HTMLElement} slide - The slide element containing images to upgrade
   */

  upgradeSlideImageQuality(slide) {
    if (!slide) return;

    const images = slide.querySelectorAll("img.low-quality");
    images.forEach((img) => {
      const highQualityUrl = img.getAttribute("data-high-quality");
      if (highQualityUrl && img.src !== highQualityUrl) {
        addThrottledRequest(highQualityUrl, () => {
          img.src = highQualityUrl;
          img.classList.remove("low-quality");
          img.classList.add("high-quality");
        });
      }
    });
  },

  /**
   * Preloads adjacent slides for smoother transitions
   * @param {number} currentIndex - Current slide index
   */
  async preloadAdjacentSlides(currentIndex) {
    const totalItems = STATE.slideshow.totalItems;
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
    // if (STATE.slideshow.isVideoPlaying) {
    //   return;
    // }

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

  /**
   * Prunes the slide cache to prevent memory bloat
   * Removes slides that are outside the viewing range
   */
  pruneSlideCache() {
    const currentIndex = STATE.slideshow.currentSlideIndex;
    const keepRange = 5;

    Object.keys(STATE.slideshow.createdSlides).forEach((itemId) => {
      const index = STATE.slideshow.itemIds.indexOf(itemId);
      if (index === -1) return;

      const distance = Math.abs(index - currentIndex);
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

        delete STATE.slideshow.loadedItems[itemId];

        const slide = document.querySelector(
          `.slide[data-item-id="${itemId}"]`,
        );
        if (slide) slide.remove();

        delete STATE.slideshow.createdSlides[itemId];

        console.log(`Pruned slide ${itemId} at distance ${distance} from view`);
      }
    });
  },

  togglePause() {
    STATE.slideshow.isPaused = !STATE.slideshow.isPaused;
    const pauseButton = document.querySelector(".pause-button");

    const currentId =
      STATE.slideshow.itemIds[STATE.slideshow.currentSlideIndex];
    const player = STATE.slideshow.players[currentId];

    if (STATE.slideshow.isPaused) {
      if (STATE.slideshow.slideInterval) STATE.slideshow.slideInterval.stop();

      pauseButton.innerHTML = '<i class="material-icons">play_arrow</i>';
      const playLabel = LocalizationUtils.getLocalizedString("Play", "Play");
      pauseButton.setAttribute("aria-label", playLabel);
      pauseButton.setAttribute("title", playLabel);
      if (player && typeof player.pauseVideo === "function") {
        player.pauseVideo();
      }
    } else {
      if (STATE.slideshow.slideInterval) STATE.slideshow.slideInterval.start();
      pauseButton.innerHTML = '<i class="material-icons">pause</i>';
      const pauseLabel = LocalizationUtils.getLocalizedString(
        "ButtonPause",
        "Pause",
      );
      pauseButton.setAttribute("aria-label", pauseLabel);
      pauseButton.setAttribute("title", pauseLabel);

      if (player && typeof player.playVideo === "function") {
        player.playVideo();
      }
    }
  },

  /**
   * Initializes touch events for swiping
   */
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

  /**
   * Handles swipe gestures
   * @param {number} startX - Starting X position
   * @param {number} endX - Ending X position
   */
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

  /**
   * Initializes keyboard event listeners
   */
  initKeyboardEvents() {
    document.addEventListener("keydown", (e) => {
      if (!STATE.slideshow.containerFocused) {
        return;
      }

      switch (e.key) {
        case "ArrowRight":
          if (focusElement.classList.contains("detail-button")) {
            focusElement.previousElementSibling.focus();
          } else {
            SlideshowManager.nextSlide();
          }
          e.preventDefault();
          break;

        case "ArrowLeft":
          if (focusElement.classList.contains("play-button")) {
            focusElement.nextElementSibling.focus();
          } else {
            SlideshowManager.prevSlide();
          }
          e.preventDefault();
          break;

        case " ":
          this.togglePause();
          e.preventDefault();
          break;

        case "Enter":
          focusElement.click();
          e.preventDefault();
          break;
      }
    });

    const container = SlideUtils.getOrCreateSlidesContainer();

    container.addEventListener("focus", () => {
      STATE.slideshow.containerFocused = true;
    });

    container.addEventListener("blur", () => {
      STATE.slideshow.containerFocused = false;
    });
  },

  onPlayerStateChange(event, itemId, container) {
    const slide = document.querySelector(`.slide[data-item-id="${itemId}"]`);
    if (!slide) return;
    const backdrop = slide.querySelector(".backdrop");
    const plotContainer = slide.querySelector(".plot-container");

    if (event.data === YT.PlayerState.PLAYING) {
      STATE.slideshow.isVideoPlaying = true;
      if (container) container.classList.add("active");
      if (backdrop) backdrop.classList.add("with-video");
      if (plotContainer) plotContainer.classList.add("with-video");
      if (STATE.slideshow.slideInterval) STATE.slideshow.slideInterval.stop();
    } else if (event.data === YT.PlayerState.ENDED) {
      STATE.slideshow.isVideoPlaying = false;
      if (container) container.classList.remove("active");
      if (backdrop) backdrop.classList.remove("with-video");
      if (plotContainer) plotContainer.classList.remove("with-video");
      if (STATE.slideshow.slideInterval)
        STATE.slideshow.slideInterval.restart();
      this.nextSlide();
    } else if (
      event.data === YT.PlayerState.PAUSED ||
      event.data === YT.PlayerState.CUED
    ) {
      STATE.slideshow.isVideoPlaying = false;
    }
  },

  /**
   * Loads slideshow data and initializes the slideshow
   */
  async loadSlideshowData() {
    try {
      STATE.slideshow.isLoading = true;

      let itemIds = await ApiUtils.fetchItemIdsFromList();

      if (itemIds.length === 0) {
        itemIds = await ApiUtils.fetchItemIdsFromServer();
      }

      itemIds = SlideUtils.shuffleArray(itemIds);

      STATE.slideshow.itemIds = itemIds;
      STATE.slideshow.totalItems = itemIds.length;

      this.createPaginationDots();

      STATE.slideshow.slideInterval = new SlideTimer(() => {
        if (!STATE.slideshow.isPaused && !STATE.slideshow.isVideoPlaying) {
          this.nextSlide();
        }
      }, CONFIG.shuffleInterval);

      STATE.slideshow.slideInterval.stop();

      await this.updateCurrentSlide(0);

      STATE.slideshow.slideInterval = new SlideTimer(() => {
        if (!STATE.slideshow.isPaused) {
          this.nextSlide();
        }
      }, CONFIG.shuffleInterval);
    } catch (error) {
      console.error("Error loading slideshow data:", error);
    } finally {
      STATE.slideshow.isLoading = false;
    }
  },
};

/**
 * Initializes arrow navigation elements
 */
const initArrowNavigation = () => {
  const container = SlideUtils.getOrCreateSlidesContainer();

  const leftArrow = SlideUtils.createElement("div", {
    className: "arrow left-arrow",
    innerHTML: '<i class="material-icons">chevron_left</i>',
    tabIndex: "0",
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.prevSlide();
    },
    style: {
      opacity: "0",
      transition: "opacity 0.3s ease",
      display: "none",
    },
  });

  const rightArrow = SlideUtils.createElement("div", {
    className: "arrow right-arrow",
    innerHTML: '<i class="material-icons">chevron_right</i>',
    tabIndex: "0",
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.nextSlide();
    },
    style: {
      opacity: "0",
      transition: "opacity 0.3s ease",
      display: "none",
    },
  });

  const volumeBtn = SlideUtils.createElement("div", {
    className: "volume-toggle",
    innerHTML: '<i class="material-icons">volume_off</i>',
    onclick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      SlideshowManager.toggleMute();
    },
  });

  const pauseButton = SlideUtils.createElement("div", {
    className: "pause-button",
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

  container.append(leftArrow, rightArrow, volumeBtn, pauseButton);

  const showArrows = () => {
    leftArrow.style.display = "block";
    rightArrow.style.display = "block";

    void leftArrow.offsetWidth;
    void rightArrow.offsetWidth;

    leftArrow.style.opacity = "1";
    rightArrow.style.opacity = "1";
  };

  const hideArrows = () => {
    leftArrow.style.opacity = "0";
    rightArrow.style.opacity = "0";

    setTimeout(() => {
      if (leftArrow.style.opacity === "0") {
        leftArrow.style.display = "none";
        rightArrow.style.display = "none";
      }
    }, 300);
  };

  container.addEventListener("mouseenter", showArrows);

  container.addEventListener("mouseleave", hideArrows);

  let arrowTimeout;
  container.addEventListener(
    "touchstart",
    () => {
      if (arrowTimeout) {
        clearTimeout(arrowTimeout);
      }

      showArrows();

      arrowTimeout = setTimeout(hideArrows, 2000);
    },
    { passive: true },
  );
};

/**
 * Initialize the slideshow
 */
const slidesInit = async () => {
  if (STATE.slideshow.hasInitialized) {
    console.log("⚠️ Slideshow already initialized, skipping");
    return;
  }
  STATE.slideshow.hasInitialized = true;

  /**
   * Initialize IntersectionObserver for lazy loading images
   */
  const initLazyLoading = () => {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            const highQualityUrl = image.getAttribute("data-high-quality");

            if (
              highQualityUrl &&
              image.closest(".slide").style.opacity === "1"
            ) {
              requestQueue.push({
                url: highQualityUrl,
                callback: () => {
                  image.src = highQualityUrl;
                  image.classList.remove("low-quality");
                  image.classList.add("high-quality");
                },
              });

              if (requestQueue.length === 1) {
                processNextRequest();
              }
            }

            observer.unobserve(image);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    );

    const observeSlideImages = () => {
      const slides = document.querySelectorAll(".slide");
      slides.forEach((slide) => {
        const images = slide.querySelectorAll("img.low-quality");
        images.forEach((image) => {
          imageObserver.observe(image);
        });
      });
    };

    const slideObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (node.classList && node.classList.contains("slide")) {
              const images = node.querySelectorAll("img.low-quality");
              images.forEach((image) => {
                imageObserver.observe(image);
              });
            }
          });
        }
      });
    });

    const container = SlideUtils.getOrCreateSlidesContainer();
    slideObserver.observe(container, { childList: true });

    observeSlideImages();

    return imageObserver;
  };

  const lazyLoadObserver = initLazyLoading();

  try {
    console.log("🌟 Initializing Enhanced Jellyfin Slideshow");

    await SlideshowManager.loadSlideshowData();

    SlideshowManager.initTouchEvents();

    SlideshowManager.initKeyboardEvents();

    initArrowNavigation();

    initPageVisibilityHandler();

    VisibilityObserver.init();

    console.log("✅ Enhanced Jellyfin Slideshow initialized successfully");
  } catch (error) {
    console.error("Error initializing slideshow:", error);
    STATE.slideshow.hasInitialized = false;
  }
};

/**
 * Initialize page visibility handling to pause when tab is inactive
 */
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
      if (!STATE.slideshow.isPaused) {
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
  SlideCreator,
  SlideshowManager,
  VisibilityObserver,
  initSlideshowData: () => {
    SlideshowManager.loadSlideshowData();
  },
  nextSlide: () => {
    SlideshowManager.nextSlide();
  },
  prevSlide: () => {
    SlideshowManager.prevSlide();
  },
};

initLoadingScreen();

startLoginStatusWatcher();
