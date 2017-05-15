const expect = require('expect')
const List = require('immutable-ext').List
const { Left, Right } = require('data.either')

const First = either => ({
  fold: f => f(either),
  concat: o => either.isLeft ? o : First(either)
})

First.empty = () => First(Left())

const find = (xs, f) =>
  List(xs)
    .foldMap(x =>
      First(f(x) ? Right(x) : Left()), First.empty())
    .fold(x => x)

const result = find([ 3, 4, 5, 6, 7 ], x => x > 4)

expect(result.value).toEqual(5)
