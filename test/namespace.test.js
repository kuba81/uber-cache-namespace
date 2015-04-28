var UberCacheNamespace = require('..')
  , UberCache = require('uber-cache')
  , noop = function () {}

describe('uber-cache-namespace', function() {
  describe('conformance tests', function () {
    var engine

    beforeEach(function () {
      engine = new UberCacheNamespace('my-prefix', new UberCache())
    })

    require('uber-cache/test/conformance-test')('uber-cache-namespace', function() {
      return engine
    })
  })

  describe('uber-cache-namespace-specific behavior', function () {
    it('should cry when prefix is an empty string', function (done) {
      try {
        engine = new UberCacheNamespace('', { })
      } catch (err) {
        err.message.should.equal('Prefix cannot be empty')
        done()
      }

      engine.set('key')
    })

    it('should cry when prefix null', function (done) {
      try {
        engine = new UberCacheNamespace(null, { })
      } catch (err) {
        err.message.should.equal('Prefix cannot be empty')
        done()
      }

      engine.set('key')
    })

    it('should cry when prefix is undefined', function (done) {
      try {
        engine = new UberCacheNamespace(undefined, { })
      } catch (err) {
        err.message.should.equal('Prefix cannot be empty')
        done()
      }

      engine.set('key')
    })

    it('should prepend the key with prefix when setting', function (done) {
      var mock =
        { set: function (key) {
            key.should.eql('my-prefix-key')
            done()
          }
        , on: noop
        }
      , engine = new UberCacheNamespace('my-prefix', mock)

      engine.set('key')
    })
  })
})
