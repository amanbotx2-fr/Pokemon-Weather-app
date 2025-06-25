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

      updateWeatherUI(city, temp, wind, humidity, condition, icon, date);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      alert("City not found. Please try again.");
    });
}

function updateWeatherUI(cityName, temperature, windSpeed, humidity, condition, iconUrl, date) {
  document.querySelector(".location").textContent = cityName;
  document.querySelector(".date").textContent = date;
  document.querySelector(".main-temp h1").textContent = `${temperature}°C`;
  document.querySelector(".status").textContent = condition;
  document.querySelector(".details").innerHTML = `
    💨 ${windSpeed} kph &nbsp;&nbsp;
    💧 ${humidity}%
  `;

  
  const pokemonImage = document.getElementById("pokemon-img");
  let weatherType = condition.toLowerCase();
  let pokemonSrc = "";
  let pokemonAlt = "";

  if (weatherType.includes("sun") || weatherType.includes("clear")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif";
    pokemonAlt = "Charmander - Fire Type";
  } else if (weatherType.includes("cloud")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/pidgey.gif";
    pokemonAlt = "Pidgey - Normal Type";
  } else if (weatherType.includes("rain") || weatherType.includes("drizzle")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif";
    pokemonAlt = "Squirtle - Water Type";
  } else if (weatherType.includes("thunder") || weatherType.includes("storm")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/pikachu.gif";
    pokemonAlt = "Pikachu - Electric Type";
  } else if (weatherType.includes("snow") || weatherType.includes("ice")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/snorunt.gif";
    pokemonAlt = "Snorunt - Ice Type";
  } else if (weatherType.includes("mist") || weatherType.includes("fog")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/gastly.gif";
    pokemonAlt = "Gastly - Ghost Type";
  } else if (weatherType.includes("wind")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/fearow.gif";
    pokemonAlt = "Fearow - Flying Type";
  } else if (weatherType.includes("haze") || weatherType.includes("smoke") || weatherType.includes("dust")) {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/sandshrew.gif";
    pokemonAlt = "Sandshrew - Ground Type";
  } else {
    pokemonSrc = "https://img.pokemondb.net/sprites/black-white/anim/normal/meowth.gif";
    pokemonAlt = "Meowth - Normal Type";
  }

  pokemonImage.src = pokemonSrc;
  pokemonImage.alt = pokemonAlt;

  
  const forecastDiv = document.querySelector(".forecast");
  forecastDiv.innerHTML = `
    <div class="day active">
      <p>Today</p>
      <h3>${temperature}°</h3>
      <img src="https:${iconUrl}" alt="${condition}">
      <small>${condition}</small>
    </div>
    <div class="day">
      <p>Tue</p>
      <h3>--</h3>
      <small>Coming</small>
    </div>
    <div class="day">
      <p>Wed</p>
      <h3>--</h3>
      <small>Soon</small>
    </div>
    <div class="day">
      <p>Thu</p>
      <h3>--</h3>
      <small>Update</small>
    </div>
    <div class="day">
      <p>Fri</p>
      <h3>--</h3>
      <small>Upgrade</small>
    </div>
  `;
}
