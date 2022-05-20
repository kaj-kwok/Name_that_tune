//post game data to backend after game is completed
import axios from 'axios'

export function gameScore(isWinner, turnsLeft) {
  if (!isWinner) return 0;
  else return turnsLeft + 1;
};

export function postGameStats(user, isWinner) {
  axios.post("http://localhost:3001/stats", {
    displayName: user.name,
    email: user.email,
    completed: isWinner,
    score: gameScore()
  })
}


export function searchArtist(searchTerm) {
  return axios.get(`http://localhost:3001/playlists`, { params: { searchTerm } })
    .then(data => {
      return data.data.artists.items
    })
    .catch(data => console.log(data))
}

export function retrieveArtistTopSongs(id) {
  return axios.get(`http://localhost:3001/playlists/artist/${id}`)
    .then(data => {
      console.log(data.data.tracks)
      return data.data.tracks.map(item => {
        return {
          id: item.id,
          title: item.name,
          duration: item.duration_ms
        }
      })
    })
}

export function getUserData(accessToken) {
  return axios("https://api.spotify.com/v1/me", {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': "application/json"
    }
  }
  ).then(data => {
    return {
      name: data.data.display_name,
      email: data.data.email
    }
  }).catch(err => console.log(err))
}

export function sendUserInfo(user) {
  axios.post("http://localhost:3001/user", user)
    .then(res => {
      return
    })
    .catch(err => console.log(err))
}

//function to generate random index track
export function currentTrack(tracks) {
  const index = Math.floor(Math.random() * (tracks.length - 1))
  return tracks[index]
}

//retrieve default playlist
export function refreshSong() {
  return axios('http://localhost:3001/playlists/default')
    .then(data => {
      return data.data
    })
}