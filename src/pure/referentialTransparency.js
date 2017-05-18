const Immutable = require('immutable')
const expect = require('expect')

const decrementHP = player => player.set('hp', player.get('hp') - 1)
const isSameTeam = (player1, player2) => player1.get('team') === player2.get('team')
const punch = (player, target) => isSameTeam(player, target) ? target : decrementHP(target)

const peteco = Immutable.Map({
  name: 'Peteco',
  hp: 100,
  team: 'red'
})

const facu = Immutable.Map({
  name: 'Facu',
  hp: 100,
  team: 'green'
})

const target = punch(facu, peteco)

expect(target.get('hp')).toEqual(99)

console.log('Target', target)
