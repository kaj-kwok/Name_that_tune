const express = require('express');
const router = express.Router();
const { getUserByEmail, checkCurrentStreak, insertGameInfo, retrieveStats } = require('../dbqueries.js');

router.post("/", (req, res) => {
  getUserByEmail(req.body.email).then(data => {
    console.log("data from query", data)
    checkCurrentStreak(data.id, data.streak, data.max_streak, req.body.completed)
    insertGameInfo(data.id, req.body.completed, req.body.score);
    console.log("req.body is ", req.body)
  })
    .catch(err => console.log(err))

  res.status(201).send("received")
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