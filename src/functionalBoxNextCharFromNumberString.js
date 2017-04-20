function functionalBoxNextCharFromNumberString(str) {
  // THE BOX
  const Box = x => ({
    fold: fn => fn(x),
    map: fn => Box(fn(x)),
    inspect: () => `Box(${x})`
  })

  return Box(str)
    .map(s => s.trim())
    .map(s => Number(s))
    .map(s => s + 1)
    .fold(s => String.fromCharCode(s))
}

module.exports = functionalBoxNextCharFromNumberString
