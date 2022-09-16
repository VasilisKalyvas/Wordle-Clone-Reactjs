import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})

    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((letter) => {
            return {key: letter, color:'grey'} // set the color by default grey
        })

        // Find letters that exists in solution and in the correct position
        //Color: Green
        formattedGuess.forEach((letter, index) => {
            if(solutionArray[index] === letter.key)
            {
                formattedGuess[index].color = 'green'
                solutionArray[index] = null
            }
        })

        // Find letters that exists in solution and in the wrong position
        //Color: Yellow
        formattedGuess.forEach((letter, index) => {
            if( solutionArray.includes(letter.key) &&
                letter.color !== 'green' //in case letter already checked and is green
              )
            {
                formattedGuess[index].color = 'yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(letter => {
              const currentColor = prevUsedKeys[letter.key]
      
              if (letter.color === 'green') {
                prevUsedKeys[letter.key] = 'green'
                return
              }
              if (letter.color === 'yellow' && currentColor !== 'green') {
                prevUsedKeys[letter.key] = 'yellow'
                return
              }
              if (letter.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                prevUsedKeys[letter.key] = 'grey'
                return
              }
            })
      
            return prevUsedKeys
          })

        setCurrentGuess('')
    }

    const handleKeyup = ({ key }) => {
        if(key === 'Enter'){
            if(turn > 5){
                console.log('end of guesses');
                return
            }
            if(history.includes(currentGuess)){
                console.log('Same Word not allowed');
                return
            }   
            if(currentGuess.length !== 5){
                console.log('Only 5 chars long words');
                return
            }
            
            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        //Create Backspace fuction
        if(key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        //Check with regex if the keys that user gives is letters
        if(/^[A-Za-z]$/.test(key)){
            //Check if the length of the guess is < 5
            if(currentGuess.length < 5){
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }

    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}
}
export default useWordle