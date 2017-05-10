const expect = require('expect')

const Pair = (x, y) => ({
  x,
  y,
  concat: ({ x: x1, y: y1 }) => Pair(x.concat(x1), y.concat(y1)),
  inspect: () => `Pair(${x}, ${y})`
})

Pair.empty = _ => Pair('', '')

expect(
  Pair('Facu', 'Vichy').concat(Pair('Lucas', 'Nacho')).concat(Pair('Mauro', 'Peteco'))
).toEqual(
  Pair('FacuLucasMauro', 'VichyNachoPeteco')
)

expect(
  Pair('Facu', 'Vichy').concat(Pair('Lucas', 'Nacho')).concat(Pair.empty()).concat(Pair('Mauro', 'Peteco'))
).toEqual(
  Pair('FacuLucasMauro', 'VichyNachoPeteco')
)

expect(
  Pair.empty().concat(Pair('f', 'B').concat(Pair('A', 'e')).concat(Pair('c', 'B')).concat(Pair('U', 'e')))
).toEqual(
  Pair('fAcU', 'BeBe')
)
