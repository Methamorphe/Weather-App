const request = require("request");

const url =
  "https://api.darksky.net/forecast/f3248132aa64910f849057432f53625b/37.8267,-122.4233?units=si&lang=fr ";

request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to weather service !");
  } else if (response.body.error) {
    console.log("Unable to find location");
  } else {
    console.log(response.body.daily.data[0].summary);
  }
});

const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibWV0aGFtb3JwaGUiLCJhIjoiY2p5aDBtZnp1MDZhMjNkbnM5anVueHo0byJ9._vMykOS-LMbZv8KiKPAV9A";

request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to location service !");
  } else if (response.body.features.length === 0) {
    console.log("Unable to find location. Try another search");
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];

    console.log(latitude, longitude);
  }
});
