const expect = require('expect')

const Box = x => ({
  fold: fn => fn(x),
  map: fn => Box(fn(x)),
  inspect: _ => `Box(${x})`
})

let result = Box(7)
  .map(x => x + 24)
  .map(x => x + 11)
  .map(x => x + 18)
  .map(x => x + 27)

expect(result).toEqual(Box(87))
console.log('Box:', result)

result = result
  .fold(x => x)

expect(result).toEqual(87)
console.log('Box fold:', result)

result = Box('    64  ')
  .map(abba => abba.trim())
  .map(trimmed => new Number(trimmed))
  .map(number => number + 1)
  .map(x => String.fromCharCode(x))
  .map(x => {
    console.log('This will run anyway.')
    return x
  })
  .fold(x => x.toLowerCase())

expect(result).toEqual('a')
console.log('Get the letter within "    64  ":', result)

/**
 * DELAY EVALUATION WITH LAZY BOX (Church encoding)
 *
 * Purity by virtue of lazyness.
 * Nothing happens until the very end in which we call fold.
 * We do not have impure side effects.
 * We push everything down to the bottom.
 *
 * Types that define map this way: Promises, Observables, Streams.
 */
const LazyBox = g => ({
  fold: f => f(g()),
  map: f => LazyBox(_ => f(g()))
})

result = LazyBox(() => '    64  ')
  .map(abba => abba.trim())
  .map(trimmed => new Number(trimmed))
  .map(number => number + 1)
  .map(x => String.fromCharCode(x))
  .map(x => {
    console.log('This will not run until fold.')
    return x
  })
  .fold(x => x.toLowerCase())

expect(result).toEqual('a')
console.log('Result of LazyBox is the same once we fold it:', result)
