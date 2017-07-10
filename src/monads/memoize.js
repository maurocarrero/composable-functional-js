const expect = require('expect')
const fetch = require('isomorphic-fetch')
const Task = require('data.task')

const memoize = function(f) {
  let cache = {}

  return function() {
    const arg_str = JSON.stringify(arguments)
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments)
    return cache[arg_str]
  }
}

const httpGet = url =>
  new Task((rej, res) => {
    fetch(url)
      .then(res)
      .catch(rej)
  })

const response = httpGet('https://api.github.com/users')