import { initSelect2 } from "../plugins/init_select2";
import { fetchByCity, fetchByCurrentLocation } from "../pages/weather";

const btn = document.querySelector("button");
const select2Input = document.querySelector("#city-input");
const locationBtn = document.querySelector("#current-location");

// -----------------------------------------------------------------------
// When click at "get the weather" button:
btn.addEventListener("click", (event) => {
  event.preventDefault();
  const userInput = select2Input.value;
  // console.log(userInput);
  fetchByCity(userInput);
});

// When click at "current weather" button:
locationBtn.addEventListener("click", (event) => {
  event.preventDefault();
  fetchByCurrentLocation();
});


// -----------------------------------------------------------------------
initSelect2();
// Default weather display:
fetchByCity("los angeles");


// https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&appid=d5b6653df3ffa5e94dd9070a01b32c74&units=metric
