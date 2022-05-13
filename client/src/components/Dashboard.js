import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import SpotifyWebApi from "spotify-web-api-node"
import React from 'react'
import axios from "axios"
import Player from './Player'

export default function Dashboard({ code }) {
  const accessToken = useAuth(code)
  return (
    <Player accessToken={accessToken} />
  )
}
