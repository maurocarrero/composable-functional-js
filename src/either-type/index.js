const log = require('../log')
const expect = require('expect')

log('*********************************************************************************************************')
log('Either type: Left || Right')
log('Either is defined as:')
log('    const Either = Left || Right')

const Right = x => ({
  inspect: () => `Right(${x})`,
  fold: (f, g) => g(x),
  map: fn => Right(fn(x))
})

const Left = x => ({
  inspect: () => `Left(${x})`,
  fold: (f) => f(x),
  map: fn => Left(x)
})

const leftResult = Left(3).map(num => num + 4).map(x => 'error', num => num).inspect()

const rightResult = Right(3).map(num => num + 4).map(x => 'error', num => num).inspect()

expect(leftResult).toExist()
expect(rightResult).toExist()

log('const Right =', Right.toString())
log('const Left =', Left.toString())

log(leftResult, 'const leftResult = Left(3).map(num => num + 4).fold(x => \'error\', num => num)')
log(rightResult, 'const rightResult = Right(3).map(num => num + 4).fold(x => \'error\', num => num)')

log(`Left result = ${leftResult}`)
log(`Right result = ${rightResult}`)

console.log('*********************************************************************************************************')
