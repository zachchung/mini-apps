import { fetchCoordinates } from "../pages/geocode";
import { initMapbox } from "../plugins/init_mapbox";

const form = document.querySelector("#search");
const input = document.querySelector("#input");
const results = document.querySelector("#results");

// Assigning behaviors -- When submit form:
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = input.value;
  fetchCoordinates(userInput);
});

// Initializing plugins -- Display the map (new instance)
initMapbox();

// Ajax calls -- default coordinates display:
fetchCoordinates("16 villa gaudelet paris");


// Error while rendering map with mapbox-gl: "_typeof is not defined" -- https://github.com/parcel-bundler/parcel/issues/1128
// So, it looks like it's something with Babel combined with the import bundler, but only when Babel is correcting for those browsers. I guess.
// It looks to me like this won't be fixed
