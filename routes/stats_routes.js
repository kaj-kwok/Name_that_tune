const express = require('express');
const router = express.Router();
const { getUserByEmail, checkCurrentStreak, insertGameInfo, retrieveStats } = require('../dbqueries.js');

router.post("/", (req, res) => {
  console.log("req.body is ", req.body)
  getUserByEmail(req.body.email).then(data => {
    console.log("data from query", data)
    checkCurrentStreak(data.id, data.streak, data.max_streak, req.body.completed)
    insertGameInfo(data.id, req.body.completed, req.body.score);
  })
    .catch(err => console.log(err))

  res.status(201).send("received")
})

router.get("/:id", (req, res) => {
  console.log(req.params.id)
  retrieveStats(req.params.id)
    .then(data => res.send(data))
})

module.exports = router;