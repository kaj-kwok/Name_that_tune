const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node')
const morgan = require('morgan');
const cors = require('cors')
const PORT = 3001;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(cors())

// App.get('/login', (req, res) => {
//   var scopes = ['user-read-private', 'user-read-email'],
//     redirectUri = 'http://localhost:3000/auth/callback',
//     clientId = '036db34aae6d4d70a636cd76c4758224',
//     state = 'some-state-of-my-choice';

//   // Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
//   var spotifyApi = new SpotifyWebApi({
//     redirectUri: redirectUri,
//     clientId: clientId
//   });

//   // Create the authorization URL
//   var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
//   console.log(authorizeURL)

//   // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
//   res.redirect(authorizeURL)

// })

App.post('/login', (req, res) => {

  const credentials = {
    clientId: '036db34aae6d4d70a636cd76c4758224',
    clientSecret: '785208f392dd452b875a8cda1a807be7',
    redirectUri: 'http://localhost:3000/auth/callback'
  };

  var spotifyApi = new SpotifyWebApi(credentials);

  // The code that's returned as a query parameter to the redirect URI
  const code = req.body.code;
  console.log(code)

  // Retrieve an access token and a refresh token
  spotifyApi.authorizationCodeGrant(code).then(
    function (data) {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);

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
    clientId: '036db34aae6d4d70a636cd76c4758224',
    clientSecret: '785208f392dd452b875a8cda1a807be7',
    redirectUri: 'http://localhost:3000/auth/callback',
    refreshToken,
  })

  spotifyApi.refreshAccessToken().then(
    (data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
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

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});