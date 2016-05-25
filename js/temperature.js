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
