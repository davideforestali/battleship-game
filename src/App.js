import React, { useState, useEffect } from 'react';
import Board from './components/Board/Board';
import GuessForm from './components/GuessForm/GuessForm';
import { initShipCount, shipSizes } from './constants';
import { placeShip } from './hepers';
import './App.css';

const App = () => {
  const [board, setBoard] = useState([])
  const [hits, setHits] = useState(0)
  const [shipCount, setShipCount] = useState(initShipCount)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const newBoard = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({ hasShip: false, hit: false }))
    )
    shipSizes.forEach(size => placeShip(newBoard, size))
    setBoard(newBoard)
    setShipCount(initShipCount)
    setHits(0)
  }

  const handleFire = (position) => {
    const [row, col] = position
    if (shipCount === 0 || board[row][col].hit) return
    const newBoard = [...board]
    newBoard[row][col].hit = true
    setBoard(newBoard)
    setHits(hits + 1)
    board[row][col].hasShip &&
      setShipCount(prev => prev - 1)
  }

  return (
    <div className="app">
      <h1>Battleship Game</h1>
      <div>Hits: {hits}</div>
      <Board board={board} onFire={handleFire} />
      {shipCount === 0
        ? (
          <div>
            <div>Game over</div><br/>
            <button onClick={initializeGame}>
              Reset
            </button>
          </div>
        ) 
        : <GuessForm onFire={handleFire} />}
    </div>
  )
}

export default App
