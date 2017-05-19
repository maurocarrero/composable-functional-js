const expect = require('expect')

/**
 * COMPOSE
 * @param f: function
 * @param g: function
 * @returns function
 */
const compose = (f, g) => x => f(g(x))

const head = x => x[ 0 ]
const reverse = xs => xs.reduce((acc, x) => x.concat(acc), '')

const reverseHead = compose(reverse, head)

let res = reverseHead([
  [ 'working', 'is ', 'This ' ],
  [ 'This', 'is', 'not', 'working' ]
])

expect(res).toEqual('This is working')
console.log(res)


const shout = compose(x => x.toUpperCase(), x => x.concat('!'))
res = shout(res)

expect(res).toEqual('THIS IS WORKING!')
console.log(res)
