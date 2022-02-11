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

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.remove("active");
  fahrenheitLink.classList.add("inactive");
  temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

search("Bishkek");
