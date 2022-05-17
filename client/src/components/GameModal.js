import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

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

export default function GameModal({ isWinner, gameReset, user, turnsLeft, answer }) {
  const [open, setOpen] = React.useState(true);


  return (
    <div>

      <Modal
        open={open}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Game Over
          </Typography>


          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='modal-box'>

              <p className='modal-text'>
                {user.name}
                {isWinner ? "You win!" : "You lost you loser"}
                The Correct Answer was {answer}
                You scored {turnsLeft} Points
                { }
              </p>
              <IconButton onClick={gameReset}><ReplayIcon /></IconButton>
            </div>

          </Typography>
        </Box>
      </Modal>
    </div>
  );
}