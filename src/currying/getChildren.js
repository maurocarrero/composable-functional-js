const expect = require('expect')
const R = require('ramda')

const TEST_MOCK = [ {
  childNodes: [ 7, 77, 79 ]
}, {
  childNodes: [ 2, 5, 7 ]
}, {
  childNodes: [ 3, 9, 81 ]
} ]

const map = R.curry((f, arr) => arr.map(f))

const getChildren = x => x.childNodes

const allTheChildren = map(getChildren)

expect(allTheChildren(TEST_MOCK)).toEqual([[ 7, 77, 79 ], [ 2, 5, 7 ], [ 3, 9, 81 ]])

/**
 CURRYING
 The process of turning a function              ---> map
 that expects multiple parameters               ---> (f, arr)
 into one that, when supplied fewer parameters, ---> map(getChildren)
 returns a new function                         ---> allTheChildren
 that awaits the remaining ones.                 ---> TEST_MOCK.
 **/
