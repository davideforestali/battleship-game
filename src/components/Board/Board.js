import React from 'react';
import './Board.css';

const Board = ({ board, onFire }) => {
  return (
    <div className='board'>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          let cellClass = 'cell'
          if (cell.hit && cell.hasShip) cellClass += ' hit-ship'
          else if (cell.hit) cellClass += ' hit-miss'

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cellClass}
              onClick={() => onFire([rowIndex, colIndex])}
            />
          )
        })
      )}
    </div>
  )
}

export default Board
