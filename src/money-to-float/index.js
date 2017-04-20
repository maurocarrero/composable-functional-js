console.log('*********************************************************************************************************')
console.log('Money to float')
console.log('*********************************************************************************************************')

const applyDiscount = require('./declarative')
const composedApplyDiscount = require('./composition')

const declarativeResult = applyDiscount('$5.00', '20%')
const compositionResult = composedApplyDiscount('$5.00', '20%')

console.log('Declarative result', declarativeResult)
console.log('Composition result', compositionResult)


