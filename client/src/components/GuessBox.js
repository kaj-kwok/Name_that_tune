import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField(props) {

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
      label={"Guess #" + props.label} 
      id="fullWidth" />
    </Box>
  );
}