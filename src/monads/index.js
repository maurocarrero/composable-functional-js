const expect = require('expect')
const Box = require('../box')
const log = require('../log')
//---------------------------------------------------------------------
// MONADS
// Monadic interface: chain, F.of (flaMap, bind, >>=)
// (Box, Either, Task, List)

// Helper: return the inner type, will have the effect of joining it
const join = m =>
  m.chain(x => x)



//---------------------------------------------------------------------
// FIRST LAW
// associativity in how we
// join(m.map(join)) == join(join(m))

let m = Box(Box(Box(7)))

const res = join(m.map(join))
const res1 = join(join(m))

expect(res).toEqual(res1)
expect(res).toEqual(Box(7))

log('First law: Associativity')
log('m = Box(Box(Box(7)) --->')
log('join(m.map(join)) == join(join(m))')
log(res, res1)

//---------------------------------------------------------------------
// Tests

m = Box(Box(Box(Box(Box(11)))))

expect(join(m)).toEqual(Box(Box(Box(Box(11)))))
expect(join(join(m))).toEqual(Box(Box(Box(11))))
expect(join(join(join(m)))).toEqual(Box(Box(11)))
expect(join(join(join(join(m))))).toEqual(Box(11))

expect(join(m)).toEqual(m.map(join))
expect(join(join(m))).toEqual(join(m.map(join)))
expect(join(join(join(m)))).toEqual(join(m.map(join).map(join)))
expect(join(join(join(join(m))))).toEqual(join(m.map(join).map(join).map(join)))

// Second law
// join(Box.of(m)) == join(m.map(Box.of))

m = Box('wonder')

const res2 = join(Box.of(m))
const res3 = join(m.map(Box.of))

expect(res2).toEqual(res3)
expect(res2).toEqual(Box('wonder'))

log('Second Law: ....')
log('m = Box(Box(Box(7)) --->')
log('join(Box.of(m)) == join(m.map(Box.of))')
log(res2, res3)

require('./memoize')