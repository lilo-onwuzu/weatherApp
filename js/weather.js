var apiKey = require('./.env').apiKey;

// ajaxRequest
function ajaxRequest(city) {
  return .get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey, function(response) {
    console.log(response)
  });.fail(function(error) {
    console.log(error.responseJSON.message);
  });
}
