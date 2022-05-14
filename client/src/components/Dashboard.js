import useAuth from "./useAuth"
import React from 'react'
import Player from './Player'

export default function Dashboard({ code }) {
  const { accessToken, refreshToken } = useAuth(code)

  return (
    <Player accessToken={accessToken} refreshToken={refreshToken} />
  )
}
