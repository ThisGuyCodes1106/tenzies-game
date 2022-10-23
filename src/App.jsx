import React, { useState } from 'react'
import './style.css'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

import Die from "./components/Die"

function App() {

  const [tenzies, setTenzies] = React.useState(false)
  const [diceArray, setDiceArray] = React.useState(allNewDice())

  React.useEffect(function() {
    const allHeld = diceArray.every(die => die.isHeld)
    const firstValue = diceArray[0].value
    const allSameValue = diceArray.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [diceArray])

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(
        generateNewDie()
      )
    }
    return newDice
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setDiceArray(allNewDice())
    } else {
      setDiceArray(prevDice => 
        prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie()
        })
      )
    }
  }

  function holdDice(id) {
    setDiceArray(prevDice => 
      prevDice.map((die) => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    )
  }

  const diceElements = diceArray.map(die => (
    <Die 
      key={die.id} 
      id={die.id} 
      value={die.value} 
      selected={die.isHeld} 
      holdDice={() => holdDice(die.id)}
    />)
  )

  return (
    <main className='App'>
      {tenzies ? <Confetti/> : ""}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice--container">
        {diceElements}
      </div>
      <button className='roll--btn' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )

}

export default App

// local server - http://127.0.0.1:5173/
// npm run dev