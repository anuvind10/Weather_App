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
    const locationInput = document.querySelector("#location");
    const location = locationInput.value;

    // A location must be entered
    if (location === "") {
      locationInput.classList.add("invalid");
      return;
    } else {
      locationInput.classList.remove("invalid");

      // Get the weather and display it
      try {
        weatherInfo = await getWeather(location);
        display.updateDisplay(weatherInfo);
      } catch (error) {
        alert(`Unable to find get details for ${location}`);
      }
    }
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
