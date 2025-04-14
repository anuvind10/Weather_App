import * as weather from "./weather";

export function attachListeners() {
  const searchBtn = document.querySelector("#searchBtn");
  const searchText = document.querySelector("#location");

  const location = searchText.value;
  searchBtn.addEventListener("click", () => {
    weather.fetchWeather(location);
  });
}
