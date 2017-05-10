const expect = require('expect')

const Product = x => ({
  x,
  concat: ({ x: y }) => Product(x * y)
})

Product.empty = _ => Product(1) // Neutral identity

expect(Product(3).concat(Product(4))).toEqual(Product(12))
expect(Product(3).concat(Product.empty()).concat(Product(4))).toEqual(Product(12))
