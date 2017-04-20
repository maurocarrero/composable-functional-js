const STR = '     64  '
const PLAIN = require('./nextChartFromNumberString')(STR)
const CHAIN = require('./chainedNextCharFromNumberString')(STR)
const FUNCTIONAL = require('./functionalNextCharFromNumberString')(STR)
const COMPOSED = require('./functionalBoxNextCharFromNumberString')(STR)

console.log('Plain flow:', PLAIN, '-', typeof PLAIN)
console.log('Chaining:', CHAIN, '-', typeof CHAIN)
console.log('Composing:', FUNCTIONAL, '-', typeof FUNCTIONAL)
console.log('Composing with a box:', COMPOSED, '-', typeof COMPOSED)
