import React, { useState, useEffect } from 'react'
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
        //clear token information from URL, set to root URL
        window.history.pushState({}, null, "/")
        console.log(accessToken)
      })
      //if code is expired, redirect to login
      .catch(() => {
        window.location = "/"
      })
  }, [code])

  //post route to refresh our accessToken using the refreshToken
  useEffect(() => {

    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios.post('http://localhost:3001/refresh', {
        refreshToken,
      })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        //if code is expired, redirect to login
        .catch(() => {
          window.location = "/"
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [expiresIn, refreshToken])

  return accessToken
}
