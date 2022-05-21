import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Fade } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { gameScore } from './helpers/helperfunctions';
import { dashboardContext } from '../providers/DashboardProvider';


//confetti options
const confetti = require('canvas-confetti');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 12,
  p: 4,
};

export default function GameModal({ isWinner, gameReset, turnsLeft }) {
  const [open, setOpen] = React.useState(true);
  const { user, song } = useContext(dashboardContext)

  //confetti dreams
  if (isWinner === true && open === true) {
    setTimeout(() => {
      const myCanvas = document.createElement('canvas');
      const modal = document.querySelector('[aria-labelledby="modal-modal-title"]')
      modal.appendChild(myCanvas);

      const myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true,
      });

      var end = Date.now() + (15 * 1000);

      var colors = ['#bb0000', '#ffffff'];

      (function frame() {
        myConfetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        myConfetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }, 500)
  }

  return (
    <div>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open} timeout={800}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Game Over
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className='modal-box'>
                <p className='game-modal-text'>
                  {user.name}
                  <span>{isWinner ? "You win!" : "You lost!"}</span>
                  <span>The Correct Answer was {song.title}</span>
                  <span>You scored {gameScore(isWinner, turnsLeft)} Points</span>
                </p>
                <IconButton onClick={gameReset}><ReplayIcon /></IconButton>
                {/* <IconButton onClick={() => {
                  createCanvas()
                }}><ReplayIcon /></IconButton> */}

              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}