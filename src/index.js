import * as weather from "./weather";

function pageLoad() {
  const searchBtn = document.querySelector("#searchBtn");

  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const location = document.querySelector("#location").value;
    getWeather(location);
  });
}

export async function getWeather(location) {
  const weatherData = await weather.fetchWeather(location);
  const weatherInfo = weather.getRequiredInfo(weatherData);
  console.log(weatherInfo);
}

document.addEventListener("DOMContentLoaded", pageLoad);
