const apiKey = 'pk.eyJ1IjoiemFjaGNodW5nIiwiYSI6ImNrOXhwaWV2aDAzZG0zbnVzZXRpMnNkZGIifQ.mzIIy5yWxMT6JU5f74tCvg';

const results = document.querySelector("#results");

const fetchCoordinates = (userInput) => {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${userInput}.json?access_token=${apiKey}`)
    .then(response => response.json())
    .then((data) => {
      // console.log(data); // => { features }
      const suggestions = data.features;
      // console.log(suggestions); // => []
      const firstSuggestion = suggestions[0];
      // console.log(firstSuggestion); // => { geometry } => { coordinates }
      const coordinates = firstSuggestion.geometry.coordinates;
      console.log(coordinates); // => [-118, 34]

      // Change display info:
      results.innerText = `${coordinates[1]}, ${coordinates[0]}`;
      // debugger

      // Center map according to coordinates:
      window.map.flyTo({
        center: coordinates,
      });

      // Add marker to map:
      window.marker.setLngLat(coordinates).addTo(window.map);
    });
};

export { fetchCoordinates };


// note: no need forEach here... just display the first result
// https://api.mapbox.com/geocoding/v5/mapbox.places/Los Angeles.json?access_token=pk.eyJ1IjoiemFjaGNodW5nIiwiYSI6ImNrOXhwaWV2aDAzZG0zbnVzZXRpMnNkZGIifQ.mzIIy5yWxMT6JU5f74tCvg
