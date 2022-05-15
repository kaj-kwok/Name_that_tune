import useAuth from "./useAuth"
import React from 'react'
import Player from './Player'
import ResponsiveAppBar from './Nav'
import ComboBox from "./SearchBar"
import ColorButtons from "./Button"
import FullWidthTextField from "./GuessBox"
import { useState } from 'react';

export default function Dashboard({ code }) {
  const { accessToken, refreshToken, makePostRequesttoRefresh } = useAuth(code)
  const [currentGuess, setCurrentGuess] = useState([])
  const [answers, setAnswers] = useState([])
  const NUMBER_OF_GUESSES = 6

  const getGuess = (guess) => {
    setCurrentGuess(guess.label)
  }

  // placeholder function to be replaced by guess array
  let placeholderArray = [0, 1, 2, 3, 4, 5]

  //function to calculate the rows 
  const currentRows = function () {
    const remainingGuesses = NUMBER_OF_GUESSES - answers.length
    return [...answers, ...Array(remainingGuesses)]
  }

  const rowsToDisplay = currentRows()
  console.log(rowsToDisplay)

  // creates the fields that holds the guesses
  const guessDisplay = rowsToDisplay.map((answer, index) => {
    console.log(answer)
    return (
      <FullWidthTextField
        key={index}
        className="guess"
        value={answer}
        label={index + 1}
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
        {accessToken ? <Player accessToken={accessToken} refreshToken={refreshToken} makePostRequesttoRefresh={makePostRequesttoRefresh} /> : <div>loading</div>}
      </div>
      <div className="submit-form">
        <ComboBox className="combo-box" getGuess={getGuess} />
        <ColorButtons submitAnswer={submitAnswer} />
      </div>
    </div>

  )
}
