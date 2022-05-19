import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Lottie from 'react-lottie'
import animationData from '../lotties/player-button'
import { withTheme } from '@emotion/react';


export default function Player({ accessToken, makePostRequesttoRefresh, skipTurn, turnsLeft, answer }) {

  const [device, setDevice] = useState()
  const [player, setPlayer] = useState()
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (accessToken) {
      // const script = document.createElement("script");
      // script.src = "https://sdk.scdn.co/spotify-player.js";
      // script.async = true;

      // document.body.appendChild(script);

      // window.onSpotifyWebPlaybackSDKReady = () => {

      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: spotifyCallback => {
          console.log("calling cb for SDK");
          //// call function get a new token require my refresh currently useAuth
          makePostRequesttoRefresh((newaccesstoken) => {
            console.log(newaccesstoken)
            spotifyCallback(newaccesstoken)
          })
        },

        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        setDevice(device_id)
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();
      console.log("player, connected")

      return () => {
        player.disconnect()
      }
    };
    // }
  }, []);

  const play = () => {
    console.log("this is the current track", answer)
    console.log("this is the device", device)
    if (!device) {
      console.log("not working")
      player.on("")
    }
    axios(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        "Content-Type": "application/json"
      },
      data: {
        "uris": [`spotify:track:${answer}`]
      },
      "position_ms": 0,
    })
      .then(() => setIsPlaying(true))
      .then(() => setTimeout(() => {
        pause()
      }, (turnsLeft * 3000)))
  }

  const pause = (device) => {
    axios('https://api.spotify.com/v1/me/player/pause', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        "Content-Type": "application/json"
      },
    })
      .then(() => setIsPlaying(false))
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="play-skip">
      <Button variant="contained"
        onClick={() => play()}>
        {isPlaying ?
          <div>
            <Lottie
              options={defaultOptions}
              height="24px"
              width="24px"
            />
          </div> : <PlayArrowRoundedIcon />}
      </Button>

      <Button variant="contained" onClick={skipTurn}> <SkipNextIcon /> </Button>

    </div>
  )
}
