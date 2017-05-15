const expect = require('expect')
const fetch = require('isomorphic-fetch')

const memoize = function (f) {
  let cache = {}

  return function () {
    const arg_str = JSON.stringify(arguments)
    cache[ arg_str ] = cache[ arg_str ] || f.apply(f, arguments)
    return cache[ arg_str ]
  }
}

const modulo = x => x * x

const cachedModulo = memoize(modulo)

expect(cachedModulo(2)).toEqual(4)
expect(cachedModulo(2)).toEqual(4)
expect(cachedModulo(2)).toEqual(4)
expect(cachedModulo(3)).toEqual(9)

// This way we make a function that will be always called with the same arguments, so the same url and params
// that is why this is a pure function, the result though, will still be unknown.
const pureHttpGet = memoize((url, params) => {
  return function () {
    return fetch(url, params)
  }
})
