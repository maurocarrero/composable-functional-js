const expect = require('expect')

/**
 * COMPOSE
 * @param f: function
 * @param g: function
 * @returns function
 */
const compose = (f, g) => x => f(g(x))

const toUppercase = x => x.toUpperCase()
const exclaim = x => x.concat('!')

const shout = compose(exclaim, toUppercase)

const res = shout('Peteco has left the building')

expect(res).toEqual('PETECO HAS LEFT THE BUILDING!')

console.log(res)