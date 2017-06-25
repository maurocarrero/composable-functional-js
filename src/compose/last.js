const expect = require('expect')

/**
 * COMPOSE
 * @param f: function
 * @param g: function
 * @returns function
 */
const compose = (f, g) => x => f(g(x))

const head = x => x[ 0 ]
const reverse = xs => xs.reduce((acc, x) => {
  return [ x ].concat(acc)
}, [])

const reverseHead = compose(head, reverse)

let res = reverseHead(['jumpkick', 'roundhouse', 'uppercut'])

expect(res).toEqual('uppercut')
console.log(res)

const last = compose(
  x => x.toUpperCase(),
  x => x.concat('!'))

res = last(res)

expect(res).toEqual('UPPERCUT!')
console.log(res)
