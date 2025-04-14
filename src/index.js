import * as weather from "./weather";

function pageLoad() {
  let weatherData;
  weather.fetchWeather("Thrissur").then((data) => {
    weatherData = data;
    const weatherInfo = weather.getRequiredInfo(weatherData);
    console.log(weatherInfo.currentConditions);
  });
}

document.addEventListener("DOMContentLoaded", pageLoad);
