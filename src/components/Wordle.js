import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

function Wordle({ solution }) {
    const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys} = useWordle(solution)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if(isCorrect){
          setTimeout(() => setShowModal(true), 1000)
          console.log('Win');
          window.removeEventListener('keyup', handleKeyup)
        }

        if(turn > 5){
          setTimeout(() => setShowModal(true), 1000)
          console.log('Lose, End Game');
          window.removeEventListener('keyup', handleKeyup)
        }
        
        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn])

  return (
    <>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
        <Keypad usedKeys={usedKeys}/>
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </>
  )
}

export default Wordle