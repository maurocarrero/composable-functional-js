const args = process.argv

const parseAnswer = (answer) => {
  switch (answer) {
    case '1':
      require('./next-char-from-number-string')
      break
    case '2':
      require('./money-to-float')
      break
    case '3':
      require('./either-type')
    default:
      console.log('Not a valid option.')
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
  console.log('')

  const readline = require('readline')

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Sample [ 1 | 2 | 3 ]? ', answer => {
    parseAnswer(answer)
    rl.close()
  })
}
