import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { getLeaderboard } from './helpers/helperfunctions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const leaderBoard = getLeaderboard().then(data => {
  return data.data.map(player => {
    return player.name
    // console.log(player.name)
  })
})

export default function LeaderModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton color='inherit' onClick={handleOpen}><PublicIcon /></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Leaderboard
          </Typography>
          

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='modal-box'>
              {leaderBoard}
            </div>
          
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}