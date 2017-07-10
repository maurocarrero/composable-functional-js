const log = require('../../log')
const expect = require('expect')

log('*********************************************************************************************************')
log('Either type: getPort')

const Right = x => ({
  chain: fn => fn(x),
  fold: (f, g) => g(x),
  map: fn => Right(fn(x))
})

const Left = x => ({
  chain: () => Left(x),
  fold: (f) => f(x),
  map: fn => Left(x)
})

const tryCatch = fn => {
  try {
    return Right(fn())
  } catch (err) {
    return Left(err)
  }
}

// Fake FS
const fs = {
  readFileSync: name => {
    if (name === 'config.json') {
      return JSON.stringify({ port: 8888 })
    } else {
      throw('missing file!')
    }
  }
}

const getPort = () => {
  try {
    const str = fs.readFileSync('config.json')
    const config = JSON.parse(str)
    return config.port
  } catch (error) {
    return 3000
  }
}

let result = getPort()

expect(result).toEqual(8888)

const getPortFunct = (configFile) =>
  tryCatch(() => fs.readFileSync(configFile))
    .chain(str => tryCatch(() => JSON.parse(str)))
    .fold(
      () => 3000,
      config => config.port)

result = getPortFunct('configuration.json')
expect(result).toEqual(3000)

result = getPortFunct('config.json')
expect(result).toEqual(8888)

console.log('*********************************************************************************************************')
