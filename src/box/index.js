const Box = x => ({
  x,
  map: f => Box(f(x)),
  inspect: _ => `Box(${x})`,
  chain: g => g(x),
  ap: o => o.map(x)
})

Box.of = x => Box(x)

module.exports = Box