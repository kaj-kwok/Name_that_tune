import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon  from '@mui/icons-material/Close'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function SimpleSnackbar({close}) {
  const [open, setOpen] = useState(true);
  const [position, setPosition] = useState({
    vertical: 'top',
    horizontal: 'center',
  });


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    close()
    setOpen(false);
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={position}
        open={open}
        // message="You have already selected this answer, please select a different one"
        action={action}
      >
        <Alert onClose={handleClose} severity='warning'>You have already selected this answer, please select a different one</Alert>
      </Snackbar>
    </div>
  );
}
