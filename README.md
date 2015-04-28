# uber-cache-namespace — Wrapper for [uber-cache](http://github.com/serby/uber-cache) providing namespacing

## Installation

    npm install uber-cache-namespace

## Usage

uber-cache-namespace prevents accidental overriding of data when more than one application
uses the same cache engine (eg. memcached)

```js

var cache = new UberCacheNamespace('my-namespace', myUberCacheEngine)

cache.set('some-key', someData, ttl, function (err, savedValue) {
	// writes to myUberCacheEngine with my-namespace- prefixed to the key
	cache.get('some-key', function (error, data) {
		// retrieves data — you don’t have to worry about the prefix
	}
})

cache.on('miss', function (key) {
	// key will not have the prefix prepended
})

```

## API

### Functions

* `set(key, value, ttl, callback)`

    **ttl** milliseconds until expiry. Optional

* `get(key, callback)`
* `delete(key, callback)`

Please be aware that although some uber-cache engines support `dump`, `size`, and `clear`,
`uber-cache-namespace` does not. These methods are implemented only to make testing possible.

### Events

* `miss(key)` — Emitted when a `get(key)` fails to find a valid cached item with that key.
* `hit(key, value, ttl)` — Emitted when a `get(key)` finds a valid item in the cache.
* `stale(key, value, ttl)` — Emitted when a `get(key)` can’t find a valid item but a stale item still exists.
* `delete(key)` — Emitted when a `delete(key)` deletes an item.

## Credits
[Kuba Stawiarski](https://github.com/kuba81/)

## License
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
