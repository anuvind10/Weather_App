export async function getWeather(location) {
  const key = "99489GGHVJNNLN7NDW2RQKAGS";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error("Failed to fetch weather details:", error.message);
    throw error;
  }
}

export function weather(location) {
  const weatherData = getWeather(location);

  console.log(weatherData.description);
}
