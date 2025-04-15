import "./styles.css";
import * as weather from "./weather";
import * as display from "./display";

async function pageLoad() {
  const searchBtn = document.querySelector("#searchBtn");
  const unitChangeBtn = document.querySelector("#tempUnitBtn");
  const defaultLocation = "Delhi";

  let weatherInfo;

  display.renderImages();
  // By default get the weather of Delhi
  weatherInfo = await getWeather(defaultLocation);
  display.updateDisplay(weatherInfo);

  searchBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const location = document.querySelector("#location").value;
    weatherInfo = await getWeather(location);
    display.updateDisplay(weatherInfo);
  });

  unitChangeBtn.addEventListener("click", () => {
    display.updateUnit(weatherInfo);
  });
}

export async function getWeather(location) {
  const weatherData = await weather.fetchWeather(location);
  const weatherInfo = weather.getRequiredInfo(weatherData);

  return weatherInfo;
}

document.addEventListener("DOMContentLoaded", pageLoad);
