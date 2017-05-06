const log = require('../log')
const expect = require('expect')

log('---------------------------------------------')
log('IMPERATIVE')
log('---------------------------------------------')

const loadPrefs = prefs => prefs
const defaultPrefs = () => 'defaultPrefs'

const getPrefs = user => {
  if (user.premium) {
    return loadPrefs(user.preferences)
  } else {
    return defaultPrefs()
  }
}

const user = {
  premium: true,
  preferences: 'preferences'
}

expect(getPrefs(user)).toEqual('preferences')

user.premium = false

expect(getPrefs(user)).toEqual('defaultPrefs')


log('---------------------------------------------')
log('DECLARATIVE')
log('---------------------------------------------')

const Right = x => ({
  fold: (err, fn) => fn(x),
  map: fn => Right(fn(x))
})

const Left = x => ({
  fold: error => error(x),
  map: fn => Left(x)
})

const getPrefsFn = user =>
  (user && user.premium ? Right(user) : Left('Not premium'))
    .map(user => user.preferences)
    .fold(error => error, prefs => prefs)

expect(getPrefsFn(user)).toEqual('Not premium')

user.premium = true
user.preferences = 'Peteco is a great guy.'

expect(getPrefsFn(user)).toEqual('Peteco is a great guy.')
