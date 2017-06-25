/**
 * CATEGORY THEORY
 *
 * A category is a collection with the following components:
 * A collection of OBJECTS
 * A collection of MORPHISMS
 * A notion of COMPOSITION on the morphisms
 * A distinguished morphism called IDENTITY
 *
 * OBJECTS, MORPHISMS, COMPOSITION, IDENTITY
 **/

const _ = require('ramda')
const expect = require('expect')
const DATA = require('./data.json')

// Exercise 1:
// ============
// Use _.compose() to rewrite the function below. Hint: _.prop() is curried.
// const isLastInStock = function(cars) {
//   const last_car = _.last(cars);
//   return _.prop('in_stock', last_car);
// };

const isLastInStock = _.compose(_.prop('in_stock'), _.last)

let expected = false
let result = isLastInStock(DATA)

console.log('Ex 01:', result)
expect(result).toEqual(expected)

// Exercise 2:
// ============
// Use _.compose(), _.prop() and _.head() to retrieve the name of the first car.
// const nameOfFirstCar = undefined;

const nameOfFirstCar = _.compose(_.prop('name'), _.head)
result = nameOfFirstCar(DATA)
expected = 'Ferrari FF'

console.log('Ex 02:', result)
expect(result).toEqual(expected)

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.
const _average = function (xs) {
  return _.reduce(_.add, 0, xs) / xs.length;
};
// // <- leave be

// var averageDollarValue = function(cars) {
//   var dollar_values = _.map(function(c) {
//     return c.dollar_value;
//   }, cars);
//   return _average(dollar_values);
// };

const averageDollarValue = _.compose(_average, _.map(_.prop('dollar_value')))

result = averageDollarValue(DATA)
expected = 790700

console.log('Ex 03:', result)
expect(result).toEqual(expected)


// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored car's names:
// e.g: sanitizeNames([{ name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) //=> ['ferrari_ff'].

const _underscore = _.replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize
const toLower = x => x.toLowerCase()
const sanitizeNames = _.map(_.compose(toLower, _underscore, _.prop('name')));

result = sanitizeNames(DATA)
expected = [ 'ferrari_ff', 'spyker_c12_zagato', 'jaguar_xkr_s', 'audi_r8', 'aston_martin_one_77', 'pagani_huayra' ]

console.log('Ex 04:', result)
expect(result).toEqual(expected)


// Bonus 1:
// ============
// Refactor availablePrices with compose.

// var availablePrices = function(cars) {
//   var available_cars = _.filter(_.prop('in_stock'), cars);
//   return available_cars.map(function(x) {
//     return accounting.formatMoney(x.dollar_value);
//   }).join(', ');
// };
const accounting = {
  formatMoney: x => `USD ${x}`
}

const _join = x => x.join(', ')

const availablePrices = _.compose(
  _join,
  _.map(_.compose(accounting.formatMoney, _.prop('dollar_value'))),
  _.filter(_.prop('in_stock'))
)

result = availablePrices(DATA)
expected = 'USD 700000, USD 1850000'

console.log('Ex 05:', result)
expect(result).toEqual(expected)

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use _.flip().

var fastestCar = function(cars) {
  var sorted = _.sortBy(function(car) {
	  return car.horsepower;
  }, cars);
   var fastest = _.last(sorted);
   return fastest.name + ' is the fastest';
};

const _post = x => x.concat(' is the fastest')
const fastestCarComposed = _.compose(_post, _.prop('name'), _.last, _.sortBy(_.prop('horsepower')))

result = fastestCar(DATA)
result2 = fastestCarComposed(DATA)
expected = 'Aston Martin One-77 is the fastest'

console.log('Ex 06:', result)
expect(result).toEqual(expected)
expect(result).toEqual(result2)
