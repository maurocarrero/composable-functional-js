const expect = require('expect')

const Min = x => ({
  x,
  concat: ({ x: y }) => Min(x < y ? x : y)
})

Min.empty = _ => Min(Infinity)

expect(Min(1).concat(Min(2))).toEqual(Min(1))
expect(Min(7).concat(Min(2))).toEqual(Min(2))
expect(Min(7).concat(Min(14))).toEqual(Min(7))
expect(Min.empty().concat(Min(1).concat(Min(2)))).toEqual(Min(1))
expect(Min(7).concat(Min(2)).concat(Min.empty())).toEqual(Min(2))
expect(Min(7).concat(Min.empty()).concat(Min(14))).toEqual(Min(7))
