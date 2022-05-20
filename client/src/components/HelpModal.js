import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import FavoriteIcon from '@mui/icons-material/Favorite';

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

export default function HelpModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton color='inherit' onClick={handleOpen}><QuestionMarkIcon/></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            How To Play
          </Typography>
          

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='modal-box'>

              <p className='modal-text'>
                <MusicNoteIcon fontSize='large' />
                Listen to the intro, then find and select the song title in the list.
              </p>
              <p className='modal-text'>
                <SkipNextIcon fontSize='large' />
                Skipped or incorrect attempts unlock more of the intro.
              </p>
              <p className='modal-heart'> 
                <FavoriteIcon  />
                Good Luck! Don't forget to share with your friends!
              </p>
            </div>
          
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}