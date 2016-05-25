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

// require(...) imports the exports package which contains the ajaxRequest function module
var ajaxRequest = require('./../js/weather_request.js').ajaxRequest;

// empty fields
function resetFields () {
  $("#country").val("");
  $("#state").val("");
  $("#city").val("");
}

// moment() here is a function that has been installed through Bower and packaged in the vendor.js and vendor.css files
var time = moment().format('LT');

$(document).ready(function() {

  // show current time synchronously. update every half a second.
  setInterval(function(){
    time = moment().format('LT');
    $("#currentTime").text(time);
  }, 500);

  // what to do on submit
  $("#location").submit(function(event) {
    event.preventDefault();

    // transfer parameters
    var country = $('#country').val();
    var state = $('#state').val();
    var city = $('#city').val();

    // resetFields after parameter transfer so new weather easily
    resetFields();

    // display
    $("#returnCity").text(city);

    // make weather request with CORS(cross-origin resource sharing)
    // although we do not need to collect response here because we already fed the humidity and temp values in weather_request.js back end file
    var response = ajaxRequest(city);

  // end of submit event
  });

// end of document ready
});
