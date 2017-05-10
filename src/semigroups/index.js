const log = require('../log')
const expect = require('expect')
const Map = require('immutable-ext').Map

const strResult = 'a'.concat('b').concat('c').concat('d')
expect(strResult).toEqual('abcd')

const arrayResult = [ 1, 2 ].concat([ 3, 4 ]).concat([ 5, 6, 7 ])
expect(arrayResult).toEqual([ 1, 2, 3, 4, 5, 6, 7 ])

const arrayResult2 = [ 1, 2 ].concat([ 3, 4 ].concat([ 5, 6, 7 ]))
expect(arrayResult2).toEqual([ 1, 2, 3, 4, 5, 6, 7 ])


log('--------------------------')
log('Sum - Add numbers')
log('--------------------------')

const Sum = x => ({
  x,
  concat: ({ x: y }) => Sum(x + y),
  inspect: _ => `Sum(${x})`
})

let res = Sum(1).concat(Sum(2)).concat(Sum(4))
log('Res:', res.inspect())


log('--------------------------')
log('All: makes sure all conditions are truthy')
log('--------------------------')


// true && false ---> false
// true && true ---> true

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y),
  inspect: () => `All(${x})`
})

res = All(true).concat(All(false)) // Should be false
expect(res).toEqual(All(false))
log('Res:', res.inspect())

res = All(true).concat(All(true)) // Should be false
expect(res).toEqual(All(true))
log('Res:', res.inspect())


log('--------------------------')
log('First: Always yield the first value')
log('--------------------------')

const First = x => ({
  x,
  concat: _ => First(x),
  inspect: _ => `First(${x})`
})

res = First('blah').concat(First('ice cream')).concat('Peteco') //
expect(res).toEqual(First('blah'))
log('Res:', res.inspect())

log('--------------------------')
log('Combining all types')
log('--------------------------')

const acct1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: [ 'Franklin' ] })
const acct2 = Map({ name: First('Nico'), isPaid: All(false), points: Sum(2), friends: [ 'Gatsby' ] })

res = acct1.concat(acct2)

log('Res: ', res.toJS())


