import logoImage from "./images/logo.png";
import backgroundImage from "./images/background_image3.jpg";
import { getTemperature } from "./weather";

// Handle image loads
export function renderImages() {
  const logo = document.querySelector("#app-logo");
  const weatherIcon = document.querySelector("#weather-icon");

  logo.src = logoImage;
  weatherIcon.src = logoImage;
}

// Handle UI changes
export function updateDisplay(weatherInfo) {
  //   Debug ...........................
  //   console.log(weatherInfo);
  //   console.log(weatherInfo.address);
  //   console.log(weatherInfo.description);
  //   console.log(weatherInfo.temperature);
  console.log(weatherInfo.conditions);
  //   console.log(weatherInfo.days);
  //   console.log(weatherInfo.resolvedAddress);
  //   console.log(weatherInfo.timeZone);

  // ..................

  const body = document.querySelector("body");
  const weatherLocation = document.querySelector("#weather-location");
  const temperature = document.querySelector("#temperature");
  const weatherIcon = document.querySelector("#weather-icon");
  const weather = document.querySelector("#weatherDesc");
  const description = document.querySelector("#description");
  const tempUnit = document.querySelector("#tempUnitBtn").className;

  body.style.backgroundImage = `url(${backgroundImage})`;
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";

  const currentTemp = getTemperature(weatherInfo.temperature, tempUnit);
  weatherLocation.textContent = weatherInfo.address;
  temperature.textContent = currentTemp + "°";

  getConditionImage(weatherInfo.conditions).then((image) => {
    weatherIcon.src = image;
  });

  weather.textContent = weatherInfo.conditions;
  description.textContent = weatherInfo.description;
}

async function getConditionImage(conditions) {
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
