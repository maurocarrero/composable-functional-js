console.log('*********************************************************************************************************')
console.log('Money to float')
console.log('*********************************************************************************************************')

const applyDiscount = require('./imperative')
const composedApplyDiscount = require('./composed')

const imperativeResult = applyDiscount('$5.00', '20%')
const composedResult = composedApplyDiscount('$5.00', '20%')

console.log('Imperative result', imperativeResult)
console.log('Composition result', composedResult)


