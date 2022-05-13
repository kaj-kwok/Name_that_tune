import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
  console.log(accessToken)

  return (

    accessToken ? <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      uris={['spotify:track:6l8GvAyoUZwWDgF1e4822w']}
    /> : <div>"Loading"</div>
  )
}
