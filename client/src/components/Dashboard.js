import useAuth from "./useAuth"
import React, { useEffect, useState } from 'react'
import Player from './Player'
import ResponsiveAppBar from './Nav'
import ComboBox from "./SearchBar"
import ColorButtons from "./Button"
import GuessBox from "./GuessBox"
import GameModal from "./GameModal";
import postGameStats from "./helper.js/sendGameData"


export default function Dashboard({ code }) {
  const { accessToken, refreshToken, makePostRequesttoRefresh, song, refreshSong, user } = useAuth(code)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [turnsLeft, setTurnsLeft] = useState(6)
  const [answer, setAnswer] = useState('')
  const [isGameActive, setIsGameActive] = useState(true)
  const [isWinner, setIsWinner] = useState(false)

  useEffect(() => {
    setAnswer(song)
    console.log('new song is ', song)
  }, [song])

  useEffect(() => {
    if (isGameActive === false) {
      console.log("sending data to server")
      postGameStats(user, isWinner, turnsLeft)
    }
  }, [isGameActive])

  // sets guess state
  const getGuess = (guess) => {
    setCurrentGuess(guess)
  }

  // Skips turn, reducing amount of turnsLeft left by 1
  const skipTurn = () => {
    if (isGameActive === false) return;
    if (turnsLeft === 0) {
      console.log("you're out of turns")
      return;
    }
    setTurnsLeft(prev => prev - 1)
    const newAnswers = [...guesses]
    newAnswers.push("skipped turn")
    setGuesses(newAnswers)
  }

  //function to calculate the rows 
  const currentRows = function () {
    return [...guesses, ...Array(turnsLeft)]
  }

  const rowsToDisplay = currentRows()

  // creates the fields that holds the turnsLeft
  const guessDisplay = rowsToDisplay.map((answer, index) => {
    return (
      <GuessBox
        key={index}
        className="guess"
        value={answer}
        placeholder={index + 1}
      />
    )
  })


  const determineGameState = () => {
    console.log("called")
    if (currentGuess === answer.title && isGameActive === true) {
      setIsGameActive(false)
      setIsWinner(true)
      console.log("you win")

      return;
    }
    if (turnsLeft === 0 && isGameActive === true) {
      setIsGameActive(false)
      console.log("you lost, no more guesses remaining")
      return;
    }
  }

  useEffect(() => { determineGameState() }, [guesses])

  const submitAnswer = () => {
    if (isGameActive === false) return;
    console.log("currentGuess", currentGuess);
    if (!currentGuess) {
      console.log("please select an answer")
      return;
    }
    if (guesses.includes(currentGuess)) {
      console.log("already guesssed, pls select a different answer")
      return;
    }
    if (turnsLeft === 0) {
      console.log("out of guesses")
      return;
    }
    const newAnswers = [...guesses]
    newAnswers.push(currentGuess)
    console.log("answers array after submission", newAnswers);
    setGuesses(newAnswers)
    setTurnsLeft(prev => prev -= 1)
  }

  const x = []

  const gameReset = () => {
    console.log("reset game")
    refreshSong()
    setTurnsLeft(6)
    setGuesses((prev) => [])
    setIsGameActive(true)
    setIsWinner(false)
    setCurrentGuess('')
  }

  return (
    <div className="body">
      <ResponsiveAppBar />
      {!isGameActive && <GameModal isWinner={isWinner} gameReset={gameReset} />}
      <div className="guess-container">
        {guessDisplay}
      </div>
      <div className="player">
        {accessToken ? <Player
          turnsLeft={turnsLeft}
          skipTurn={skipTurn}
          accessToken={accessToken}
          refreshToken={refreshToken}
          makePostRequesttoRefresh={makePostRequesttoRefresh}
          answer={answer.id}
        /> : <div>loading</div>}
      </div>
      <div className="submit-form">
        <ComboBox className="combo-box" getGuess={getGuess} />
        <ColorButtons submitAnswer={submitAnswer} />
      </div>
    </div>

  )
}
