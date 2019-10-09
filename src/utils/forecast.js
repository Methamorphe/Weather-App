const request = require("request");

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/f3248132aa64910f849057432f53625b/${lat},${lng}?units=si&lang=fr`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service !", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " Il fait actuellement " +
          body.currently.temperature +
          " degrés"
      );
    }
  });
};

module.exports = forecast;
