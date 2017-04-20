// BOX (again...)
// Map is a type of composition
// Composition is good at unnesting expressions
// Box is not always better, it serves for unnesting expressions
const Box = (x) => ({
  map: fn => Box(fn(x)),
  fold: fn => fn(x),
  inspect: () => `Box(${x})`
})

const moneyToFloat = (str) =>
  Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(s => parseFloat(s))

const percentToFloat = (str) =>
  Box(str.replace(/\$/g, ''))
    .map(s => parseFloat(s))
    .map(number => number * 0.01)

const composedApplyDiscount = (price, discount) => {
  // Encapsulate cost into a closure to be used by percentToFloat fold
  // there are two folds, since we are two level deep, 2 Boxes: moneyToFloat and percentToFloat
  return moneyToFloat(price)
    .fold(cost =>
      percentToFloat(discount)
        .fold(savings => cost - (cost * savings))
    )
}

module.exports = composedApplyDiscount
