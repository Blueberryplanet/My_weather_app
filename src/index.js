// Current time

function currentDay(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Teusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  return day;
}

function currentDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth(timestamp)];

  let year = now.getFullYear(timestamp);

  return `${date} ${month} ${year}`;
}

function currentTime(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Teusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return day;
}

// Forecast for next days

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row weather-forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col">
        <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
          <img 
          class="weather-forecast-icon"
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          id="weather-forcast-icon"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}° </span>
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}° </span>
          </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Getting coordinates to display the forecast

function getForecast(coordinates) {
  let apiKey = "eb9542c65e739e0fb25ade97c749e2aa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Current parameters

function showParameters(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure} hPa`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    response.data.wind.speed * 3.6
  )} km/h`;

  document.querySelector("#current-date").innerHTML = currentDate(
    response.data.dt * 1000
  );
  document.querySelector("#current-time").innerHTML = currentTime(
    response.data.dt * 1000
  );
  document.querySelector("#current-day").innerHTML = currentDay(
    response.data.dt * 1000
  );
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}2x.png`
    );
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// Current location button

function currentPosition(position) {
  let apiKey = "eb9542c65e739e0fb25ade97c749e2aa";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showParameters);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

// Submit city

function searchCity(city) {
  let apiKey = "eb9542c65e739e0fb25ade97c749e2aa";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showParameters);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

let enterTheCity = document.querySelector("#enter-the-city");
enterTheCity.addEventListener("submit", submitCity);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentLocation);

searchCity("Florence");
