const express = require("express");
const path = require("path");
const hbs = require("hbs");

// Utils
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Static directory
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Johann Raoul"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Johann Raoul"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Johann Raoul",
    helpText: "This is some helpful text."
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location }) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.send("Help article not found");
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Johann Raoul",
    errorMessage: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
