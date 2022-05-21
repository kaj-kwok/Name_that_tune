import { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import { searchArtist, retrieveArtistTopSongs } from '../helpers/helperfunctions';
import Autocomplete from '@mui/material/Autocomplete';
import { dashboardContext } from '../../providers/DashboardProvider';


export default function SearchArtist() {
  const { setTrackList, currentTrack, setSong } = useContext(dashboardContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedValue, setSelectedValue] = useState("")

  useEffect(() => {
    if (!searchTerm) return
    if (!searchResults) return setSearchResults([])
    let pause = false
    const list = searchArtist(searchTerm)
    list.then(data => {
      if (pause) return
      setSearchResults(
        data.map(artist => {
          return { name: artist.name, id: artist.id }
        })
      )
    })
    return () => pause = true
  }, [searchTerm])

  //function to filter the artist id from name
  function handleSearchRequest(artistName) {
    const matchId = searchResults.filter(artist => {
      return artist.name === artistName
    })
    const list = retrieveArtistTopSongs(matchId[0].id, artistName)
    list.then(data => {
      setTrackList(data)
      setSong(currentTrack(data))
    })
  }

  return (
    <Autocomplete
      value={selectedValue}
      size='small'
      onChange={(e, newValue) => {
        setSelectedValue(newValue)
        handleSearchRequest(newValue);
      }}
      inputValue={searchTerm}
      onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue)
      }
      }
      id="controllable"
      options={searchResults.map(artist => artist.name)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Artists" />}
    />
  )
}
