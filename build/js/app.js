(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var apiKey = "efd8c5039b5c3a23c136a241b3d842fb";

// empty fields
function resetFields () {
  $("#username").val("");
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
    var username = $("#username").val();
    var country = $('#country').val();
    var state = $('#state').val();
    var city = $('#city').val();

    // // new weather object
    // var newWeather = new Weather (name, country, state);
    // // format result using weather object
    // weatherResult= newAlarm.result();
    // // display result
    // $("#result").text(weatherResult);

    // resetFields after parameter transfer so new weather easily
    resetFields();

    // display
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey, function(response) {
      console.log(response);
      $("#returnCity").text(city);
      $("#humidity").text(response.main.humidity);
      $("#tempMax").text(response.main.temp_max);
      $("#tempMin").text(response.main.temp_min);
    });

  // end of submit event
  });

// end of document ready
});

},{}]},{},[1]);
