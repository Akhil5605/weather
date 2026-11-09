document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("getWeatherBtn");
  button.addEventListener("click", getWeather);
});

function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    document.getElementById("weatherResult").innerHTML =
      "<p>Please select a city.</p>";
    return;
  }

  // AJAX request to fetch JSON file
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "weather.json", true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);

      if (data[city]) {
        displayWeather(city, data[city]);
      } else {
        document.getElementById("weatherResult").innerHTML =
          `<p>No weather data available for "${city}".</p>`;
      }
    } else {
      document.getElementById("weatherResult").innerHTML =
        "<p>Error fetching weather data.</p>";
    }
  };
  xhr.onerror = function() {
    document.getElementById("weatherResult").innerHTML =
      "<p>Network error. Make sure you run via http://localhost/ not file:///</p>";
  };
  xhr.send();
}

function displayWeather(city, data) {
  const resultDiv = document.getElementById("weatherResult");
  resultDiv.innerHTML = `
    <h2>Weather in ${city}</h2>
    <p>Temperature: ${data.temperature}</p>
    <p>Condition: ${data.condition}</p>
  `;
}
