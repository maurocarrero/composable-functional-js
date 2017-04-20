console.log('*********************************************************************************************************')
console.log('Money to float')
console.log('*********************************************************************************************************')

const applyDiscount = require('./declarative')
const composedApplyDiscount = require('./composition')

const imperativeResult = applyDiscount('$5.00', '20%')
const composedResult = composedApplyDiscount('$5.00', '20%')

console.log('Imperative result', imperativeResult)
console.log('Composition result', composedResult)


