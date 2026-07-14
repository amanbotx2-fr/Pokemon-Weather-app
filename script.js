const API_ROUTES = {
  search: "/api/search",
  current: "/api/current",
  forecast: "/api/forecast"
};
const REQUEST_TIMEOUT_MS = 9000;
const STORAGE_KEYS = {
  settings: "pokemonWeather.settings.v2",
  favorites: "pokemonWeather.favorites.v2",
  recent: "pokemonWeather.recent.v2"
};

const dom = {};
const state = {
  suggestions: [],
  highlightedSuggestion: -1,
  suggestionController: null,
  weatherController: null,
  loading: false,
  inflightKey: "",
  lastSuccessfulKey: "",
  lastFailedTarget: null,
  activeLocation: null,
  activeWeather: null,
  displayedTemp: null,
  pokemonImageToken: 0,
  settings: readStorage(STORAGE_KEYS.settings, {
    unit: "c",
    animations: "on",
    theme: "dynamic"
  }),
  favorites: readStorage(STORAGE_KEYS.favorites, []),
  recent: readStorage(STORAGE_KEYS.recent, [])
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheDom();
  renderPokemonGuide();
  hydrateSettingsControls();
  applySettings();
  bindEvents();
  closeSuggestions();
  renderFavorites();
  renderRecent();
  showFeedback("empty", "No city selected yet.", "Search for a city or use your current location to start.");
}

function cacheDom() {
  Object.assign(dom, {
    body: document.body,
    form: document.getElementById("search-form"),
    input: document.getElementById("city-input"),
    searchBtn: document.getElementById("search-btn"),
    locationBtn: document.getElementById("current-location-btn"),
    suggestionsPanel: document.getElementById("suggestions-panel"),
    suggestionsStatus: document.getElementById("suggestions-status"),
    suggestionsList: document.getElementById("suggestions-list"),
    feedback: document.getElementById("feedback-card"),
    feedbackTitle: document.getElementById("feedback-title"),
    feedbackMessage: document.getElementById("feedback-message"),
    retryBtn: document.getElementById("retry-btn"),
    saveCityBtn: document.getElementById("save-city-btn"),
    settingsBtn: document.getElementById("settings-btn"),
    settingsModal: document.getElementById("settings-modal"),
    closeSettingsBtn: document.getElementById("close-settings-btn"),
    favoritesBtn: document.getElementById("favorites-btn"),
    favoritesMenu: document.getElementById("favorites-menu"),
    favoritesList: document.getElementById("favorites-list"),
    trainerBtn: document.getElementById("trainer-btn"),
    trainerMenu: document.getElementById("trainer-menu"),
    trainerLocationBtn: document.getElementById("trainer-location-btn"),
    recentList: document.getElementById("recent-list"),
    trainerFavoritesList: document.getElementById("trainer-favorites-list"),
    guideGrid: document.getElementById("pokemon-guide-grid"),
    weatherCard: document.querySelector(".weather-overview"),
    forecastPanel: document.querySelector(".forecast-panel"),
    forecastList: document.getElementById("forecast-list"),
    forecastSummary: document.querySelector(".forecast-summary")
  });
}

function bindEvents() {
  dom.form.addEventListener("submit", handleSearchSubmit);
  dom.input.addEventListener("input", debounce(handleAutocompleteInput, 260));
  dom.input.addEventListener("keydown", handleSearchKeydown);
  dom.input.addEventListener("focus", () => {
    if (state.suggestions.length) openSuggestions();
  });

  dom.locationBtn.addEventListener("click", requestCurrentLocation);
  dom.trainerLocationBtn.addEventListener("click", () => {
    closeMenus();
    requestCurrentLocation();
  });
  dom.retryBtn.addEventListener("click", () => {
    if (state.lastFailedTarget) searchWeather(state.lastFailedTarget, { force: true });
  });
  dom.saveCityBtn.addEventListener("click", toggleActiveFavorite);

  document.querySelectorAll("[data-search-city]").forEach((button) => {
    button.addEventListener("click", () => searchWeather(button.dataset.searchCity, { force: true }));
  });

  dom.settingsBtn.addEventListener("click", openSettings);
  dom.closeSettingsBtn.addEventListener("click", closeSettings);
  dom.settingsModal.addEventListener("click", (event) => {
    if (event.target === dom.settingsModal) closeSettings();
  });
  document.querySelectorAll(".setting-group input").forEach((input) => {
    input.addEventListener("change", handleSettingChange);
  });

  dom.favoritesBtn.addEventListener("click", () => toggleMenu("favorites"));
  dom.trainerBtn.addEventListener("click", () => toggleMenu("trainer"));

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu-wrap")) closeMenus();
    if (!event.target.closest(".search-bar")) closeSuggestions();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSuggestions();
      closeMenus();
      closeSettings();
    }
  });

  document.addEventListener("pointerdown", addButtonRipple);
}

