function nextCharFromNumberString(str) {
  const trimmed = str.trim()
  const number = parseInt(trimmed, 10)
  const nextNumber = number + 1
  return String.fromCharCode(nextNumber)
}

module.exports = nextCharFromNumberString
