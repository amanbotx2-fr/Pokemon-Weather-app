(function () {
  const DATABASE = window.PokemonWeatherDatabase || [];
  const MESSAGES = window.PokemonWeatherMessages || {};

  const RARITY_WEIGHTS = {
    Common: 70,
    Uncommon: 20,
    Rare: 8,
    Legendary: 2
  };

  const CONDITION_PATTERNS = [
    { category: "thunder", tokens: ["thunder", "thundery", "lightning"] },
    { category: "storm", tokens: ["storm", "squall", "torrential"] },
    { category: "snow", tokens: ["snow", "blizzard", "sleet"] },
    { category: "ice", tokens: ["ice", "freezing", "pellets"] },
    { category: "rain", tokens: ["rain", "shower"] },
    { category: "drizzle", tokens: ["drizzle"] },
    { category: "mist", tokens: ["mist"] },
    { category: "fog", tokens: ["fog"] },
    { category: "dust", tokens: ["dust", "sand"] },
    { category: "haze", tokens: ["haze", "smoke"] },
    { category: "wind", tokens: ["wind", "gale"] },
    { category: "partly-cloudy", tokens: ["partly cloudy"] },
    { category: "overcast", tokens: ["overcast"] },
    { category: "cloudy", tokens: ["cloud"] },
    { category: "sunny", tokens: ["sunny"] },
    { category: "clear", tokens: ["clear"] }
  ];

  const METRIC_RULES = [
    { category: "hot", applies: (context) => context.temperatureC >= 32 },
    { category: "cold", applies: (context) => context.temperatureC <= 8 },
    { category: "humid", applies: (context) => context.humidity >= 72 },
    { category: "dry", applies: (context) => context.humidity <= 35 && context.temperatureC >= 24 },
    { category: "wind", applies: (context) => context.windKph >= 30 },
    { category: "high-uv", applies: (context) => context.uv >= 7 },
    { category: "low-visibility", applies: (context) => context.visibilityKm <= 4 },
    { category: "polluted", applies: (context) => context.epaIndex >= 3 || context.pm25 >= 35 },
    { category: "clean-air", applies: (context) => isFiniteNumber(context.epaIndex) && context.epaIndex <= 2 },
    { category: "night", applies: (context) => context.timeOfDay === "night" },
    { category: "morning", applies: (context) => context.timeOfDay === "morning" },
    { category: "afternoon", applies: (context) => context.timeOfDay === "afternoon" },
    { category: "evening", applies: (context) => context.timeOfDay === "evening" },
    { category: "mild", applies: (context) => context.temperatureC >= 16 && context.temperatureC <= 29 && context.windKph < 30 }
  ];

  const TYPE_CATEGORY_BOOSTS = [
    { category: "hot", types: ["Fire", "Ground"], score: 4 },
    { category: "high-uv", types: ["Fire", "Electric", "Grass"], score: 2 },
    { category: "rain", types: ["Water", "Grass"], score: 5 },
    { category: "drizzle", types: ["Water", "Grass"], score: 4 },
    { category: "humid", types: ["Water", "Grass", "Poison"], score: 3 },
    { category: "thunder", types: ["Electric"], score: 6 },
    { category: "storm", types: ["Electric", "Flying"], score: 3 },
    { category: "snow", types: ["Ice"], score: 6 },
    { category: "ice", types: ["Ice"], score: 5 },
    { category: "cold", types: ["Ice", "Dark"], score: 3 },
    { category: "mist", types: ["Ghost"], score: 5 },
    { category: "fog", types: ["Ghost", "Dark"], score: 5 },
    { category: "low-visibility", types: ["Ghost", "Dark"], score: 3 },
    { category: "wind", types: ["Flying", "Dragon"], score: 4 },
    { category: "dust", types: ["Ground", "Rock"], score: 5 },
    { category: "haze", types: ["Ground", "Poison", "Ghost"], score: 3 },
    { category: "polluted", types: ["Poison", "Ground", "Steel", "Ghost"], score: 2 },
    { category: "night", types: ["Ghost", "Dark"], score: 4 },
    { category: "morning", types: ["Flying", "Grass"], score: 2 }
  ];

  const THEME_BY_CATEGORY = {
    sunny: "sunny",
    clear: "sunny",
    hot: "sunny",
    dry: "sunny",
    dust: "sunny",
    haze: "sunny",
    rain: "rain",
    drizzle: "rain",
    humid: "rain",
    thunder: "thunder",
    storm: "thunder",
    snow: "snow",
    ice: "snow",
    cold: "snow",
    mist: "mist",
    fog: "mist",
    "low-visibility": "mist",
    cloudy: "cloudy",
    "partly-cloudy": "cloudy",
    overcast: "cloudy",
    wind: "cloudy"
  };

  const REGION_CLIMATE_RULES = [
    { climate: "coastal", tokens: ["coast", "bay", "harbor", "beach", "mumbai", "chennai", "kolkata", "goa", "kochi", "visakhapatnam"] },
    { climate: "mountain", tokens: ["mountain", "hill", "shimla", "darjeeling", "srinagar", "manali", "leh", "dehradun"] },
    { climate: "dry", tokens: ["desert", "rajasthan", "jaipur", "jodhpur", "bikaner", "ahmedabad", "kutch"] },
    { climate: "river", tokens: ["river", "ganga", "yamuna", "lucknow", "varanasi", "patna"] },
    { climate: "urban", tokens: ["delhi", "mumbai", "bengaluru", "bangalore", "hyderabad", "pune", "ahmedabad", "lucknow", "jaipur", "chennai", "kolkata"] },
    { climate: "park", tokens: ["garden", "park", "green"] }
  ];

  function selectPokemon(input = {}) {
    return choosePokemon(normalizeWeatherContext(input));
  }

  function selectForecastPokemon(input = {}) {
    const forecastDay = input.forecastDay || {};
    const day = forecastDay.day || {};
    return choosePokemon(normalizeWeatherContext({
      location: input.location,
      condition: day.condition?.text,
      date: forecastDay.date,
      current: {
        temp_c: day.avgtemp_c ?? day.maxtemp_c,
        humidity: day.avghumidity,
        wind_kph: day.maxwind_kph,
        cloud: day.daily_chance_of_rain,
        uv: day.uv,
        vis_km: day.avgvis_km,
        is_day: 1
      },
      forecastDay
    }));
  }

  function choosePokemon(context) {
    const conditionCategories = getConditionCategories(context);
    const categories = getWeatherCategories(context, conditionCategories);
    const climateTags = inferClimateTags(context, categories);
    const seedText = buildSeed(context, categories);
    const seedNumber = hashString(seedText);
    const scored = DATABASE
      .map((pokemon) => scorePokemon(pokemon, context, categories, climateTags))
      .sort((a, b) => b.weight - a.weight || a.pokemon.name.localeCompare(b.pokemon.name));
    const dominantCategories = conditionCategories.length ? conditionCategories : categories;
    const dominantMatches = scored.filter((item) => hasDominantMatch(item.pokemon, context, dominantCategories) || item.score >= 32);
    const eligible = dominantMatches.length ? dominantMatches : scored.filter((item) => item.score >= 8 || hasAny(item.pokemon.weatherAffinity, ["other", "mild"]));
    const selectionPool = eligible.length ? eligible : scored;
    const selected = weightedPick(selectionPool, seedNumber);
    return decoratePokemon(selected, context, categories, climateTags, seedNumber);
  }

  function normalizeWeatherContext(input) {
    const current = input.current || {};
    const forecastDay = input.forecastDay || {};
    const day = forecastDay.day || {};
    const location = input.location || {};
    const airQuality = current.air_quality || input.airQuality || {};
    const localTime = input.date || location.localtime || forecastDay.date || "";
    const condition = input.condition || current.condition?.text || day.condition?.text || "Unknown";
    const hour = getHour(localTime);
    const isDay = current.is_day ?? input.isDay;
    const temperatureC = numberFrom(current.temp_c ?? day.avgtemp_c ?? day.maxtemp_c ?? input.temperatureC, 22);
    const humidity = numberFrom(current.humidity ?? day.avghumidity ?? input.humidity, 50);
    const windKph = numberFrom(current.wind_kph ?? day.maxwind_kph ?? input.windKph, 0);
    const cloud = numberFrom(current.cloud ?? input.cloud ?? day.daily_chance_of_rain, 0);
    const uv = numberFrom(current.uv ?? day.uv ?? input.uv, 0);
    const visibilityKm = numberFrom(current.vis_km ?? day.avgvis_km ?? input.visibilityKm, 10);
    const epaIndex = numberFrom(airQuality["us-epa-index"], null);
    const pm25 = numberFrom(airQuality.pm2_5, null);
    const city = location.name || input.city || "this city";

    return {
      city,
      region: location.region || input.region || "",
      country: location.country || input.country || "",
      condition,
      normalizedCondition: normalize(condition),
      dateKey: getDateKey(localTime),
      hour,
      isDay,
      timeOfDay: getTimeOfDay(hour, isDay),
      temperatureC,
      humidity,
      windKph,
      cloud,
      uv,
      visibilityKm,
      epaIndex,
      pm25
    };
  }

  function getWeatherCategories(context, conditionCategories = getConditionCategories(context)) {
    const metricCategories = METRIC_RULES
      .filter((rule) => safelyApplies(rule, context))
      .map((rule) => rule.category);
    const categories = unique([...conditionCategories, ...metricCategories]);
    return categories.length ? categories : ["other"];
  }

  function getConditionCategories(context) {
    return CONDITION_PATTERNS
      .filter((rule) => rule.tokens.some((token) => context.normalizedCondition.includes(token)))
      .map((rule) => rule.category);
  }

  function safelyApplies(rule, context) {
    try {
      return Boolean(rule.applies(context));
    } catch {
      return false;
    }
  }

  function scorePokemon(pokemon, context, categories, climateTags) {
    const categorySet = new Set(categories);
    const affinityMatches = (pokemon.weatherAffinity || []).filter((category) => categorySet.has(category));
    const preferredMatches = (pokemon.preferredWeather || []).filter((weather) => context.normalizedCondition.includes(normalize(weather)));
    const typeScore = TYPE_CATEGORY_BOOSTS.reduce((total, rule) => {
      return categorySet.has(rule.category) && hasAny(pokemon.types, rule.types) ? total + rule.score : total;
    }, 0);
    const climateScore = scoreRegionPreference(pokemon, context, climateTags);
    const score =
      1 +
      affinityMatches.length * 9 +
      preferredMatches.length * 8 +
      typeScore +
      scoreTemperature(pokemon.temperature, context.temperatureC) +
      scoreRangePreference(pokemon.humidityPreference, context.humidity, 2, -1) +
      scoreRangePreference(pokemon.windPreference, context.windKph, 2, -1) +
      scoreRangePreference(pokemon.cloudPreference, context.cloud, 1, 0) +
      scoreRangePreference(pokemon.uvPreference, context.uv, 1, 0) +
      scoreAirQuality(pokemon.airQualityPreference, context) +
      scoreTimePreference(pokemon.timePreference, context.timeOfDay) +
      climateScore +
      scoreWindBonus(pokemon, context, categorySet);
    const safeScore = Math.max(1, score);
    const rarityWeight = RARITY_WEIGHTS[pokemon.rarity] || RARITY_WEIGHTS.Uncommon;

    return {
      pokemon,
      score: safeScore,
      weight: safeScore * rarityWeight,
      reasons: unique([...affinityMatches, ...preferredMatches, ...climateTags]).slice(0, 6)
    };
  }

  function scoreTemperature(preference, value) {
    if (!preference || !isFiniteNumber(value)) return 0;
    const inRange = value >= (preference.min ?? -Infinity) && value <= (preference.max ?? Infinity);
    const ideal = isFiniteNumber(preference.ideal) ? Math.max(0, 3 - Math.abs(value - preference.ideal) / 4) : 0;
    return inRange ? 4 + ideal : -2;
  }

  function scoreRangePreference(preference, value, insideScore, outsideScore) {
    if (!preference || !isFiniteNumber(value)) return 0;
    const inRange = value >= (preference.min ?? -Infinity) && value <= (preference.max ?? Infinity);
    return inRange ? insideScore : outsideScore;
  }

  function scoreAirQuality(preference, context) {
    if (!preference || !isFiniteNumber(context.epaIndex)) return 0;
    const min = preference.minEpa ?? 1;
    const max = preference.maxEpa ?? 6;
    return context.epaIndex >= min && context.epaIndex <= max ? 1 : -1;
  }

  function scoreTimePreference(preference = [], timeOfDay) {
    return preference.includes(timeOfDay) ? 3 : 0;
  }

  function scoreWindBonus(pokemon, context, categorySet) {
    const likesStrongWind = pokemon.windPreference?.likesStrong;
    const isWindy = categorySet.has("wind") || context.windKph >= 30;
    return likesStrongWind && isWindy ? 3 : 0;
  }

  function scoreRegionPreference(pokemon, context, climateTags) {
    const preference = pokemon.regionPreference || {};
    const locationText = normalize([context.city, context.region, context.country].filter(Boolean).join(" "));
    const countryScore = (preference.countries || []).some((country) => normalize(country) === normalize(context.country)) ? 2 : 0;
    const regionScore = (preference.regions || []).some((region) => locationText.includes(normalize(region))) ? 2 : 0;
    const climateScore = hasAny(preference.climates || [], climateTags) ? 2 : 0;
    return countryScore + regionScore + climateScore;
  }

  function hasDominantMatch(pokemon, context, dominantCategories) {
    const primaryCategory = dominantCategories[0];
    const preferredMatches = (pokemon.preferredWeather || []).some((weather) => context.normalizedCondition.includes(normalize(weather)));
    const affinityMatches = hasAny(pokemon.weatherAffinity || [], dominantCategories);
    const typeMatches = TYPE_CATEGORY_BOOSTS.some((rule) => {
      return rule.category === primaryCategory && hasAny(pokemon.types, rule.types);
    });
    return preferredMatches || affinityMatches || typeMatches;
  }

  function inferClimateTags(context, categories) {
    const locationText = normalize([context.city, context.region, context.country].filter(Boolean).join(" "));
    const locationTags = REGION_CLIMATE_RULES
      .filter((rule) => rule.tokens.some((token) => locationText.includes(token)))
      .map((rule) => rule.climate);
    return unique([...categories, ...locationTags]);
  }

  function weightedPick(items, seedNumber) {
    const totalWeight = items.reduce((total, item) => total + item.weight, 0);
    let roll = seededRandom(seedNumber) * totalWeight;
    return items.find((item) => {
      roll -= item.weight;
      return roll <= 0;
    }) || items[0];
  }

  function decoratePokemon(selection, context, categories, climateTags, seedNumber) {
    const pokemon = selection?.pokemon || DATABASE[0] || {};
    const contextForMessages = {
      city: context.city,
      condition: context.condition
    };
    const encounterMessage = MESSAGES.getEncounterMessage?.(pokemon, contextForMessages, categories, seedNumber) || `Wild ${pokemon.name || "Pokemon"} appeared.`;
    const trainerTip = MESSAGES.getTrainerTip?.(pokemon, contextForMessages, categories, seedNumber) || pokemon.description || "";
    const theme = getTheme(categories, pokemon);

    return {
      ...pokemon,
      sprite: pokemon.image,
      type: pokemon.types || pokemon.type || [],
      weather: pokemon.weatherLabel || pokemon.weather || "Weather partner",
      theme,
      relation: pokemon.description || "",
      encounterMessage,
      trainerTip,
      engineScore: selection?.score || 0,
      engineWeight: selection?.weight || 0,
      matchCategories: categories,
      climateTags,
      matchReasons: selection?.reasons || [],
      seed: seedNumber
    };
  }

  function getTheme(categories, pokemon) {
    const category = categories.find((item) => THEME_BY_CATEGORY[item]);
    return THEME_BY_CATEGORY[category] || pokemon.theme || "idle";
  }

  function buildSeed(context, categories) {
    const tempBucket = Math.round(context.temperatureC / 3) * 3;
    return [
      context.city,
      context.region,
      context.country,
      context.condition,
      context.dateKey,
      tempBucket,
      categories.slice(0, 4).join(",")
    ].map(normalize).join("|");
  }

  function getDateKey(localTime) {
    if (typeof localTime === "string" && localTime.trim()) {
      return localTime.trim().slice(0, 10);
    }
    return new Date().toISOString().slice(0, 10);
  }

  function getHour(localTime) {
    const match = String(localTime || "").match(/\b(\d{1,2}):\d{2}\b/);
    return match ? Number(match[1]) : null;
  }

  function getTimeOfDay(hour, isDay) {
    if (!isFiniteNumber(hour)) return Number(isDay) === 0 ? "night" : "day";
    if (hour >= 5 && hour < 11) return "morning";
    if (hour >= 11 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
  }

  function hashString(value) {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seedNumber) {
    let value = (seedNumber + 0x6D2B79F5) >>> 0;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  }

  function numberFrom(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function isFiniteNumber(value) {
    return Number.isFinite(Number(value));
  }

  function normalize(value) {
    return String(value || "").trim().toLowerCase();
  }

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function hasAny(values = [], candidates = []) {
    const valueSet = new Set(values);
    return candidates.some((candidate) => valueSet.has(candidate));
  }

  window.PokemonWeatherEngine = {
    selectPokemon,
    selectForecastPokemon,
    getGuidePokemon: () => [...DATABASE],
    getPokemonById: (id) => DATABASE.find((pokemon) => pokemon.id === id) || null,
    getWeatherCategories,
    hashString
  };
})();
