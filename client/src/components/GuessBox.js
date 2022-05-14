import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField() {

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
      // label="Guess 1" 
      id="fullWidth" />
    </Box>
  );
}