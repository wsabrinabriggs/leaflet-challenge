let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// Create markers whose size increases with magnitude and color with depth
function createMarker(feature, latlng) {
  return L.circleMarker(latlng, {
      radius: markerSize(feature.properties.mag),
      fillColor: markerColor(feature.geometry.coordinates[2]),
      color:"#000",
      weight: 0.5,
      opacity: 0.5,
      fillOpacity: 1
  });
}


function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: createMarker
    });
  
    // Send our earthquakes layer to the createMap function/
  // 
  createMap(earthquakes);
  }

// let heatArray = [];

// for (let i =0; i<features.length; i++) {
//   let location = features[i].geometry;
//   if (location) {
//     //console.log(location);
//     heatArray.push([location.coordinates[1], location.coordinates[0]]);
//   }
// }

// let heat = L.heatLayer(heatArray, {
//   radius: 20,
//   blur: 35
// }).addTo(myMap);


  function createMap(earthquakes) {

    // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
        38.8026, -116.419438
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}

//increase size of marker based on magnitude
function markerSize (magnitude) {
  return magnitude * 5;
}

//change marker color based on depth
function markerColor(depth) {
  return depth > 90 ? '#d73027' :
  depth > 70 ? '#fc8d59' :
  depth > 50 ? '#fee08b' :
  depth > 30 ? '#d9ef8b' :
  depth > 10 ? '#91cf60' :
               '#1a9850' ;          
} 

// Looping through the cities array, create one marker for each city, bind a popup 
//for (let i =0; i < )


// //Create a new marker
// L.circle([37.6227, -104.7804, {
//   color: "green",
//   fillColor: "yellow",
//   fillOpacity: 0.75,
//   radius: 500
// }).addTo(myMap);



