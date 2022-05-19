import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { getUserStats } from './helper.js/helperfunctions';
import { useEffect, useState } from 'react';


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
  const [userStats, setUserStats] = useState([[null, null, "loading"], "loading"]);
  const [streak, setStreak] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  // useEffect(() => {
  //   getUserStats(user.email)
  //   .then(data => {
  //     console.log("DATA~", data);
  //     const jsonInfo = data.data.games.map(info => {
  //       return [data.data.streak, data.data.max_streak, data.data.games.length, data.data.games[0].id]
  //     })
  //     setUserStats(jsonInfo)
  //     console.log("USERSTATS~~~~", userStats);
  //     setTimeout(() => {
  //       setIsLoaded(true)
  //     }, 1000);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // },[user])

  useEffect(() => {
    getUserStats(user.email)
    .then(data => {
      console.log("DATA~", data);
      const streakData = [data.data.streak, data.data.max_streak]
      const gamesData = data.data.games.map(info => {
        return[data.data.games]
      })
      setStreak(streakData)
      setUserStats(gamesData)
      console.log("USERSTATS~~~~", userStats);
      setTimeout(() => {
        setIsLoaded(true)
      }, 1000);
    })
    .catch(err => {
      console.log(err);
    })
  },[user])

  
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
            Stats
          </Typography>
          

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span className='modal-box'>
              <p>Current Streak</p>
              {/* <p>{isLoaded && userStats[0][3]}</p> */}
              <p>{isLoaded && streak[0]}</p>
              <p>{isLoaded && userStats[0][3]}</p>
              <p>Max Streak</p>
              <p>{isLoaded && streak[1]}</p>
              <p>Average Score</p>
              {/* <p>{isLoaded && userStats[0][2]}</p> */}
              <p>{isLoaded && userStats[0][2]}</p>
              <p></p>
            </span>
          
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}