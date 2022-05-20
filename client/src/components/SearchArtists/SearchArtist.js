import { useState, useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField';
import { searchArtist, retrieveArtistTopSongs } from '../helpers/helperfunctions';
import ArtistResults from './ArtistResults';
import Autocomplete from '@mui/material/Autocomplete';
import { dashboardContext } from '../../providers/DashboardProvider';


export default function SearchArtist() {
  const { setTrackList, currentTrack, setSong } = useContext(dashboardContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedValue, setSelectedValue] = useState("")

  useEffect(() => {
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
    const list = retrieveArtistTopSongs(matchId[0].id)
    list.then(data => {
      setTrackList(data)
      currentTrack(data)
    })
  }

  return (
    <Autocomplete
      value={selectedValue}
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
    // <>
    //   <TextField id="outlined-search" label="Search field" type="search" onChange={(e) => {
    //     setSearchTerm(e.target.value)
    //   }} />
    //   <div>
    //     {searchResults.map(artist => {
    //       return <ArtistResults artist={artist.name} key={artist.id} />
    //     })}
    //   </div>
    // </>
  )
}
