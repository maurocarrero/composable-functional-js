const expect = require('expect')
const curry = require('lodash/curry')

// Strategically positioned the data we're operating on (String, Array) as the last argument

const match =
  curry(
    (what, str) =>
      str.match(what)
  )

const replace =
  curry(
    (what, replacement, str) =>
      str.replace(what, replacement)
  )

const filter =
  curry((f, arr) =>
    arr.filter(f)
  )

const map =
  curry(
    (f, arr) =>
      arr.map(f)
  )

const noVowels = replace(/[aeiouy]/ig)
const censored = noVowels('*')

let res = censored('Chocolate rain')


const TEST_MOCK = [ {
  childNodes: [ 7, 77, 79 ]
}, {
  childNodes: [ 2, 5, 7 ]
}, {
  childNodes: [ 3, 9, 81 ]
} ]

const getChildren = x => x.childNodes
const allTheChildren = map(getChildren)

expect(allTheChildren(TEST_MOCK)).toEqual([[ 7, 77, 79 ], [ 2, 5, 7 ], [ 3, 9, 81 ]])




