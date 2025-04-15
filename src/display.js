import logoImage from "./images/logo.png";
import backgroundImage from "./images/background_image3.jpg";
import { convertToCelcius } from "./weather";

// Handle image loads
export function renderImages(element, url) {
  // Default images
  if (element === undefined) {
    const body = document.querySelector("body");
    const logo = document.querySelector("#app-logo");
    const weatherIcon = document.querySelector("#weather-icon");

    body.style.backgroundImage = `url(${backgroundImage})`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    logo.src = logoImage;
    weatherIcon.src = logoImage;
  }
  // Dynamic images
  else {
    element.src = url;
  }
}

// Handle UI changes
export function updateDisplay(weatherInfo, trigger) {
  const weatherLocation = document.querySelector("#weather-location");
  const temperature = document.querySelector("#temperature");
  const weatherIcon = document.querySelector("#weather-icon");
  const weather = document.querySelector("#weatherDesc");
  const description = document.querySelector("#description");
  const currentUnit = document.querySelector("#tempUnitBtn").className;

  let currentTemp;

  if (currentUnit === "celcius") {
    currentTemp = convertToCelcius(weatherInfo.temperature);
  } else {
    currentTemp = weatherInfo.temperature;
  }

  weatherLocation.textContent = weatherInfo.address;
  temperature.textContent = currentTemp + "°";
  weather.textContent = weatherInfo.conditions;
  description.textContent = weatherInfo.description;

  // Change in weather icon
  getWeatherIcon(weatherInfo.conditions).then((imageURL) => {
    renderImages(weatherIcon, imageURL);
  });
}

async function getWeatherIcon(conditions) {
  conditions = conditions.toLowerCase().replaceAll(" ", "_");
  let conditionImage;

  const possibleConditions = {
    clear: "clear",
    fog: "fog",
    heavy_rain: "heavy rain",
    light_rain: "light rain",
    mist: "mist",
    partially_cloudy: "partially cloudy",
    snow_and_rain_showers: "rainy snow",
    snow: "snowing",
    thunderstorm: "thunderstorm",
    overcast: "overcast",
  };

  // If an image exists, use that
  if (conditions in possibleConditions) {
    conditionImage = await import(
      `./images/${possibleConditions[conditions]}.png`
    );
  } else {
    //default image
    conditionImage = await import(`./images/clear.png`);
  }

  return conditionImage.default;
}

export function updateUnit(weatherInfo) {
  const unitBtn = document.querySelector("#tempUnitBtn");
  const currenUnit = unitBtn.className;

  if (currenUnit === "celcius") {
    unitBtn.classList.remove("celcius");
    unitBtn.classList.add("fahrenheit");
    unitBtn.textContent = "F°";
  } else {
    unitBtn.classList.remove("fahrenheit");
    unitBtn.classList.add("celcius");
    unitBtn.textContent = "C°";
  }

  updateDisplay(weatherInfo);
}
