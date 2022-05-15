import React from 'react'
import './Login.css'

const AUTH_URL = 'https://accounts.spotify.com:443/authorize?client_id=036db34aae6d4d70a636cd76c4758224&response_type=code&redirect_uri=http://localhost:3000/auth/callback&scope=user-read-private%20user-read-email%20streaming%20user-read-playback-state%20user-modify-playback-state'

export default function Login() {
  return (
    <div class="login">
      {/* <a href={AUTH_URL}>Login with Spotify</a> */}
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" width="200" />
      <button class="login_button" onClick={event => window.location.href = AUTH_URL}>Login to Spotify</button>
    </div>
  )
}
