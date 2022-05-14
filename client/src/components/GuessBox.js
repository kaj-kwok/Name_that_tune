// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function FormPropsTextFields() {
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& .MuiTextField-root': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField
//           disabled
//           id="outlined-disabled"
//           defaultValue="Hello World"
//         />
//       </div>
//     </Box>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField() {

  

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <TextField 
      fullWidth 
      disabled
      // label="Guess 1" 
      id="fullWidth" />
    </Box>
  );
}