const log = require('../log')
const expect = require('expect')

log('---------------------------------------------')
log('IMPERATIVE')
log('---------------------------------------------')

const showLogin = () => 'showLogin'
const renderPage = () => 'renderPage'

const openSite = currentUser => {
  if (currentUser) {
    return renderPage(currentUser)
  } else {
    return showLogin()
  }
}

expect(openSite(true)).toEqual('renderPage')
expect(openSite(false)).toEqual('showLogin')

log('---------------------------------------------')
log('DECLARATIVE')
log('---------------------------------------------')


const Right = x => ({
  fold: (err, fn) => fn(x),
  map: fn => Right(fn(x))
})

const Left = x => ({
  fold: err => err(),
  map: fn => Left(x)
})

const fromNullable = x => x ? Right(x) : Left(x)

const openSiteFn = currentUser =>
  fromNullable(currentUser)
    .fold(showLogin, renderPage)

expect(openSiteFn(true)).toEqual('renderPage')
expect(openSiteFn(false)).toEqual('showLogin')
