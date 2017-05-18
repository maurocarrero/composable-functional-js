const expect = require('expect')
const curry = require('lodash/curry')

const match =
  curry(
    (what, str) =>
      str.match(what)
  );

const filter =
  curry((f, arr) =>
    arr.filter(f)
  );

let res = match(/\s+/g, 'hello world')
expect(res).toEqual(' ')

res = match(/\s+/g)('hello world')
expect(res).toEqual(' ')

const hasSpaces = match(/\s+/g)

res = hasSpaces('hello world again')
expect(res).toEqual([' ', ' '])

res = hasSpaces('spaceless')
expect(res).toEqual(null)

const TORI_HAS_SPACES = 'tori amos'
const ARR = ['tori_spelling', TORI_HAS_SPACES]

expect(filter(hasSpaces, ARR)).toEqual(TORI_HAS_SPACES)

const findSpaces = filter(hasSpaces)

expect(
  filter(hasSpaces, ARR)
).toEqual(
  filter(hasSpaces)(ARR)
)

expect(
  findSpaces(ARR)
).toEqual(
  filter(hasSpaces)(ARR)
)
