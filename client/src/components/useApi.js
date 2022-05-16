// import axios from 'axios'
// import { useState, useEffect } from 'react'

// export default function useRetrievePlaylist(accessToken) {
//   const [song, setSong] = useState("")

//   useEffect(() => {
//     axios('https://api.spotify.com/v1/playlists/2dEZn55szDawgoYOYQWHKQ/tracks', {
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer ' + accessToken,
//         'Content-Type': "application/json"
//       }
//     }
//     ).then(data => {
//       const returnedSongs = data.data.items.map(item => {
//         return {
//           id: item.track.id,
//           title: item.track.name
//         }
//       })
//       const playlist = returnedSongs.reduce((obj, item) => {
//         const key = item["id"]
//         return { ...obj, [key]: item }
//       }, {})
//       // set to state
//       // setTrackList(returnedSongs)
//       return currentTrack(returnedSongs)
//     })
//   }, [accessToken])

//   function currentTrack(tracks) {
//     const index = Math.floor(Math.random() * (tracks.length - 1))
//     console.log("index", index)
//     setSong(tracks[index])
//   }
//   return { song }
// }