import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ getGuess }) {

  return (
    <Autocomplete
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


const songList = [ "thunderstruck", "back in black", "highway to hell", "t.n.t", "you shook me all night long" ];
