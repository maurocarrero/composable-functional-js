const log = require('../log')
const expect = require('expect')

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: _ => `Sum(${x})`
})

Sum.empty = _ => Sum(0)

let res = Sum.empty().concat(Sum(3).concat(Sum(4)))
expect(res).toEqual(Sum(7))

res = Sum(1).concat(Sum.empty())
expect(res).toEqual(Sum(1))

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
})

All.empty = _ => All(true)

res = All(true).concat(All(false)).concat(All.empty())
expect(res).toEqual(All(false))

res = All(true).concat(All(true)).concat(All.empty())
expect(res).toEqual(All(true))


const sum = xs =>
  xs.reduce((acc, x) => acc + x, 0)

expect(sum([3, 4])).toEqual(7)
expect(sum([3, 4, 7])).toEqual(14)
expect(sum([])).toEqual(0)

const all = xs =>
  xs.reduce((acc, x) => acc && x, true)

expect(all([true, false])).toEqual(false)
expect(all([true, true])).toEqual(true)
expect(all([])).toEqual(true)

const first = xs =>
  xs.reduce((acc, x) => acc)

expect(first([true, false])).toEqual(true)
expect(first(['Vichy', 'Peteco'])).toEqual('Vichy')

try {
  first([])
} catch (err) {
  console.error('Function "first" cannot be called with an empty array, error:', err.message)
}
