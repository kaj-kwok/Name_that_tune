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

router.get('/default', (req, res) => {
  spotifyApi.getPlaylist('2dEZn55szDawgoYOYQWHKQ')
    .then(function (data) {
      const arranged = data.body.tracks.items.map(item => {
        return {
          id: item.track.id,
          name: item.track.name,
          duration: item.track.duration_ms
        }
      })
      res.json(arranged)
    }, function (err) {
      console.log('Something went wrong!', err);
    });
})

module.exports = router;