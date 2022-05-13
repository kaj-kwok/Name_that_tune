import React from 'react'

const AUTH_URL = 'https://accounts.spotify.com:443/authorize?client_id=036db34aae6d4d70a636cd76c4758224&response_type=code&redirect_uri=http://localhost:3000/auth/callback&scope=user-read-private%20user-read-email%20streaming%20user-read-playback-state%20user-modify-playback-state'

export default function Login() {
  return (
    <div>
      <a href={AUTH_URL}>Login with Spotify</a>
    </div>
  )
}
