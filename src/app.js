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

  city.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
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

search("Bishkek");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearchInput);
