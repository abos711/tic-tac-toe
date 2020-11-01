'use strict'

const store = require('./../store')

const signUpSuccess = (response) => {
  $('#message').text('You are all signed up ' + response.user.email)
  $('#sign-up-user-form').trigger('reset')
  $('#sign-up-user-form').hide()
  $('#change-password-user-form').hide()
  $('#sign-out-user-form').hide()
}

const signUpFailure = () => {
  $('#message').text('Something went wrong, try again')
}

const signInSuccess = (response) => {
  store.user = response.user
  $('#message').text('Signed In!! ')
  $('#sign-in-user-form').trigger('reset')
  $('#change-password-user-form').show()
  $('#sign-up-user-form').hide()
  $('#sign-in-user-form').hide()
  $('#new-game-button').show()
  $('#sign-out-user-form').show()
}
const signInFailure = () => {
  $('#message').text('Something went wrong, try again')
  $('#sign-in-user-form').trigger('reset')
}

const changePasswordSuccess = (response) => {
  $('#message').text('Success! Password was changed')
  $('#sign-in-user-form').show()
  $('#change-password-user-form').trigger('reset')
  $('#change-password-user-form').show()
}
const changePasswordFailure = () => {
  $('#message').text('Something went wrong, try again')
}
const signOutSuccess = () => {
  // // console.log('youre signed out')
  $('#message').text('Success! Come back soon! ' + store.user.email)
  $('#sign-up-user-form').show()
  $('#sign-in-user-form').show()
  $('#new-game-button').hide()
  $('#change-password-user-form').hide()
  $('#game').hide()
  $('#sign-out-user-form').hide()
  $('#update-game-button').hide()
  $('#index-game-button').hide()

  store.user = null
}
const signOutFailure = () => {
  $('#message').text('Something went wrong, try again')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
