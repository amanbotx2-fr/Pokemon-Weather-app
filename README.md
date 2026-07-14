# Pokemon Weather Dashboard

A premium single-page weather dashboard that pairs each city with a contextual Pokemon companion. The app combines live WeatherAPI data, a data-driven Pokemon encounter engine, persistent local preferences, and a polished responsive dashboard built with Vanilla HTML, CSS, JavaScript, and Vercel Serverless Functions.

## Features

- City weather search with WeatherAPI-powered autocomplete
- Keyboard and mouse suggestion selection
- Current-location weather using browser geolocation
- Current conditions, weather details, air quality, sunrise, and sunset
- Forecast cards with weather icons and matching Pokemon
- Pokemon Engine V3 with deterministic city/weather/date encounters
- Pokemon companion card with type badges, ability, height, weight, description, facts, and trainer tips
- Collectible Pokemon weather guide
- Favorites and recent searches persisted with localStorage
- Settings for temperature unit, animation preference, and theme
- Dynamic weather themes for sunny, rainy, cloudy, misty, snowy, and thunderstorm conditions
- Responsive dashboard layout for desktop, tablet, and mobile

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Vercel Serverless Functions
- WeatherAPI
- PokemonDB sprite assets
- Vercel hosting

No React, Vue, Angular, Tailwind, Bootstrap, jQuery, or client-side build framework is used.

## Architecture

The browser never calls WeatherAPI directly. It calls same-origin Vercel API routes:

- `/api/search`
- `/api/current`
- `/api/forecast`

Those routes proxy WeatherAPI using the server-side environment variable:

```text
WEATHER_API_KEY=...
```

The key is read only from `process.env.WEATHER_API_KEY` inside Vercel functions and is never exposed to client JavaScript or DevTools request URLs.

## Pokemon Engine

The Pokemon Engine V3 lives in:

- `pokemonDatabase.js`
- `pokemonEngine.js`
- `pokemonMessages.js`

Instead of mapping one weather string to one Pokemon, the engine scores the Pokemon database against live weather context:

- Weather condition
- Temperature
- Humidity
- Wind
- UV
- Visibility
- Air quality
- Time of day
- City, region, and inferred climate tags
- Pokemon rarity

The selection is deterministic for the same city, weather, date, and temperature bucket, so a city feels like it has a stable daily partner while still allowing discovery over time.

## Environment Variables

Create the environment variable locally and in Vercel:

```text
WEATHER_API_KEY=...
```

For local development with Vercel CLI, use a local environment file such as `.env.local`. Environment files are ignored by Git.

## Run Locally

Install dependencies:

```bash
npm install
```

Start Vercel's local development server:

```bash
vercel dev
```

Open the local URL printed by Vercel, usually:

```text
http://localhost:3000
```

## Deploy to Vercel

Set `WEATHER_API_KEY` in the Vercel project settings before deploying.

Deploy:

```bash
vercel deploy
```

For production:

```bash
vercel deploy --prod
```

## Folder Structure

```text
Pokemon-Weather-app/
├── api/
│   ├── current.js
│   ├── forecast.js
│   └── search.js
├── lib/
│   └── weatherProxy.js
├── index.html
├── style.css
├── script.js
├── pokemonDatabase.js
├── pokemonEngine.js
├── pokemonMessages.js
├── package.json
├── README.md
├── DESIGN.md
└── favicon.ico
```

## Security

- Do not commit real WeatherAPI keys.
- Do not expose keys through browser JavaScript.
- Keep local environment files out of Git.
- Confirm API requests in DevTools use `/api/search`, `/api/current`, and `/api/forecast`, not `api.weatherapi.com`.

## Credits

- Weather data from [WeatherAPI](https://www.weatherapi.com/)
- Pokemon sprites from [PokemonDB](https://pokemondb.net/)
- Pokemon and related characters are owned by Nintendo, Game Freak, and The Pokemon Company
- Built by Aman Kumar

## License

Add a project license before publishing as a formal open-source release. If no license is added, default copyright restrictions apply.
