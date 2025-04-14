import "./styles.css";
import * as weather from "./weather";
import * as display from "./display";

function pageLoad() {
  const searchBtn = document.querySelector("#searchBtn");

  display.renderImages();
  // By default get the weather of Delhi
  getWeather("Delhi"), { once: true };
  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const location = document.querySelector("#location").value;
    getWeather(location);
  });
}

export async function getWeather(location) {
  const weatherData = await weather.fetchWeather(location);
  const weatherInfo = weather.getRequiredInfo(weatherData);
  display.updateDisplay(weatherInfo);
}

document.addEventListener("DOMContentLoaded", pageLoad);
