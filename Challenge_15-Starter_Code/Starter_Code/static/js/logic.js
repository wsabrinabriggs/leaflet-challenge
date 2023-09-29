//My map
let myMap = L.map("map", {
      center: [
        38.8026, -116.419438
      ],
      zoom: 5
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


//Store the API endpoint as queryUrl
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Perform a GET request to the query URL/
d3.json(queryUrl).then(functon (data) {
  //After getting a response, send the data.features object to the creaeFeatures function.
  createFeatures(data.features);
});

function createFeatures(earthquakesData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup('<h3>${feature.properties.mag}</h3>');
  }

  let earthquakes = L.geoJSON(earthquakesData, {
    onEachFeature: onEachFeature
  });

  createImageBitmap(earthquakes);
}