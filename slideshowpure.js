/*
 * Jellyfin Slideshow by M0RPH3US v3.0.0
 */

//Core Module Configuration
const CONFIG = {
  IMAGE_SVG: {
    imdbLogo:
      '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 575 289.83" width="33" height="32.83"><defs><path d="M575 24.91C573.44 12.15 563.97 1.98 551.91 0C499.05 0 76.18 0 23.32 0C10.11 2.17 0 14.16 0 28.61C0 51.84 0 237.64 0 260.86C0 276.86 12.37 289.83 27.64 289.83C79.63 289.83 495.6 289.83 547.59 289.83C561.65 289.83 573.26 278.82 575 264.57C575 216.64 575 48.87 575 24.91Z" id="d1pwhf9wy2"></path><path d="M69.35 58.24L114.98 58.24L114.98 233.89L69.35 233.89L69.35 58.24Z" id="g5jjnq26yS"></path><path d="M201.2 139.15C197.28 112.38 195.1 97.5 194.67 94.53C192.76 80.2 190.94 67.73 189.2 57.09C185.25 57.09 165.54 57.09 130.04 57.09L130.04 232.74L170.01 232.74L170.15 116.76L186.97 232.74L215.44 232.74L231.39 114.18L231.54 232.74L271.38 232.74L271.38 57.09L211.77 57.09L201.2 139.15Z" id="i3Prh1JpXt"></path><path d="M346.71 93.63C347.21 95.87 347.47 100.95 347.47 108.89C347.47 115.7 347.47 170.18 347.47 176.99C347.47 188.68 346.71 195.84 345.2 198.48C343.68 201.12 339.64 202.43 333.09 202.43C333.09 190.9 333.09 98.66 333.09 87.13C338.06 87.13 341.45 87.66 343.25 88.7C345.05 89.75 346.21 91.39 346.71 93.63ZM367.32 230.95C372.75 229.76 377.31 227.66 381.01 224.67C384.7 221.67 387.29 217.52 388.77 212.21C390.26 206.91 391.14 196.38 391.14 180.63C391.14 174.47 391.14 125.12 391.14 118.95C391.14 102.33 390.49 91.19 389.48 85.53C388.46 79.86 385.93 74.71 381.88 70.09C377.82 65.47 371.9 62.15 364.12 60.13C356.33 58.11 343.63 57.09 321.54 57.09C319.27 57.09 307.93 57.09 287.5 57.09L287.5 232.74L342.78 232.74C355.52 232.34 363.7 231.75 367.32 230.95Z" id="a4ov9rRGQm"></path><path d="M464.76 204.7C463.92 206.93 460.24 208.06 457.46 208.06C454.74 208.06 452.93 206.98 452.01 204.81C451.09 202.65 450.64 197.72 450.64 190C450.64 185.36 450.64 148.22 450.64 143.58C450.64 135.58 451.04 130.59 451.85 128.6C452.65 126.63 454.41 125.63 457.13 125.63C459.91 125.63 463.64 126.76 464.6 129.03C465.55 131.3 466.03 136.15 466.03 143.58C466.03 146.58 466.03 161.58 466.03 188.59C465.74 197.84 465.32 203.21 464.76 204.7ZM406.68 231.21L447.76 231.21C449.47 224.5 450.41 220.77 450.6 220.02C454.32 224.52 458.41 227.9 462.9 230.14C467.37 232.39 474.06 233.51 479.24 233.51C486.45 233.51 492.67 231.62 497.92 227.83C503.16 224.05 506.5 219.57 507.92 214.42C509.34 209.26 510.05 201.42 510.05 190.88C510.05 185.95 510.05 146.53 510.05 141.6C510.05 131 509.81 124.08 509.34 120.83C508.87 117.58 507.47 114.27 505.14 110.88C502.81 107.49 499.42 104.86 494.98 102.98C490.54 101.1 485.3 100.16 479.26 100.16C474.01 100.16 467.29 101.21 462.81 103.28C458.34 105.35 454.28 108.49 450.64 112.7C450.64 108.89 450.64 89.85 450.64 55.56L406.68 55.56L406.68 231.21Z" id="fk968BpsX"></path></defs><g><g><g><use xlink:href="#d1pwhf9wy2" opacity="1" fill="#f6c700" fill-opacity="1"></use><g><use xlink:href="#d1pwhf9wy2" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#g5jjnq26yS" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#g5jjnq26yS" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#i3Prh1JpXt" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#i3Prh1JpXt" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#a4ov9rRGQm" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#a4ov9rRGQm" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g><g><use xlink:href="#fk968BpsX" opacity="1" fill="#000000" fill-opacity="1"></use><g><use xlink:href="#fk968BpsX" opacity="1" fill-opacity="0" stroke="#000000" stroke-width="1" stroke-opacity="0"></use></g></g></g></g></svg>',
    tomatoLogo:
      '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 106.25 140" width="18" height="20"><path fill="#fa3106" d="M2.727 39.537c-.471-21.981 100.88-25.089 100.88-.42L92.91 117.56c-7.605 26.86-72.064 27.007-79.07.21z"/><g fill="#fff"><path d="M8.809 51.911l9.018 66.639c3.472 4.515 8.498 7.384 9.648 8.022l-6.921-68.576c-3.498-1.41-9.881-4.579-11.745-6.083zM28.629 59.776l5.453 68.898c4.926 2.652 11.04 3.391 15.73 3.566l-1.258-70.366c-3.414-.024-13.82-.642-19.925-2.098zM97.632 52.121l-9.019 66.643c-3.472 4.515-8.498 7.384-9.647 8.022l6.92-68.583c3.5-1.41 9.882-4.579 11.746-6.082zM77.812 59.986l-5.453 68.898c-4.926 2.652-11.04 3.391-15.73 3.566l1.258-70.366c3.414-.024 13.82-.642 19.925-2.098z"/></g><g fill="#ffd600"><circle cx="13.213" cy="31.252" r="6.816"/><circle cx="22.022" cy="27.687" r="6.607"/><circle cx="30.359" cy="19.769" r="5.925"/><circle cx="34.973" cy="15.155" r="6.03"/><circle cx="45.093" cy="17.095" r="4.929"/><circle cx="51.123" cy="9.597" r="6.24"/><circle cx="61.19" cy="9.387" r="6.554"/><circle cx="67.954" cy="13.635" r="4.929"/><circle cx="76.081" cy="17.672" r="5.925"/><circle cx="78.913" cy="22.706" r="4.352"/><circle cx="83.475" cy="26.324" r="5.243"/><circle cx="88.194" cy="34.398" r="5.768"/><path d="M87.355 35.447c5.79 2.799 1.352-2.213 10.696 2.097-9.574 15.338-74.774 16.892-90.291.525l-.21-3.985L38.59 16.99l22.863-6.606 15.52 9.962z"/></g></svg>',
    freshTomato:
      '<svg id="svg3390" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 138.75 141.25" width="18" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/"><metadata id="metadata3396"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/><dc:title/></cc:Work></rdf:RDF></metadata><g id="layer1" fill="#f93208"><path id="path3412" d="m20.154 40.829c-28.149 27.622-13.657 61.011-5.734 71.931 35.254 41.954 92.792 25.339 111.89-5.9071 4.7608-8.2027 22.554-53.467-23.976-78.009z"/><path id="path3471" d="m39.613 39.265 4.7778-8.8607 28.406-5.0384 11.119 9.2082z"/></g><g id="layer2"><path id="path3437" d="m39.436 8.5696 8.9682-5.2826 6.7569 15.479c3.7925-6.3226 13.79-16.316 24.939-4.6684-4.7281 1.2636-7.5161 3.8553-7.7397 8.4768 15.145-4.1697 31.343 3.2127 33.539 9.0911-10.951-4.314-27.695 10.377-41.771 2.334 0.009 15.045-12.617 16.636-19.902 17.076 2.077-4.996 5.591-9.994 1.474-14.987-7.618 8.171-13.874 10.668-33.17 4.668 4.876-1.679 14.843-11.39 24.448-11.425-6.775-2.467-12.29-2.087-17.814-1.475 2.917-3.961 12.149-15.197 28.625-8.476z" fill="#02902e"/></g></svg>',
    rottenTomato:
      '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 145 140" width="20" height="18"><path fill="#0fc755" d="M47.4 35.342c-13.607-7.935-12.32-25.203 2.097-31.88 26.124-6.531 29.117 13.78 22.652 30.412-6.542 24.11 18.095 23.662 19.925 10.067 3.605-18.412 19.394-26.695 31.67-16.359 12.598 12.135 7.074 36.581-17.827 34.187-16.03-1.545-19.552 19.585.839 21.183 32.228 1.915 42.49 22.167 31.04 35.865-15.993 15.15-37.691-4.439-45.512-19.505-6.8-9.307-17.321.11-13.423 6.502 12.983 19.465 2.923 31.229-10.906 30.62-13.37-.85-20.96-9.06-13.214-29.15 3.897-12.481-8.595-15.386-16.57-5.45-11.707 19.61-28.865 13.68-33.976 4.19-3.243-7.621-2.921-25.846 24.119-23.696 16.688 4.137 11.776-12.561-.63-13.633-9.245-.443-30.501-7.304-22.86-24.54 7.34-11.056 24.958-11.768 33.348 6.293 3.037 4.232 8.361 11.042 18.037 5.033 3.51-5.197 1.21-13.9-8.809-20.135z"/></svg>',
  },
  shuffleInterval: 7000,
  retryInterval: 500,
  minSwipeDistance: 50,
  loadingCheckInterval: 100,
  maxPlotLength: 360,
  maxMovies: 15,
  maxTvShows: 15,
  maxItems: 500,
  preloadCount: 3,
  fadeTransitionDuration: 500,
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
    currentSlideIndex: 0,
    focusedSlide: null,
    containerFocused: false,
    slideInterval: null,
    itemIds: [],
    loadedItems: {},
    createdSlides: {},
    totalItems: 0,
    isLoading: false,
  },
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
 * Creates and displays loading screen
 */

