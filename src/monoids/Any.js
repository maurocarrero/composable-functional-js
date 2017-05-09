const expect = require('expect')

const Any = x => ({
  x,
  concat: ({ x: y }) => Any(x || y)
})

Any.empty = _ => Any(false) // Neutral identity

expect(Any(true).concat(Any(false))).toEqual(Any(true))
expect(Any(false).concat(Any.empty()).concat(Any(false))).toEqual(Any(false))
expect(Any(false).concat(Any.empty()).concat(Any(true))).toEqual(Any(true))
expect(Any(true).concat(Any.empty()).concat(Any(false))).toEqual(Any(true))
