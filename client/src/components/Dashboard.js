import useAuth from "./useAuth"
import React from 'react'
import Player from './Player'
import ResponsiveAppBar from './Nav'
import ComboBox from "./SearchBar"
import ColorButtons from "./Button"
import FullWidthTextField from "./GuessBox"





export default function Dashboard({ code }) {
  const { accessToken, refreshToken } = useAuth(code)

  return (
    <div className="body">
      <ResponsiveAppBar />
      <div className="guess-box">
        <FullWidthTextField className="guess" label="Guess 2" />
        <FullWidthTextField className="guess" />
        <FullWidthTextField className="guess" />
        <FullWidthTextField className="guess" />
        <FullWidthTextField className="guess" />
        <FullWidthTextField className="guess" />
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
