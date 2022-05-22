import React from 'react'
import './Login.css'

const AUTH_URL = process.env.REACT_APP_AUTH_URL

export default function Login() {
  return (
    <div className="login" >
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" width="200" />
      <button className="login_button" onClick={event => window.location.href = AUTH_URL} >Login to Spotify</button>
    </div>
  )
}
