const expect = require('expect')
const Task = require('data.task')
const { Left, Right } = require('data.either')
const { List, Map } = require('immutable-ext')

const Box = x => ({
  map: fn => Box(fn(x)),
  inspect: _ => `Box(${x})`
})

// Functors Laws

// 1) Function Composition:
//    fx.map(f).map(g) === fx.map(x => f(g()))

let res1 = Box('Petekus')
  .map(x => x.toUpperCase()) // f
  .map(x => x.substring(5)) // g

let res2 = Box('Petekus')
  .map(x => x
    .toUpperCase() // f
    .substring(5) // g
  )

expect(res1).toEqual(res2)
console.log(res1, res2)


// 2) Identity

const id = x => x // Identity function

res1 = Box('Ignacio').map(id)
res2 = id(Box('Ignacio'))

expect(res1).toEqual(res2)
console.log(res1, res2)


// LAWS ON DIFFERENT FUNCTORS

// Left
res1 = Left('Facundo').map(id)
res2 = id(Left('Facundo'))

let res3 = Left('Facundo')
  .map(x => x.toUpperCase())
  .map(x => x.substring(5))

let res4 = Left('Facundo')
  .map(x => x.toUpperCase().substring(5))

expect(res1).toEqual(res2)
expect(res3).toEqual(res4)
console.log('Left identity:', res1, res2)
console.log('Left function composition:', res3, res4)



// Right
res1 = Right('Lucas').map(id)
res2 = id(Right('Lucas'))

res3 = Right('Lucas')
  .map(x => x.toUpperCase())
  .map(x => x.substring(5))

res4 = Right('Lucas')
  .map(x => x.toUpperCase().substring(5))

expect(res1).toEqual(res2)
expect(res3).toEqual(res4)
console.log('Right identity:', res1, res2)
console.log('Right function composition:', res3, res4)



// Map
res1 = Map({ name: 'Vichy' }).map(id)
res2 = id(Map({ name: 'Vichy' }))

res3 = Map({ name: 'Vichy' })
  .map(x => x.toUpperCase())
  .map(x => x.substring(5))

res4 = Map({ name: 'Vichy' })
  .map(x => x.toUpperCase().substring(5))

expect(res1).toEqual(res2)
expect(res3).toEqual(res4)
console.log('Map identity:', res1, res2)
console.log('Map function composition:', res3, res4)



// List
res1 = List('Vichy', 'Mauro').map(id)
res2 = id(List('Vichy', 'Mauro'))

res3 = Map({ name: 'Vichy' })
  .map(x => x.toUpperCase())
  .map(x => x.substring(5))

res4 = Map({ name: 'Vichy' })
  .map(x => x.toUpperCase().substring(5))

expect(res1).toEqual(res2)
expect(res3).toEqual(res4)
console.log('Map identity:', res1, res2)
console.log('Map function composition:', res3, res4)



// Task
res1 = Task.of('Vichy')
  .map(id)
  .fork(e => e, x => x)
res2 = id(
  Task.of('Vichy')
    .fork(e => e, x => x))

res3 = Task.of('Vichy')
  .map(x => x.toUpperCase())
  .map(x => x.substring(5))
  .fork(e => e, x => x)

res4 = Task.of('Vichy')
  .map(x => x.toUpperCase().substring(5))
  .fork(e => e, x => x)

expect(res1).toEqual(res2)
expect(res3).toEqual(res4)
console.log('Task identity:', res1, res2)
console.log('Task function composition:', res3, res4)

