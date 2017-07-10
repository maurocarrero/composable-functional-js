const expect = require('expect')
const Box = require('../box')

console.log('Applicative functors')
console.log('Have an .ap method')

const res = Box(x => x + 1).ap(Box(2)) // Box(3)
expect(res).toEqual(Box(3))

const add = x => y => x + y // curried form
const res2 = Box(add).ap(Box(2)).ap(Box(3))
expect(res2).toEqual(Box(5))

console.log(res, res2)

// F(x).map(f) == F(f).ap(F(x))
const id = x => x
expect(Box('Peteco').map(id)).toEqual(Box(id).ap(Box('Peteco')))

// We cannot define liftA2 as:
// (f, fx, fy) => F(f).ap(fx).ap(fy)
// since we do not know which functor is F

const liftA2 = (f, fx, fy) =>
  fx.map(f).ap(fy)

console.log(liftA2(add, Box(2), Box(4)))
