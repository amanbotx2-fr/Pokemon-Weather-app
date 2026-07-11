const apiKey = "53327aac67b8417bbb1120954252506";

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

document.getElementById("city-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("search-btn").click();
  }
});

function getWeather(city) {
  const fullCity = `${city},India`; 
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${fullCity}`;

  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
    .then((data) => {
      const temp = data.current.temp_c;
      const wind = data.current.wind_kph;
      const humidity = data.current.humidity;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon;
      const date = data.location.localtime;

      updateWeatherUI(city, temp, wind, humidity, condition, icon, date, data);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      alert("City not found. Please try again.");
    });
}

function updateWeatherUI(cityName, temperature, windSpeed, humidity, condition, iconUrl, date, data) {
  const current = data?.current || {};
  const location = data?.location || {};
  const visibility = current.vis_km ?? "--";
  const uvIndex = current.uv ?? "--";
  const feelsLike = current.feelslike_c ?? "--";

  document.querySelector(".location").textContent = cityName;
  document.querySelector(".region").textContent = location.region ? `${location.region}, ${location.country}` : "India";
  document.querySelector(".date").textContent = date;
  document.querySelector(".main-temp h1").textContent = `${temperature}°C`;
  document.querySelector(".status").textContent = condition;
  document.querySelector(".feels-like").textContent = `Feels like ${feelsLike}°C`;
  document.querySelector(".details").textContent = `Wind ${windSpeed} kph · Humidity ${humidity}%`;
  document.querySelector(".metric-wind").textContent = `${windSpeed} kph`;
  document.querySelector(".metric-humidity").textContent = `${humidity}%`;
  document.querySelector(".metric-visibility").textContent = `${visibility} km`;
  document.querySelector(".metric-uv").textContent = uvIndex;
  document.querySelector(".detail-wind").textContent = `${windSpeed} kph`;
  document.querySelector(".detail-humidity").textContent = `${humidity}%`;
  document.querySelector(".detail-visibility").textContent = `${visibility} km`;
  document.querySelector(".detail-uv").textContent = uvIndex;
  document.querySelector(".detail-condition").textContent = condition;

  
  const pokemonImage = document.getElementById("pokemon-img");
  let weatherType = condition.toLowerCase();
  let pokemonSrc = "";
  let pokemonAlt = "";
  let pokemonName = "";
  let pokemonTypes = [];
  let pokemonHeight = "";
  let pokemonWeight = "";
  let pokemonAbility = "";
  let weatherTheme = "other";

  if (weatherType.includes("sun") || weatherType.includes("clear")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif";
    pokemonAlt = "Charmander - Fire Type";
    pokemonName = "Charmander";
    pokemonTypes = ["Fire"];
    pokemonHeight = "0.6 m";
    pokemonWeight = "8.5 kg";
    pokemonAbility = "Blaze";
    weatherTheme = "sunny";
  } else if (weatherType.includes("cloud")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgey.gif";
    pokemonAlt = "Pidgey - Normal Type";
    pokemonName = "Pidgey";
    pokemonTypes = ["Normal", "Flying"];
    pokemonHeight = "0.3 m";
    pokemonWeight = "1.8 kg";
    pokemonAbility = "Keen Eye";
    weatherTheme = "cloudy";
  } else if (weatherType.includes("rain") || weatherType.includes("drizzle")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif";
    pokemonAlt = "Squirtle - Water Type";
    pokemonName = "Squirtle";
    pokemonTypes = ["Water"];
    pokemonHeight = "0.5 m";
    pokemonWeight = "9.0 kg";
    pokemonAbility = "Torrent";
    weatherTheme = "rain";
  } else if (weatherType.includes("thunder") || weatherType.includes("storm")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif";
    pokemonAlt = "Pikachu - Electric Type";
    pokemonName = "Pikachu";
    pokemonTypes = ["Electric"];
    pokemonHeight = "0.4 m";
    pokemonWeight = "6.0 kg";
    pokemonAbility = "Static";
    weatherTheme = "thunder";
  } else if (weatherType.includes("snow") || weatherType.includes("ice")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/snorunt.gif";
    pokemonAlt = "Snorunt - Ice Type";
    pokemonName = "Snorunt";
    pokemonTypes = ["Ice"];
    pokemonHeight = "0.7 m";
    pokemonWeight = "16.8 kg";
    pokemonAbility = "Inner Focus";
    weatherTheme = "snow";
  } else if (weatherType.includes("mist") || weatherType.includes("fog")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/gastly.gif";
    pokemonAlt = "Gastly - Ghost Type";
    pokemonName = "Gastly";
    pokemonTypes = ["Ghost", "Poison"];
    pokemonHeight = "1.3 m";
    pokemonWeight = "0.1 kg";
    pokemonAbility = "Levitate";
    weatherTheme = "mist";
  } else if (weatherType.includes("wind")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/fearow.gif";
    pokemonAlt = "Fearow - Flying Type";
    pokemonName = "Fearow";
    pokemonTypes = ["Normal", "Flying"];
    pokemonHeight = "1.2 m";
    pokemonWeight = "38.0 kg";
    pokemonAbility = "Keen Eye";
    weatherTheme = "cloudy";
  } else if (weatherType.includes("haze") || weatherType.includes("smoke") || weatherType.includes("dust")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/sandshrew.gif";
    pokemonAlt = "Sandshrew - Ground Type";
    pokemonName = "Sandshrew";
    pokemonTypes = ["Ground"];
    pokemonHeight = "0.6 m";
    pokemonWeight = "12.0 kg";
    pokemonAbility = "Sand Veil";
    weatherTheme = "sunny";
  } else {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/meowth.gif";
    pokemonAlt = "Meowth - Normal Type";
    pokemonName = "Meowth";
    pokemonTypes = ["Normal"];
    pokemonHeight = "0.4 m";
    pokemonWeight = "4.2 kg";
    pokemonAbility = "Pickup";
  }

  document.body.dataset.weather = weatherTheme;
  pokemonImage.src = pokemonSrc;
  pokemonImage.alt = pokemonAlt;
  document.querySelector(".partner-name").textContent = pokemonName;
  document.querySelector(".partner-description").textContent =
    `${pokemonName} is matched with ${condition.toLowerCase()} conditions in ${cityName}.`;
  document.querySelector(".partner-height").textContent = pokemonHeight;
  document.querySelector(".partner-weight").textContent = pokemonWeight;
  document.querySelector(".partner-ability").textContent = pokemonAbility;
  document.querySelector(".partner-badges").innerHTML = pokemonTypes
    .map((type, index) => `<span class="badge ${index === 0 ? "badge-neutral" : "badge-accent"}">${type}</span>`)
    .join("");
  document.querySelector(".trainer-copy").textContent =
    `${pokemonName} is a good companion for ${condition.toLowerCase()} weather.`;
  document.querySelector(".air-label").textContent = humidity > 75 ? "Humid" : "Comfortable";
  document.querySelector(".air-score-value").textContent = Math.max(1, Math.min(99, Math.round(100 - humidity / 2)));

  
  const forecastDiv = document.querySelector(".forecast");
  forecastDiv.innerHTML = `
    <div class="day active">
      <p>Today</p>
      <h3>${temperature}°</h3>
      <img src="https:${iconUrl}" alt="${condition}">
      <small>${condition}</small>
    </div>
    <div class="day">
      <p>Day 2</p>
      <h3>--</h3>
      <small>Coming</small>
    </div>
    <div class="day">
      <p>Day 3</p>
      <h3>--</h3>
      <small>Soon</small>
    </div>
    <div class="day">
      <p>Day 4</p>
      <h3>--</h3>
      <small>Update</small>
    </div>
    <div class="day">
      <p>Day 5</p>
      <h3>--</h3>
      <small>Upgrade</small>
    </div>
  `;
}