async function handleAutocompleteInput() {
  if (state.loading) {
    state.suggestions = [];
    dom.suggestionsList.replaceChildren();
    dom.input.setAttribute("aria-activedescendant", "");
    closeSuggestions();
    return;
  }

  const query = dom.input.value.trim();
  state.highlightedSuggestion = -1;

  if (query.length < 2) {
    state.suggestions = [];
    renderSuggestions([]);
    dom.suggestionsStatus.textContent = "Type at least 2 letters to search cities.";
    closeSuggestions();
    return;
  }

  if (state.suggestionController) state.suggestionController.abort();
  state.suggestions = [];
  dom.suggestionsList.replaceChildren();
  dom.input.setAttribute("aria-activedescendant", "");
  state.suggestionController = new AbortController();
  dom.suggestionsStatus.textContent = "Searching cities...";
  openSuggestions();

  try {
    const results = await fetchWeatherApi("search", { q: query }, state.suggestionController.signal);
    if (dom.input.value.trim() !== query) return;
    state.suggestions = Array.isArray(results) ? results.slice(0, 8) : [];
    renderSuggestions(state.suggestions);
  } catch (error) {
    if (error.name === "AbortError") return;
    state.suggestions = [];
    renderSuggestions([]);
    dom.suggestionsStatus.textContent = "City search is unavailable. You can still press Enter.";
  }
}

function renderSuggestions(suggestions) {
  dom.suggestionsList.replaceChildren();
  dom.input.setAttribute("aria-expanded", suggestions.length ? "true" : "false");

  if (!suggestions.length) {
    dom.suggestionsStatus.textContent = "No matching cities found.";
    return;
  }

  dom.suggestionsStatus.textContent = `${suggestions.length} location suggestions`;
  suggestions.forEach((place, index) => {
    const item = document.createElement("li");
    item.id = `suggestion-${index}`;
    item.role = "option";
    item.dataset.index = String(index);
    item.setAttribute("aria-selected", "false");
    item.innerHTML = `
      <button type="button">
        <strong>${escapeHtml(place.name)}</strong>
        <span>${escapeHtml(formatRegion(place))}</span>
      </button>
    `;
    item.addEventListener("mousedown", (event) => event.preventDefault());
    item.addEventListener("click", () => selectSuggestion(index));
    dom.suggestionsList.appendChild(item);
  });
}

function handleSearchKeydown(event) {
  const hasSuggestions = state.suggestions.length > 0 && !dom.suggestionsPanel.hidden;

  if (event.key === "ArrowDown" && hasSuggestions) {
    event.preventDefault();
    highlightSuggestion(Math.min(state.highlightedSuggestion + 1, state.suggestions.length - 1));
  } else if (event.key === "ArrowUp" && hasSuggestions) {
    event.preventDefault();
    highlightSuggestion(Math.max(state.highlightedSuggestion - 1, 0));
  } else if (event.key === "Enter" && hasSuggestions && state.highlightedSuggestion >= 0) {
    event.preventDefault();
    selectSuggestion(state.highlightedSuggestion);
  } else if (event.key === "Escape") {
    closeSuggestions();
  }
}

function highlightSuggestion(index) {
  state.highlightedSuggestion = index;
  [...dom.suggestionsList.children].forEach((item, itemIndex) => {
    const selected = itemIndex === index;
    item.classList.toggle("is-highlighted", selected);
    item.setAttribute("aria-selected", selected ? "true" : "false");
  });
  dom.input.setAttribute("aria-activedescendant", index >= 0 ? `suggestion-${index}` : "");
}

