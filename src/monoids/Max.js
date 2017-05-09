const expect = require('expect')

const Max = x => ({
  x,
  concat: ({ x: y }) => Max(x > y ? x : y)
})

Max.empty = _ => Max(-Infinity)

expect(Max(7).concat(Max(5))).toEqual(Max(7))
expect(Max(7).concat(Max(5)).concat(Max.empty())).toEqual(Max(7))
expect(Max(-77777).concat(Max(5)).concat(Max.empty())).toEqual(Max(5))
expect(Max(-77777).concat(Max(-88888)).concat(Max.empty()).concat(Max(-777777))).toEqual(Max(-77777))
expect(Max(77777).concat(Max(88888)).concat(Max.empty()).concat(Max(-777777))).toEqual(Max(88888))
