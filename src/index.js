// Second column - day, time etc.

function currentDay(currentDay) {
  let days = [
    "Sunday",
    "Monday",
    "Teusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay.getDay()];

  return day;
}

function currentDate(currentDate) {
  let date = currentDate.getDate();
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
  let month = months[currentDate.getMonth()];

  let year = currentDate.getFullYear();

  return `${date} ${month} ${year}`;
}

function currentTime(time) {
  let hour = time.getHours();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = time.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}

// Current parameters

function showParameters(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure} hPa`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;

  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    response.data.wind.speed * 3.6
  )} km/h`;
}

// Current location

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

// Submit - city

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

// Temperature unit change

function changeToCelsius(event) {
  event.preventDefault();
  actualTemperature.innerHTML = 19;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  actualTemperature.innerHTML = 66;
}

let now = new Date();
let actualDate = document.querySelector("#current-date");
let actualTime = document.querySelector("#current-time");
let actualDay = document.querySelector("#current-day");
actualDay.innerHTML = currentDay(now);
actualDate.innerHTML = currentDate(now);
actualTime.innerHTML = currentTime(now);

let actualTemperature = document.querySelector("#current-temperature");
let unitC = document.querySelector("#unit-C");
let unitF = document.querySelector("#unit-F");
unitC.addEventListener("click", changeToCelsius);
unitF.addEventListener("click", changeToFahrenheit);

let enterTheCity = document.querySelector("#enter-the-city");
enterTheCity.addEventListener("submit", submitCity);

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", currentLocation);

searchCity("Florence");
