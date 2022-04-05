var NodeGeocoder = require('node-geocoder');

var options = {
  provider: process.env.GEOCODER_PROVIDER,

  // Optionnal depending of the providers
  httpAdapter: 'https', 
  apiKey: process.env.GEOCODER_API_KEY, 
  formatter: null      
};

var geocoder = NodeGeocoder(options);

module.exports = geocoder;