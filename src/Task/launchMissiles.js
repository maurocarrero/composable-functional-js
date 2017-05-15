const expect = require('expect')
const Task = require('data.task')

const launchMissiles = _ =>
  new Task((rej, res) => {
    console.log('Launching missiles...')
    return res('Missiles launched')
  })

let result = launchMissiles()
  .map(x => x.concat('!!!'))
  .fork(e => e, x => x)

expect(result).toEqual('Missiles launched!!!')
console.log(result)

// Map is lazy, if we do not fork, nothing happens
// this is useful for giving the control to an application
//
const app = launchMissiles()
  .map(x => x.concat('!'))

// the callers of our application has to fork it,
// they're in charge of all of the side effects, and the problems that come with that.
result = app
  .map(x => x.concat('!'))

// or even extend the computation before it runs
result = result
  .map(x => x.concat('!'))
  .fork(e => e, x => x)

expect(result).toEqual('Missiles launched!!!')
console.log(result)
