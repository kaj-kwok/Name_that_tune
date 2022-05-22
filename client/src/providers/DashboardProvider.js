import { createContext, useState, useEffect } from 'react'
import useAuth from '../api/useAuth'
import { getUserData, sendUserInfo, currentTrack, refreshSong } from '../components/helpers/helperfunctions'

export const dashboardContext = createContext()

const code = new URLSearchParams(window.location.search).get('code')

function DashboardProvider({ children }) {
  const { accessToken, makePostRequesttoRefresh } = useAuth(code)
  const [user, setUser] = useState({})
  const [song, setSong] = useState("");
  const [trackList, setTrackList] = useState([])

  useEffect(() => {
    if (!accessToken) return
    const user = getUserData(accessToken)
    user.then((user) => {
      setUser(user)
      sendUserInfo(user)

      resetSong()
    })
  }, [accessToken])


  function resetSong() {
    const returnedSongs = refreshSong()
    returnedSongs.then(playList => {
      setTrackList(playList)
      setSong(currentTrack(playList))
    })
  }


  const dashboardData = { accessToken, makePostRequesttoRefresh, song, resetSong, user, trackList, setTrackList, currentTrack, setSong }

  return (
    <dashboardContext.Provider value={dashboardData}>
      {children}
    </dashboardContext.Provider>
  )

}

export default DashboardProvider