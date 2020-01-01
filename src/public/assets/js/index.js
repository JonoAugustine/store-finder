mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9ub2F1Z3VzdGluZSIsImEiOiJjazR1eXFoYzAyOW5lM2t0Mno2OXMza2F4In0.6oDdxOE1dPH3dNxds8VvUw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-71.157895, 42.707741]
});

function Feature(coordinates, storeID) {
  this.type = "Feature";
  this.geometry = { type: "Point", coordinates: coordinates };
  this.properties = { storeID, icon: "shop" };
}

// Fetch Stores
const getStores = async function() {
  let response = await fetch("/api/v1/stores");
  response = await response.json();

  return response.payload.map(s => new Feature(s.location.coordinates, s.storeID));
};

const loadMap = function(stores) {
  map.on("load", function() {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1,
        "text-field": "{storeID}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
};

getStores().then(s => loadMap(s));
