'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

let turn = true
let gameState = {
  moves: 0,
  over: false,
  winningPlayer: ''
}

// passthrough values for when a new game is started to clear/reset the board
const onNewGame = (event) => {
  event.preventDefault()
  store.currentPlayer = 'X'
  gameState = {
    moves: 0,
    over: false,
    winningPlayer: ''
  }
  console.log(store.currentPlayer)
  console.log(gameState)

  const button = event.click

  api.newGame(button)
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const checkWinner = (array) => {
  if (array[0] !== '' && array[0] === array[1] && array[1] === array[2]) {
    gameState.winningPlayer = array[0]
    gameState.over = true
    return gameState
  } else if (array[0] !== '' && array[0] === array[3] && array[3] === array[6]) {
    gameState.winningPlayer = array[0]
    gameState.over = true
    return gameState
  } else if (array[0] !== '' && array[0] === array[4] && array[4] === array[8]) {
    gameState.winningPlayer = array[0]
    gameState.over = true
    return gameState
  } else if (array[1] !== '' && array[1] === array[4] && array[4] === array[7]) {
    gameState.winningPlayer = array[1]
    gameState.over = true
    return gameState
  } else if (array[2] !== '' && array[2] === array[5] && array[5] === array[8]) {
    gameState.winningPlayer = array[2]
    gameState.over = true
    return gameState
  } else if (array[2] !== '' && array[2] === array[4] && array[4] === array[6]) {
    gameState.winningPlayer = array[2]
    gameState.over = true
    return gameState
  } else if (array[3] !== '' && array[3] === array[4] && array[4] === array[5]) {
    gameState.winningPlayer = array[3]
    gameState.over = true
    return gameState
  } else if (array[6] !== '' && array[6] === array[7] && array[7] === array[8]) {
    gameState.winningPlayer = array[6]
    gameState.over = true
    return gameState
  } else {
    // Need to change gameState.winningPlayer to value of tie to differentiate true in lines 75-79
    if (array[0] !== '' && gameState.moves === 8) {
      gameState.winningPlayer = 'Tie'
      gameState.over = true
      return gameState
    } else return gameState
  }
}

const onBoxClick = (event) => {
  event.preventDefault()
  const box = $(event.target)

  box.css('pointer-events', 'none')
  const boxIndex = box.data('box-index')

  box.css('background', 'transparent').text(store.currentPlayer)

  api.updateGame(boxIndex, store.currentPlayer, gameState.over)
    .then(ui.onBoxClickSuccess)
    .then(function () {
      turn = !turn
      store.currentPlayer = turn ? 'X' : 'O'
      gameState.moves++
      checkWinner(store.game.cells)
      if (gameState.winningPlayer === 'Tie') {
        $('.box').css('pointer-events', 'none')
        $('#message').text('Game ended in a draw! Play Again!!')
      } else if (gameState.over === true) {
        $('.box').css('pointer-events', 'none')
        $('#message').text(`${gameState.winningPlayer} is the Winner!`)
      }
    })
    .catch(ui.onBoxClickFailure)

  console.log('box index ', boxIndex)
  console.log('store.player ', store.currentPlayer)
  console.log(gameState.over)
  console.log(store.game.cells)
}

const onCountGame = (event) => {
  event.preventDefault()
  const button = event.click
  api.countGame(button)
    .then(ui.countGameSuccess)
    .catch(ui.countGameFailure)
}

module.exports = {
  gameState: gameState,
  onBoxClick: onBoxClick,
  onNewGame: onNewGame,
  onCountGame: onCountGame,
  checkWinner: checkWinner

}
