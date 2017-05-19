const expect = require('expect')
const curry = require('lodash/curry')

// Strategically positioned the data we're operating on (String, Array) as the last argument
const replace =
  curry(
    (what, replacement, str) =>
      str.replace(what, replacement)
  )

const noVowels = replace(/[aeiouy]/ig)
const censored = noVowels('*')

let res = censored('Chocolate rain')


expect(res).toEqual('Peteco')