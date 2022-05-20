const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = require('../server.js');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  spotifyApi.searchArtists(req.query.searchTerm)
    .then(function (data) {
      res.status(200).json(data.body)
    }, function (err) {
      console.error(err);
    });
})

router.get('/artist/:id', (req, res) => {
  console.log(req.params.id)
  spotifyApi.getArtistTopTracks(req.params.id, 'CA')
    .then(function (data) {
      res.status(200).json(data.body)
    }, function (err) {
      console.log('Something went wrong!', err);
    });
})

module.exports = router;