function selectSuggestion(index) {
  const place = state.suggestions[index];
  if (!place) return;
  dom.input.value = `${place.name}, ${place.region || place.country}`;
  closeSuggestions();
  searchWeather(normalizeLocationTarget(place), { force: true });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const query = dom.input.value.trim();

  if (!query) {
    showFeedback("empty", "No city selected yet.", "Search for a city, choose a suggestion, or use your current location.");
    dom.input.focus();
    return;
  }

  closeSuggestions();
  searchWeather(query, { force: false });
}

async function searchWeather(target, options = {}) {
  clearSuggestions();
  const requestKey = getTargetKey(target);

  if (!options.force && state.loading && requestKey === state.inflightKey) return;
  if (!options.force && requestKey === state.lastSuccessfulKey) return;

  abortWeatherRequest();
  state.weatherController = new AbortController();
  state.inflightKey = requestKey;
  state.loading = true;
  state.lastFailedTarget = target;
  setLoading(true);
  hideFeedback();

  try {
    const data = await fetchWeatherApi("forecast", {
      q: getWeatherQuery(target),
      days: "5",
      aqi: "yes",
      alerts: "no"
    }, state.weatherController.signal);

    state.loading = false;
    state.lastSuccessfulKey = requestKey;
    state.lastFailedTarget = null;
    state.activeWeather = data;
    state.activeLocation = locationFromWeather(data.location, target);
    renderWeather(data);
    saveRecent(state.activeLocation);
    renderRecent();
    renderFavorites();
    setLoading(false);
  } catch (error) {
    if (error.name === "AbortError") return;
    state.loading = false;
    setLoading(false);
    state.lastSuccessfulKey = "";
    handleWeatherError(error, target);
  }
}

async function fetchWeatherApi(endpoint, params, externalSignal) {
  const route = API_ROUTES[endpoint];
  if (!route) {
    const routeError = new Error(`Unknown weather endpoint: ${endpoint}`);
    routeError.code = "unknown-endpoint";
    throw routeError;
  }

  const query = new URLSearchParams(params).toString();
  const url = query ? `${route}?${query}` : route;

  const controller = new AbortController();
  let timedOut = false;
  const timeoutId = window.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  const abortFromExternal = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    externalSignal.addEventListener("abort", abortFromExternal, { once: true });
  }

  try {
    const response = await fetch(url, { signal: controller.signal });
    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(json?.error?.message || "Weather request failed");
      error.status = response.status;
      error.code = json?.error?.code;
      throw error;
    }

    return json;
  } catch (error) {
    if (timedOut) {
      const timeoutError = new Error("Request timed out");
      timeoutError.code = "timeout";
      throw timeoutError;
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
    if (externalSignal) externalSignal.removeEventListener("abort", abortFromExternal);
  }
}

function abortWeatherRequest() {
  if (state.weatherController) {
    state.weatherController.abort();
    state.weatherController = null;
  }
}

function handleWeatherError(error, target) {
  const queryLabel = typeof target === "string" ? target : target?.label || "that location";

  if (error.status === 401 || error.code === 2006 || error.code === "missing-env") {
    showFeedback("network", "Weather service setup issue.", "Weather is not configured on the server. Add WEATHER_API_KEY in Vercel and redeploy.");
    setWeatherControlsEnabled(false);
    return;
  }

  if (error.code === "timeout") {
    showFeedback("network", "Connection lost.", "The weather request took too long. Check your connection and try again.", { retry: true });
    return;
  }

  if (error.status === 400 || error.code === 1006) {
    showFeedback("not-found", "City not found.", `We couldn't find ${queryLabel}. Try searching Jaipur, Delhi, or Mumbai.`, { retry: false });
    return;
  }

  showFeedback("network", "Network error.", "Weather data is temporarily unavailable. Try again in a moment.", { retry: true });
}

