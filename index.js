var Promise = require('bluebird')
var request = require('got')
var extend = require('xtend')

var BASE_URL = 'http://www.broadbandmap.gov/broadbandmap/broadband/jun2014/'

module.exports = function broadbandMap (lat, long, options) {
  options = extend({
    types: ['wireline', 'wireless']
  }, options || {})

  return Promise.resolve(options.types).map(sendRequest).map(parseResults)

  function sendRequest (type) {
    return request.get(BASE_URL + type + '?latitude=' +
      lat + '&longitude=' + long + '&format=json')
  }

  function parseResults (response) {
  	return JSON.parse(response.body).Results
  }
}
