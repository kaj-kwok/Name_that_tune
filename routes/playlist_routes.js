const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = require('../server.js');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(spotifyApi)
  // console.log('The access token is ' + spotifyApi.getAccessToken());
})


module.exports = router;