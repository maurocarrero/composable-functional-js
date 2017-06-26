const expect = require('expect')

// The Container
const Container = function(x) {
  this.__value = x
}

// A static method that serves as a constructor to avoid the new keyword
Container.of = x => new Container(x)

// Create a container for value 7
const containerOf7 = Container.of(7)
expect(containerOf7.__value).toEqual(7)


// Functors
// Once our value, whatever it may be, is in the container, we'll need a way to run functions on it.+

Container.prototype.map = function (f) {
  return Container.of(f(this.__value))
}

let result = containerOf7.map(x => x + 3)

expect(result.__value).toEqual(10)

result = containerOf7
  .map(x => x * 2)
  .map(x => `The value is ${x}`)

expect(result.__value).toEqual('The value is 14')
