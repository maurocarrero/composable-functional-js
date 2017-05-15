const expect = require('expect')
const List = require('immutable-ext').List
const Sum = require('./Sum')

const Right = x => ({
  concat: o =>
    o.fold(
      e => Left(e),
      r => Right(x.concat(r))
    ),
  fold: (f, g) => g(x),
  map: fn => Right(fn(x))
})

const Left = x => ({
  concat: o => Left(x),
  fold: f => f(x),
  map: f => Left(x)
})

let stats = List.of(
  { page: 'Home', views: 40 },
  { page: 'About', views: 10 },
  { page: 'Blog', views: 7 }
)

const fromNullable = (x, g) => x && !isNaN(x) ? Right(x) : Left(x)

let result = stats
  .foldMap(x => fromNullable(x.views).map(Sum), Right(Sum.empty()))
  .fold(err => err, x => x)
  .fold(x => x)

expect(result).toEqual(57)

stats = List.of(
  { page: 'Home', views: 40 },
  { page: 'About', views: 10 },
  { page: 'Peteco', views: undefined },
  { page: 'Nulo', views: null },
  { page: 'Bacalao', views: 'Petekus' },
  { page: 'About', views: 10 },
  { page: 'Blog', views: 7 }
)

result = stats
  .foldMap(x => fromNullable(x.views).map(Sum), Right(Sum.empty()))
  .fold(err => Sum.empty(), x => x)
  .fold(x => x)

expect(result).toEqual(0)
