//post game data to backend after game is completed
import axios from 'axios'

export default function postGameStats(user, isWinner, turnsLeft) {
  axios.post("http://localhost:3001/stats", {
    displayName: user.name,
    email: user.email,
    completed: isWinner,
    points: turnsLeft + 1
  })
}