const expect = require('expect')
const _ = require('ramda')

//********************************************************************************
// EXAMPLE 1
const toUpperCase = x => x.toUpperCase()
const shout = x => `${x}!`
const angry = _.compose(shout, toUpperCase)

// const latin = _.compose(_.map, angry, _.reverse);
// const latinResult = latin(['frog', 'eyes']);
// ERROR


// right - each function expects 1 argument.
const latin = _.compose(_.map(angry), _.reverse);

let res = latin(['frog', 'eyes']);
// ['EYES!', 'FROG!'])

expect(res).toEqual(['EYES!', 'FROG!'])
console.log('latinResult', res)

const trace = _.curry(function(tag, x) {
  console.log('TRACE:', tag, x);
  return x;
});

const toLower = x => x.toLowerCase()
const join = connector => x => x.join(connector)
const split = char => x => x.split(char)
const replace = (regexp, replacement) => x => x.replace(regexp, replacement)

// let dasherize = _.compose(join('-'), toLower, split(' '), replace(/\s{2,}/ig, ' '));

//dasherize('The world is a vampire');
// TypeError: Cannot read property 'apply' of undefined

const traceDasherize = _.compose(join('-'), toLower, trace('after split'), split(' '), replace(/\s{2,}/ig, ' '));
try {
  traceDasherize('The world is a vampire');
} catch (err) {
  console.log('Tracing...', err.message)
}
// after split [ 'The', 'world', 'is', 'a', 'vampire' ]

const dasherize = _.compose(join('-'), _.map(toLower), trace('after split'), split(' '), replace(/\s{2,}/ig, ' '));
res = dasherize('The world is a vampire');

expect(res).toEqual('the-world-is-a-vampire')
console.log('RESULT:', res)
