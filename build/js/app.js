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
// save apiKey in .env file which is addded to .gitignore or list of files that are ignored when you deploy your application to github or heroku
// you should not leave your api key in your source code to prevent theft
var apiKey = require('../.env').apiKey;
var url = 'http://api.openweathermap.org/data/2.5/weather?q=';

// create ajaxRequest function/module in exports package
// whenever we call ajaxRequest() we can execute some "hiddenFunction" of choice as well that will be defined later on
exports.ajaxRequest = function(city, hiddenFunction) {
  // .then() waits for asynchronous ajax request to complete before continuing if not, there may be a delay and could lead to false results in the use of the response variable
  $.get( url + city + '&appid=' + apiKey).then(

    // response is an argument for this function because we need response to perform the functions below
    function(response) {
    // execute hiddenFunction with response as an argument. Our hiddenFunction here will likely be a display function that needs response
    hiddenFunction(response);

  // if the ajax request fails (i.e no internet connection for example) then show ajax request error message. 404 request (or city not found) is not included here as it will return a response with a 404 as its 'cod' attribute
  }).fail(function(error) {
    alert(error.responseJSON.message);
  });

};

},{"../.env":1}],4:[function(require,module,exports){
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
};

$(document).ready(function() {

  // execute ajaxRequest to get response then execute hiddenFunction which in this case is convertFunction()
  ajaxRequest(city, convertFunction);

  $(".convertToFahrenheit").click(function() {
    $("#tempMax").text(newTemperatureMax.convertToFahrenheit());
    console.log("hi");
  });
  $(".convertToCelsius").click(function() {
    $("#tempMax").text(newTemperatureMax.convertToCelsius());

  });

  $(".convertToFahrenheit").click(function() {
    $("#tempMin").text(newTemperatureMin.convertToFahrenheit());
  });
  $(".convertToCelsius").click(function() {
    $("#tempMin").text(newTemperatureMin.convertToCelsius());
  });

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

var displayFunction = function(response) {
  // response is returned from the weather api in JSON format or an an array of objects
  // 'cod' is a property of the response array/object
  if (response.cod === "404") {
    alert("city not found");
  } else {
    // Aha! displayFunction is the hiddenFunction that will execute when we call ajaxRequest() but only after the response has been received
    $("#humidity").text(response.main.humidity);
    $("#tempMax").text(response.main.temp_max);
    $("#tempMin").text(response.main.temp_min);
  }
};

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

    // display section
    $("#returnCity").text(city);
    // make weather request with CORS(cross-origin resource sharing). Collect response then feed it as an argument into displayFunction()
    ajaxRequest(city, displayFunction);

  // end of submit event
  });
// end of document ready
});

},{"./../js/temperature.js":2,"./../js/weather_request.js":3}]},{},[4]);
