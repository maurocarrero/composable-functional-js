// Currently not working because of compose function, I guess

// const { All } = require('immutable-ext')
// const expect = require('expect')
// const compose = require('compose-function')
//
// const Fn = f => ({
//   fold: f,
//   concat: o =>
//     Fn(x => {
//       const res = f(x)
//       console.log('Petekus', f, x)
//       return res.concat(o.fold(x))
//     })
// })
//
// const hasVowels = x => !!x.match(/[aeiou]/ig)
// const longWord = x => x.length >= 5
//
// const both = Fn(compose(All, hasVowels))
//   .concat(Fn(compose(All, longWord)));
//
// [ 'gym', 'bird', 'lilac' ]
//   .filter(x => both.fold(x).x)
//
// expect(both).toEqual('lilac')
