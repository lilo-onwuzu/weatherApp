var apiKey = "efd8c5039b5c3a23c136a241b3d842fb";

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

    // // new weather object
    // var newWeather = new Weather (name, country, state);
    // // format result using weather object
    // weatherResult= newAlarm.result();
    // // display result
    // $("#result").text(weatherResult);

    // resetFields after parameter transfer so new weather easily
    resetFields();

    // display
    $("#returnCity").text(city);
    $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey, function(response) {
      $("#humidity").text(response.main.humidity);
      $("#tempMax").text(response.main.temp_max);
      $("#tempMin").text(response.main.temp_min);
    });.fail(function(error) {
      $('#showError').text(error.responseJSON.message);
    });

  // end of submit event
  });

// end of document ready
});
