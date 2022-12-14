import React from 'react'
import Row from './Row'

const Grid = ({currentGuess, guesses, turn}) => {
  return (
    <div>
        {guesses.map((guess, index) => {
            if(turn ===  index){
                return <Row key={index} currentGuess={currentGuess} />
            }
            return <Row guess={guess} key={index} />
        })}
    </div>
  )
}

export default Grid