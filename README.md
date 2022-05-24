# Name that Tune

A fun audio game that can be enjoyed by all. Pick from your favourite artists and test your knowledge of their top hits. Listen to an audio snippet and see if you can match the tune to the name of the song. Gain points based on how few guesses it takes to pick the correct name. Track your own personal stats and against the leaderboard.

Utilises [Spotify API](spotify.com)

*Requires a Premium Spotify Account*

# Authors:

Ryan Kwok [[LinkedIn]](www.linkedin.com/in/ryan-kwok604) [[Github]]()\
Calvin Chung [[LinkedIn]](https://www.linkedin.com/in/\calvin-chung-3543b5239/) [[Github]](https://github.com/Kikstyophobia)\
Josh Sparkes [[LinkedIn]](https://www.linkedin.com/in/joshua-sparkes-95121422b/) [[Github]](https://github.com/Sparkes21)

![playthrough](docs\example1.gif)

![Help Menu](docs\Help_Menu.png)

## Installation

### Server Files

In the root directory, install all packages.  

```
$ npm install 
```
Create your own .env file, see sample in the root file for guidance  

Create an App within your Spotify Premium account via [Dashboard](https://developer.spotify.com/dashboard/). For local installations add http://localhost:3001/auth/callback to the redirect URI within settings.  

Add the generated Client ID and Client Secret to your created .env file in root.

### Client Files

Navigate to /Client, install packages

```
$ npm install
```

Create an .env file as per sample.  
Instructions on generating your authorisation URL can be found [here](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/)

## Dependancies

- express
- cors
- dotenv
- pg
- react-lottie
- [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node)
- styled-components
- Material UI
- axios
- canvas-confetti

## Usage

Run npm start in both root and client directories  
Users will be prompted to authorise the App via logging into their personal Spotify account.

Play the game!

