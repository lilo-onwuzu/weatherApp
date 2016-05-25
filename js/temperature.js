exports.Temperature = function(kelvin){
  this.kelvin = kelvin;
}

exports.Temperature.prototype.convertToFahrenheit = function() {
  return (this.kelvin - 273.15)*1.8 + 32;
}

exports.Temperature.prototype.convertToCelsius = function() {
  return this.kelvin - 273.15
}
