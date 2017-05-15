const expect = require('expect')

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  fold: f => f(x),
  inspect: _ => `Sum(${x})`
})

Sum.empty = _ => Sum(0) // Neutral identity

expect(Sum(3).concat(Sum(4))).toEqual(Sum(7))
expect(Sum(3).concat(Sum.empty()).concat(Sum(4))).toEqual(Sum(7))

module.exports = Sum