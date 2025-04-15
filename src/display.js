import logoImage from "./images/logo.png";
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

  const weatherLocation = document.querySelector("#weather-location");
  const temperature = document.querySelector("#temperature");
  const weatherIcon = document.querySelector("#weather-icon");
  const tempUnit = document.querySelector("#tempUnitBtn").className;

  const currentTemp = getTemperature(weatherInfo.temperature, tempUnit);
  weatherLocation.textContent = weatherInfo.address;
  temperature.textContent = currentTemp + "°";

  getConditionImage(weatherInfo.conditions).then((image) => {
    weatherIcon.src = image;
  });
}

async function getConditionImage(conditions) {
  conditions = conditions.toLowerCase();
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
  };

  conditions = conditions.replaceAll(" ", "_");

  if (conditions in possibleConditions) {
    conditionImage = await import(
      `./images/${possibleConditions[conditions]}.png`
    );
  } else {
    conditionImage = await import(`./images/clear.png`);
  }

  //   possibleConditions.forEach((key) => {
  //     console.log(key);
  //   });

  return conditionImage.default;
}
