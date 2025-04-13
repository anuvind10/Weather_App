import { weather } from "./weather";

function pageLoad() {
  weather("Thrissur");
}

document.addEventListener("DOMContentLoaded", pageLoad);
