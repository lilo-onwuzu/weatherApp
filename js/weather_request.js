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
