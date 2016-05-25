var Temperature = require('./js/temperature.js').Temperature;

$(document).ready(function() {

  kelvin = response.main.temp_max;

  // create Temperature object
  var newTemperature = new Temperature(kelvin);

  $(".convertToFahrenheit").click(function() {
    newTemperature.convertToFahrenheit();
  });

  $(".convertToCelsius").click(function() {
    newTemperature.convertToCelsius();
  });

};
