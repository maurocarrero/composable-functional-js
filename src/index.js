const args = process.argv

const parseAnswer = (answer, read) => {
  switch (answer) {
    case '1':
      require('./next-char-from-number-string')
      break
    case '2':
      require('./money-to-float')
      break
    case '3':
      require('./either-type')
      break
    case '4':
      require('./either-type/getPort')
      break
    case '5':
      require('./imperative-vs-declarative/openSite')
      break
    case '6':
      require('./imperative-vs-declarative/getPrefs')
    case '7':
      require('./imperative-vs-declarative/streetName')
      break
    case '8':
      require('./imperative-vs-declarative/concatUniq')
      break
    case '9':
      require('./imperative-vs-declarative/wrapExamples')
      break
    case '10':
      require('./imperative-vs-declarative/parseDbUrl')
      break
    default:
      read ? console.log('Not a valid option.') : ''
  }
}

if (args.length > 2) {
  parseAnswer(args[ 2 ])
} else {
  console.log('*******************************************************')
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
  console.log('')

  const readline = require('readline')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Sample [1-10]?', answer => {
    parseAnswer(answer)
    rl.close()
  })
}
