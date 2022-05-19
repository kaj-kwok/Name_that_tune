import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { getUserStats } from './helper.js/helperfunctions';
import { useEffect, useState } from 'react';
import AssessmentIcon from '@mui/icons-material/Assessment';

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

export default function StatsModal({ user }) {

  const [open, setOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    getUserStats(user.email)
    .then(data => {
      const streakData = [data.data.streak, data.data.max_streak];
      const gamesData = data.data.games.map(info => {
        return info.score
      });

      setTotalScore(gamesData.reduce((prev, current) => prev + current, 0))
      setGamesPlayed(gamesData.length)
      setStreak(streakData)
      
    })
    .catch(err => {
      console.log(err);
    })
  },[user]);

  
  return (
    <div>
      <IconButton color='inherit' onClick={handleOpen}><BarChartIcon fontSize='large'/></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <AssessmentIcon/> Stats
          </Typography>
          

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="streaks">
                <div className="individual-stat">
                  <p>Current Streak</p>
                  <p>{streak && streak[0]}</p>
                </div>
                <div className="individual-stat">
                  <p>Max Streak</p>
                  <p>{streak && streak[1]}</p>
                </div>             
              </div>
              <div className="scores">
                <div className="individual-stat">
                  <p>Total Score</p>
                  <p>{totalScore && totalScore}</p>
                </div>
                <div className="individual-stat">
                  <p>Games Played</p>
                  <p>{gamesPlayed && gamesPlayed}</p>
                </div>
                <div className="individual-stat">
                  <p>Average Score</p>
                  <p>{totalScore && (totalScore/gamesPlayed).toFixed(2)}</p>
                </div>
              </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}