function renderWeather(data) {
  const current = data.current || {};
  const location = data.location || {};
  const today = data.forecast?.forecastday?.[0] || {};
  const astro = today.astro || {};
  const condition = current.condition?.text || "Unknown";
  const pokemon = selectWeatherPokemon({
    location,
    current,
    forecastDay: today,
    date: location.localtime
  });
  const unit = state.settings.unit;

  applyWeatherTheme(pokemon.theme);
  dom.body.classList.add("has-weather");

  setText(".location", location.name || state.activeLocation?.name || "Current location");
  setText(".region", [location.region, location.country].filter(Boolean).join(", ") || "Weather station");
  setText(".date", formatLocalTime(location.localtime));
  setText(".status", condition);
  setText(".feels-like", `Feels like ${formatTemp(current.feelslike_c, current.feelslike_f)}`);
  setText(".details", `Wind ${formatWind(current)} · Humidity ${current.humidity ?? "--"}%`);
  animateTemperature(getTempValue(current.temp_c, current.temp_f), unit);

  setText(".metric-wind", formatWind(current));
  setText(".metric-humidity", `${current.humidity ?? "--"}%`);
  setText(".metric-visibility", formatVisibility(current));
  setText(".metric-uv", formatUv(current.uv));

  setText(".detail-feels", formatTemp(current.feelslike_c, current.feelslike_f));
  setText(".detail-humidity", `${current.humidity ?? "--"}%`);
  setText(".detail-wind", formatWind(current));
  setText(".detail-visibility", formatVisibility(current));
  setText(".detail-pressure", current.pressure_mb ? `${Math.round(current.pressure_mb)} hPa` : "--");
  setText(".detail-cloud", current.cloud !== undefined ? `${current.cloud}%` : "--");
  setText(".detail-uv", formatUv(current.uv));
  setText(".detail-dew", formatTemp(current.dewpoint_c, current.dewpoint_f));
  setText(".detail-sunrise", astro.sunrise || "--");
  setText(".detail-sunset", astro.sunset || "--");
  setText(".detail-air", formatAirQuality(current.air_quality));

  renderAirQuality(current.air_quality);
  renderPokemonPartner(pokemon, condition);
  renderForecast(data.forecast?.forecastday || []);
  updateFavoriteButton();
}

function renderPokemonPartner(pokemon, condition) {
  const image = document.getElementById("pokemon-img");
  const imageSrc = pokemon.image || pokemon.sprite;
  updatePokemonImage(image, imageSrc, `${pokemon.name}, matched with ${condition}`);

  setText(".partner-name", pokemon.name);
  setText(".partner-description", formatPokemonDescription(pokemon));
  setText(".partner-weather", pokemon.encounterMessage || pokemon.relation);
  setText(".partner-height", pokemon.height);
  setText(".partner-weight", pokemon.weight);
  setText(".partner-ability", pokemon.ability);

  const badges = document.querySelector(".partner-badges");
  const types = pokemon.types || pokemon.type || [];
  badges.replaceChildren(...types.map((type, index) => {
    const badge = document.createElement("span");
    badge.className = `badge ${index === 0 ? "badge-neutral" : "badge-accent"}`;
    badge.textContent = type;
    return badge;
  }));

  setText(".trainer-copy", formatTrainerTip(pokemon));
}

function renderForecast(forecastDays) {
  dom.forecastList.replaceChildren();

  if (!forecastDays.length) {
    dom.forecastSummary.textContent = "Forecast data is unavailable for this city.";
    document.querySelector(".forecast-panel h2").textContent = "Forecast";
    dom.forecastList.style.setProperty("--forecast-count", "1");
    return;
  }

  const days = forecastDays.slice(0, 5);
  document.querySelector(".forecast-panel h2").textContent = `Next ${days.length} ${days.length === 1 ? "Day" : "Days"}`;
  dom.forecastSummary.textContent = `${days.length} day forecast from WeatherAPI`;
  dom.forecastList.style.setProperty("--forecast-count", String(days.length));
  days.forEach((forecastDay, index) => {
    const day = forecastDay.day || {};
    const condition = day.condition?.text || "Unknown";
    const pokemon = selectForecastPokemon(forecastDay);
    const card = document.createElement("article");
    card.className = `day ${index === 0 ? "active" : ""}`;
    card.innerHTML = `
      <p>${escapeHtml(index === 0 ? "Today" : formatDay(forecastDay.date))}</p>
      <img src="https:${escapeHtml(day.condition?.icon || "")}" alt="${escapeHtml(condition)}" loading="lazy">
      <h3>${escapeHtml(formatTempRange(day))}</h3>
      <small>${escapeHtml(condition)}</small>
      <img class="forecast-pokemon" src="${escapeHtml(pokemon.image || pokemon.sprite)}" alt="${escapeHtml(pokemon.name)}" loading="lazy">
    `;
    dom.forecastList.appendChild(card);
  });
}

