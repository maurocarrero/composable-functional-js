const expect = require('expect')
const _ = require('ramda')

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

const words = function (str) {
  return _.split(' ', str)
}

expect(words("Jingle bells Batman smells")).toEqual([ 'Jingle', 'bells', 'Batman', 'smells' ])

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

const sentences = _.map(words)

expect(sentences([ "Jingle bells Batman smells", "Robin laid an egg" ]))
  .toEqual([ [ 'Jingle', 'bells', 'Batman', 'smells' ], [ 'Robin', 'laid', 'an', 'egg' ] ])

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.
const match = (what, str) => str.match(what) // <--- HELPER

// const filterQs = function(xs) {
//   return _.filter(function(x) {
//     return match(/q/i, x)
//   }, xs)
// }

const matches = x => match(/q/i, x)
const filterQs = _.filter(matches)

expect(
  filterQs([ 'quick', 'camels', 'quarry', 'over', 'quails' ])
).toEqual([ 'quick', 'quarry', 'quails' ])

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
const _keepHighest = function (x, y) {
  return x >= y ? x : y
}

// REFACTOR THIS ONE:
// const max = function(xs) {
//   return _.reduce(function(acc, x) {
//     return _keepHighest(acc, x)
//   }, -Infinity, xs)
// }
const max = _.reduce(_keepHighest, -Infinity)

expect(max([ 323, 523, 554, 123, 5234 ])).toEqual(5234)


// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
const slice = start => end => arr =>
  Array.prototype.slice.apply(arr, [ start, end ])

expect(slice(1)(3)([ 'a', 'b', 'c' ])).toEqual([ 'b', 'c' ])

// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].
const take = num => arr => slice(0)(num)(arr)

expect(take(2)([ 'a', 'b', 'c' ])).toEqual([ 'a', 'b' ])
