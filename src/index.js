const args = process.argv

const chapters = [
  './next-char-from-number-string',
  './money-to-float',
  './either-type',
  './either-type/getPort',
  './imperative-vs-declarative/openSite',
  './imperative-vs-declarative/getPrefs',
  './imperative-vs-declarative/streetName',
  './imperative-vs-declarative/concatUniq',
  './imperative-vs-declarative/wrapExamples',
  './imperative-vs-declarative/parseDbUrl',
  './semigroups',
  './semigroups/monoids',
  './semigroups/monoids/Sum',
  './semigroups/monoids/Product',
  './semigroups/monoids/Any',
  './semigroups/monoids/All',
  './semigroups/monoids/Max',
  './semigroups/monoids/Min',
  './semigroups/monoids/Pair'
]

const parseAnswer = (answer, read) => {
  const num = parseInt(answer, 10)
  if (!isNaN(num) && num > 0 && num <= chapters.length) {
    const chapter = num - 1
    require(chapters[chapter])
  } else {
    return read ? console.log('Not a valid option.') : ''
  }
}

if (args.length > 2) {
  parseAnswer(args[ 2 ])
} else {
  console.log('*******************************************************')
  console.log('1. Next char from number string')
  console.log('2. Money to float')
  console.log('3. Either Type')
  console.log('4. Either Type: get port')
  console.log('5. Imperative vs Declarative: openSite')
  console.log('6. Imperative vs Declarative: getPrefs')
  console.log('7. Imperative vs Declarative: streetName')
  console.log('8. Imperative vs Declarative: concatUniq')
  console.log('9. Imperative vs Declarative: wrapExamples')
  console.log('10. Imperative vs Declarative: parseDbUrl')
  console.log('11. Semigroups')
  console.log('12. Safe semigroups: Monoids')
  console.log('MONOIDS')
  console.log('\t13. Sum')
  console.log('\t14. Product')
  console.log('\t15. Any')
  console.log('\t16. All')
  console.log('\t17. Max')
  console.log('\t18. Min')
  console.log('\t19. Pair')
  console.log('*******************************************************')
  console.log('')

  const readline = require('readline')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`Sample [1-${chapters.length}]?`, answer => {
    parseAnswer(answer)
    rl.close()
  })
}
