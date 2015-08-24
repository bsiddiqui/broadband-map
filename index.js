var Promise = require('bluebird')
var request = require('got')
var extend = require('xtend')

var BASE_URL = 'http://www.broadbandmap.gov/broadbandmap/broadband/jun2014/'

module.exports = function broadbandMap (lat, long, options) {
  options = extend({
    types: ['wireline', 'wireless']
  }, options || {})

  return Promise.map(options.type, buildRequest)
  .spread(function (res1, res2) {
    var results = []

    if (res1 && res1.body) results.push(JSON.parse(res1.body).Results)
    if (res2 && res2.body) results.push(JSON.parse(res2.body).Results)

    return results
  })

  function buildRequest (type) {
    return request.get(BASE_URL + type + '?latitude=' +
      lat + '&longitude=' + long + '&format=json')
  }
}
