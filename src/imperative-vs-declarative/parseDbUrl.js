const log = require('../log')
const expect = require('expect')

log('---------------------------------------------')
log('IMPERATIVE')
log('---------------------------------------------')

const RGXP = /peteco/

const parseDbUrlImperative = cfg => {
  try {
    const c = JSON.parse(cfg)
    if (c.url) {
      return c.url.match(RGXP)
    }
  } catch (e) {
    return null
  }
}

expect(parseDbUrlImperative({ url: 'http://peteco.com' })).toEqual(null)
expect(parseDbUrlImperative({ noUrl: 'http://peteco.com' })).toEqual(null)
expect(parseDbUrlImperative('{ "url": "http://peteco.com" }')).toEqual('peteco')

log('---------------------------------------------')
log('DECLARATIVE')
log('---------------------------------------------')

const Right = x => ({
  chain: fn => fn(x),
  fold: (err, fn) => fn(x)
})

const Left = x => ({
  chain: fn => Left(x),
  fold: err => err(x)
})

const tryCatch = fn => {
  try {
    return Right(fn())
  } catch (err) {
    return Left(err)
  }
}

const fromNullable = x => x ? Right(x) : Left(x)

const parseDbUrlDeclarative = cfg =>
  tryCatch(() => JSON.parse(cfg))
    .chain(json => fromNullable(json.url))
    .fold(() => null, url => url.match(RGXP))

expect(parseDbUrlDeclarative({ url: 'http://peteco.com' })).toEqual(null)
expect(parseDbUrlDeclarative({ noUrl: 'http://peteco.com' })).toEqual(null)
expect(parseDbUrlDeclarative('{ "url": "http://peteco.com" }')).toEqual('peteco')
