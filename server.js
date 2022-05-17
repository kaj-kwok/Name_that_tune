const dotenv = require('dotenv').config()

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node')
const morgan = require('morgan');
const cors = require('cors')
const PORT = 3001;
const { getUserByEmail, addUsertoDatabase, insertGameInfo } = require('./dbqueries');



// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(cors())
App.use(morgan("dev"));

App.post('/login', (req, res) => {
  console.log("Post request made to Spotify API");

  const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/auth/callback'
  };

  var spotifyApi = new SpotifyWebApi(credentials);

  // The code that's returned as a query parameter to the redirect URI
  const code = req.body.code;

  // Retrieve an access token and a refresh token
  spotifyApi.authorizationCodeGrant(code).then(
    function (data) {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);

      // send access token info back to client
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
})

App.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  console.log("refresh running")
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/auth/callback',
    refreshToken,
  })

  spotifyApi.refreshAccessToken()
    .then(function (data) {
      console.log('The refreshed token expires in ' + data.body['expires_in']);
      console.log('The refreshed access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);

      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    },
      function (err) {
        console.log('Could not refresh access token', err);
      }
    );
})

// Sample GET route
App.get('/auth/callback', (req, res) => res.json({
  message: "Seems to work!",
}));

App.post("/stats", (req, res) => {
  console.log("req.body", req.body)
  getUserByEmail(req.body.email).then(data => {
    console.log("data is ", data)
  })
    .catch(err => console.log(err))
  insertGameInfo(1, req.body.completed, req.body.score);
})


App.post("/user", (req, res) => {
  console.log("user route", req.body)
  res.status(201).send("received")
  getUserByEmail(req.body.email).then(data => {
    console.log("returned from getUserbyemail", data)
    //check if user already exists
    if (data === false) {
      console.log("user not found")
      addUsertoDatabase(req.body)
    }
  })
})


App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});