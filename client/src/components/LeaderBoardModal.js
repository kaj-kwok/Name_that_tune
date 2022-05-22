import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { getLeaderboard } from './helpers/helperfunctions';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 300,
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
           <FormatListNumberedIcon fontSize="large"/> Leaderboard
          </Typography>


          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='modal-box'>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th scope="col">Place</th>
                <th scope="col">Username</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="leaderboard-place" id="first-place"><EmojiEventsIcon />1st</th>
                <td id="first-place">{position && position[0].name}</td>
                <td id="first-place">{position && position[0].score}</td>
              </tr>
              <tr>
                <th scope="row" className="leaderboard-place" id="second-place"><EmojiEventsIcon />2nd</th>
                <td id="second-place">{position && position[1].name}</td>
                <td id="second-place">{position && position[1].score}</td>
              </tr>
              <tr>
                <th scope="row" className="leaderboard-place" id="third-place"><EmojiEventsIcon />3rd</th>
                <td id="third-place">{position && position[2].name}</td>
                <td id="third-place">{position && position[2].score}</td>
              </tr>
            </tbody>
          </table>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}