function functionalNextCharFromNumberString(str) {
  return [ str ]
    .map(s => s.trim())
    .map(s => Number(s))
    .map(s => s + 1)
    .map(s => String.fromCharCode(s))
}

module.exports = functionalNextCharFromNumberString