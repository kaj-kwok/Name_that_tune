import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function GuessBox(props) {
  return (
    <Box
      sx={{
        width: 400,
        maxWidth: '100%',

      }}
    >
      <TextField
        fullWidth
        disabled
        size="small"
        placeholder={"Guess #" + props.placeholder}
        value={props.value}
        id="fullWidth" 
        />

    </Box>
  );
}