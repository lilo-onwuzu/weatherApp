// when the file is concatenated and stored in the tmp folder, it then searches for the file in require(...). The line below says go up one folder to the main directory, then go to the js folder and find temperature.js
// the exports package has the TemperatureModule module which we set equal to the Temperature object in temperature.js. Here we re-create another Temperature object from the exports package
var Temperature = require('./../js/temperature.js').TemperatureModule;
// require(...) imports the exports package which contains the ajaxRequest function module
var newTemperatureMax;
var newTemperatureMin;

var convertFunction = function(response) {
  var kelvinMax = response.main.temp_max;
  var kelvinMin = response.main.temp_min;
  // create Temperature objects
  newTemperatureMax = new Temperature(kelvinMax);
  newTemperatureMin = new Temperature(kelvinMin);

  $(".convertToFahrenheit").click(function() {
    $("#tempMax").text(newTemperatureMax.convertToFahrenheit());
  });
  $(".convertToCelsius").click(function() {
    $("#tempMax").text(newTemperatureMax.convertToCelsius());
  });
  $(".convertToKelvin").click(function() {
    $("#tempMax").text(response.main.temp_max);
  });

  $(".convertToFahrenheit").click(function() {
    $("#tempMin").text(newTemperatureMin.convertToFahrenheit());
  });
  $(".convertToCelsius").click(function() {
    $("#tempMin").text(newTemperatureMin.convertToCelsius());
  });
  $(".convertToKelvin").click(function() {
    $("#tempMin").text(response.main.temp_min);
  });

};

// execute ajaxRequest to get response then execute hiddenFunction which in this case is convertFunction()
// convertFunction() is embedded in the ajaxRequest() function and will execute serially (ajaxRequest collects response then convertFunction uses its argument response to execute)
