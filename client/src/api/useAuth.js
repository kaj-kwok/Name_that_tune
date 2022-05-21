import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

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
        // getUserData(res.data.accessToken)
        // refreshSong(res.data.accessToken)
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
        setAccessToken(res.data.accessToken)
        setExpiresIn(res.data.expiresIn)
      })
      //if code is expired, redirect to login
      .catch(() => {
        window.location = "/"
      })
  }


  return { accessToken, makePostRequesttoRefresh }


}


