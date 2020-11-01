'use strict'

const store = require('./../store')

const newGameSuccess = (response) => {
  store.game = response.game
  // // console.log(response)
  $('#message').text('New Game! Players turn: ' + playerTurn)
  $('#sign-up-user-form').hide()
  $('#sign-in-user-form').hide()
  $('#start-new-game-button').hide()
  $('#change-password-user-form').hide()
  $('#game').show()
  $('#sign-out-user-form').show()
  $('#new-game-button').show()
  $('#index-game-button').show()
  $('.box').text('')
  $('.box:nth-child(2n)').css('background-color', 'orange')
  $('.box:nth-child(2n+1)').css('background-color', 'black')
}
const newGameFailure = () => {
  $('#message').text('Something went wrong, try again')
}

const countGameSuccess = (response) => {
  store.games = response.games
  // console.log(response)

  const gamesPlayed = store.games.length
  $('#message').text('Games Played ' + gamesPlayed)
  // placeholder - need to run a function inside event
}
const countGameFailure = (response) => {
  // console.log(response)
  $('#message').text('Something went wrong, try again')
}

let playerTurn = 'X'

const onBoxClickSuccess = (response) => {
  store.game = response.game
  playerTurn = playerTurn === 'O' ? 'X' : 'O'
  $('#message').text('Players Turn: ' + playerTurn)
  // console.log(store.game)
  // This should be good to go once I can reset the board and each new game starts with X
}

const onBoxClickFailure = () => {
  $('#message').text('Something went wrong, try again')
}

// const onXwin = (response) => {
//   $('#message').text('X wins')
// }
//
// const onOwin = (response) => {
//   $('#message').text('X wins')
// }
// const drawGameSuccess = (response) => {
//   $('#message').text('Draw! Play Again')
//   $('#new-game-button').show()
//   $('#game').show()
//   $('#sign-out-user-form').show()
// }

module.exports = {
  newGameSuccess: newGameSuccess,
  newGameFailure: newGameFailure,
  countGameSuccess: countGameSuccess,
  countGameFailure: countGameFailure,
  onBoxClickSuccess: onBoxClickSuccess,
  onBoxClickFailure: onBoxClickFailure
  // onXwin: onXwin,
  // onOwin: onOwin
  // winGameSuccess: winGameSuccess,
  // drawGameSuccess: drawGameSuccess
}
