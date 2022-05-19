import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { dashboardContext } from '../providers/DashboardProvider';
import { searchArtist } from './helpers/helperfunctions';

export default function SearchArtist() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (!searchResults) return setSearchResults([])
    const list = searchArtist(searchTerm)
    list.then(data => setSearchResults(data))
  }, [searchTerm])



  return (
    <>
      <TextField id="outlined-search" label="Search field" type="search" onChange={(e) => {
        setSearchTerm(e.target.value)
      }} />
      <div>

      </div>
    </>
  )
}
