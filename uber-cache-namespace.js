module.exports = UberCacheNamespace

var EventEmitter = require('events').EventEmitter

UberCacheNamespace.prototype = Object.create(EventEmitter.prototype)

function UberCacheNamespace(prefix, engine) {
  if (!prefix) throw new Error('Prefix cannot be empty')

  this.prefix = prefix + '-'
  this.engine = engine

  function setListener(event, isKeylessEvent) {
    engine.on(event, (function () {
      if (isKeylessEvent) return this.emit.apply(this, [].concat([ event ]).concat(arguments))

      var key = arguments[0]
        , args = Array.prototype.slice.call(arguments, 1)

      if (key.indexOf(this.prefix) === 0) {
        key = key.substring(this.prefix.length)
        this.emit.apply(this, [].concat([ event ]).concat([ key ]).concat(args))
      }
    }).bind(this))
  }

  setListener.call(this, 'miss')
  setListener.call(this, 'stale')
  setListener.call(this, 'hit')
  setListener.call(this, 'delete')
  setListener.call(this, 'clear', true)
}

UberCacheNamespace.prototype.set = function(key, value, ttl, callback) {
  if (key === undefined) {
    // pass through and let the engine handle
    return this.engine.set(key, value, ttl, callback)
  }
  key = this.prefix + key
  return this.engine.set(key, value, ttl, callback)
}

UberCacheNamespace.prototype.get = function(key, callback) {
  key = this.prefix + key
  return this.engine.get(key, callback)
}

UberCacheNamespace.prototype.delete = function(key, callback) {
  key = this.prefix + key
  return this.engine.delete(key, callback)
}

UberCacheNamespace.prototype.clear = function(callback) {
  return this.engine.clear(callback)
}

UberCacheNamespace.prototype.size = function(callback) {
  return this.engine.size(callback)
}
