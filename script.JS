const apiKey = "0ca4fbc33b0e21e93a31b40cf72ab5ae";

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function fetchWeather(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
      document.getElementById("weatherResult").innerHTML = `<p>${error.message}</p>`;
    });
}

function displayWeather(data) {
  const weatherInfo = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡️ Temperature: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
  `;
  document.getElementById("weatherResult").innerHTML = weatherInfo;
}
