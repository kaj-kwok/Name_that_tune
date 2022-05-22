import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { getLeaderboard } from './helpers/helperfunctions';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

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


export default function LeaderModal() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const leaderBoard = getLeaderboard().then(data => {
      const position = data.data.map(player => {
        return {
          name: player.name,
          score: (player.sum === null ? 0 : player.sum)
        }
      })
      setPosition(position)
    })

  }, [])


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
              <p className='modal-text'>
                <EmojiEventsIcon />
                First Place: {position && position[0].name} Score:{position && position[0].score}
              </p>
              <p className='modal-text'>
                <EmojiEventsIcon />
                Second Place: {position && position[1].name} Score:{position && position[1].score}
              </p>
              <p className='modal-text'>
                <EmojiEventsIcon />
                Third Place: {position && position[2].name} Score:{position && position[2].score}
              </p>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}