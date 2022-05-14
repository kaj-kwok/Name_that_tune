import SpotifyWebApi from "spotify-web-api-node";
import { useEffect } from 'react'
import useAuth from "./useAuth";

export default function useApi(code) {
  const accessToken = useAuth(code)

  const spotifyApi = new SpotifyWebApi({
    clientId: '036db34aae6d4d70a636cd76c4758224'
  });

  spotifyApi.setAccessToken(accessToken)
  return spotifyApi
}

