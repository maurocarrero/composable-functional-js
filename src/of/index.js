const expect = require('expect')
const Task = require('data.task')
const Either = require('data.either')

// of
// Lift into a pointed functor.
// It gives us an interface to program against, that's "constructor agnostic".

let resTask1 = Task
  .of('hey')
  .fork(e => e, x => x)

// instead of

let resTask2 = new Task((rej, res) =>
  res('hey'))
  .fork(e => e, x => x)

expect(resTask1).toEqual('hey')
expect(resTask2).toEqual('hey')

let res2 = Either
  .of('hey')
  .fold(e => e, x => x)

expect(res2).toEqual('hey')
