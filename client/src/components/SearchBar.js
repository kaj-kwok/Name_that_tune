import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { SocialDistance } from '@mui/icons-material';
import { BorderAll } from '@mui/icons-material';


export default function ComboBox({ getGuess, trackList }) {
  const [val, setVal] = useState('')

  const renderedTracklist = trackList.map(track => {
    return track.title
  })

  return (
    <Autocomplete
      value={val}
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


const songList = ["Thunderstruck", "Back In Black", "Highway to Hell", "T.N.T.", "You Shook Me All Night Long", "test", "testing"];
