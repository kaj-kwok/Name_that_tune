//post game data to backend after game is completed
import axios from 'axios'

export function postGameStats(user, isWinner, turnsLeft) {
  axios.post("http://localhost:3001/stats", {
    displayName: user.name,
    email: user.email,
    completed: isWinner,
    score: turnsLeft + 1
  })
}

export function sendUserInfo(user) {
  axios.post("http://localhost:3001/user", user)
    .then(res => {
      return
    })
    .catch(err => console.log(err))
}