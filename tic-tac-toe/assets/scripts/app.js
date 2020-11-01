'use strict'
const events = require('./auth/events')
const gamesEvents = require('./games/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#change-password-user-form').hide()
  $('#sign-out-user-form').hide()
  $('#new-game-button').hide()
  $('#index-game-button').hide()
  $('#game').hide()
  $('#sign-up-user-form').on('submit', events.onSignUp)
  $('#sign-in-user-form').on('submit', events.onSignIn)
  $('#new-game-button').on('click', gamesEvents.onNewGame)
  $('#update-game-button').on('click', gamesEvents.onUpdateGame)
  $('#index-game-button').on('click', gamesEvents.onCountGame)
  $('#change-password-user-form').on('submit', events.onChangePassword)
  $('.box').on('click', gamesEvents.onBoxClick)
  // Need to add checkWin here
  $('#sign-out-user-form').on('submit', events.onSignOut)
})
