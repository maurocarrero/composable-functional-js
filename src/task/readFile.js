const expect = require('expect')
const Task = require('data.task')
const fs = require('fs')

const CURRENT_FILE = `${__dirname}/config.json`
const NEW_FILE = `${__dirname}/config_new.json`


const app = () => {
  fs.readFile(CURRENT_FILE, 'utf-8', (err, contents) => {
    if (err) throw err

    const newContents = contents.replace(/8/g, '7')

    fs.unlink(NEW_FILE, err => {
      if (err)
        console.log('Error when deleting:', err)

      fs.writeFile(NEW_FILE, newContents, (err, _) => {
        if (err) throw err

        console.log('Success!')
      })
    })
  })
}

// WITH TASKS:

const readFile = (filename, enc) =>
  new Task((rej, res) =>
    fs.readFile(filename, enc, (err, contents) =>
      err ? rej(err) : res(contents)
    ))

const deleteFile = (filename, contents) =>
  new Task((rej, res) =>
    fs.unlink(filename, err => res(contents))) // Resolve contents if the file is found and deleted or not.

const writeFile = (filename, contents) =>
  new Task((rej, res) => {
    fs.writeFile(filename, contents, (err, _) =>
      err ? rej(err) : res(contents))
  })

const taskApp =
  readFile(CURRENT_FILE, 'utf-8')
    .map(contents => contents.replace(/8/g, '7'))
    .chain(contents => deleteFile(NEW_FILE, contents))
    .chain(contents => writeFile(NEW_FILE, contents))

taskApp
  .fork(
    e => console.log('Error', e),
    x => console.log('Success', x))

