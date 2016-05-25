// when the file is concatenated and stored in the tmp folder, it then searches for the file in require(...). The line below says go up one folder to the main directory, then go to the js folder and find temperature.js
// the exports package has the TemperatureModule module which we set equal to the Temperature object in temperature.js. Here we re-create another Temperature object from the exports package
var Temperature = require('./../js/temperature.js').TemperatureModule;
// require(...) imports the exports package which contains the ajaxRequest function module
var response = require

$(document).ready(function() {

  // var city = "Portland";
  // var response = ajaxRequest(city);
  // // var city = response.name;
  //
  // // kelvinMax = response.main.temp_max;
  // // kelvinMin = response.main.temp_min;
  //
  // // create Temperature objects
  // var newTemperatureMax = new Temperature(kelvinMax);
  // var newTemperatureMin = new Temperature(kelvinMin);
  //
  // $(".convertToFahrenheit").click(function() {
  //   newTemperatureMax.convertToFahrenheit();
  // });
  // $(".convertToCelsius").click(function() {
  //   newTemperatureMax.convertToCelsius();
  // });
  //
  // $(".convertToFahrenheit").click(function() {
  //   newTemperatureMin.convertToFahrenheit();
  // });
  // $(".convertToCelsius").click(function() {
  //   newTemperatureMin.convertToCelsius();
  // });

// end of document ready
});
