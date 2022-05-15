import useAuth from "./useAuth"
import React from 'react'
import Player from './Player'
import ResponsiveAppBar from './Nav'
import ComboBox from "./SearchBar"
import ColorButtons from "./Button"
import GuessBox from "./GuessBox"
import { useState } from 'react';

export default function Dashboard({ code }) {
  const { accessToken, refreshToken, makePostRequesttoRefresh } = useAuth(code)
  const [currentGuess, setCurrentGuess] = useState([])
  const [answers, setAnswers] = useState([])
  const [guesses, setGuesses] = useState(6)

  // sets guess state
  const getGuess = (guess) => {
    setCurrentGuess(guess)
  }

  // Skips turn, reducing amount of guesses left by 1
  const skipTurn = () => {
    setGuesses(prev => prev + 1)
    console.log(guesses)
  }

  //function to calculate the rows 
  const currentRows = function () {
    const remainingGuesses = guesses - answers.length
    return [...answers, ...Array(remainingGuesses)]
  }

  const rowsToDisplay = currentRows()
  console.log(rowsToDisplay)

  // creates the fields that holds the guesses
  const guessDisplay = rowsToDisplay.map((answer, index) => {
    console.log(answer)
    return (
      <GuessBox
        key={index}
        className="guess"
        value={answer}
        placeholder={index + 1}
      />
    )
  })

  const submitAnswer = () => {
    console.log("currentGuess", currentGuess);
    const newAnswers = [...answers]
    newAnswers.push(currentGuess)
    console.log(newAnswers);
    setAnswers(newAnswers)
  }


  return (
    <div className="body">
      <ResponsiveAppBar />
      <div className="guess-container">
        {guessDisplay}
      </div>
      <div className="player">
        {accessToken ? <Player guesses ={guesses} skipTurn={skipTurn} accessToken={accessToken} refreshToken={refreshToken} makePostRequesttoRefresh={makePostRequesttoRefresh} /> : <div>loading</div>}
      </div>
      <div className="submit-form">
        <ComboBox className="combo-box" getGuess={getGuess} />
        <ColorButtons submitAnswer={submitAnswer} />
      </div>
    </div>

  )
}
