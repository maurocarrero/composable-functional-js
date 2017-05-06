const log = require('../log')
const expect = require('expect')

log('---------------------------------------------')
log('IMPERATIVE')
log('---------------------------------------------')

const streetName = user => {
  const address = user.address
  if (address) {
    const street = address.street
    if (street) {
      return street.name
    }
  }
  return 'No street'
}

expect(streetName({ address: { street: { name: 'Peteco' } } })).toEqual('Peteco')
expect(streetName({})).toEqual('No street')


log('---------------------------------------------')
log('DECLARATIVE')
log('---------------------------------------------')

const Right = x => ({
  fold: (err, fn) => fn(x),
  map: fn => Right(fn(x)),
  chain: fn => fn(x),
  inspect: () => `Right(${x.toString()})`
})

const Left = x => ({
  fold: err => err(x),
  map: fn => Left(x),
  chain: fn => Left(x),
  inspect: () => `Left(${x})`
})

const streetNameFn = user =>
  (user && user.address && user.address.street ? Right(user.address.street) : Left('No street'))
    .map(street => street.name)
    .fold(error => error, name => name)

expect(streetNameFn({ address: { street: { name: 'Peteco' } } })).toEqual('Peteco')
expect(streetNameFn({})).toEqual('No street')



const fromNullable = (x, errorMessage) => x ? Right(x) : Left(errorMessage)

const streetNameFn2 = user =>
  fromNullable(user.address, 'No address')
    .chain(address => fromNullable(address.street, 'No street'))
    .map(street => street.name)
    .chain(name => fromNullable(name, 'No name'))
    .fold(error => error, name => name)

expect(streetNameFn2({ address: { street: { name: 'Polstergeist' } } })).toEqual('Polstergeist')
expect(streetNameFn2({ address: { street: { name: 'Peteco' } } })).toEqual('Peteco')
expect(streetNameFn2({})).toEqual('No address')
expect(streetNameFn2({ address: {} })).toEqual('No street')
expect(streetNameFn2({ address: { street: {} } })).toEqual('No name')
