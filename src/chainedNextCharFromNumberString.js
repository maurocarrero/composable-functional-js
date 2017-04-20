function chainedNextCharFromNumberString(str) {
  return String.fromCharCode(parseInt(str.trim(), 10) + 1)
}

module.exports = chainedNextCharFromNumberString