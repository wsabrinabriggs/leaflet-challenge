// Creating the map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
  let link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";
  
  // Getting our GeoJSON data
  d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(myMap);
  });
  

// //Store the endpoint as queryUrl
// let queryUrl = https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

// //Perform a GET request to the query URL/
// d3.json(queryUrl).then(function(data){
//     //once we get a response, send the data.features object to the createFeatures functions.
//     createFeatures(data.features);
// }); 

// function createFeatures(earthquakes) {
    
// }


// let myMap = L.map("map", {
//     center: [45.52, -122.67],
//     zoom: 13
// });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="url">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// let marker = L.marker([45.52, -122.67], {
//     draggable: true,
//     title: "Earthquake Info"
// }).addTo(myMap);

// //Binding a popup to our marker
// marker.bindPopup("Hello There!");
