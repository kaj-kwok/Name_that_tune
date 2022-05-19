//post game data to backend after game is completed
import axios from 'axios'


export function gameScore(isWinner, turnsLeft) {
  if (!isWinner) return 0;
  else return turnsLeft + 1;
};

export function postGameStats(user, isWinner) {
  console.log(gameScore())
  axios.post("http://localhost:3001/stats", {
    displayName: user.name,
    email: user.email,
    completed: isWinner,
    score: gameScore()
  })
}

export function sendUserInfo(user) {
  console.log("sending User information", user);
  axios.post("http://localhost:3001/user", user)
    .then(res => {
      return
    })
    .catch(err => console.log(err))
}