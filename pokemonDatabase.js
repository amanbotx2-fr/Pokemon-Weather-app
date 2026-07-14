(function () {
  const SPRITE_BASE = "https://img.pokemondb.net/sprites/black-white/anim/normal/";

  function sprite(slug) {
    return `${SPRITE_BASE}${slug}.gif`;
  }

  function future(id, evolutionLine = []) {
    return {
      shinyEligible: true,
      evolutionLine,
      seasonalTags: [],
      regionalTags: [],
      minTrainerLevel: id === "legendary" ? 30 : 1,
      achievementTags: []
    };
  }

  const pokemon = [
    {
      id: "charmander",
      name: "Charmander",
      types: ["Fire"],
      height: "0.6 m",
      weight: "8.5 kg",
      ability: "Blaze",
      rarity: "Common",
      theme: "sunny",
      image: sprite("charmander"),
      weatherLabel: "Sunny / Clear",
      bestWeather: "Bright, dry sunshine",
      description: "Charmander becomes more confident when warm light keeps its tail flame steady.",
      funFact: "Its tail flame burns brighter when the air is dry.",
      habitat: "Warm routes, rocky hills, and sunny town edges",
      weakness: "Water",
      preferredWeather: ["Sunny", "Clear"],
      weatherAffinity: ["sunny", "clear", "hot", "high-uv"],
      temperature: { min: 22, max: 42, ideal: 31 },
      humidityPreference: { min: 15, max: 65 },
      windPreference: { min: 0, max: 22, likesStrong: false },
      timePreference: ["day", "afternoon"],
      cloudPreference: { max: 45 },
      uvPreference: { min: 4, max: 11 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["warm", "dry", "urban"] },
      messages: {
        encounter: [
          "Charmander stepped into the warm weather around {city}.",
          "The sunshine over {city} kept Charmander's tail flame bright."
        ],
        tips: [
          "The warm sunshine keeps Fire Pokemon energetic.",
          "Dry heat makes Charmander more comfortable, but heavy rain can slow it down."
        ]
      },
      future: future("common", ["Charmander", "Charmeleon", "Charizard"])
    },
    {
      id: "growlithe",
      name: "Growlithe",
      types: ["Fire"],
      height: "0.7 m",
      weight: "19.0 kg",
      ability: "Intimidate",
      rarity: "Uncommon",
      theme: "sunny",
      image: sprite("growlithe"),
      weatherLabel: "Sunny / Warm",
      bestWeather: "Warm, clear afternoons",
      description: "Growlithe patrols bright streets and stays alert when the air feels warm.",
      funFact: "It is loyal enough to guard the same route all day.",
      habitat: "City parks, warm roads, and open neighborhoods",
      weakness: "Water",
      preferredWeather: ["Sunny", "Clear"],
      weatherAffinity: ["sunny", "clear", "hot", "urban"],
      temperature: { min: 21, max: 38, ideal: 29 },
      humidityPreference: { min: 20, max: 70 },
      windPreference: { min: 0, max: 26, likesStrong: false },
      timePreference: ["day", "afternoon", "evening"],
      cloudPreference: { max: 55 },
      uvPreference: { min: 3, max: 9 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "warm"] },
      messages: {
        encounter: [
          "Growlithe is guarding the warm route through {city}.",
          "Clear weather brought Growlithe out for patrol."
        ],
        tips: [
          "Warm, stable weather makes Growlithe bolder around city routes.",
          "Growlithe is easier to notice when skies are clear and visibility is high."
        ]
      },
      future: future("uncommon", ["Growlithe", "Arcanine"])
    },
    {
      id: "vulpix",
      name: "Vulpix",
      types: ["Fire"],
      height: "0.6 m",
      weight: "9.9 kg",
      ability: "Flash Fire",
      rarity: "Uncommon",
      theme: "sunny",
      image: sprite("vulpix"),
      weatherLabel: "Sunny / Dry",
      bestWeather: "Dry golden light",
      description: "Vulpix prefers gentle sunshine and avoids heavy humidity when it can.",
      funFact: "Its six tails become more elegant as it grows.",
      habitat: "Dry grassland, warm suburbs, and quiet gardens",
      weakness: "Water",
      preferredWeather: ["Sunny", "Clear"],
      weatherAffinity: ["sunny", "clear", "hot", "dry"],
      temperature: { min: 20, max: 36, ideal: 28 },
      humidityPreference: { min: 15, max: 58 },
      windPreference: { min: 0, max: 20, likesStrong: false },
      timePreference: ["morning", "day", "evening"],
      cloudPreference: { max: 45 },
      uvPreference: { min: 3, max: 8 },
      airQualityPreference: { maxEpa: 3 },
      regionPreference: { countries: [], regions: [], climates: ["dry", "warm"] },
      messages: {
        encounter: [
          "Vulpix appeared where the air around {city} felt warm and dry.",
          "Soft sunlight made Vulpix comfortable enough to appear."
        ],
        tips: [
          "Fire Pokemon like Vulpix prefer clear air and steady warmth.",
          "Vulpix is less likely to linger when rain or heavy humidity moves in."
        ]
      },
      future: future("uncommon", ["Vulpix", "Ninetales"])
    },
    {
      id: "ponyta",
      name: "Ponyta",
      types: ["Fire"],
      height: "1.0 m",
      weight: "30.0 kg",
      ability: "Run Away",
      rarity: "Rare",
      theme: "sunny",
      image: sprite("ponyta"),
      weatherLabel: "Sunny / Hot",
      bestWeather: "Open sunny routes",
      description: "Ponyta races across open roads when the weather is clear and energetic.",
      funFact: "Its fiery mane can burn hotter as it starts running.",
      habitat: "Open plains, dry roads, and sunlit fields",
      weakness: "Water",
      preferredWeather: ["Sunny", "Clear"],
      weatherAffinity: ["sunny", "clear", "hot", "high-uv"],
      temperature: { min: 24, max: 43, ideal: 33 },
      humidityPreference: { min: 10, max: 55 },
      windPreference: { min: 0, max: 32, likesStrong: true },
      timePreference: ["day", "afternoon"],
      cloudPreference: { max: 35 },
      uvPreference: { min: 5, max: 11 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["open", "dry", "warm"] },
      messages: {
        encounter: [
          "Ponyta raced into view under the bright sky over {city}.",
          "The hot open weather attracted Ponyta near {city}."
        ],
        tips: [
          "Very warm days can make fast Fire Pokemon more active.",
          "Ponyta favors open weather with strong sunlight and room to move."
        ]
      },
      future: future("rare", ["Ponyta", "Rapidash"])
    },
    {
      id: "houndour",
      name: "Houndour",
      types: ["Dark", "Fire"],
      height: "0.6 m",
      weight: "10.8 kg",
      ability: "Early Bird",
      rarity: "Rare",
      theme: "sunny",
      image: sprite("houndour"),
      weatherLabel: "Hot / Night",
      bestWeather: "Warm evenings",
      description: "Houndour is drawn to warm air after sunset and quiet city edges.",
      funFact: "Its call can carry far through still nighttime air.",
      habitat: "Warm alleys, dry fields, and quiet roads",
      weakness: "Water",
      preferredWeather: ["Clear", "Sunny"],
      weatherAffinity: ["hot", "clear", "night", "dry"],
      temperature: { min: 19, max: 38, ideal: 28 },
      humidityPreference: { min: 15, max: 62 },
      windPreference: { min: 0, max: 24, likesStrong: false },
      timePreference: ["night", "evening"],
      cloudPreference: { max: 50 },
      uvPreference: { min: 0, max: 6 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "dry", "night"] },
      messages: {
        encounter: [
          "Houndour emerged as the warm air settled over {city}.",
          "The quiet heat around {city} drew Houndour out."
        ],
        tips: [
          "Dark and Fire Pokemon become more noticeable on warm evenings.",
          "Houndour favors clear nights more than harsh afternoon sun."
        ]
      },
      future: future("rare", ["Houndour", "Houndoom"])
    },
    {
      id: "squirtle",
      name: "Squirtle",
      types: ["Water"],
      height: "0.5 m",
      weight: "9.0 kg",
      ability: "Torrent",
      rarity: "Common",
      theme: "rain",
      image: sprite("squirtle"),
      weatherLabel: "Rain / Drizzle",
      bestWeather: "Light rain and puddles",
      description: "Squirtle becomes playful when rain leaves puddles across the route.",
      funFact: "Its shell helps it slide through water with less resistance.",
      habitat: "Ponds, river paths, and rainy city streets",
      weakness: "Electric",
      preferredWeather: ["Rain", "Light rain", "Drizzle"],
      weatherAffinity: ["rain", "drizzle", "humid"],
      temperature: { min: 14, max: 32, ideal: 24 },
      humidityPreference: { min: 55, max: 100 },
      windPreference: { min: 0, max: 30, likesStrong: false },
      timePreference: ["morning", "day", "evening"],
      cloudPreference: { min: 45, max: 100 },
      uvPreference: { min: 0, max: 6 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["coastal", "river", "urban"] },
      messages: {
        encounter: [
          "Squirtle was attracted by the rain around {city}.",
          "Fresh puddles near {city} brought Squirtle out."
        ],
        tips: [
          "Rain and high humidity make Water Pokemon more active.",
          "Squirtle is easier to encounter when cloud cover keeps the air cool."
        ]
      },
      future: future("common", ["Squirtle", "Wartortle", "Blastoise"])
    },
    {
      id: "lotad",
      name: "Lotad",
      types: ["Water", "Grass"],
      height: "0.5 m",
      weight: "2.6 kg",
      ability: "Rain Dish",
      rarity: "Common",
      theme: "rain",
      image: sprite("lotad"),
      weatherLabel: "Rain / Humid",
      bestWeather: "Humid rain",
      description: "Lotad floats happily through humid rain and shaded puddles.",
      funFact: "Its leaf can collect rainwater like a small dish.",
      habitat: "Ponds, wet fields, and monsoon routes",
      weakness: "Flying",
      preferredWeather: ["Rain", "Drizzle"],
      weatherAffinity: ["rain", "drizzle", "humid", "cloudy"],
      temperature: { min: 16, max: 34, ideal: 26 },
      humidityPreference: { min: 65, max: 100 },
      windPreference: { min: 0, max: 22, likesStrong: false },
      timePreference: ["morning", "day"],
      cloudPreference: { min: 55, max: 100 },
      uvPreference: { min: 0, max: 5 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["wetland", "monsoon", "river"] },
      messages: {
        encounter: [
          "Lotad drifted into {city} with the damp weather.",
          "The humid rain made {city} perfect for Lotad."
        ],
        tips: [
          "High humidity gives Water and Grass Pokemon a strong boost.",
          "Lotad is happiest when clouds keep the ground damp."
        ]
      },
      future: future("common", ["Lotad", "Lombre", "Ludicolo"])
    },
    {
      id: "mudkip",
      name: "Mudkip",
      types: ["Water"],
      height: "0.4 m",
      weight: "7.6 kg",
      ability: "Torrent",
      rarity: "Uncommon",
      theme: "rain",
      image: sprite("mudkip"),
      weatherLabel: "Rain / Muddy",
      bestWeather: "Steady rain",
      description: "Mudkip senses wet ground quickly and follows cool muddy paths.",
      funFact: "The fin on its head can detect changes in water flow.",
      habitat: "Muddy banks, canals, and rainy paths",
      weakness: "Grass",
      preferredWeather: ["Rain", "Heavy rain", "Drizzle"],
      weatherAffinity: ["rain", "drizzle", "humid", "cool"],
      temperature: { min: 12, max: 30, ideal: 22 },
      humidityPreference: { min: 60, max: 100 },
      windPreference: { min: 0, max: 28, likesStrong: false },
      timePreference: ["morning", "day", "evening"],
      cloudPreference: { min: 50, max: 100 },
      uvPreference: { min: 0, max: 5 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["river", "wetland", "coastal"] },
      messages: {
        encounter: [
          "Mudkip sensed the wet ground near {city}.",
          "Steady rain made {city} feel like Mudkip territory."
        ],
        tips: [
          "Cool rain improves the odds of Water Pokemon encounters.",
          "Mudkip responds strongly to wet ground and lower UV."
        ]
      },
      future: future("uncommon", ["Mudkip", "Marshtomp", "Swampert"])
    },
    {
      id: "psyduck",
      name: "Psyduck",
      types: ["Water"],
      height: "0.8 m",
      weight: "19.6 kg",
      ability: "Damp",
      rarity: "Common",
      theme: "rain",
      image: sprite("psyduck"),
      weatherLabel: "Rain / Cloudy",
      bestWeather: "Damp cloudy days",
      description: "Psyduck wanders out when damp air makes the route feel quiet.",
      funFact: "Its headaches can trigger surprising bursts of psychic power.",
      habitat: "Streams, parks, and damp city corners",
      weakness: "Electric",
      preferredWeather: ["Rain", "Cloudy", "Overcast"],
      weatherAffinity: ["rain", "cloudy", "humid", "overcast"],
      temperature: { min: 15, max: 33, ideal: 24 },
      humidityPreference: { min: 55, max: 100 },
      windPreference: { min: 0, max: 24, likesStrong: false },
      timePreference: ["day", "evening"],
      cloudPreference: { min: 50, max: 100 },
      uvPreference: { min: 0, max: 6 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "river", "park"] },
      messages: {
        encounter: [
          "Psyduck wandered into {city} with the damp clouds.",
          "The wet weather around {city} confused Psyduck into appearing."
        ],
        tips: [
          "Damp cloudy weather favors patient Water Pokemon encounters.",
          "Psyduck likes rainy routes that are not too windy."
        ]
      },
      future: future("common", ["Psyduck", "Golduck"])
    },
    {
      id: "poliwag",
      name: "Poliwag",
      types: ["Water"],
      height: "0.6 m",
      weight: "12.4 kg",
      ability: "Water Absorb",
      rarity: "Common",
      theme: "rain",
      image: sprite("poliwag"),
      weatherLabel: "Rain / Wetland",
      bestWeather: "Soft rain",
      description: "Poliwag prefers calm rain and shallow water along city routes.",
      funFact: "The spiral on its belly is visible through its thin skin.",
      habitat: "Ponds, wetlands, and shallow streams",
      weakness: "Grass",
      preferredWeather: ["Rain", "Light rain", "Drizzle"],
      weatherAffinity: ["rain", "drizzle", "humid"],
      temperature: { min: 14, max: 31, ideal: 23 },
      humidityPreference: { min: 60, max: 100 },
      windPreference: { min: 0, max: 20, likesStrong: false },
      timePreference: ["morning", "evening", "night"],
      cloudPreference: { min: 45, max: 100 },
      uvPreference: { min: 0, max: 5 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["wetland", "river"] },
      messages: {
        encounter: [
          "Poliwag slipped through the rainy paths near {city}.",
          "Soft rain around {city} made Poliwag active."
        ],
        tips: [
          "Calm rain is ideal for smaller Water Pokemon.",
          "Poliwag is more comfortable when wind stays low."
        ]
      },
      future: future("common", ["Poliwag", "Poliwhirl", "Poliwrath"])
    },
    {
      id: "wingull",
      name: "Wingull",
      types: ["Water", "Flying"],
      height: "0.6 m",
      weight: "9.5 kg",
      ability: "Keen Eye",
      rarity: "Uncommon",
      theme: "rain",
      image: sprite("wingull"),
      weatherLabel: "Rain / Wind",
      bestWeather: "Rain with a breeze",
      description: "Wingull rides wet gusts and glides along open rainy routes.",
      funFact: "It can use ocean winds to stay aloft with little effort.",
      habitat: "Coasts, rivers, and breezy rainy streets",
      weakness: "Electric",
      preferredWeather: ["Rain", "Patchy rain nearby", "Windy"],
      weatherAffinity: ["rain", "wind", "humid", "coastal"],
      temperature: { min: 14, max: 32, ideal: 24 },
      humidityPreference: { min: 55, max: 100 },
      windPreference: { min: 16, max: 48, likesStrong: true },
      timePreference: ["morning", "day"],
      cloudPreference: { min: 35, max: 100 },
      uvPreference: { min: 0, max: 7 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: ["coast", "bay", "harbor"], climates: ["coastal", "river"] },
      messages: {
        encounter: [
          "Wingull rode the damp breeze into {city}.",
          "Rain and wind combined to bring Wingull overhead."
        ],
        tips: [
          "Rain plus wind raises the chance of Water and Flying Pokemon.",
          "Wingull likes wet weather with enough breeze to glide."
        ]
      },
      future: future("uncommon", ["Wingull", "Pelipper"])
    },
    {
      id: "lapras",
      name: "Lapras",
      types: ["Water", "Ice"],
      height: "2.5 m",
      weight: "220.0 kg",
      ability: "Water Absorb",
      rarity: "Rare",
      theme: "rain",
      image: sprite("lapras"),
      weatherLabel: "Cold Rain",
      bestWeather: "Cold rain or coastal chill",
      description: "Lapras favors cool wet air and wide water routes.",
      funFact: "It is known for carrying people across water safely.",
      habitat: "Large lakes, coasts, and cold rainy harbors",
      weakness: "Electric",
      preferredWeather: ["Rain", "Light sleet", "Overcast"],
      weatherAffinity: ["rain", "cold", "snow", "coastal"],
      temperature: { min: -4, max: 22, ideal: 12 },
      humidityPreference: { min: 50, max: 100 },
      windPreference: { min: 0, max: 38, likesStrong: true },
      timePreference: ["morning", "evening"],
      cloudPreference: { min: 45, max: 100 },
      uvPreference: { min: 0, max: 5 },
      airQualityPreference: { maxEpa: 3 },
      regionPreference: { countries: [], regions: ["coast", "lake", "bay"], climates: ["coastal", "cold"] },
      messages: {
        encounter: [
          "Lapras surfaced in the cool rain near {city}.",
          "The chilly wet weather made {city} feel right for Lapras."
        ],
        tips: [
          "Cold rain can attract rare Water and Ice Pokemon.",
          "Lapras is more likely when wet weather stays cool and calm."
        ]
      },
      future: future("rare", ["Lapras"])
    },
    {
      id: "kyogre",
      name: "Kyogre",
      types: ["Water"],
      height: "4.5 m",
      weight: "352.0 kg",
      ability: "Drizzle",
      rarity: "Legendary",
      theme: "rain",
      image: sprite("kyogre"),
      weatherLabel: "Heavy Rain",
      bestWeather: "Intense rain",
      description: "Kyogre is a legendary presence tied to overwhelming rain and deep water.",
      funFact: "Its legends tell of seas expanding under heavy storms.",
      habitat: "Open oceans and storm-heavy waters",
      weakness: "Electric",
      preferredWeather: ["Heavy rain", "Moderate rain", "Torrential rain"],
      weatherAffinity: ["rain", "storm", "humid", "legendary"],
      temperature: { min: 8, max: 30, ideal: 20 },
      humidityPreference: { min: 75, max: 100 },
      windPreference: { min: 12, max: 70, likesStrong: true },
      timePreference: ["day", "night"],
      cloudPreference: { min: 70, max: 100 },
      uvPreference: { min: 0, max: 4 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: ["coast", "ocean", "bay"], climates: ["coastal", "monsoon"] },
      messages: {
        encounter: [
          "A rare downpour made Kyogre's presence felt near {city}.",
          "The rain over {city} felt powerful enough for Kyogre."
        ],
        tips: [
          "Legendary Water encounters stay rare, even in perfect rain.",
          "Heavy rain, high humidity, and dense clouds create the strongest Water signal."
        ]
      },
      future: future("legendary", ["Kyogre"])
    },
    {
      id: "pidgey",
      name: "Pidgey",
      types: ["Normal", "Flying"],
      height: "0.3 m",
      weight: "1.8 kg",
      ability: "Keen Eye",
      rarity: "Common",
      theme: "cloudy",
      image: sprite("pidgey"),
      weatherLabel: "Cloudy / Breezy",
      bestWeather: "Partly cloudy breeze",
      description: "Pidgey enjoys calm clouds and gentle wind over familiar city routes.",
      funFact: "It can flap its wings to stir up dust and distract opponents.",
      habitat: "Parks, rooftops, fields, and calm streets",
      weakness: "Electric",
      preferredWeather: ["Cloudy", "Partly cloudy", "Overcast"],
      weatherAffinity: ["cloudy", "partly-cloudy", "wind", "morning"],
      temperature: { min: 16, max: 33, ideal: 25 },
      humidityPreference: { min: 25, max: 80 },
      windPreference: { min: 6, max: 34, likesStrong: true },
      timePreference: ["morning", "day"],
      cloudPreference: { min: 25, max: 85 },
      uvPreference: { min: 1, max: 8 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "field", "park"] },
      messages: {
        encounter: [
          "Pidgey is gliding through the clouds over {city}.",
          "A calm breeze brought Pidgey across {city}."
        ],
        tips: [
          "Cloudy skies and light wind make Flying Pokemon easier to spot.",
          "Pidgey prefers steady routes with moderate wind."
        ]
      },
      future: future("common", ["Pidgey", "Pidgeotto", "Pidgeot"])
    },
    {
      id: "swablu",
      name: "Swablu",
      types: ["Normal", "Flying"],
      height: "0.4 m",
      weight: "1.2 kg",
      ability: "Natural Cure",
      rarity: "Uncommon",
      theme: "cloudy",
      image: sprite("swablu"),
      weatherLabel: "Partly Cloudy",
      bestWeather: "Soft cottony clouds",
      description: "Swablu blends into gentle cloud cover and quiet breezes.",
      funFact: "Its wings look like cottony clouds.",
      habitat: "Clean skies, hilltops, and quiet parks",
      weakness: "Ice",
      preferredWeather: ["Partly cloudy", "Cloudy"],
      weatherAffinity: ["cloudy", "partly-cloudy", "wind", "clean-air"],
      temperature: { min: 14, max: 30, ideal: 22 },
      humidityPreference: { min: 30, max: 75 },
      windPreference: { min: 4, max: 28, likesStrong: true },
      timePreference: ["morning", "day"],
      cloudPreference: { min: 30, max: 80 },
      uvPreference: { min: 1, max: 7 },
      airQualityPreference: { maxEpa: 2 },
      regionPreference: { countries: [], regions: [], climates: ["hill", "park", "clean"] },
      messages: {
        encounter: [
          "Swablu floated through the soft clouds above {city}.",
          "Clean cloud cover made {city} feel perfect for Swablu."
        ],
        tips: [
          "Gentle cloud cover helps softer Flying Pokemon appear.",
          "Swablu prefers cleaner air and lighter wind."
        ]
      },
      future: future("uncommon", ["Swablu", "Altaria"])
    },
    {
      id: "hoothoot",
      name: "Hoothoot",
      types: ["Normal", "Flying"],
      height: "0.7 m",
      weight: "21.2 kg",
      ability: "Insomnia",
      rarity: "Common",
      theme: "cloudy",
      image: sprite("hoothoot"),
      weatherLabel: "Cloudy / Night",
      bestWeather: "Cloudy evenings",
      description: "Hoothoot appears when cloudy skies make evening routes quieter.",
      funFact: "It keeps time with a precise internal rhythm.",
      habitat: "Trees, rooftops, and quiet nighttime routes",
      weakness: "Electric",
      preferredWeather: ["Cloudy", "Overcast", "Clear"],
      weatherAffinity: ["cloudy", "overcast", "night", "cool"],
      temperature: { min: 10, max: 28, ideal: 19 },
      humidityPreference: { min: 25, max: 80 },
      windPreference: { min: 0, max: 26, likesStrong: false },
      timePreference: ["evening", "night"],
      cloudPreference: { min: 35, max: 100 },
      uvPreference: { min: 0, max: 4 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["forest", "urban", "night"] },
      messages: {
        encounter: [
          "Hoothoot watched the cloudy evening over {city}.",
          "Quiet clouds brought Hoothoot into view."
        ],
        tips: [
          "Night conditions increase the odds for owl-like Flying Pokemon.",
          "Hoothoot prefers calm cloud cover over harsh wind."
        ]
      },
      future: future("common", ["Hoothoot", "Noctowl"])
    },
    {
      id: "taillow",
      name: "Taillow",
      types: ["Normal", "Flying"],
      height: "0.3 m",
      weight: "2.3 kg",
      ability: "Guts",
      rarity: "Common",
      theme: "cloudy",
      image: sprite("taillow"),
      weatherLabel: "Cloudy / Wind",
      bestWeather: "Breezy clouds",
      description: "Taillow darts through moving clouds and light gusts.",
      funFact: "It keeps flying even when challenged by stronger opponents.",
      habitat: "Fields, parks, and breezy suburban routes",
      weakness: "Electric",
      preferredWeather: ["Cloudy", "Partly cloudy", "Windy"],
      weatherAffinity: ["cloudy", "wind", "morning", "partly-cloudy"],
      temperature: { min: 17, max: 34, ideal: 25 },
      humidityPreference: { min: 20, max: 78 },
      windPreference: { min: 10, max: 40, likesStrong: true },
      timePreference: ["morning", "day"],
      cloudPreference: { min: 20, max: 80 },
      uvPreference: { min: 1, max: 8 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["field", "park", "urban"] },
      messages: {
        encounter: [
          "Taillow darted across the breezy clouds over {city}.",
          "Moving cloud cover helped Taillow sweep into {city}."
        ],
        tips: [
          "Morning wind gives Flying Pokemon a small encounter boost.",
          "Taillow likes breezy weather more than still, heavy air."
        ]
      },
      future: future("common", ["Taillow", "Swellow"])
    },
    {
      id: "togetic",
      name: "Togetic",
      types: ["Fairy", "Flying"],
      height: "0.6 m",
      weight: "3.2 kg",
      ability: "Hustle",
      rarity: "Rare",
      theme: "cloudy",
      image: sprite("togetic"),
      weatherLabel: "Calm Cloudy",
      bestWeather: "Soft clouds and clean air",
      description: "Togetic favors peaceful skies and gentle weather around happy routes.",
      funFact: "It is said to share good fortune with kind people.",
      habitat: "Quiet parks, gardens, and soft cloudy skies",
      weakness: "Steel",
      preferredWeather: ["Partly cloudy", "Cloudy"],
      weatherAffinity: ["cloudy", "partly-cloudy", "clean-air", "morning"],
      temperature: { min: 15, max: 29, ideal: 22 },
      humidityPreference: { min: 30, max: 70 },
      windPreference: { min: 0, max: 22, likesStrong: false },
      timePreference: ["morning", "day"],
      cloudPreference: { min: 25, max: 70 },
      uvPreference: { min: 1, max: 6 },
      airQualityPreference: { maxEpa: 2 },
      regionPreference: { countries: [], regions: [], climates: ["park", "garden", "clean"] },
      messages: {
        encounter: [
          "Togetic drifted into {city} under soft clouds.",
          "Peaceful cloud cover made Togetic feel welcome."
        ],
        tips: [
          "Rare gentle-weather Pokemon prefer clean air and mild temperatures.",
          "Togetic is unlikely during harsh wind or polluted air."
        ]
      },
      future: future("rare", ["Togepi", "Togetic", "Togekiss"])
    },
    {
      id: "snorunt",
      name: "Snorunt",
      types: ["Ice"],
      height: "0.7 m",
      weight: "16.8 kg",
      ability: "Inner Focus",
      rarity: "Common",
      theme: "snow",
      image: sprite("snorunt"),
      weatherLabel: "Snow / Ice",
      bestWeather: "Snowy cold",
      description: "Snorunt feels at home when cold air settles and snow begins to fall.",
      funFact: "It is said to bring good fortune to homes it visits.",
      habitat: "Snowy streets, mountain paths, and cold shelters",
      weakness: "Fire",
      preferredWeather: ["Snow", "Light snow", "Blizzard", "Ice pellets"],
      weatherAffinity: ["snow", "ice", "cold"],
      temperature: { min: -18, max: 8, ideal: -2 },
      humidityPreference: { min: 35, max: 100 },
      windPreference: { min: 0, max: 36, likesStrong: false },
      timePreference: ["day", "night"],
      cloudPreference: { min: 50, max: 100 },
      uvPreference: { min: 0, max: 4 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: ["mountain", "hill"], climates: ["cold", "mountain"] },
      messages: {
        encounter: [
          "Snorunt appeared as cold air settled over {city}.",
          "The snow signal around {city} made Snorunt comfortable."
        ],
        tips: [
          "Ice Pokemon respond strongly to low temperatures and snow.",
          "Snorunt becomes more likely as temperatures approach freezing."
        ]
      },
      future: future("common", ["Snorunt", "Glalie"])
    },
    {
      id: "snover",
      name: "Snover",
      types: ["Grass", "Ice"],
      height: "1.0 m",
      weight: "50.5 kg",
      ability: "Snow Warning",
      rarity: "Uncommon",
      theme: "snow",
      image: sprite("snover"),
      weatherLabel: "Snow / Frost",
      bestWeather: "Cold snowy cloud cover",
      description: "Snover prefers frosty air with enough moisture for snow to gather.",
      funFact: "It grows berries around its body during colder seasons.",
      habitat: "Snowy forests, mountain parks, and cold fields",
      weakness: "Fire",
      preferredWeather: ["Snow", "Light snow", "Freezing fog"],
      weatherAffinity: ["snow", "ice", "cold", "fog"],
      temperature: { min: -15, max: 7, ideal: -3 },
      humidityPreference: { min: 45, max: 100 },
      windPreference: { min: 0, max: 32, likesStrong: false },
      timePreference: ["morning", "day"],
      cloudPreference: { min: 55, max: 100 },
      uvPreference: { min: 0, max: 4 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: ["mountain", "forest"], climates: ["cold", "forest"] },
      messages: {
        encounter: [
          "Snover wandered into the frosty weather near {city}.",
          "Cold clouds around {city} made Snover appear."
        ],
        tips: [
          "Snow plus high humidity can attract Grass and Ice Pokemon.",
          "Snover prefers cold cloud cover over dry cold air."
        ]
      },
      future: future("uncommon", ["Snover", "Abomasnow"])
    },
    {
      id: "sneasel",
      name: "Sneasel",
      types: ["Dark", "Ice"],
      height: "0.9 m",
      weight: "28.0 kg",
      ability: "Inner Focus",
      rarity: "Uncommon",
      theme: "snow",
      image: sprite("sneasel"),
      weatherLabel: "Cold / Night",
      bestWeather: "Cold nights",
      description: "Sneasel becomes sharper in cold nighttime air and low visibility.",
      funFact: "It is quick enough to move silently over icy ground.",
      habitat: "Cold alleys, icy hills, and nighttime paths",
      weakness: "Fighting",
      preferredWeather: ["Snow", "Clear", "Cloudy"],
      weatherAffinity: ["snow", "cold", "night", "mist"],
      temperature: { min: -16, max: 10, ideal: 1 },
      humidityPreference: { min: 25, max: 85 },
      windPreference: { min: 0, max: 42, likesStrong: true },
      timePreference: ["night", "evening"],
      cloudPreference: { min: 15, max: 100 },
      uvPreference: { min: 0, max: 3 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: ["mountain"], climates: ["cold", "night"] },
      messages: {
        encounter: [
          "Sneasel moved quietly through the cold air around {city}.",
          "The cold night weather made {city} feel like Sneasel territory."
        ],
        tips: [
          "Nighttime gives Dark and Ice Pokemon a noticeable boost.",
          "Sneasel favors cold weather with enough cover to move unseen."
        ]
      },
      future: future("uncommon", ["Sneasel", "Weavile"])
    },
    {
      id: "delibird",
      name: "Delibird",
      types: ["Ice", "Flying"],
      height: "0.9 m",
      weight: "16.0 kg",
      ability: "Vital Spirit",
      rarity: "Rare",
      theme: "snow",
      image: sprite("delibird"),
      weatherLabel: "Snow / Wind",
      bestWeather: "Snowy wind",
      description: "Delibird travels farther when snow and wind move together.",
      funFact: "It carries food in its tail and shares it on long journeys.",
      habitat: "Snowy routes, mountain towns, and cold wind paths",
      weakness: "Rock",
      preferredWeather: ["Snow", "Blizzard", "Light snow"],
      weatherAffinity: ["snow", "ice", "wind", "cold"],
      temperature: { min: -20, max: 6, ideal: -4 },
      humidityPreference: { min: 35, max: 100 },
      windPreference: { min: 14, max: 58, likesStrong: true },
      timePreference: ["morning", "day", "evening"],
      cloudPreference: { min: 45, max: 100 },
      uvPreference: { min: 0, max: 4 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: ["mountain"], climates: ["cold", "mountain"] },
      messages: {
        encounter: [
          "Delibird crossed {city} on a snowy breeze.",
          "Snow and wind combined to bring Delibird near {city}."
        ],
        tips: [
          "Snowy wind increases the chance for Ice and Flying Pokemon.",
          "Delibird is more likely when cold weather has movement."
        ]
      },
      future: future("rare", ["Delibird"])
    },
    {
      id: "glaceon",
      name: "Glaceon",
      types: ["Ice"],
      height: "0.8 m",
      weight: "25.9 kg",
      ability: "Snow Cloak",
      rarity: "Rare",
      theme: "snow",
      image: sprite("glaceon"),
      weatherLabel: "Cold / Clear",
      bestWeather: "Crisp cold air",
      description: "Glaceon favors crisp cold weather where the air feels clean and still.",
      funFact: "It can freeze moisture in the air into tiny ice crystals.",
      habitat: "Cold parks, frozen paths, and clear winter routes",
      weakness: "Fire",
      preferredWeather: ["Snow", "Clear", "Freezing fog"],
      weatherAffinity: ["snow", "ice", "cold", "clean-air"],
      temperature: { min: -18, max: 5, ideal: -5 },
      humidityPreference: { min: 30, max: 85 },
      windPreference: { min: 0, max: 24, likesStrong: false },
      timePreference: ["morning", "night"],
      cloudPreference: { min: 0, max: 70 },
      uvPreference: { min: 0, max: 5 },
      airQualityPreference: { maxEpa: 2 },
      regionPreference: { countries: [], regions: ["mountain"], climates: ["cold", "clean"] },
      messages: {
        encounter: [
          "Glaceon appeared where the air around {city} felt crisp and cold.",
          "Clean cold weather made Glaceon comfortable near {city}."
        ],
        tips: [
          "Rare Ice Pokemon prefer colder air and cleaner conditions.",
          "Glaceon becomes more likely when cold weather is not too windy."
        ]
      },
      future: future("rare", ["Eevee", "Glaceon"])
    },
    {
      id: "articuno",
      name: "Articuno",
      types: ["Ice", "Flying"],
      height: "1.7 m",
      weight: "55.4 kg",
      ability: "Pressure",
      rarity: "Legendary",
      theme: "snow",
      image: sprite("articuno"),
      weatherLabel: "Blizzard / Ice",
      bestWeather: "Blizzard cold",
      description: "Articuno is a legendary Ice presence tied to severe cold and snow.",
      funFact: "Its wings are said to chill the air as it flies.",
      habitat: "Remote snowy peaks and frozen skies",
      weakness: "Rock",
      preferredWeather: ["Blizzard", "Heavy snow", "Snow"],
      weatherAffinity: ["snow", "ice", "cold", "wind", "legendary"],
      temperature: { min: -25, max: 2, ideal: -9 },
      humidityPreference: { min: 40, max: 100 },
      windPreference: { min: 12, max: 70, likesStrong: true },
      timePreference: ["day", "night"],
      cloudPreference: { min: 65, max: 100 },
      uvPreference: { min: 0, max: 3 },
      airQualityPreference: { maxEpa: 3 },
      regionPreference: { countries: [], regions: ["mountain"], climates: ["cold", "mountain"] },
      messages: {
        encounter: [
          "The freezing sky over {city} carried a rare Articuno signal.",
          "A legendary chill moved through {city}; Articuno was near."
        ],
        tips: [
          "Legendary Ice encounters need extreme cold, clouds, and wind.",
          "Articuno stays rare even when snow conditions are ideal."
        ]
      },
      future: future("legendary", ["Articuno"])
    },
    {
      id: "pikachu",
      name: "Pikachu",
      types: ["Electric"],
      height: "0.4 m",
      weight: "6.0 kg",
      ability: "Static",
      rarity: "Common",
      theme: "thunder",
      image: sprite("pikachu"),
      weatherLabel: "Thunderstorm",
      bestWeather: "Storm clouds",
      description: "Pikachu becomes alert when storm clouds charge the air.",
      funFact: "It stores electricity in the red pouches on its cheeks.",
      habitat: "Stormy parks, power lines, and lively routes",
      weakness: "Ground",
      preferredWeather: ["Thunderstorm", "Patchy light rain with thunder", "Thundery outbreaks nearby"],
      weatherAffinity: ["thunder", "storm", "rain", "high-uv"],
      temperature: { min: 12, max: 34, ideal: 24 },
      humidityPreference: { min: 35, max: 95 },
      windPreference: { min: 4, max: 46, likesStrong: true },
      timePreference: ["day", "evening"],
      cloudPreference: { min: 55, max: 100 },
      uvPreference: { min: 0, max: 8 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "park", "storm"] },
      messages: {
        encounter: [
          "Pikachu sensed the storm charge over {city}.",
          "Storm clouds made Pikachu spark with energy."
        ],
        tips: [
          "Storm clouds make Electric Pokemon more active.",
          "Pikachu responds strongly when thunder and rain appear together."
        ]
      },
      future: future("common", ["Pichu", "Pikachu", "Raichu"])
    },
    {
      id: "electabuzz",
      name: "Electabuzz",
      types: ["Electric"],
      height: "1.1 m",
      weight: "30.0 kg",
      ability: "Static",
      rarity: "Uncommon",
      theme: "thunder",
      image: sprite("electabuzz"),
      weatherLabel: "Thunder / Wind",
      bestWeather: "Active storm fronts",
      description: "Electabuzz is drawn to unstable air and electrical pressure.",
      funFact: "Power plants and stormy skies can make it restless.",
      habitat: "Power stations, storm routes, and windy streets",
      weakness: "Ground",
      preferredWeather: ["Thunderstorm", "Thundery outbreaks nearby"],
      weatherAffinity: ["thunder", "storm", "wind", "urban"],
      temperature: { min: 10, max: 36, ideal: 25 },
      humidityPreference: { min: 30, max: 90 },
      windPreference: { min: 12, max: 58, likesStrong: true },
      timePreference: ["day", "evening", "night"],
      cloudPreference: { min: 50, max: 100 },
      uvPreference: { min: 0, max: 8 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "industrial", "storm"] },
      messages: {
        encounter: [
          "Electabuzz followed the unstable air into {city}.",
          "The storm front near {city} made Electabuzz restless."
        ],
        tips: [
          "Strong wind during storms can boost Electric encounters.",
          "Electabuzz prefers active storm fronts over ordinary drizzle."
        ]
      },
      future: future("uncommon", ["Elekid", "Electabuzz", "Electivire"])
    },
    {
      id: "jolteon",
      name: "Jolteon",
      types: ["Electric"],
      height: "0.8 m",
      weight: "24.5 kg",
      ability: "Volt Absorb",
      rarity: "Rare",
      theme: "thunder",
      image: sprite("jolteon"),
      weatherLabel: "Storm / Dry Charge",
      bestWeather: "Charged storm air",
      description: "Jolteon reacts to charged air before storms fully arrive.",
      funFact: "Its fur can stand up like needles when electricity builds.",
      habitat: "Urban parks, power routes, and dry storm edges",
      weakness: "Ground",
      preferredWeather: ["Thunderstorm", "Cloudy", "Thundery outbreaks nearby"],
      weatherAffinity: ["thunder", "storm", "wind", "high-uv"],
      temperature: { min: 15, max: 35, ideal: 26 },
      humidityPreference: { min: 25, max: 85 },
      windPreference: { min: 10, max: 52, likesStrong: true },
      timePreference: ["afternoon", "evening"],
      cloudPreference: { min: 40, max: 100 },
      uvPreference: { min: 2, max: 9 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "storm"] },
      messages: {
        encounter: [
          "Jolteon felt the charged air around {city}.",
          "Electric pressure around {city} pulled Jolteon into view."
        ],
        tips: [
          "Rare Electric Pokemon can appear before storms fully break.",
          "Jolteon likes wind, cloud buildup, and charged air."
        ]
      },
      future: future("rare", ["Eevee", "Jolteon"])
    },
    {
      id: "magnemite",
      name: "Magnemite",
      types: ["Electric", "Steel"],
      height: "0.3 m",
      weight: "6.0 kg",
      ability: "Magnet Pull",
      rarity: "Common",
      theme: "thunder",
      image: sprite("magnemite"),
      weatherLabel: "Storm / Urban",
      bestWeather: "Charged urban clouds",
      description: "Magnemite gathers near city power and cloudy electrical weather.",
      funFact: "It floats by using electromagnetic force.",
      habitat: "Power lines, stations, and dense urban routes",
      weakness: "Ground",
      preferredWeather: ["Thunderstorm", "Cloudy", "Overcast"],
      weatherAffinity: ["thunder", "storm", "cloudy", "urban"],
      temperature: { min: 8, max: 37, ideal: 24 },
      humidityPreference: { min: 20, max: 90 },
      windPreference: { min: 0, max: 44, likesStrong: false },
      timePreference: ["day", "night"],
      cloudPreference: { min: 45, max: 100 },
      uvPreference: { min: 0, max: 7 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "industrial"] },
      messages: {
        encounter: [
          "Magnemite hummed near the charged clouds over {city}.",
          "Urban storm energy drew Magnemite toward {city}."
        ],
        tips: [
          "Cloudy urban weather gives Steel and Electric Pokemon a path in.",
          "Magnemite can tolerate rougher air quality than most partners."
        ]
      },
      future: future("common", ["Magnemite", "Magneton", "Magnezone"])
    },
    {
      id: "luxio",
      name: "Luxio",
      types: ["Electric"],
      height: "0.9 m",
      weight: "30.5 kg",
      ability: "Rivalry",
      rarity: "Uncommon",
      theme: "thunder",
      image: sprite("luxio"),
      weatherLabel: "Thunder / Evening",
      bestWeather: "Stormy evening",
      description: "Luxio becomes active when evening clouds build with electrical tension.",
      funFact: "Its claws can release electricity.",
      habitat: "Stormy fields, parks, and city edges",
      weakness: "Ground",
      preferredWeather: ["Thunderstorm", "Cloudy"],
      weatherAffinity: ["thunder", "storm", "evening", "cloudy"],
      temperature: { min: 12, max: 33, ideal: 23 },
      humidityPreference: { min: 30, max: 90 },
      windPreference: { min: 4, max: 48, likesStrong: true },
      timePreference: ["evening", "night"],
      cloudPreference: { min: 45, max: 100 },
      uvPreference: { min: 0, max: 6 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: [], climates: ["field", "urban", "storm"] },
      messages: {
        encounter: [
          "Luxio prowled through the stormy edge of {city}.",
          "Evening thunder made Luxio more active around {city}."
        ],
        tips: [
          "Electric Pokemon gain weight when storms arrive near evening.",
          "Luxio prefers storm buildup over plain hot weather."
        ]
      },
      future: future("uncommon", ["Shinx", "Luxio", "Luxray"])
    },
    {
      id: "zapdos",
      name: "Zapdos",
      types: ["Electric", "Flying"],
      height: "1.6 m",
      weight: "52.6 kg",
      ability: "Pressure",
      rarity: "Legendary",
      theme: "thunder",
      image: sprite("zapdos"),
      weatherLabel: "Severe Thunderstorm",
      bestWeather: "Severe storm cells",
      description: "Zapdos is a legendary storm presence linked to violent electrical weather.",
      funFact: "Its wings are said to crackle with electricity as it flies.",
      habitat: "Thunderheads, high towers, and storm corridors",
      weakness: "Ice",
      preferredWeather: ["Thunderstorm", "Thundery outbreaks nearby"],
      weatherAffinity: ["thunder", "storm", "wind", "legendary"],
      temperature: { min: 10, max: 36, ideal: 24 },
      humidityPreference: { min: 45, max: 100 },
      windPreference: { min: 20, max: 80, likesStrong: true },
      timePreference: ["day", "night"],
      cloudPreference: { min: 70, max: 100 },
      uvPreference: { min: 0, max: 7 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: ["tower", "mountain"], climates: ["storm", "highland"] },
      messages: {
        encounter: [
          "A rare thunder signal over {city} hinted at Zapdos.",
          "The storm over {city} crackled with Zapdos energy."
        ],
        tips: [
          "Legendary Electric encounters require thunder, wind, and dense cloud cover.",
          "Zapdos remains rare even in severe storm weather."
        ]
      },
      future: future("legendary", ["Zapdos"])
    },
    {
      id: "gastly",
      name: "Gastly",
      types: ["Ghost", "Poison"],
      height: "1.3 m",
      weight: "0.1 kg",
      ability: "Levitate",
      rarity: "Common",
      theme: "mist",
      image: sprite("gastly"),
      weatherLabel: "Mist / Fog",
      bestWeather: "Low visibility mist",
      description: "Gastly drifts through misty air when visibility fades.",
      funFact: "Its body is mostly gas and can slip through small gaps.",
      habitat: "Foggy alleys, old routes, and low-visibility paths",
      weakness: "Psychic",
      preferredWeather: ["Mist", "Fog", "Freezing fog"],
      weatherAffinity: ["mist", "fog", "night", "low-visibility", "polluted"],
      temperature: { min: 8, max: 32, ideal: 21 },
      humidityPreference: { min: 55, max: 100 },
      windPreference: { min: 0, max: 18, likesStrong: false },
      timePreference: ["evening", "night"],
      cloudPreference: { min: 35, max: 100 },
      uvPreference: { min: 0, max: 4 },
      airQualityPreference: { minEpa: 1, maxEpa: 6 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "old-town", "night"] },
      messages: {
        encounter: [
          "Wild Gastly appeared in the mist around {city}.",
          "Heavy mist made Gastly easier to encounter near {city}."
        ],
        tips: [
          "Heavy mist makes Ghost Pokemon easier to encounter.",
          "Gastly prefers low visibility and calmer wind."
        ]
      },
      future: future("common", ["Gastly", "Haunter", "Gengar"])
    },
    {
      id: "drifloon",
      name: "Drifloon",
      types: ["Ghost", "Flying"],
      height: "0.4 m",
      weight: "1.2 kg",
      ability: "Aftermath",
      rarity: "Uncommon",
      theme: "mist",
      image: sprite("drifloon"),
      weatherLabel: "Mist / Wind",
      bestWeather: "Misty breeze",
      description: "Drifloon floats along misty breezes and quiet evening streets.",
      funFact: "It moves like a balloon drifting with the wind.",
      habitat: "Misty parks, bridges, and quiet evening routes",
      weakness: "Electric",
      preferredWeather: ["Mist", "Fog", "Windy"],
      weatherAffinity: ["mist", "fog", "wind", "evening", "night"],
      temperature: { min: 8, max: 30, ideal: 20 },
      humidityPreference: { min: 50, max: 100 },
      windPreference: { min: 8, max: 36, likesStrong: true },
      timePreference: ["evening", "night"],
      cloudPreference: { min: 35, max: 100 },
      uvPreference: { min: 0, max: 5 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: [], climates: ["park", "bridge", "night"] },
      messages: {
        encounter: [
          "Drifloon drifted through the misty wind around {city}.",
          "A quiet misty breeze carried Drifloon into {city}."
        ],
        tips: [
          "Mist plus light wind increases Ghost and Flying encounters.",
          "Drifloon prefers evenings with enough breeze to float."
        ]
      },
      future: future("uncommon", ["Drifloon", "Drifblim"])
    },
    {
      id: "haunter",
      name: "Haunter",
      types: ["Ghost", "Poison"],
      height: "1.6 m",
      weight: "0.1 kg",
      ability: "Levitate",
      rarity: "Rare",
      theme: "mist",
      image: sprite("haunter"),
      weatherLabel: "Fog / Night",
      bestWeather: "Foggy nights",
      description: "Haunter becomes more likely when fog hides the edges of the route.",
      funFact: "It is said to lurk in dark places and startle passersby.",
      habitat: "Foggy alleys, old buildings, and nighttime streets",
      weakness: "Dark",
      preferredWeather: ["Fog", "Mist", "Freezing fog"],
      weatherAffinity: ["mist", "fog", "night", "low-visibility"],
      temperature: { min: 5, max: 29, ideal: 18 },
      humidityPreference: { min: 60, max: 100 },
      windPreference: { min: 0, max: 20, likesStrong: false },
      timePreference: ["night"],
      cloudPreference: { min: 50, max: 100 },
      uvPreference: { min: 0, max: 2 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: [], climates: ["old-town", "night", "urban"] },
      messages: {
        encounter: [
          "Haunter appeared where the fog thickened around {city}.",
          "The low visibility near {city} made Haunter bold."
        ],
        tips: [
          "Rare Ghost Pokemon favor fog, night, and low wind.",
          "Haunter is much less likely during bright daylight."
        ]
      },
      future: future("rare", ["Gastly", "Haunter", "Gengar"])
    },
    {
      id: "misdreavus",
      name: "Misdreavus",
      types: ["Ghost"],
      height: "0.7 m",
      weight: "1.0 kg",
      ability: "Levitate",
      rarity: "Uncommon",
      theme: "mist",
      image: sprite("misdreavus"),
      weatherLabel: "Fog / Night",
      bestWeather: "Foggy night air",
      description: "Misdreavus prefers hushed nighttime routes and misty weather.",
      funFact: "It gathers fear with the red orbs around its neck.",
      habitat: "Quiet streets, old parks, and foggy nighttime paths",
      weakness: "Ghost",
      preferredWeather: ["Mist", "Fog", "Cloudy"],
      weatherAffinity: ["mist", "fog", "night", "cloudy"],
      temperature: { min: 8, max: 30, ideal: 19 },
      humidityPreference: { min: 45, max: 100 },
      windPreference: { min: 0, max: 24, likesStrong: false },
      timePreference: ["evening", "night"],
      cloudPreference: { min: 35, max: 100 },
      uvPreference: { min: 0, max: 4 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: [], climates: ["night", "old-town", "park"] },
      messages: {
        encounter: [
          "Misdreavus drifted through the quiet mist in {city}.",
          "The foggy night around {city} made Misdreavus curious."
        ],
        tips: [
          "Night conditions improve Ghost Pokemon odds.",
          "Misdreavus likes misty routes more than bright clear weather."
        ]
      },
      future: future("uncommon", ["Misdreavus", "Mismagius"])
    },
    {
      id: "umbreon",
      name: "Umbreon",
      types: ["Dark"],
      height: "1.0 m",
      weight: "27.0 kg",
      ability: "Synchronize",
      rarity: "Rare",
      theme: "mist",
      image: sprite("umbreon"),
      weatherLabel: "Clear Night",
      bestWeather: "Cool clear nights",
      description: "Umbreon prefers cooler nighttime weather with soft shadows.",
      funFact: "Its rings glow faintly in the dark.",
      habitat: "Quiet nighttime streets, parks, and moonlit paths",
      weakness: "Fighting",
      preferredWeather: ["Clear", "Cloudy", "Mist"],
      weatherAffinity: ["night", "cool", "mist", "clear"],
      temperature: { min: 8, max: 26, ideal: 17 },
      humidityPreference: { min: 25, max: 80 },
      windPreference: { min: 0, max: 26, likesStrong: false },
      timePreference: ["night"],
      cloudPreference: { min: 0, max: 75 },
      uvPreference: { min: 0, max: 2 },
      airQualityPreference: { maxEpa: 3 },
      regionPreference: { countries: [], regions: [], climates: ["night", "urban", "park"] },
      messages: {
        encounter: [
          "Umbreon stepped into the quiet night around {city}.",
          "Cool nighttime weather made Umbreon appear near {city}."
        ],
        tips: [
          "Dark Pokemon gain weight at night, especially in cooler air.",
          "Umbreon is rare and prefers calm conditions after sunset."
        ]
      },
      future: future("rare", ["Eevee", "Umbreon"])
    },
    {
      id: "fearow",
      name: "Fearow",
      types: ["Normal", "Flying"],
      height: "1.2 m",
      weight: "38.0 kg",
      ability: "Keen Eye",
      rarity: "Common",
      theme: "cloudy",
      image: sprite("fearow"),
      weatherLabel: "Windy",
      bestWeather: "Strong dry wind",
      description: "Fearow cuts through gusty weather and rides strong winds with ease.",
      funFact: "It can fly all day on broad wings.",
      habitat: "Open roads, fields, and windy routes",
      weakness: "Electric",
      preferredWeather: ["Windy", "Cloudy", "Partly cloudy"],
      weatherAffinity: ["wind", "cloudy", "dry"],
      temperature: { min: 12, max: 36, ideal: 24 },
      humidityPreference: { min: 20, max: 75 },
      windPreference: { min: 20, max: 70, likesStrong: true },
      timePreference: ["day", "afternoon"],
      cloudPreference: { min: 0, max: 85 },
      uvPreference: { min: 1, max: 9 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: [], climates: ["open", "field", "dry"] },
      messages: {
        encounter: [
          "Fearow rode the strong wind across {city}.",
          "Gusty weather made Fearow circle above {city}."
        ],
        tips: [
          "Wind above 30 kph boosts strong Flying Pokemon.",
          "Fearow prefers open, windy routes with good visibility."
        ]
      },
      future: future("common", ["Spearow", "Fearow"])
    },
    {
      id: "staraptor",
      name: "Staraptor",
      types: ["Normal", "Flying"],
      height: "1.2 m",
      weight: "24.9 kg",
      ability: "Intimidate",
      rarity: "Uncommon",
      theme: "cloudy",
      image: sprite("staraptor"),
      weatherLabel: "Windy / Active",
      bestWeather: "Strong moving air",
      description: "Staraptor is drawn to active wind and open skies.",
      funFact: "It never backs down from a challenge, even against bigger foes.",
      habitat: "Open fields, city edges, and windy routes",
      weakness: "Electric",
      preferredWeather: ["Windy", "Partly cloudy"],
      weatherAffinity: ["wind", "cloudy", "storm"],
      temperature: { min: 10, max: 34, ideal: 23 },
      humidityPreference: { min: 20, max: 78 },
      windPreference: { min: 22, max: 76, likesStrong: true },
      timePreference: ["day", "afternoon"],
      cloudPreference: { min: 10, max: 95 },
      uvPreference: { min: 1, max: 8 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: [], climates: ["field", "urban", "open"] },
      messages: {
        encounter: [
          "Staraptor swept into {city} on powerful wind.",
          "Strong moving air over {city} attracted Staraptor."
        ],
        tips: [
          "Large Flying Pokemon favor stronger wind and open weather.",
          "Staraptor gains a boost when gusts stay high."
        ]
      },
      future: future("uncommon", ["Starly", "Staravia", "Staraptor"])
    },
    {
      id: "skarmory",
      name: "Skarmory",
      types: ["Steel", "Flying"],
      height: "1.7 m",
      weight: "50.5 kg",
      ability: "Keen Eye",
      rarity: "Rare",
      theme: "cloudy",
      image: sprite("skarmory"),
      weatherLabel: "Windy / Dry",
      bestWeather: "Dry high wind",
      description: "Skarmory rides dry gusts and tolerates rougher air better than most.",
      funFact: "Its steel wings become stronger after repeated impacts.",
      habitat: "Cliffs, towers, dry fields, and windy ridges",
      weakness: "Fire",
      preferredWeather: ["Windy", "Cloudy", "Overcast"],
      weatherAffinity: ["wind", "dry", "cloudy", "polluted"],
      temperature: { min: 8, max: 38, ideal: 25 },
      humidityPreference: { min: 10, max: 70 },
      windPreference: { min: 24, max: 82, likesStrong: true },
      timePreference: ["day", "afternoon"],
      cloudPreference: { min: 10, max: 95 },
      uvPreference: { min: 1, max: 9 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: ["ridge", "tower"], climates: ["dry", "highland", "urban"] },
      messages: {
        encounter: [
          "Skarmory crossed the dry wind over {city}.",
          "Rough gusts near {city} made Skarmory appear."
        ],
        tips: [
          "Steel and Flying Pokemon can handle dry, rough wind.",
          "Skarmory is rare but gets a strong boost in high wind."
        ]
      },
      future: future("rare", ["Skarmory"])
    },
    {
      id: "altaria",
      name: "Altaria",
      types: ["Dragon", "Flying"],
      height: "1.1 m",
      weight: "20.6 kg",
      ability: "Natural Cure",
      rarity: "Rare",
      theme: "cloudy",
      image: sprite("altaria"),
      weatherLabel: "Clean Wind",
      bestWeather: "Clean breezy clouds",
      description: "Altaria favors clean air, soft clouds, and elegant wind currents.",
      funFact: "It hums in a soprano voice while flying through clear skies.",
      habitat: "High clouds, clean parks, and gentle ridgelines",
      weakness: "Ice",
      preferredWeather: ["Partly cloudy", "Windy", "Cloudy"],
      weatherAffinity: ["wind", "cloudy", "clean-air", "morning"],
      temperature: { min: 12, max: 30, ideal: 21 },
      humidityPreference: { min: 25, max: 75 },
      windPreference: { min: 10, max: 42, likesStrong: true },
      timePreference: ["morning", "day"],
      cloudPreference: { min: 20, max: 80 },
      uvPreference: { min: 1, max: 7 },
      airQualityPreference: { maxEpa: 2 },
      regionPreference: { countries: [], regions: ["hill", "ridge"], climates: ["clean", "highland"] },
      messages: {
        encounter: [
          "Altaria floated through clean breezes over {city}.",
          "Soft clouds and clear air made Altaria appear near {city}."
        ],
        tips: [
          "Clean air improves rare Flying and Dragon encounters.",
          "Altaria prefers breezy weather without heavy pollution."
        ]
      },
      future: future("rare", ["Swablu", "Altaria"])
    },
    {
      id: "dragonite",
      name: "Dragonite",
      types: ["Dragon", "Flying"],
      height: "2.2 m",
      weight: "210.0 kg",
      ability: "Inner Focus",
      rarity: "Rare",
      theme: "cloudy",
      image: sprite("dragonite"),
      weatherLabel: "Windy / Coastal",
      bestWeather: "Powerful coastal wind",
      description: "Dragonite follows strong wind paths and broad weather fronts.",
      funFact: "It is said to circle the globe in a short time.",
      habitat: "Coasts, wide skies, and powerful wind corridors",
      weakness: "Ice",
      preferredWeather: ["Windy", "Cloudy", "Rain"],
      weatherAffinity: ["wind", "coastal", "storm", "rain"],
      temperature: { min: 10, max: 32, ideal: 22 },
      humidityPreference: { min: 35, max: 95 },
      windPreference: { min: 24, max: 90, likesStrong: true },
      timePreference: ["day", "evening"],
      cloudPreference: { min: 20, max: 100 },
      uvPreference: { min: 0, max: 8 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: ["coast", "bay", "harbor"], climates: ["coastal", "open"] },
      messages: {
        encounter: [
          "Dragonite followed a powerful wind path toward {city}.",
          "The weather front near {city} carried Dragonite's signal."
        ],
        tips: [
          "Rare Dragon encounters need strong wind and broad weather movement.",
          "Dragonite is more likely near coastal or open windy weather."
        ]
      },
      future: future("rare", ["Dratini", "Dragonair", "Dragonite"])
    },
    {
      id: "rayquaza",
      name: "Rayquaza",
      types: ["Dragon", "Flying"],
      height: "7.0 m",
      weight: "206.5 kg",
      ability: "Air Lock",
      rarity: "Legendary",
      theme: "cloudy",
      image: sprite("rayquaza"),
      weatherLabel: "Extreme Wind",
      bestWeather: "Rare high-altitude wind",
      description: "Rayquaza is a legendary sky presence tied to extreme wind and storm balance.",
      funFact: "Legends say it lives high above the clouds.",
      habitat: "Upper atmosphere and severe weather corridors",
      weakness: "Ice",
      preferredWeather: ["Windy", "Thunderstorm", "Cloudy"],
      weatherAffinity: ["wind", "storm", "legendary", "cloudy"],
      temperature: { min: 5, max: 35, ideal: 20 },
      humidityPreference: { min: 20, max: 95 },
      windPreference: { min: 34, max: 120, likesStrong: true },
      timePreference: ["day", "night"],
      cloudPreference: { min: 45, max: 100 },
      uvPreference: { min: 0, max: 9 },
      airQualityPreference: { maxEpa: 4 },
      regionPreference: { countries: [], regions: ["mountain", "coast"], climates: ["highland", "storm", "open"] },
      messages: {
        encounter: [
          "The sky over {city} carried a rare Rayquaza signal.",
          "Extreme wind made {city} feel touched by Rayquaza."
        ],
        tips: [
          "Legendary sky encounters require unusually strong wind.",
          "Rayquaza stays rare even when the weather is dramatic."
        ]
      },
      future: future("legendary", ["Rayquaza"])
    },
    {
      id: "sandshrew",
      name: "Sandshrew",
      types: ["Ground"],
      height: "0.6 m",
      weight: "12.0 kg",
      ability: "Sand Veil",
      rarity: "Common",
      theme: "sunny",
      image: sprite("sandshrew"),
      weatherLabel: "Dust / Haze / Dry",
      bestWeather: "Dry dusty air",
      description: "Sandshrew stays steady when dry haze or dust moves through.",
      funFact: "It curls into a ball to protect itself from harsh conditions.",
      habitat: "Dry fields, sandy paths, and dusty city edges",
      weakness: "Water",
      preferredWeather: ["Dust", "Haze", "Smoke", "Sunny"],
      weatherAffinity: ["dust", "haze", "dry", "hot", "polluted"],
      temperature: { min: 18, max: 42, ideal: 30 },
      humidityPreference: { min: 5, max: 55 },
      windPreference: { min: 0, max: 38, likesStrong: true },
      timePreference: ["day", "afternoon"],
      cloudPreference: { min: 0, max: 70 },
      uvPreference: { min: 2, max: 10 },
      airQualityPreference: { minEpa: 1, maxEpa: 6 },
      regionPreference: { countries: [], regions: ["desert"], climates: ["dry", "urban", "field"] },
      messages: {
        encounter: [
          "Sandshrew surfaced as dry dust moved through {city}.",
          "Hazy dry air around {city} attracted Sandshrew."
        ],
        tips: [
          "Dry, dusty weather improves Ground Pokemon encounters.",
          "Sandshrew tolerates haze better than most companions."
        ]
      },
      future: future("common", ["Sandshrew", "Sandslash"])
    },
    {
      id: "trapinch",
      name: "Trapinch",
      types: ["Ground"],
      height: "0.7 m",
      weight: "15.0 kg",
      ability: "Arena Trap",
      rarity: "Uncommon",
      theme: "sunny",
      image: sprite("trapinch"),
      weatherLabel: "Dust / Hot",
      bestWeather: "Hot dry haze",
      description: "Trapinch favors hot dry ground and low humidity.",
      funFact: "Its jaws are powerful enough to crush rock.",
      habitat: "Sandy lots, dry roads, and desert-like paths",
      weakness: "Water",
      preferredWeather: ["Dust", "Haze", "Sunny"],
      weatherAffinity: ["dust", "haze", "hot", "dry"],
      temperature: { min: 24, max: 45, ideal: 34 },
      humidityPreference: { min: 5, max: 48 },
      windPreference: { min: 0, max: 34, likesStrong: false },
      timePreference: ["day", "afternoon"],
      cloudPreference: { min: 0, max: 65 },
      uvPreference: { min: 4, max: 11 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: ["desert"], climates: ["dry", "hot"] },
      messages: {
        encounter: [
          "Trapinch waited in the hot dry ground near {city}.",
          "The dusty heat around {city} made Trapinch appear."
        ],
        tips: [
          "Very hot and dry weather boosts Ground Pokemon.",
          "Trapinch is less likely when humidity rises."
        ]
      },
      future: future("uncommon", ["Trapinch", "Vibrava", "Flygon"])
    },
    {
      id: "baltoy",
      name: "Baltoy",
      types: ["Ground", "Psychic"],
      height: "0.5 m",
      weight: "21.5 kg",
      ability: "Levitate",
      rarity: "Common",
      theme: "sunny",
      image: sprite("baltoy"),
      weatherLabel: "Haze / Dust",
      bestWeather: "Dry hazy calm",
      description: "Baltoy appears in dry haze when the air feels still and ancient.",
      funFact: "It spins on one foot to move around.",
      habitat: "Dry ruins, old roads, and dusty open areas",
      weakness: "Water",
      preferredWeather: ["Haze", "Dust", "Smoke"],
      weatherAffinity: ["dust", "haze", "dry", "polluted"],
      temperature: { min: 16, max: 40, ideal: 28 },
      humidityPreference: { min: 5, max: 58 },
      windPreference: { min: 0, max: 26, likesStrong: false },
      timePreference: ["day", "evening"],
      cloudPreference: { min: 0, max: 80 },
      uvPreference: { min: 0, max: 9 },
      airQualityPreference: { minEpa: 1, maxEpa: 6 },
      regionPreference: { countries: [], regions: [], climates: ["dry", "old-town", "urban"] },
      messages: {
        encounter: [
          "Baltoy spun through the hazy air around {city}.",
          "Dry haze made {city} feel like Baltoy territory."
        ],
        tips: [
          "Haze and dust can raise Ground and Psychic encounter odds.",
          "Baltoy prefers dry air that is not too windy."
        ]
      },
      future: future("common", ["Baltoy", "Claydol"])
    },
    {
      id: "cacnea",
      name: "Cacnea",
      types: ["Grass"],
      height: "0.4 m",
      weight: "51.3 kg",
      ability: "Sand Veil",
      rarity: "Uncommon",
      theme: "sunny",
      image: sprite("cacnea"),
      weatherLabel: "Dry Heat",
      bestWeather: "Hot dry sun",
      description: "Cacnea stores moisture and handles dry heat better than most Grass Pokemon.",
      funFact: "It can survive long dry periods by storing water.",
      habitat: "Dry fields, desert edges, and hot sandy routes",
      weakness: "Fire",
      preferredWeather: ["Sunny", "Haze", "Dust"],
      weatherAffinity: ["hot", "dry", "dust", "sunny"],
      temperature: { min: 25, max: 46, ideal: 35 },
      humidityPreference: { min: 5, max: 45 },
      windPreference: { min: 0, max: 36, likesStrong: false },
      timePreference: ["day", "afternoon"],
      cloudPreference: { min: 0, max: 55 },
      uvPreference: { min: 5, max: 11 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: ["desert"], climates: ["dry", "hot"] },
      messages: {
        encounter: [
          "Cacnea appeared in the dry heat around {city}.",
          "Hot dusty weather made {city} feel right for Cacnea."
        ],
        tips: [
          "Some Grass Pokemon prefer dry heat instead of rain.",
          "Cacnea gets a boost when humidity drops and UV rises."
        ]
      },
      future: future("uncommon", ["Cacnea", "Cacturne"])
    },
    {
      id: "flygon",
      name: "Flygon",
      types: ["Ground", "Dragon"],
      height: "2.0 m",
      weight: "82.0 kg",
      ability: "Levitate",
      rarity: "Rare",
      theme: "sunny",
      image: sprite("flygon"),
      weatherLabel: "Dust Storm",
      bestWeather: "Dry windy dust",
      description: "Flygon follows dry wind and sandy haze across open routes.",
      funFact: "The sound of its wings is sometimes called desert spirit song.",
      habitat: "Desert roads, dry plains, and wind-carved routes",
      weakness: "Ice",
      preferredWeather: ["Dust", "Haze", "Windy", "Sunny"],
      weatherAffinity: ["dust", "wind", "hot", "dry"],
      temperature: { min: 22, max: 44, ideal: 33 },
      humidityPreference: { min: 5, max: 55 },
      windPreference: { min: 18, max: 70, likesStrong: true },
      timePreference: ["day", "afternoon"],
      cloudPreference: { min: 0, max: 75 },
      uvPreference: { min: 3, max: 11 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: ["desert"], climates: ["dry", "open"] },
      messages: {
        encounter: [
          "Flygon rode the dusty wind toward {city}.",
          "Dry gusts around {city} carried Flygon's signal."
        ],
        tips: [
          "Dry wind can attract rare Ground and Dragon Pokemon.",
          "Flygon becomes more likely when heat and wind combine."
        ]
      },
      future: future("rare", ["Trapinch", "Vibrava", "Flygon"])
    },
    {
      id: "bulbasaur",
      name: "Bulbasaur",
      types: ["Grass", "Poison"],
      height: "0.7 m",
      weight: "6.9 kg",
      ability: "Overgrow",
      rarity: "Common",
      theme: "cloudy",
      image: sprite("bulbasaur"),
      weatherLabel: "Mild / Humid",
      bestWeather: "Mild humid mornings",
      description: "Bulbasaur enjoys mild humidity and softer morning light.",
      funFact: "The seed on its back grows by absorbing sunlight.",
      habitat: "Gardens, parks, and shaded green routes",
      weakness: "Fire",
      preferredWeather: ["Cloudy", "Partly cloudy"],
      weatherAffinity: ["humid", "morning", "cloudy", "clean-air"],
      temperature: { min: 15, max: 31, ideal: 23 },
      humidityPreference: { min: 45, max: 85 },
      windPreference: { min: 0, max: 24, likesStrong: false },
      timePreference: ["morning", "day"],
      cloudPreference: { min: 20, max: 80 },
      uvPreference: { min: 1, max: 7 },
      airQualityPreference: { maxEpa: 3 },
      regionPreference: { countries: [], regions: [], climates: ["park", "garden", "green"] },
      messages: {
        encounter: [
          "Bulbasaur settled into the mild air around {city}.",
          "Soft humidity helped Bulbasaur appear near {city}."
        ],
        tips: [
          "Mild humidity favors Grass Pokemon without requiring rain.",
          "Bulbasaur likes morning weather with gentle light."
        ]
      },
      future: future("common", ["Bulbasaur", "Ivysaur", "Venusaur"])
    },
    {
      id: "eevee",
      name: "Eevee",
      types: ["Normal"],
      height: "0.3 m",
      weight: "6.5 kg",
      ability: "Adaptability",
      rarity: "Common",
      theme: "idle",
      image: sprite("eevee"),
      weatherLabel: "Variable",
      bestWeather: "Mild changing weather",
      description: "Eevee adapts well when the weather does not strongly favor one type.",
      funFact: "Its unstable genetic makeup helps it adapt to many environments.",
      habitat: "Neighborhoods, parks, and mixed-weather routes",
      weakness: "Fighting",
      preferredWeather: ["Partly cloudy", "Cloudy", "Clear"],
      weatherAffinity: ["mild", "other", "cloudy", "clear"],
      temperature: { min: 10, max: 32, ideal: 22 },
      humidityPreference: { min: 25, max: 75 },
      windPreference: { min: 0, max: 28, likesStrong: false },
      timePreference: ["morning", "day", "evening"],
      cloudPreference: { min: 0, max: 80 },
      uvPreference: { min: 0, max: 8 },
      airQualityPreference: { maxEpa: 3 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "park", "mixed"] },
      messages: {
        encounter: [
          "Eevee adapted to the mixed weather around {city}.",
          "Mild changing weather made Eevee a natural partner for {city}."
        ],
        tips: [
          "Eevee appears when the weather is balanced instead of extreme.",
          "Stable, mild weather keeps adaptable Pokemon comfortable."
        ]
      },
      future: future("common", ["Eevee"])
    },
    {
      id: "meowth",
      name: "Meowth",
      types: ["Normal"],
      height: "0.4 m",
      weight: "4.2 kg",
      ability: "Pickup",
      rarity: "Common",
      theme: "idle",
      image: sprite("meowth"),
      weatherLabel: "Other",
      bestWeather: "Urban everyday weather",
      description: "Meowth is flexible and ready for unusual weather patterns.",
      funFact: "It is attracted to shiny things and busy city streets.",
      habitat: "Markets, alleys, rooftops, and neighborhood routes",
      weakness: "Fighting",
      preferredWeather: ["Clear", "Cloudy", "Partly cloudy"],
      weatherAffinity: ["other", "urban", "mild"],
      temperature: { min: 12, max: 34, ideal: 24 },
      humidityPreference: { min: 20, max: 80 },
      windPreference: { min: 0, max: 30, likesStrong: false },
      timePreference: ["day", "evening", "night"],
      cloudPreference: { min: 0, max: 90 },
      uvPreference: { min: 0, max: 8 },
      airQualityPreference: { maxEpa: 5 },
      regionPreference: { countries: [], regions: [], climates: ["urban", "mixed"] },
      messages: {
        encounter: [
          "Meowth wandered into {city} during the unusual weather.",
          "The mixed conditions around {city} suited Meowth."
        ],
        tips: [
          "Adaptable Normal Pokemon cover weather that does not match a strong type.",
          "Meowth is a reliable partner when the weather signal is unclear."
        ]
      },
      future: future("common", ["Meowth", "Persian"])
    },
    {
      id: "mew",
      name: "Mew",
      types: ["Psychic"],
      height: "0.4 m",
      weight: "4.0 kg",
      ability: "Synchronize",
      rarity: "Legendary",
      theme: "mist",
      image: sprite("mew"),
      weatherLabel: "Rare Anomaly",
      bestWeather: "Unusual calm",
      description: "Mew is a mythical encounter that appears only when conditions align strangely.",
      funFact: "It is said to contain the genetic code of all Pokemon.",
      habitat: "Unknown quiet places and rare weather anomalies",
      weakness: "Dark",
      preferredWeather: ["Mist", "Clear", "Partly cloudy"],
      weatherAffinity: ["legendary", "mist", "mild", "clean-air", "morning"],
      temperature: { min: 16, max: 28, ideal: 22 },
      humidityPreference: { min: 35, max: 70 },
      windPreference: { min: 0, max: 18, likesStrong: false },
      timePreference: ["morning", "evening"],
      cloudPreference: { min: 10, max: 65 },
      uvPreference: { min: 0, max: 6 },
      airQualityPreference: { maxEpa: 2 },
      regionPreference: { countries: [], regions: [], climates: ["clean", "quiet", "rare"] },
      messages: {
        encounter: [
          "A rare calm around {city} hinted at Mew.",
          "The weather around {city} aligned in a strangely gentle way."
        ],
        tips: [
          "Mythical encounters are intentionally rare and favor balanced weather.",
          "Mew appears only when clean air, mild temperature, and calm wind align."
        ]
      },
      future: future("legendary", ["Mew"])
    }
  ];

  window.PokemonWeatherDatabase = pokemon.map((entry) => ({
    ...entry,
    sprite: entry.image,
    type: entry.types,
    weather: entry.weatherLabel
  }));
})();
