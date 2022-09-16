import React from 'react'

const Modal = ({ isCorrect, solution, turn }) => {

    const tryAgain = () => {
        window.location.href = '/'
    }

    return (
        <div className="modal">
          {isCorrect && (
            <div>
              <h1>You Win!</h1>
              <p className="solution">The word is : {solution}</p>
              <p>You found the solution in {turn} guesses :)</p>
              <p onClick={tryAgain} style={{cursor:'pointer', textDecoration:'underline', color:'cornflowerblue'}}>Play Again!</p>
            </div>
          )}
          {!isCorrect && (
            <div>
              <h1>You Lost!</h1>
              <p className="solution">The word is : {solution}</p>
              <p onClick={tryAgain} style={{cursor:'pointer', textDecoration:'underline', color:'cornflowerblue'}}>Play Again!</p>
            </div>
          )}
        </div>
      )
    }

export default Modal