const initLoadingScreen = () => {
  const currentPath = window.location.href.toLowerCase();
  const isHomePage =
    currentPath.includes("/web/#/home.html") ||
    currentPath.includes("/web/index.html#/home.html") ||
    currentPath.endsWith("/web/");

  if (!isHomePage) return;

  const loadingDiv = document.createElement("div");
  loadingDiv.className = "bar-loading";
  loadingDiv.id = "page-loader";
  loadingDiv.innerHTML = `
    <div class="loader-content">
      <h1>
        <img src="/web/assets/img/banner-light.png" alt="Server Logo">
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
    document.querySelector(".bar-loading h1 img").style.opacity = "1";
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
    const homePageLoaded =
      document.querySelector(".homeSectionsContainer") &&
      document.querySelector("#slides-container");

    if (loginFormLoaded || homePageLoaded) {
      clearInterval(progressInterval);
      clearInterval(checkInterval);

      progressBar.style.transition = "width 300ms ease-in-out";
      progressBar.style.width = "100%";
      unfilledBar.style.width = "0%";

      progressBar.addEventListener('transitionend', () => {
        requestAnimationFrame(() => {
          const loader = document.querySelector(".bar-loading");
          if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
              loader.remove();
            }, 300);
          }
        });
      })
    }
  }, CONFIG.loadingCheckInterval);
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
        "🔓 User is fully logged in. Starting slideshow initialization..."
      );
      clearInterval(window.slideshowCheckInterval);

      if (!STATE.slideshow.hasInitialized) {
        initJellyfinData(() => {
          console.log("✅ Jellyfin API client initialized successfully");
          slidesInit();
        });
      } else {
        console.log("🔄 Slideshow already initialized, skipping");
      }
    } else {
      console.log(
        "🔒 Authentication incomplete. Waiting for complete login..."
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
      return genresArray.slice(0, 3).join(" ▫️ "); //🔹
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
        }
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
        `${STATE.jellyfinData.serverAddress}/Items?IncludeItemTypes=Movie,Series&Recursive=true&hasOverview=true&imageTypes=Logo,Backdrop&sortBy=Random&isPlayed=False&enableUserData=true&Limit=${CONFIG.maxItems}&fields=Id`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        console.error(
          `Failed to fetch items: ${response.status} ${response.statusText}`
        );
        return [];
      }

      const data = await response.json();
      const items = data.Items || [];

      console.log(
        `Successfully fetched ${items.length} random items from server`
      );

      return items.map((item) => item.Id);
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
          `Failed to send play command: ${playResponse.statusText}`
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
        `${STATE.jellyfinData.serverAddress
        }/Sessions?deviceId=${encodeURIComponent(STATE.jellyfinData.deviceId)}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch session data: ${response.statusText}`);
      }

      const sessions = await response.json();

      if (!sessions || sessions.length === 0) {
        console.warn(
          "No sessions found for deviceId:",
          STATE.jellyfinData.deviceId
        );
        return null;
      }

      return sessions[0].Id;
    } catch (error) {
      console.error("Error fetching session data:", error);
      return null;
    }
  },

  //Favorites

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
  }
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
  updateVisibility() {
    const activeTab = document.querySelector(".emby-tab-button-active");
    const container = document.getElementById("slides-container");

    if (!container) return;

    const isVisible =
      window.location.hash.includes("#/home.html") &&
      activeTab.getAttribute("data-index") === "0";

    container.style.display = isVisible ? "block" : "none";

    if (isVisible) {
      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.start();
      }
    } else {
      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.stop();
      }
    }
  },

  /**
   * Initializes visibility observer
   */
  init() {
    const observer = new MutationObserver(this.updateVisibility);
    observer.observe(document.body, { childList: true, subtree: true });

    document.body.addEventListener("click", this.updateVisibility);
    window.addEventListener("hashchange", this.updateVisibility);

    this.updateVisibility();
  },
};

/**
 * Slideshow UI creation and management
 */
const SlideCreator = {
  /**
   * Creates a slide element for an item
   * @param {Object} item - Item data
   * @param {string} title - Title type (Movie/TV Show)
   * @returns {HTMLElement} Slide element
   */
  createSlideElement(item, title) {
    if (!item || !item.Id) {
      console.error("Invalid item data:", item);
      return null;
    }

    const itemId = item.Id;
    const serverAddress = STATE.jellyfinData.serverAddress;

    const slide = SlideUtils.createElement("a", {
      className: "slide",
      target: "_top",
      rel: "noreferrer",
      tabIndex: 0,
      "data-item-id": itemId,
    });

    const backdrop = SlideUtils.createElement("img", {
      className: "backdrop high-quality",
      src: `${serverAddress}/Items/${itemId}/Images/Backdrop/0?quality=60`,
      alt: "Backdrop",
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
      src: `${serverAddress}/Items/${itemId}/Images/Logo?quality=40`,
      alt: "logo",
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
      title
    );

    const plot = item.Overview || "No overview available";
    const plotElement = SlideUtils.createElement(
      "div",
      {
        className: "plot",
      },
      plot
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
    });
    genreElement.innerHTML = SlideUtils.parseGenres(item.Genres);

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
      buttonContainer
    );

    return slide;
  },

  /**
   * Creates the rating information element
   * @param {Object} item - Item data
   * @returns {HTMLElement} Rating information element
   */
  createRatingInfo(item) {
    const {
      CommunityRating: rating,
      CriticRating: criticRating,
      OfficialRating: age,
      PremiereDate: date,
      RunTimeTicks: runtime,
      ChildCount: season,
    } = item;

    const ratingTest = SlideUtils.createElement("div", {
      className: "rating-value",
    });

    const imdbLogo = SlideUtils.createElement("div", {
      className: "imdb-logo",
      innerHTML: CONFIG.IMAGE_SVG.imdbLogo,
      style: {
        width: "30px",
        height: "30px",
      },
    });

    ratingTest.appendChild(imdbLogo);

    if (typeof rating === "number") {
      const ratingSpan = document.createElement("span");
      ratingSpan.textContent = rating.toFixed(1);
      ratingSpan.style.marginRight = "5px";
      ratingSpan.style.marginLeft = "5px";
      ratingTest.appendChild(ratingSpan);
    } else {
      const naSpan = document.createElement("span");
      naSpan.innerHTML = "N/A";
      naSpan.style.color = "#fff9";
      naSpan.style.marginRight = "5px";
      naSpan.style.marginLeft = "5px";
      ratingTest.appendChild(naSpan);
    }

    ratingTest.appendChild(SlideUtils.createSeparator());

    const tomatoRatingDiv = SlideUtils.createElement("div", {
      className: "tomato-rating",
    });

    const tomatoLogo = SlideUtils.createElement("div", {
      className: "tomato-logo",
      innerHTML: CONFIG.IMAGE_SVG.tomatoLogo,
      style: {
        width: "18px",
        height: "20px",
      },
    });

    let valueElement = SlideUtils.createElement("span", {
      style: {
        marginLeft: "5px",
        marginRight: "5px",
      },
    });

    if (typeof criticRating === "number") {
      valueElement.textContent = `${criticRating}% `;
    } else {
      valueElement.style.color = "#fff9";
      valueElement.textContent = "N/A ";
    }

    const criticLogo = SlideUtils.createElement("span", {
      className: "critic-logo",
      style: {
        display: "flex",
        width: "18",
        height: "20",
      },
    });
    criticLogo.innerHTML =
      criticRating > 59
        ? CONFIG.IMAGE_SVG.freshTomato
        : CONFIG.IMAGE_SVG.rottenTomato;

    tomatoRatingDiv.append(tomatoLogo, valueElement, criticLogo);
    tomatoRatingDiv.appendChild(SlideUtils.createSeparator());

    const ageRatingDiv = SlideUtils.createElement("div", {
      className: "age-rating",
    });
    const ageSpan = document.createElement("span");
    ageSpan.textContent = age || "N/A";
    ageRatingDiv.appendChild(ageSpan);

    const premiereDate = SlideUtils.createElement("div", {
      className: "date",
    });

    const year = date ? new Date(date).getFullYear() : NaN;
    if (isNaN(year)) {
      const naSpan = SlideUtils.createElement(
        "span",
        {
          style: { color: "#fff9" },
        },
        "N/A"
      );
      premiereDate.appendChild(naSpan);
    } else {
      premiereDate.textContent = year;
    }

    const runTimeElement = SlideUtils.createElement("div", {
      className: "runTime",
    });

    if (season === undefined) {
      const milliseconds = runtime / 10000;
      const currentTime = new Date();
      const endTime = new Date(currentTime.getTime() + milliseconds);
      const options = { hour: "2-digit", minute: "2-digit", hour12: false };
      const formattedEndTime = endTime.toLocaleTimeString([], options);
      runTimeElement.textContent = `Ends at ${formattedEndTime}`;
    } else {
      runTimeElement.textContent = `${season} Season${season > 1 ? "s" : ""}`;
    }

    ratingTest.append(
      tomatoRatingDiv,
      premiereDate,
      SlideUtils.createSeparator(),
      ageRatingDiv,
      SlideUtils.createSeparator(),
      runTimeElement
    );

    return ratingTest;
  },

  /**
   * Creates a play button for an item
   * @param {string} itemId - Item ID
   * @returns {HTMLElement} Play button element
   */
  createPlayButton(itemId) {
    return SlideUtils.createElement("button", {
      className: "detailButton btnPlay play-button",
      innerHTML: `
      <span class="play-text">Play</span>
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
            `/details?id=${itemId}&serverId=${STATE.jellyfinData.serverId}`
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
  async createSlideForItemId(itemId) {
    try {
      if (STATE.slideshow.createdSlides[itemId]) {
        return document.querySelector(`.slide[data-item-id="${itemId}"]`);
      }

      const container = SlideUtils.getOrCreateSlidesContainer();

      const item = await ApiUtils.fetchItemDetails(itemId);

      const slideElement = this.createSlideElement(
        item,
        item.Type === "Movie" ? "Movie" : "TV Show"
      );

      container.appendChild(slideElement);

      STATE.slideshow.createdSlides[itemId] = true;

      return slideElement;
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
        (currentIndex % numDots) * (numDots / numDots)
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

  /**
   * Updates current slide to the specified index
   * @param {number} index - Slide index to display
   */

  async updateCurrentSlide(index) {
    if (STATE.slideshow.isTransitioning) {
      return;
    }

    STATE.slideshow.isTransitioning = true;

    try {
      const container = SlideUtils.getOrCreateSlidesContainer();
      const totalItems = STATE.slideshow.totalItems;

      index = Math.max(0, Math.min(index, totalItems - 1));
      const currentItemId = STATE.slideshow.itemIds[index];

      let currentSlide = document.querySelector(
        `.slide[data-item-id="${currentItemId}"]`
      );
      if (!currentSlide) {
        currentSlide = await SlideCreator.createSlideForItemId(currentItemId);
        this.upgradeSlideImageQuality(currentSlide);

        if (!currentSlide) {
          console.error(`Failed to create slide for item ${currentItemId}`);
          STATE.slideshow.isTransitioning = false;
          setTimeout(() => this.nextSlide(), 500);
          return;
        }
      }

      const previousVisibleSlide = container.querySelector(".slide.active");

      if (previousVisibleSlide) {
        previousVisibleSlide.classList.remove("active");
      }

      currentSlide.classList.add("active");

      currentSlide.querySelector(".backdrop").classList.add("animate");
      currentSlide.querySelector(".logo").classList.add("animate");

      STATE.slideshow.currentSlideIndex = index;

      if (index === 0 || !previousVisibleSlide) {
        const dotsContainer = container.querySelector(".dots-container");
        if (dotsContainer) {
          dotsContainer.style.opacity = "1";
        }
      }

      setTimeout(() => {
        const allSlides = container.querySelectorAll(".slide");
        allSlides.forEach((slide) => {
          if (slide !== currentSlide) {
            slide.classList.remove("active");
          }
        });
      }, CONFIG.fadeTransitionDuration);

      this.preloadAdjacentSlides(index);
      this.updateDots();

      if (STATE.slideshow.slideInterval) {
        STATE.slideshow.slideInterval.restart();
      }

      this.pruneSlideCache();
    } catch (error) {
      console.error("Error updating current slide:", error);
    } finally {
      setTimeout(() => {
        STATE.slideshow.isTransitioning = false;
      }, CONFIG.fadeTransitionDuration);
    }
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

      // Prevent duplicate requests if already using high quality
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
        delete STATE.slideshow.loadedItems[itemId];

        const slide = document.querySelector(
          `.slide[data-item-id="${itemId}"]`
        );
        if (slide) slide.remove();

        delete STATE.slideshow.createdSlides[itemId];

        console.log(`Pruned slide ${itemId} at distance ${distance} from view`);
      }
    });
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
      { passive: true }
    );

    container.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      },
      { passive: true }
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

      await this.updateCurrentSlide(0);

      STATE.slideshow.slideInterval = new SlideTimer(() => {
        this.nextSlide();
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

  container.appendChild(leftArrow);
  container.appendChild(rightArrow);

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
    { passive: true }
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
      }
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

    VisibilityObserver.init();

    console.log("✅ Enhanced Jellyfin Slideshow initialized successfully");
  } catch (error) {
    console.error("Error initializing slideshow:", error);
    STATE.slideshow.hasInitialized = false;
  }
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