const expect = require('expect')
const log = require('../log')

const modulo = dvr => dvd => dvd % dvr

const isOdd = modulo(2)

expect(isOdd(6)).toEqual(0) // EVEN
expect(isOdd(7)).toEqual(1) // ODD

const filter = pred => xs => xs.filter(pred)

const getAllOdds = filter(isOdd)

const result = getAllOdds([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
expect(result).toEqual([ 1, 3, 5, 7, 9 ])

log(result)

