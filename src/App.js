import './App.css';
import { React, useEffect, useState} from 'react';
import Wordle from './components/Wordle';

function App() {
  const [solution, setSolution] = useState(null)

  useEffect(() => {
    fetch('https://wordle-clone-reactjs.onrender.com/solutions')
    .then(res => res.json())
    .then(json => {
      const randomSolution = json[Math.floor(Math.random()*json.length)]
      setSolution(randomSolution.word);
    })
  },[setSolution])

  return (
    <div className="App">
      <h1>Wordle</h1>
     {solution && <Wordle solution={solution}/>}
    </div>
  );
}

export default App;
