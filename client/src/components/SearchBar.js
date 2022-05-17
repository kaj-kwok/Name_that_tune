import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

export default function ComboBox({ getGuess }) {
  const [val, setVal] = useState('')
  return (
    <Autocomplete
      value={val}
      disablePortal
      size="small"
      id="combo-box-demo"
      options={songList}
      sx={{ width: 300 }}
      onChange={(e, value) => getGuess(value)}
      renderInput={(params) => <TextField {...params} label="Can you guess the Song" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top


const songList = [ "Thunderstruck", "Back In Black", "Highway to Hell", "T.N.T.", "You Shook Me All Night Long", "test", "testing" ];
