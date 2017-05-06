const log = require('../log')
const expect = require('expect')

log('---------------------------------------------')
log('IMPERATIVE')
log('---------------------------------------------')

const fs = {
  readFileSync: path => 'From file system ' + path
}

const wrapExamplesImperative = example => {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath)
    }
    catch (err) {
    }
  }
  return example
}

expect(wrapExamplesImperative({ previewPath: '/examples/path' }))
  .toEqual({ previewPath: '/examples/path', preview: 'From file system /examples/path'})


expect(wrapExamplesImperative({ peteco: 'correa' })).toEqual({ peteco: 'correa' })

log('---------------------------------------------')
log('DECLARATIVE')
log('---------------------------------------------')

const Right = x => ({
  chain: fn => fn(x),
  fold: (err, fn) => fn(x),
  map: fn => Right(fn(x))
})

const Left = x => ({
  chain: fn => Left(x),
  fold: err => err(x),
  map: () => Left(x)
})

const fromNullable = x => x ? Right(x) : Left(x)

const tryCatch = fn => {
  try {
    return Right(fn())
  }
  catch (err) {
    return Left(err)
  }
}

const readFile = path => tryCatch(() => fs.readFileSync(path))

const wrapExamplesDeclarative = example => {
  return fromNullable(example.previewPath)
    .chain(readFile)
    .fold(() => example, message =>
      Object.assign({ preview: message }, example)
    )
}

expect(wrapExamplesDeclarative({ previewPath: '/examples/path' }))
  .toEqual({ previewPath: '/examples/path', preview: 'From file system /examples/path'})


expect(wrapExamplesDeclarative({ peteco: 'correa' })).toEqual({ peteco: 'correa' })
