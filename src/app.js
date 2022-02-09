function displayTemperature(response) {
  console.log(response.data);
  let city = document.querySelector("#city");
  let currentTemperature = document.querySelector("#currentTemperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");

  city.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = Math.round(response.data.main.humidity);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "01e2a719a4f5c5a36214df788b170932";
let cityName = "Orlando";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(displayTemperature);
