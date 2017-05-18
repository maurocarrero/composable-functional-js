const expect = require('expect')

const add = x => y => x + y

expect(add(7)(3)).toEqual(10)
expect(add(7)(20)).toEqual(27)
expect(add(7)(70)).toEqual(77)

const increment = add(1)

expect(increment(6)).toEqual(7)

const add10 = add(10)

expect(add10(7)).toEqual(17)
expect(add10(10)).toEqual(20)
