const expect = require('expect')

const All = x => ({
  x,
  concat: ({ x: y }) => All(x && y)
})

All.empty = _ => All(true) // Neutral identity

expect(All(true).concat(All(true))).toEqual(All(true))
expect(All(true).concat(All.empty()).concat(All(true))).toEqual(All(true))
expect(All(false).concat(All.empty()).concat(All(true))).toEqual(All(false))
expect(All(true).concat(All.empty()).concat(All(false))).toEqual(All(false))
