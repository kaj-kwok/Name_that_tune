const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = require('../server.js');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  spotifyApi.searchArtists(req.query.searchTerm)
    .then(function (data) {
      console.log('Search artists by "Love"', data.body);
      res.json(data.body)
    }, function (err) {
      console.error(err);
    });
})


module.exports = router;