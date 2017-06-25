const expect = require('expect')
const compose = require('ramda').compose

//********************************************************************************
// EXAMPLE 1

const replace = (regexp, replacement) => x => x.replace(regexp, replacement)
const toLowerCase = x => x.toLowerCase()

//not pointfree because we mention the data: word
const snakeCase = function(word) {
  return word.toLowerCase().replace(/\s+/ig, '_');
};

//pointfree
const pointFreeSnakeCase = compose(replace(/\s+/ig, '_'), toLowerCase);

let INPUT = 'peteco y su combo'
let EXPECTED = 'peteco_y_su_combo'

expect(snakeCase(INPUT)).toEqual(EXPECTED)
expect(pointFreeSnakeCase(INPUT)).toEqual(EXPECTED)
console.log('snakeCase(INPUT)', snakeCase(INPUT))
console.log('pointFreeSnakeCase(INPUT)', pointFreeSnakeCase(INPUT))


//********************************************************************************
// EXAMPLE 2

const initials = function (name) {
  return name.split(' ').map(n => n.substring(0, 1)).join('')
}

const pointFreeInitials = compose(
  xs => xs.join(''),
  xs => xs.map(x => x.substring(0, 1)),
  x => x.split(' ')
)

INPUT = 'Mauro Carrero Montiel'
EXPECTED = 'MCM'

const res1 = initials(INPUT)
const res2 = pointFreeInitials(INPUT)

expect(res1).toEqual(EXPECTED)
expect(res2).toEqual(EXPECTED)
console.log(res1, res2)

