import useAuth from "./useAuth"
import React from 'react'
import Player from './Player'
import ResponsiveAppBar from './Nav'
import ComboBox from "./SearchBar"
import ColorButtons from "./Button"
import FullWidthTextField from "./GuessBox"



export default function Dashboard({ code }) {
  const { accessToken, refreshToken } = useAuth(code)

  // placeholder function to be replaced by guess array
  let placeholderArray = [0, 1, 2, 3, 4, 5] 

  // creates the fields that holds the guesses
  const guessDisplay = placeholderArray.map((answer, index) => {
    return (
      <FullWidthTextField
        className="guess"
        answer={answer}
        label={index + 1}
      />
    )
  })

  return (
    <div className="body">
      <ResponsiveAppBar />
      <div className="guess-container">
        {guessDisplay}
      </div>
      <div className="player">
        <Player accessToken={accessToken} refreshToken={refreshToken} />
      </div>
      <div className="submit-form">
        <ComboBox className="combo-box" />
        <ColorButtons />
      </div>
    </div>

  )
}
