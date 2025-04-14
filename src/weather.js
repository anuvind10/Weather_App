export async function fetchWeather(location) {
  const key = "99489GGHVJNNLN7NDW2RQKAGS";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export function getRequiredInfo(data) {
  console.log(data);
  const weatherInfo = {
    address: data.address,
    description: data.description,
    temperature: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
    days: data.days,
    resolvedAddress: data.resolvedAddress,
    timeZone: data.timezone,
  };

  return weatherInfo;
}

// Handle correct temperature unit
export function getTemperature(temperature, unit) {
  if (unit === "fahrenheit") {
    const tempInFarenheit = ((temperature * 9) / 5 + 32).toFixed(2);
    return tempInFarenheit;
  } else {
    const tempInCelcius = (((temperature - 32) * 5) / 9).toFixed(2);
    return tempInCelcius;
  }
}
