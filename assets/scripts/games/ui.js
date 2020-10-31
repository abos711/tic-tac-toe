'use strict'

const store = require('../store')

let turn = true

const newGameSuccess = (response) => {
  store.game = response.game
  // console.log(response)
  $('#message').text('New Game! Players turn: X')
  $('#sign-up-user-form').hide()
  $('#sign-in-user-form').hide()
  $('#start-new-game-button').hide()
  $('#change-password-user-form').hide()
  $('#sign-out-user-form').show()
  $('#new-game-button').show()
  $('#index-game-button').show()
  $('.box').text('')
  $('#game').show()
  $('.box').css('pointer-events', 'auto')
  $('.box:nth-child(2n)').css('background-color', 'orange')
  $('.box:nth-child(2n+1)').css('background-color', 'black')
}
const newGameFailure = () => {
  $('#message').text('Something went wrong, try again')
}

const countGameSuccess = (response) => {
  store.games = response.games
  console.log(response)

  const gamesPlayed = store.games.length
  $('#message').text('Games Played ' + gamesPlayed)
  // placeholder - need to run a function inside event
}
const countGameFailure = (response) => {
  console.log(response)
  $('#message').text('Something went wrong, try again')
}

const onBoxClickSuccess = (response) => {
  store.game = response.game
  turn = !turn
  const currentPlayer = turn ? 'X' : 'O'
  $('#message').text(`Players Turn: ${currentPlayer}`)
  console.log(currentPlayer)
}

const onBoxClickFailure = () => {
  $('#message').text('Something went wrong, try again')
}

module.exports = {
  newGameSuccess: newGameSuccess,
  newGameFailure: newGameFailure,
  countGameSuccess: countGameSuccess,
  countGameFailure: countGameFailure,
  onBoxClickSuccess: onBoxClickSuccess,
  onBoxClickFailure: onBoxClickFailure
}
