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
  const weatherInfo = {
    address: data.address,
    description: data.description,
    currentConditions: data.currentConditions,
    days: data.days,
    resolvedAddress: data.resolvedAddress,
    timeZone: data.timezone,
  };

  return weatherInfo;
}