function renderPokemonGuide() {
  const guidePokemon = PokemonWeatherEngine.getGuidePokemon();
  dom.guideGrid.replaceChildren(...guidePokemon.map((pokemon) => {
    const card = document.createElement("article");
    card.className = "type";
    card.innerHTML = `
      <img src="${escapeHtml(pokemon.image || pokemon.sprite)}" alt="${escapeHtml(pokemon.name)}" loading="lazy" />
      <div>
        <h3>${escapeHtml(pokemon.name)}</h3>
        <p>${escapeHtml(pokemon.weatherLabel || pokemon.weather)}</p>
        <span>${escapeHtml((pokemon.types || pokemon.type || []).join(" / "))}</span>
      </div>
    `;
    return card;
  }));
}

function renderAirQuality(airQuality) {
  const epa = airQuality?.["us-epa-index"];
  const pm25 = airQuality?.pm2_5;

  if (!epa && !pm25) {
    setText(".air-label", "Unavailable");
    setText(".air-score-value", "--");
    setText(".air-description", "Air quality was not returned for this location.");
    return;
  }

  setText(".air-label", aqiLabel(epa));
  setText(".air-score-value", pm25 ? Math.round(pm25) : epa);
  setText(".air-description", epa ? `US EPA index ${epa}. PM2.5 ${formatNumber(pm25)}.` : `PM2.5 ${formatNumber(pm25)}.`);
}

function requestCurrentLocation() {
  if (!navigator.geolocation) {
    showFeedback("network", "Location unavailable.", "Your browser does not support current location search.");
    return;
  }

  setLoading(true, "Finding location...");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      searchWeather({ lat: latitude, lon: longitude, label: "Current location" }, { force: true });
    },
    (error) => {
      setLoading(false);
      const denied = error.code === error.PERMISSION_DENIED;
      showFeedback(
        "network",
        denied ? "Location permission denied." : "Location unavailable.",
        denied ? "Enable location access or search for a city manually." : "We could not detect your current location. Search for a city instead."
      );
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
  );
}

function toggleActiveFavorite() {
  if (!state.activeLocation) return;
  const exists = favoriteIndex(state.activeLocation) >= 0;

  if (exists) {
    state.favorites.splice(favoriteIndex(state.activeLocation), 1);
  } else {
    state.favorites.unshift(state.activeLocation);
  }

  state.favorites = uniqueLocations(state.favorites).slice(0, 20);
  writeStorage(STORAGE_KEYS.favorites, state.favorites);
  renderFavorites();
  updateFavoriteButton();
}

function renderFavorites() {
  const empty = `<p class="empty-menu">No favorites yet. Save a city after searching.</p>`;
  renderLocationList(dom.favoritesList, state.favorites, { removable: true, empty });
  renderLocationList(dom.trainerFavoritesList, state.favorites, { removable: false, empty });
}

function renderRecent() {
  renderLocationList(dom.recentList, state.recent, {
    removable: false,
    empty: `<p class="empty-menu">No recent searches yet.</p>`
  });
}

