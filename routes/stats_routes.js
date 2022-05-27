const express = require('express');
const router = express.Router();
const { getUserByEmail, checkCurrentStreak, insertGameInfo, retrieveStats, retrieveLeaderboard } = require('../dbqueries.js');

router.post("/", (req, res) => {
  getUserByEmail(req.body.email).then(data => {
    checkCurrentStreak(data.id, data.streak, data.max_streak, req.body.completed)
    insertGameInfo(data.id, req.body.completed, req.body.score);
  })
    .catch(err => console.log(err))

  res.status(201).send("received")
})

router.get("/leaderboard", (req, res) => {
  retrieveLeaderboard()
    .then(data => res.json(data))
})

router.get("/:email", (req, res) => {
  const streaks = getUserByEmail(req.params.email)
  const games = retrieveStats(req.params.email)
  Promise.all([streaks, games])
    .then((values) => {
      const streaksAndGames = {
        streak: values[0].streak,
        max_streak: values[0].max_streak,
        games: values[1]
      }
      res.json(streaksAndGames);
    })
    .catch(err => {
      console.log("getUserByEmail, retrieveStats", err)
    })
})


module.exports = router;