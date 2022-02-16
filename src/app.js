/* Format the date */

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = weekDays[day];

  return `${currentDay} at ${hours}:${minutes}`;
}

/* Forecast of the day with API integration*/

function displayTemperature(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  let currentTemperature = document.querySelector("#currentTemperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let currentDate = document.querySelector("#date");

  celsiusTemperature = response.data.main.temp;

  city.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  /* Display Icon */

  let images = [
    /* Day */

    "icons/Sun.svg" /* Clear Sky */,
    "icons/cloud_sun.svg" /* Cloudy + Sun */,
    "icons/cloud.svg" /* Cloudy */,
    "icons/snow.svg" /* Snow */,
    "icons/rain.svg" /* Rain */,
    "icons/day_storm.svg" /* Day Storm */,

    /* Night */
    "icons/moon.svg" /* Clear Sky */,
    "icons/night_cloud.svg" /* Cloudy + Moon */,
    "icons/night_rainy.svg" /* Rain */,
    "icons/storm.svg" /* Night Storm */,
  ];

  /* Day Icons */

  let weatherIcon = response.data.weather[0].icon;
  if (weatherIcon === "01d") {
    document.getElementById("img").src = images[0]; /* Clear Sky */
  } else if (
    weatherIcon === "02d" ||
    weatherIcon === "03d" ||
    weatherIcon === "04d"
  ) {
    document.getElementById("img").src = images[1]; /* Cloudy + Sun */
  } else if (weatherIcon === "13d") {
    document.getElementById("img").src = images[3]; /* Snow */
  } else if (weatherIcon === "09d" || weatherIcon === "10d") {
    document.getElementById("img").src = images[4]; /* Rain */
  } else if (weatherIcon === "11d") {
    document.getElementById("img").src = images[5];
  }

  /* Night Icons */

  if (weatherIcon === "01n") {
    document.getElementById("img").src = images[6]; /* Clear Sky */
  } else if (
    weatherIcon === "02n" ||
    weatherIcon === "03n" ||
    weatherIcon === "04n"
  ) {
    document.getElementById("img").src = images[7]; /* Cloudy + Moon */
  } else if (weatherIcon === "13n") {
    document.getElementById("img").src = images[3]; /* Snow */
  } else if (weatherIcon === "09n" || weatherIcon === "10n") {
    document.getElementById("img").src = images[8]; /* Rain */
  } else if (weatherIcon === "11n") {
    document.getElementById("img").src = images[9];
  }

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "01e2a719a4f5c5a36214df788b170932";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

/* Search engine */

function search(city) {
  let apiKey = "01e2a719a4f5c5a36214df788b170932";
  let cityName = city;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSearchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchInput");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearchInput);

/* Fahrenheit Conversion */

let celsiusTemperature = null;

function convertToFahrenheit(event) {
  event.preventDefault();
  //Change css styling of degrees when they are active/inactive
  celsiusLink.classList.remove("active");
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.add("active");
  fahrenheitLink.classList.remove("inactive");
  let fahrenheitConverter = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(fahrenheitConverter);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

/* Celsius Conversion */

function convertToCelsius(event) {
  event.preventDefault();
  //Change css styling of degrees when they are active/inactive
  celsiusLink.classList.add("active");
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.remove("active");
  fahrenheitLink.classList.add("inactive");
  temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

/* Display Forecast */

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="weather-forecast-frame">
                <div class="weather-forecast-day">${day}</div>
                <img
                  src="icons/weather-forecast-icons/white_sun.svg"
                  alt=""
                  width="40px"
                  class="weather-forecast-icon"
                />
                <div class="weather-forecast-temperature">
                  <span class="forecast-max-temperature"> -2° /</span>
                  <span class="forecast-max-temperature"> -5°</span>
                </div>
              </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("Bishkek");
