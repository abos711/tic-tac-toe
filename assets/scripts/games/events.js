'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('./../store')

let currentPlayer = 'X'
let gameState = {
  moves: 0,
  over: false,
  winningPlayer: ''
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
    if (array[0] !== '' && gameState.moves === 9) {
      gameState.winningPlayer = 'Tie'
      gameState.over = true
      return gameState
    } else return gameState
  }
}

const onBoxClick = (event) => {
  event.preventDefault()
  const box = $(event.target)

  const boxIndex = box.data('box-index')
  console.log('box index ', boxIndex)


  box.css('pointer-events', 'none')
  box.css('background', 'transparent').text(currentPlayer)
  console.log('players turn ', currentPlayer)

  api.updateGame(boxIndex, currentPlayer, gameState.over)
    .then(ui.onBoxClickSuccess)
    .then(function () {
      currentPlayer = currentPlayer === 'O' ? 'X' : 'O'
      gameState.moves++
      checkWinner(store.game.cells)
      if (gameState.winningPlayer === 'Tie') {
        $('#message').text('Game ended in a draw! Play Again!!')
      } else if (gameState.over === true) {
        $('#game').css('pointer-events', 'none')
        $('#message').text(`${gameState.winningPlayer} is the Winner!`)
      }
    })
    .catch(ui.onBoxClickFailure)
}
// passthrough values for when a new game is started to clear/reset the board
const onNewGame = (event) => {
  event.preventDefault()
  currentPlayer = 'X'
  gameState = {
    moves: 0,
    over: false,
    winningPlayer: ''
  }

  const button = event.click
  // console.log(button, 'working')
  // console.log(JSON.stringify(button))

  api.newGame(button)
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const onCountGame = (event) => {
  event.preventDefault()
  const button = event.click
  api.countGame(button)
    .then(ui.countGameSuccess)
    .catch(ui.countGameFailure)
}

module.exports = {
  currentPlayer: currentPlayer,
  gameState: gameState,
  onBoxClick: onBoxClick,
  onNewGame: onNewGame,
  onCountGame: onCountGame,
  checkWinner: checkWinner

}
