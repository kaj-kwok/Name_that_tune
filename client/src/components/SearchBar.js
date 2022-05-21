import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useContext } from 'react';
import { dashboardContext } from '../providers/DashboardProvider';

export default function ComboBox({ getGuess }) {
  const { trackList } = useContext(dashboardContext)
  const [val, setVal] = useState('')

  const renderedTracklist = trackList.map(track => {
    return track.name
  })

  return (
    <Autocomplete
      value={val}
      color={'#77BCA9'}
      disablePortal
      size="small"
      id="combo-box-demo"
      options={renderedTracklist}
      sx={{ width: 300}}
      onChange={(e, value) => getGuess(value)}
      renderInput={(params) => <TextField {...params} label="Can you guess the Song"  />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

