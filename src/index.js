import "./styles.css";
import * as weather from "./weather";
import logoImage from "./images/logo.png";

function pageLoad() {
  renderImages();
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

function renderImages() {
  const logo = document.querySelector("#app-logo");
  logo.src = logoImage;
}

document.addEventListener("DOMContentLoaded", pageLoad);
