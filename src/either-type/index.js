console.log('*********************************************************************************************************')
console.log('Either type: Left || Right')
console.log('*********************************************************************************************************')

// Either is defined as:
// const Either = Left || Right

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

const leftResult = Left(3).map(num => num + 4).fold(x => 'error', num => num)
const rightResult = Right(3).map(num => num + 4).fold(x => 'error', num => num)

console.log('Left result', leftResult)
console.log('Right result', rightResult)
