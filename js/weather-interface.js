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
    // make weather request again, and then execute embedded function convertFunction() with response argument. convertFunction(response) attaches a click listener to convert button that converts the response.main.temp that is reported in K into F and C
    ajaxRequest(city, convertFunction);

  // end of submit event
  });
// end of document ready
});
