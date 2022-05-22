import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Lottie from 'react-lottie'
import animationData from '../lotties/player-button'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import { Box } from '@mui/system';
import flames from '../lotties/flames'
import { dashboardContext } from '../providers/DashboardProvider';
import ProgressBar from './ProgressBar';


export default function Player({ skipTurn, guesses }) {
  const { accessToken, makePostRequesttoRefresh, song } = useContext(dashboardContext)
  const [device, setDevice] = useState()
  const [player, setPlayer] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [hardMode, setHardMode] = useState(false)
  const [hardModeTimer, setHardModeTimer] = useState(0)

  const playLengthArray = [3000, 6000, 10000, 15000, 20000, 25000]
  const hardModeArray = [1500, 2500, 3500, 5000, 6000, 8000]

  function hardModeRandomizer(duration_ms) {
    const timer = Math.floor((duration_ms - 7500) * Math.random())
    return timer
  }

  //toggle for hardmode
  useEffect(() => {
    if (hardMode) {
      const timer = hardModeRandomizer(song.duration)
      setHardModeTimer(timer)
    }
  }, [hardMode, guesses])

  useEffect(() => {
    if (accessToken) {
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

      player.addListener('ready', async ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        await setDevice(device_id)
        // switchPlayer(device_id)
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // player.addListener('player_state_changed', update);

      player.connect();
      console.log("player, connected")

      return () => {
        player.disconnect()
      }
    };
  }, []);

  function switchPlayer(device) {
    axios(`https://api.spotify.com/v1/me/player`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        "Content-Type": "application/json"
      },
      data: {
        "device_ids": [device]
      }
    })
  }

  // function update() {
  //   player.getCurrentState().then(state => {
  //     if (!state) {
  //       console.error('User is not playing music through the Web Playback SDK');
  //       return;
  //     }
  //     console.log(state)
  //   })
  // }

  const play = () => {
    console.log("this is the current track", song)
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
        "uris": [`spotify:track:${song.id}`],
        "position_ms": hardMode ? hardModeTimer : 0,
      }
    })
      .then(() => setIsPlaying(true))
      .then(() => setTimeout(() => {
        pause()
      }, hardMode ? hardModeArray[guesses.length] : playLengthArray[guesses.length]))
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

  const flamesOptions = {
    loop: true,
    autoplay: true,
    animationData: flames,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const handleChange = () => {
    setHardMode(!hardMode);
  };

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#F78E1E',
      '&:hover': {
        backgroundColor: alpha('#F78E1E', theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#F78E1E',
    },
  }));

  return (
    <div className="player-container">
      <ProgressBar playLengthArray={playLengthArray} isPlaying={isPlaying} hardMode={hardMode} hardModeArray={hardModeArray} />
      <div>
        <Box mb={2}>
          <div className='hardmode-parent'>
            <FormGroup>
              <div className="flames">
                <Lottie
                  options={flamesOptions}
                  height="45px"
                  width="79px"
                  z-index="999"
                />
              </div>
              <FormControlLabel labelPlacement="top" value="top" control={<GreenSwitch checked={hardMode} onChange={handleChange} />} label="Hard Mode" />
            </FormGroup>
          </div>
        </Box>
        <div className="player-controls">
          <Button variant="contained" color='secondary'
            onClick={() => play()}>
            {isPlaying ?
              <div>
                <Lottie
                  options={defaultOptions}
                  height="24px"
                  width="24px"
                  color='primary'
                />
              </div> : <PlayArrowRoundedIcon />}
          </Button>
          <Button variant="contained" onClick={skipTurn} color='secondary'> <SkipNextIcon /> </Button>
        </div>
      </div>
    </div>

  )
}
