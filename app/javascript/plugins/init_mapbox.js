import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGNodW5nIiwiYSI6ImNrOXhwaWV2aDAzZG0zbnVzZXRpMnNkZGIifQ.mzIIy5yWxMT6JU5f74tCvg';

const initMapbox = () => {
  // initialize map (new instance):
  console.log("initMapbox")
  window.map = new mapboxgl.Map({ // Window.map => can be accessed in any files
    // html display position (id=mapbox):
    container: 'mapbox',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 12
  });

  // initialize marker (new instance):
  window.marker = new mapboxgl.Marker();
};

export { initMapbox };
