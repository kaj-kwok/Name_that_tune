import { createContext } from 'react'
import useAuth from '../api/useAuth'

export const dashboardContext = createContext()

const code = new URLSearchParams(window.location.search).get('code')

function DashboardProvider({ children }) {
  const { accessToken, makePostRequesttoRefresh, song, refreshSong, user, trackList } = useAuth(code)

  const dashboardData = { accessToken, makePostRequesttoRefresh, song, refreshSong, user, trackList }

  return (
    <dashboardContext.Provider value={dashboardData}>
      {children}
    </dashboardContext.Provider>
  )

}

export default DashboardProvider