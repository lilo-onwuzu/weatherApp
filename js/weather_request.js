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
    // we may need response later on in UI
    
  // if the ajax request fails (i.e no internet connection for example) then show ajax request error message. 404 request (or city not found) is not included here as it will return a response with a 404 as its 'cod' attribute
  }).fail(function(error) {
    alert(error.responseJSON.message);
  });

};
