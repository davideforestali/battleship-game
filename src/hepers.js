
const generateValidGuesses = () => {
  const columns = Array.from({ length: 10 }, (_, i) => i + 1) // [1, 2, ..., 10]
  const rows = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i)) // ['A', 'B', ..., 'J']
  const validGuesses = []

  rows.forEach(row => {
    columns.forEach(col => {
      validGuesses.push(`${row}${col}`)
    })
  })

  return validGuesses
}

export const isValidGuess = (guess) => {
  const validGuesses = generateValidGuesses()
  return validGuesses.includes(guess.toUpperCase())
}

const canPlaceHandler = (board, row, col, size, horizontal) => {
  for (let i = 0; i < size; i++) {
    if (horizontal) {
      if (col + i >= 10 || board[row][col + i].hasShip) return false
    } else {
      if (row + i >= 10 || !board[row + i] || board[row + i][col].hasShip) return false
    }
  }
  return true
}

export const placeShip = (board, size) => {
  let placed = false
  while (!placed) {
    const row = Math.floor(Math.random() * 10)
    const col = Math.floor(Math.random() * 10)
    const direction = Math.random() < 0.5
    const canPlaceShip = canPlaceHandler(board, row, col, size, direction)
    if (canPlaceShip) {
      for (let i = 0; i < size; i++) {
        if (direction) {
          board[row][col + i].hasShip = true // horizontal
        } else {
          board[row + i] && (board[row + i][col].hasShip = true) // vertical
        }
      }
      placed = true
    }
  }
}

export const convertGuessToPosition = (guess) => {
  const row = guess.charCodeAt(0) - 65
  const col = parseInt(guess.slice(1), 10) - 1
  return [row, col]
}
