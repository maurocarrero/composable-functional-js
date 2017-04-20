function functionalBoxNextCharFromNumberString(str) {
  // THE BOX
  // Composition within a context. Box is our context.
  // Identity factor??
  //
  const Box = x => ({
    fold: fn => fn(x), // Remove the result from the box
    map: fn => Box(fn(x)), // call the passed function, put the result again in a box and return it
    inspect: () => `Box(${x})` // For console.log in Node
  })

  return Box(str)
    .map(s => s.trim())
    .map(s => Number(s))
    .map(s => s + 1)
    .fold(s => String.fromCharCode(s))
}

module.exports = functionalBoxNextCharFromNumberString
