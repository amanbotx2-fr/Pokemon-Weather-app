(function () {
  const CATEGORY_MESSAGES = {
    sunny: [
      "{pokemon} stepped out under the clear sky in {city}.",
      "Bright weather around {city} attracted {pokemon}."
    ],
    clear: [
      "{pokemon} found a clear route through {city}.",
      "Clear weather made {pokemon} comfortable near {city}."
    ],
    rain: [
      "{pokemon} was attracted by the rain around {city}.",
      "Wet streets near {city} brought {pokemon} into view."
    ],
    drizzle: [
      "Light drizzle made {city} a good match for {pokemon}.",
      "{pokemon} followed the soft rain through {city}."
    ],
    thunder: [
      "{pokemon} sensed the storm charge over {city}.",
      "Thunderclouds made {pokemon} more active near {city}."
    ],
    storm: [
      "Unstable storm air drew {pokemon} toward {city}.",
      "{pokemon} appeared as the weather around {city} turned dramatic."
    ],
    snow: [
      "{pokemon} appeared as cold air settled over {city}.",
      "Snowy weather made {city} feel right for {pokemon}."
    ],
    mist: [
      "{pokemon} drifted through the mist around {city}.",
      "Low visibility made {pokemon} easier to encounter near {city}."
    ],
    fog: [
      "Fog softened the route through {city}, and {pokemon} appeared.",
      "{pokemon} emerged where the fog thickened around {city}."
    ],
    wind: [
      "{pokemon} followed the wind across {city}.",
      "A strong breeze brought {pokemon} into the weather route."
    ],
    dust: [
      "Dry dust around {city} attracted {pokemon}.",
      "{pokemon} surfaced as hazy air moved through {city}."
    ],
    haze: [
      "Hazy weather made {city} a better match for {pokemon}.",
      "{pokemon} appeared in the muted haze around {city}."
    ],
    night: [
      "{pokemon} became more active after dark in {city}.",
      "Night conditions helped {pokemon} appear near {city}."
    ],
    morning: [
      "Morning weather around {city} brought {pokemon} out early.",
      "{pokemon} started the day on a fresh route through {city}."
    ],
    humid: [
      "Humid air around {city} made {pokemon} more active.",
      "{pokemon} responded to the moisture in the air near {city}."
    ],
    hot: [
      "Heat around {city} made {pokemon} energetic.",
      "{pokemon} found the warm route through {city}."
    ],
    cold: [
      "Cold air around {city} suited {pokemon}.",
      "{pokemon} appeared as the temperature dropped near {city}."
    ],
    other: [
      "Wild {pokemon} appeared near {city}.",
      "{pokemon} adapted to the changing weather around {city}."
    ]
  };

  const CATEGORY_TIPS = {
    sunny: "Sunny weather gives Fire and Grass Pokemon a stronger encounter signal.",
    clear: "Clear air improves visibility and favors open-route Pokemon.",
    rain: "Rain and high humidity make Water Pokemon more active.",
    drizzle: "Light rain can attract smaller Water Pokemon without overwhelming the route.",
    thunder: "Storm clouds make Electric Pokemon more active.",
    storm: "Storm fronts can boost Electric, Flying, and rare weather encounters.",
    snow: "Cold temperatures and snow increase Ice Pokemon odds.",
    mist: "Heavy mist makes Ghost Pokemon easier to encounter.",
    fog: "Low visibility favors Ghost Pokemon and other quiet-route partners.",
    wind: "Wind above 30 kph gives Flying Pokemon a stronger boost.",
    dust: "Dry, dusty air favors Ground Pokemon.",
    haze: "Haze and low air quality can shift encounters toward Ground, Poison, and Ghost Pokemon.",
    night: "At night, Dark and Ghost Pokemon receive a stronger match score.",
    morning: "Morning weather slightly favors Flying and Grass Pokemon.",
    humid: "High humidity raises Water and Grass encounter weights.",
    hot: "Very hot weather makes Fire and dry-ground Pokemon more likely.",
    cold: "Cold weather raises Ice encounter weights.",
    other: "Balanced weather can attract adaptable Pokemon."
  };

  function pick(list, seedNumber, offset = 0) {
    if (!Array.isArray(list) || !list.length) return "";
    const index = Math.abs((seedNumber || 0) + offset) % list.length;
    return list[index];
  }

  function format(template, values) {
    return String(template || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
  }

  function primaryCategory(categories) {
    return Array.isArray(categories) && categories.length ? categories[0] : "other";
  }

  function valuesFor(pokemon, context) {
    return {
      pokemon: pokemon?.name || "Pokemon",
      city: context?.city || "this city",
      condition: context?.condition || "today's weather",
      ability: pokemon?.ability || "its ability",
      bestWeather: pokemon?.bestWeather || pokemon?.weatherLabel || "this weather",
      habitat: pokemon?.habitat || "nearby routes",
      weakness: pokemon?.weakness || "unknown"
    };
  }

  function getEncounterMessage(pokemon, context, categories, seedNumber) {
    const category = primaryCategory(categories);
    const pokemonTemplates = pokemon?.messages?.encounter || [];
    const categoryTemplates = CATEGORY_MESSAGES[category] || CATEGORY_MESSAGES.other;
    const template = pick(pokemonTemplates.length ? pokemonTemplates : categoryTemplates, seedNumber, 3);
    return format(template, valuesFor(pokemon, context));
  }

  function getTrainerTip(pokemon, context, categories, seedNumber) {
    const category = primaryCategory(categories);
    const pokemonTips = pokemon?.messages?.tips || [];
    const template = pick(pokemonTips.length ? pokemonTips : [CATEGORY_TIPS[category] || CATEGORY_TIPS.other], seedNumber, 11);
    return format(template, valuesFor(pokemon, context));
  }

  window.PokemonWeatherMessages = {
    getEncounterMessage,
    getTrainerTip
  };
})();
