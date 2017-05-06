const log = require('../log')
const expect = require('expect')

log('---------------------------------------------')
log('IMPERATIVE')
log('---------------------------------------------')

const concatUniqImperative = (x, ys) => {
  const found = ys.filter(y => y === x)[ 0 ]
  return found ? ys : ys.concat(x)
}
const expected = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
const fromLowestToHighest = (x, y) => x > y

expect(concatUniqImperative(7, [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])).toEqual(expected)
expect(concatUniqImperative(7, [ 1, 2, 3, 4, 5, 6, 8, 9, 10 ]).sort(fromLowestToHighest)).toEqual(expected)

log('---------------------------------------------')
log('DECLARATIVE')
log('---------------------------------------------')

const Right = x => ({
  chain: () => Right(x),
  fold: (err, fn) => fn(x),
  inspect: () => `Right(${x})`,
  map: fn => Right(fn(x))
})

const Left = x => ({
  chain: () => Left(x),
  fold: fn => fn(x),
  inspect: () => `Left(${x})`,
  map: () => Left(x)
})

const fromNullable = x => x ? Right(x) : Left(x)

const concatUniqDeclarative = (x, ys) =>
  fromNullable(ys.filter(y => y === x)[ 0 ])
    .fold(() => ys.concat(x), () => ys)

expect(concatUniqDeclarative(7, [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ])).toEqual(expected)
expect(concatUniqDeclarative(7, [ 1, 2, 3, 4, 5, 6, 8, 9, 10 ]).sort(fromLowestToHighest)).toEqual(expected)
