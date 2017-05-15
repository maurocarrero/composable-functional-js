const expect = require('expect')
const { Map, List } = require('immutable-ext')
const Sum = require('./monoids/Sum')

let res = [ Sum(1), Sum(2), Sum(3) ]
  .reduce((acc, x) =>
    acc.concat(x), Sum.empty())

expect(res).toEqual(Sum(6))
console.log('Res with reduce:', res)

res = List.of(Sum(2), Sum(2), Sum(3))
  .fold(Sum.empty())

expect(res).toEqual(Sum(7))
console.log('Res List.of:', res)

res = List.of()
  .fold(Sum.empty())

expect(res).toEqual(Sum(0))
console.log('Res List.of empty:', res)

res = List.of(Sum(27), [])
  .fold(Sum.empty())

expect(res).toEqual(Sum(NaN))
console.log('Res List.of invalid:', res)


/**
 * Map
 */

res = Map({
  pochi: Sum(7),
  facu: Sum(24),
  luqui: Sum(18),
  vichy: Sum(11),
  mauro: Sum(27)
})
  .fold(Sum.empty())

expect(res).toEqual(Sum(87))
console.log('Res Map:', res)

res = Map({
  pochi: 7,
  facu: 24,
  luqui: 18,
  vichy: 11,
  mauro: 27
})
  .map(Sum)
  .fold(Sum.empty())

expect(res).toEqual(Sum(87))
console.log('Res Map mapping to Sum:', res)

res = List.of(1, 2, 3, 4, 5, 6, 7)
  .map(Sum)
  .fold(Sum.empty())

expect(res).toEqual(Sum(28))
console.log('Res Mapping to Sum, with List.of numbers:', res)

/**
 * foldMap
 */

res = List.of(1, 2, 3)
  .foldMap(Sum, Sum.empty())

expect(res).toEqual(Sum(6))
console.log('foldMap List.of numbers:', res)