function renderLocationList(container, locations, options) {
  container.replaceChildren();

  if (!locations.length) {
    container.innerHTML = options.empty;
    return;
  }

  locations.forEach((location) => {
    const row = document.createElement("div");
    row.className = "menu-location-row";

    const searchButton = document.createElement("button");
    searchButton.type = "button";
    searchButton.className = "menu-location";
    searchButton.innerHTML = `<strong>${escapeHtml(location.name)}</strong><span>${escapeHtml(formatRegion(location))}</span>`;
    searchButton.addEventListener("click", () => {
      closeMenus();
      dom.input.value = location.label;
      searchWeather(location, { force: true });
    });
    row.appendChild(searchButton);

    if (options.removable) {
      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "remove-location";
      removeButton.setAttribute("aria-label", `Remove ${location.name} from favorites`);
      removeButton.textContent = "×";
      removeButton.addEventListener("click", () => {
        state.favorites = state.favorites.filter((item) => item.key !== location.key);
        writeStorage(STORAGE_KEYS.favorites, state.favorites);
        renderFavorites();
        updateFavoriteButton();
      });
      row.appendChild(removeButton);
    }

    container.appendChild(row);
  });
}

function saveRecent(location) {
  state.recent = uniqueLocations([location, ...state.recent]).slice(0, 10);
  writeStorage(STORAGE_KEYS.recent, state.recent);
}

function updateFavoriteButton() {
  if (!state.activeLocation) {
    dom.saveCityBtn.disabled = true;
    dom.saveCityBtn.classList.remove("is-saved");
    dom.saveCityBtn.querySelector("span").textContent = "Save City";
    return;
  }

  const saved = favoriteIndex(state.activeLocation) >= 0;
  dom.saveCityBtn.disabled = false;
  dom.saveCityBtn.classList.toggle("is-saved", saved);
  dom.saveCityBtn.querySelector("span").textContent = saved ? "Saved" : "Save City";
}

function favoriteIndex(location) {
  return state.favorites.findIndex((item) => item.key === location.key);
}

function uniqueLocations(locations) {
  const seen = new Set();
  return locations.filter((location) => {
    if (!location?.key || seen.has(location.key)) return false;
    seen.add(location.key);
    return true;
  });
}

function handleSettingChange(event) {
  const { name, value } = event.target;
  state.settings[name] = value;
  if (name === "unit") state.displayedTemp = null;
  writeStorage(STORAGE_KEYS.settings, state.settings);
  applySettings();
  if (state.activeWeather) renderWeather(state.activeWeather);
}

function hydrateSettingsControls() {
  document.querySelectorAll(".setting-group input").forEach((input) => {
    input.checked = state.settings[input.name] === input.value;
  });
}

function applySettings() {
  dom.body.dataset.theme = state.settings.theme;
  dom.body.classList.toggle("animations-off", state.settings.animations === "off");
}

function openSettings() {
  hydrateSettingsControls();
  dom.settingsModal.hidden = false;
  dom.closeSettingsBtn.focus();
}

function closeSettings() {
  if (!dom.settingsModal.hidden) {
    dom.settingsModal.hidden = true;
    dom.settingsBtn.focus();
  }
}

function toggleMenu(menuName) {
  const isFavorites = menuName === "favorites";
  const button = isFavorites ? dom.favoritesBtn : dom.trainerBtn;
  const menu = isFavorites ? dom.favoritesMenu : dom.trainerMenu;
  const otherButton = isFavorites ? dom.trainerBtn : dom.favoritesBtn;
  const otherMenu = isFavorites ? dom.trainerMenu : dom.favoritesMenu;
  const willOpen = !menu.classList.contains("is-open");

  otherMenu.classList.remove("is-open");
  otherButton.setAttribute("aria-expanded", "false");
  menu.classList.toggle("is-open", willOpen);
  button.setAttribute("aria-expanded", willOpen ? "true" : "false");
}

function closeMenus() {
  dom.favoritesMenu.classList.remove("is-open");
  dom.trainerMenu.classList.remove("is-open");
  dom.favoritesBtn.setAttribute("aria-expanded", "false");
  dom.trainerBtn.setAttribute("aria-expanded", "false");
}

function openSuggestions() {
  dom.suggestionsPanel.classList.add("is-open");
  dom.suggestionsPanel.hidden = false;
  dom.input.setAttribute("aria-expanded", "true");
}

function closeSuggestions() {
  if (state.suggestionController) {
    state.suggestionController.abort();
    state.suggestionController = null;
  }
  dom.suggestionsPanel.classList.remove("is-open");
  dom.suggestionsPanel.hidden = true;
  dom.input.setAttribute("aria-expanded", "false");
  dom.input.setAttribute("aria-activedescendant", "");
  state.highlightedSuggestion = -1;
}

