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

const leftResult = Left(3).map(num => num + 4).map(num => num / 2).fold(x => 'error', num => num)
const rightResult = Right(3).map(num => num + 4).map(num => num / 2).fold(x => 'error', num => num)

expect(leftResult).toEqual('error')
expect(rightResult).toEqual(3.5)

log('const Right =', Right.toString())
log('const Left =', Left.toString())

log(`const leftResult = Left(3).map(num => num + 4).fold(x => \'error\', num => num) --> ${leftResult}`)
log(`const rightResult = Right(3).map(num => num + 4).fold(x => \'error\', num => num) --> ${rightResult}`)

/**
 * Find color
 * @param name
 */
const findColor = name => ({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' })[name]

log('Find Color', findColor('blue'))
log('Find Color', findColor('yellow'))
log('Find Color', findColor('red').slice(1).toUpperCase())

try {
  log('Find Color with errors', findColor('green').slice(1).toUpperCase())
} catch (error) {
  log('There was an error ---->', error.message.split('\n'))
}

// To avoid this error
const fromNullable = x => x ? Right(x) : Left(null)

const findColorErrorHandling = name =>
  fromNullable({ red: '#ff4444', blue: '#3b5998', yellow: '#fff68f' }[name])

log('Find Color (with error handling) with NO error ---->',
  findColorErrorHandling('red')
    .map(color => color.slice(1))
    .fold(() => 'No color found.', color => color.toUpperCase()))

log('Find Color handling the error ---->',
  findColorErrorHandling('green')
    .map(color => color.slice(1))
    .fold(() => 'No color found. Nice and neat :)', color => color.toUpperCase()))

console.log('*********************************************************************************************************')
