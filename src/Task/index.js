const expect = require('expect')
const Task = require('data.task')

let result = Task.of(1) // Task(1) ---> acts like a box
  .map(x => x + 6)
  .fork(
    e => console.log('Error', e),
    x => {
      console.log('Success', x)
      return x
    }
  )

expect(result).toEqual(7)

result = Task.rejected(1) // Task(1) ---> acts like a box
  .map(x => x + 6) // When rejected, the value is returned untouched, just like the Left of the Either type.
  .fork(
    e => {
      console.log('Error', e)
      return e
    },
    x => console.log('Success', x)
  )

expect(result).toEqual(1)

result = Task.of(7)
  .map(x => x * 2)
  .chain(x => Task.of(x + 27))
  .fork(
    e => {
      console.log('Error', e)
      return e
    },
    x => {
      console.log('Success', x)
      return x
    }
  )

expect(result).toEqual(41)
console.log('Result of chain of Tasks:', result)

result = Task.rejected(7)
  .map(x => x * 2)
  .chain(x => Task.of(x + 27))
  .fork(
    e => {
      console.log('Error', e)
      return e
    },
    x => {
      console.log('Success', x)
      return x
    }
  )

expect(result).toEqual(7)
console.log('Result when rejected ignores everything:', result)