function clearSuggestions() {
  if (state.suggestionController) state.suggestionController.abort();
  state.suggestions = [];
  state.highlightedSuggestion = -1;
  dom.suggestionsList.replaceChildren();
  dom.suggestionsStatus.textContent = "Start typing to search cities.";
  closeSuggestions();
}

function showFeedback(kind, title, message, options = {}) {
  dom.feedback.dataset.kind = kind;
  dom.feedback.hidden = false;
  dom.feedbackTitle.textContent = title;
  dom.feedbackMessage.textContent = message;
  dom.retryBtn.hidden = !options.retry;
}

function hideFeedback() {
  dom.feedback.hidden = true;
}

function setLoading(isLoading, label = "Loading weather...") {
  state.loading = isLoading;
  dom.body.classList.toggle("is-loading", isLoading);
  dom.searchBtn.disabled = isLoading;
  dom.locationBtn.disabled = isLoading;
  dom.searchBtn.setAttribute("aria-label", isLoading ? label : "Search weather");
  dom.weatherCard.setAttribute("aria-busy", isLoading ? "true" : "false");
  dom.forecastPanel.setAttribute("aria-busy", isLoading ? "true" : "false");
}

function setWeatherControlsEnabled(isEnabled) {
  dom.searchBtn.disabled = !isEnabled;
  dom.locationBtn.disabled = !isEnabled;
  dom.input.disabled = !isEnabled;
}

function applyWeatherTheme(theme) {
  dom.body.dataset.weather = state.settings.theme === "light" ? "idle" : theme;
}

