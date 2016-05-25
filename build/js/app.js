(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "efd8c5039b5c3a23c136a241b3d842fb";

},{}],2:[function(require,module,exports){
var Temperature = function(kelvin){
  this.kelvin = kelvin;
};

Temperature.prototype.convertToFahrenheit = function() {
  return (this.kelvin - 273.15)*1.8 + 32;
};

Temperature.prototype.convertToCelsius = function() {
  return this.kelvin - 273.15;
};

// another way to export the Temperature object
exports.TemperatureModule = Temperature;

},{}],3:[function(require,module,exports){
var apiKey = require('../.env').apiKey;
var url = 'http://api.openweathermap.org/data/2.5/weather?q=';

// create ajaxRequest function/module in exports package
exports.ajaxRequest = function(city) {
  // .then() waits for asynchronous ajax request to complete before continuing
  $.get( url + city + '&appid=' + apiKey).then(
    // response is an argument for this function because we need response to perform the functions below
    function(response) {

    // response is return from the weather api in JSON format or an an array of objects
    // 'cod' is a property of the response array/object
    if (response.cod === "404") {
      alert("city not found");
    } else {
      // we are breaking some rules here and placing this front-end interface elements in the back-end because we need this to execute only when the ajax request is complete. if not, there may be a delay and could lead to false results
      $("#humidity").text(response.main.humidity);
      $("#tempMax").text(response.main.temp_max);
      $("#tempMin").text(response.main.temp_min);
    }

    // we don't necessary need to return response but we will so we can call ajaxRequest anywhwere else and use response for other things
    // return statement should go at the end of the function because the function will terminate after it sees the return statement
    return response;

  // if the ajax request fails (i.e no internet connection for example NOT 404 request) then show ajax request error message
  }).fail(function(error) {
    alert(error.responseJSON.message);
  });

}

},{"../.env":1}],4:[function(require,module,exports){
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

},{"./../js/temperature.js":2,"./../js/weather_request.js":3}]},{},[4]);
