const expect = require('expect')
const compose = require('ramda').compose

// const associative = compose(f, compose(g, h)) == compose(compose(f, g), h);

const toUpperCase = x => x.toUpperCase()
const head = xs => xs[ 0 ]
const reverse = xs => xs.reduce((acc, x) => [ x ].concat(acc), [])
const exclaim = x => `${x}!`

const firstComposition = compose(toUpperCase, compose(head, reverse));

const secondComposition = compose(compose(toUpperCase, head), reverse);

const INPUT = [ 'Peteco', 'Ciruja', 'Pantagruel' ]

try {
  // The order of the composition must be the same otherwise --->
  // Err: third composition fails cause "reverse" works on an array argument,
  // but since "head" runs first, "reverse" receives a string instead of an array.
  const thirdComposition = compose(reverse, compose(toUpperCase, head));
  thirdComposition(INPUT)
} catch (err) {
  console.log('Err: third composition fails cause "reverse" works on an array argument, but since "head" runs first, "reverse" receives a string instead of an array.')
}

try {
  compose(compose(reverse, toUpperCase), head)(INPUT)
} catch (err) {
  console.log('Err: fourth ---> idem third')
}

const firstRes = firstComposition(INPUT)
const secondRes = secondComposition(INPUT)

expect(firstRes).toEqual(secondRes)

/**
 * GROUPING
 */
const lastUpper = compose(toUpperCase, head, reverse)
expect(lastUpper(INPUT)).toEqual('PANTAGRUEL')

// 1
const loudLastUpper = compose(exclaim, toUpperCase, head, reverse)

// 2
const last = compose(head, reverse);
const loudLastUpper2 = compose(exclaim, toUpperCase, last);

// 3
const angry = compose(exclaim, toUpperCase);
const loudLastUpper3 = compose(angry, last);

expect(loudLastUpper(INPUT)).toEqual('PANTAGRUEL!')
expect(loudLastUpper(INPUT)).toEqual(loudLastUpper2(INPUT))
expect(loudLastUpper2(INPUT)).toEqual(loudLastUpper3(INPUT))