function animateTemperature(nextValue, unit) {
  const target = document.querySelector(".main-temp h1");
  const suffix = `°${unit.toUpperCase()}`;

  if (nextValue === null || nextValue === undefined || Number.isNaN(nextValue)) {
    target.textContent = `--${suffix}`;
    return;
  }

  if (state.settings.animations === "off" || state.displayedTemp === null) {
    state.displayedTemp = nextValue;
    target.textContent = `${Math.round(nextValue)}${suffix}`;
    return;
  }

  const start = state.displayedTemp;
  const end = nextValue;
  const duration = 520;
  const startedAt = performance.now();
  state.displayedTemp = nextValue;

  function tick(now) {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = start + (end - start) * eased;
    target.textContent = `${Math.round(value)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function addButtonRipple(event) {
  const button = event.target.closest("button, .footer-links a");
  if (!button || state.settings.animations === "off") return;
  const rect = button.getBoundingClientRect();
  const ripple = document.createElement("span");
  const size = Math.max(rect.width, rect.height);
  ripple.className = "ripple";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  button.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 550);
}

function selectWeatherPokemon(context) {
  return PokemonWeatherEngine.selectPokemon(context);
}

function selectForecastPokemon(forecastDay) {
  return PokemonWeatherEngine.selectForecastPokemon({
    forecastDay,
    location: state.activeWeather?.location || state.activeLocation
  });
}

function updatePokemonImage(image, src, alt) {
  if (!image || !src) return;

  const token = state.pokemonImageToken + 1;
  state.pokemonImageToken = token;
  image.alt = alt;
  image.loading = "eager";

  const sameImage = image.getAttribute("src") === src;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const shouldAnimate = !sameImage && state.settings.animations !== "off" && image.animate && !reducedMotion;

  if (!shouldAnimate) {
    image.src = src;
    return;
  }

  const exitAnimation = image.animate([
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.94)" }
  ], {
    duration: 130,
    easing: "ease",
    fill: "forwards"
  });

  exitAnimation.finished
    .catch(() => {})
    .then(() => {
      exitAnimation.cancel();
      if (token !== state.pokemonImageToken) return null;
      image.src = src;
      return typeof image.decode === "function" ? image.decode().catch(() => null) : null;
    })
    .then(() => {
      if (token !== state.pokemonImageToken) return;
      image.animate([
        { opacity: 0, transform: "translateY(8px) scale(0.96)" },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ], {
        duration: 240,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        fill: "none"
      });
    });
}

function formatPokemonDescription(pokemon) {
  return [pokemon.description, pokemon.funFact ? `Fact: ${pokemon.funFact}` : ""].filter(Boolean).join(" ");
}

function formatTrainerTip(pokemon) {
  return [
    pokemon.trainerTip,
    pokemon.bestWeather ? `Best weather: ${pokemon.bestWeather}.` : "",
    pokemon.weakness ? `Weakness: ${pokemon.weakness}.` : ""
  ].filter(Boolean).join(" ");
}

function normalizeLocationTarget(place) {
  const label = [place.name, place.region, place.country].filter(Boolean).join(", ");
  return {
    id: place.id,
    name: place.name,
    region: place.region || "",
    country: place.country || "",
    lat: place.lat,
    lon: place.lon,
    label,
    key: place.id ? `id:${place.id}` : label.toLowerCase()
  };
}

function locationFromWeather(location, target) {
  const name = location?.name || target?.name || "Current location";
  const region = location?.region || target?.region || "";
  const country = location?.country || target?.country || "";
  const label = [name, region, country].filter(Boolean).join(", ");
  const key = target?.id ? `id:${target.id}` : label.toLowerCase();
  return {
    id: target?.id || null,
    name,
    region,
    country,
    lat: location?.lat || target?.lat || null,
    lon: location?.lon || target?.lon || null,
    label,
    key
  };
}

function getWeatherQuery(target) {
  if (typeof target === "string") return target;
  if (target?.id) return `id:${target.id}`;
  if (target?.lat !== undefined && target?.lon !== undefined) return `${target.lat},${target.lon}`;
  return target?.label || target?.name || "";
}

function getTargetKey(target) {
  if (typeof target === "string") return target.trim().toLowerCase();
  if (target?.id) return `id:${target.id}`;
  if (target?.lat !== undefined && target?.lon !== undefined) return `${Number(target.lat).toFixed(3)},${Number(target.lon).toFixed(3)}`;
  return (target?.label || target?.name || "").toLowerCase();
}

function formatRegion(place) {
  return [place.region, place.country].filter(Boolean).join(", ") || "WeatherAPI location";
}

function formatLocalTime(localtime) {
  if (!localtime) return "Local time unavailable";
  const [date, time] = localtime.split(" ");
  if (!date || !time) return localtime;
  return `${time} · ${date}`;
}

function formatDay(dateString) {
  if (!dateString) return "Next day";
  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString(undefined, { weekday: "short", day: "numeric" });
}

function getTempValue(celsius, fahrenheit) {
  return state.settings.unit === "f" ? fahrenheit : celsius;
}

function formatTemp(celsius, fahrenheit) {
  const value = getTempValue(celsius, fahrenheit);
  if (value === null || value === undefined || Number.isNaN(value)) return "--";
  return `${Math.round(value)}°${state.settings.unit.toUpperCase()}`;
}

function formatTempRange(day) {
  return `${formatTemp(day.maxtemp_c, day.maxtemp_f)} / ${formatTemp(day.mintemp_c, day.mintemp_f)}`;
}

function formatWind(current) {
  return current.wind_kph !== undefined ? `${formatNumber(current.wind_kph)} kph` : "--";
}

function formatVisibility(current) {
  return current.vis_km !== undefined ? `${formatNumber(current.vis_km)} km` : "--";
}

function formatUv(uv) {
  if (uv === null || uv === undefined) return "--";
  if (uv < 3) return `${formatNumber(uv)} Low`;
  if (uv < 6) return `${formatNumber(uv)} Moderate`;
  if (uv < 8) return `${formatNumber(uv)} High`;
  return `${formatNumber(uv)} Very High`;
}

function formatAirQuality(airQuality) {
  const epa = airQuality?.["us-epa-index"];
  return epa ? `${aqiLabel(epa)} (${epa})` : "--";
}

function aqiLabel(index) {
  return {
    1: "Good",
    2: "Moderate",
    3: "Unhealthy for sensitive groups",
    4: "Unhealthy",
    5: "Very Unhealthy",
    6: "Hazardous"
  }[index] || "Unknown";
}

function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "--";
  const number = Number(value);
  return Number.isInteger(number) ? String(number) : number.toFixed(1);
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
