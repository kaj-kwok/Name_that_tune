import { useState, useEffect } from 'react'
import axios from 'axios';
import { sendUserInfo } from "./helper.js/helperfunctions";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const [song, setSong] = useState("");
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.post('http://localhost:3001/login', {
      code,
    })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        //clear query parameters from URL, set to root URL
        window.history.pushState({}, null, "/")
        getUserData(res.data.accessToken)
        refreshSong(res.data.accessToken)
      })
      //if code is expired, redirect to login
      .catch(() => {
        window.location = "/"
      })
  }, [code])

  //post route to refresh our accessToken using the refreshToken
  useEffect(() => {
    // conditional to prevent code from running if there is no refresh/expire token set
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      makePostRequesttoRefresh()
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [expiresIn, refreshToken])

  //call function to send refresh token to get a new accesstoken
  function makePostRequesttoRefresh(callback) {
    axios.post('http://localhost:3001/refresh', {
      refreshToken,
    })
      .then(res => {
        if (typeof callback === 'function') {
          callback(res.data.accessToken)
        }
        console.log("res.data.accessToken ", res.data.accessToken)
        console.log("res.data.expiresIn ", res.data.expiresIn)
        setAccessToken(res.data.accessToken)
        setExpiresIn(res.data.expiresIn)
      })
      //if code is expired, redirect to login
      .catch(() => {
        window.location = "/"
      })
  }

  function refreshSong(accessToken) {
    axios('https://api.spotify.com/v1/playlists/2dEZn55szDawgoYOYQWHKQ/tracks', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': "application/json"
      }
    }
    ).then(data => {
      const returnedSongs = data.data.items.map(item => {
        return {
          id: item.track.id,
          title: item.track.name
        }
      })
      const playlist = returnedSongs.reduce((obj, item) => {
        const key = item["id"]
        return { ...obj, [key]: item }
      }, {})
      // set to state
      // setTrackList(returnedSongs)
      return currentTrack(returnedSongs)
    })
  }

  function currentTrack(tracks) {
    const index = Math.floor(Math.random() * (tracks.length - 1))
    setSong(tracks[index])
  }

  function getUserData(accessToken) {
    axios("https://api.spotify.com/v1/me", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': "application/json"
      }
    }
    ).then(data => {
      const user = {
        name: data.data.display_name,
        email: data.data.email
      }
      setUser(user)
      sendUserInfo(user)
    }).catch(err => console.log(err))

    // 
  }

  return { accessToken, refreshToken, makePostRequesttoRefresh, song, refreshSong, user }


}


