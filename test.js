'use strict'

var Lab = require('lab')
var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var Code = require('code')
var expect = Code.expect

var broadbandMap = require('./index')

describe('broadbandMap', function () {
  it('finds wireline and wireless results by default', function (done) {
    return broadbandMap(37.7848668, -122.4369548)
    .spread(function (wireline, wireless) {
      expect(wireline.wirelineServices).to.exist()
      expect(wireline.wirelineServices).to.be.an.array()
      expect(wireless.wirelessServices).to.exist()
      expect(wireless.wirelessServices).to.be.an.array()

      done()
    })
  })

  it('can filter by type', function (done) {
    return broadbandMap(37.7848668, -122.4369548, {
      types: ['wireless']
    })
    .spread(function (wireless) {
      expect(wireless.wirelessServices).to.exist()
      expect(wireless.wirelessServices).to.be.an.array()

      done()
    })
  })
})
