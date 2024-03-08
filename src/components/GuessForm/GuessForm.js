import React, { useState } from 'react';
import './GuessForm.css';
import { convertGuessToPosition, isValidGuess } from '../../hepers';

const GuessForm = ({ onFire }) => {
  const [guess, setGuess] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValidGuess(guess)) return
    const position = convertGuessToPosition(guess)
    onFire(position)
    setGuess('')
  }

  return (
    <form onSubmit={handleSubmit} className='guess-form'>
      <input
        type='text'
        value={guess}
        onChange={e => setGuess(e.target.value.toUpperCase())}
        maxLength='3'
        placeholder='Enter coordinates'
      />
      <button type='submit'>Fire!</button>
    </form>
  )
}

export default GuessForm
