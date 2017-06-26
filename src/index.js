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
  './semigroups/monoids/Pair',
  './semigroups/monoids/Either',
  './semigroups/monoids/First',
  './semigroups/monoids/Fn',
  './semigroups/foldMap',
  './boxes/LazyBox',
  './task',
  './task/launchMissiles',
  './task/readFile',
  './functors',
  './of',
  './monads',
  './pure',
  './pure/referentialTransparency',
  './currying',
  './currying/getChildren',
  './currying/hasSpaces',
  './currying/noVowels',
  './exercises',
  './compose/shout',
  './compose/last',
  './compose/associativity',
  './compose/pointfree',
  './compose/debugging',
  './compose/categoryTheory',
  './example-application',
  './containers'
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
  console.log('-----------------------------------------------MONOIDS')
  console.log('13. Sum')
  console.log('14. Product')
  console.log('15. Any')
  console.log('16. All')
  console.log('17. Max')
  console.log('18. Min')
  console.log('19. Pair')
  console.log('20. Either')
  console.log('21. First')
  console.log('22. Fn (broken, compose??)')
  console.log('-----------------------------------------------')
  console.log('23. FoldMap')
  console.log('24. LazyBox')
  console.log('25. Task')
  console.log('26. Task: launchMissiles')
  console.log('27. Task: readFile')
  console.log('28. Functors')
  console.log('29. Of')
  console.log('30. Monads')
  console.log('31. Pure functions: memoize')
  console.log('32. Pure functions: referential transparency')
  console.log('-----------------------------------------------CURRY')
  console.log('33. Currying')
  console.log('34. Currying: getChildren')
  console.log('35. Currying: hasSpaces')
  console.log('36. Currying: noVowels')
  console.log('37. Currying: Exercises')
  console.log('38. Compose: Shout')
  console.log('39. Compose: Last')
  console.log('40. Compose: Associativity')
  console.log('41. Compose: Pointfree style')
  console.log('42. Compose: Debugging')
  console.log('43. Compose: Category theory')
  console.log('44. Example Application')
  console.log('45. Containers')
  console.log('*******************************************************')
  console.log('')

  const readline = require('readline')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(`Sample [1-${chapters.length}]?`, answer => {
    parseAnswer(answer)
    rl.close()
  })
}
