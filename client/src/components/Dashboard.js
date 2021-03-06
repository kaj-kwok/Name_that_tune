import { dashboardContext } from "../providers/DashboardProvider"
import React, { useEffect, useState, useContext } from 'react'
import Player from './Player'
import ResponsiveAppBar from './Nav'
import ComboBox from "./SearchBar"
import ColorButtons from "./Button"
import GuessBox from "./GuessBox"
import GameModal from "./GameModal";
import SimpleSnackbar from "./SnackBar"
import { postGameStats } from "./helpers/helperfunctions"
import SearchArtist from "./SearchArtists/SearchArtist"



export default function Dashboard() {
  const { accessToken, makePostRequesttoRefresh, song, user, trackList, resetSong } = useContext(dashboardContext)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([])
  const [turnsLeft, setTurnsLeft] = useState(6)
  const [isGameActive, setIsGameActive] = useState(true)
  const [isWinner, setIsWinner] = useState(false)
  const [isDuplicateAnswer, setIsDuplicateAnswer] = useState(false)

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
        correctAnswer={song.name}
      />
    )
  })

  // determines if the game is over, and if it is over if you won or lost
  const determineGameState = () => {
    console.log("called determine state")
    if (currentGuess === song.name && isGameActive === true) {
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

  // function passed to snackBar to set state to false
  const close = () => {
    setIsDuplicateAnswer(false)
  }

  // function to make a guess and submit your answer
  const submitAnswer = () => {
    if (isGameActive === false) return;
    console.log("currentGuess", currentGuess);
    if (!currentGuess) {
      console.log("please select an answer")
      return;
    }
    if (guesses.includes(currentGuess)) {
      setIsDuplicateAnswer(true)
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
    document.getElementById("combo-box-demo").value = ''
    setIsDuplicateAnswer(false)
  }

  // function for resetting the game after the current game ends
  const gameReset = () => {
    console.log("reset game")
    resetSong()
    setTurnsLeft(6)
    setGuesses((prev) => [])
    setIsGameActive(true)
    setIsWinner(false)
    setCurrentGuess('')
  }

  return (
    <div className="body">
      <ResponsiveAppBar displayName={user.name} />
      {!isGameActive && <GameModal turnsLeft={turnsLeft} isWinner={isWinner} gameReset={gameReset} />}
      <div className="guess-container">
        <div className="artist">
          Artist: {song ? song.artist : "AC/DC"}
        </div>
        {guessDisplay}
      </div>
      <div className="player">
        {accessToken ? <Player
          guesses={guesses}
          skipTurn={skipTurn}
          makePostRequesttoRefresh={makePostRequesttoRefresh}
        /> : <div>loading</div>}
      </div>
      <div className="submit-form">
        <ComboBox className="combo-box" getGuess={getGuess} trackList={trackList} />
        <ColorButtons submitAnswer={submitAnswer} />
        {isDuplicateAnswer && <SimpleSnackbar close={close} />}
      </div>
      <div className="search">
        <SearchArtist gameReset={gameReset} />
      </div>
    </div >
  )
}
