import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { getUserStats } from './helpers/helperfunctions';
import { useEffect, useState, useContext } from 'react';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { dashboardContext } from '../providers/DashboardProvider';
import {
  MainContainer,
  Container,
  BarChartContainer,
  Number,
  BlackLine,
  MakeBar
} from "./styles";



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

export default function StatsModal() {

  const { user } = useContext(dashboardContext)
  const [open, setOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const defaultBarChartData = [
    { score: 0, colors: ["#cbd9ad", "#7ca81d"] }, // 1 [0]
    { score: 0, colors: ["#cbd9ad", "#7ca81d"] }, // 2 [1]
    { score: 0, colors: ["#cbd9ad", "#7ca81d"] }, // 3 [2]
    { score: 0, colors: ["#cbd9ad", "#7ca81d"] }, // 4 [3]
    { score: 0, colors: ["#cbd9ad", "#7ca81d"] }, // 5 [4]
    { score: 0, colors: ["#cbd9ad", "#7ca81d"] }, // 6 [5]
  ];

  const [barChartData, setBarChartData] = useState(defaultBarChartData);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    getUserStats(user.email)
      .then(data => {
        // gets user streak and max_streak data
        const streakData = [data.data.streak, data.data.max_streak];
        // gets user scores for all games
        const updatedBarChart = [...defaultBarChartData];
        const gamesData = data.data.games.map(info => {
          // counts games by score
          if (info.score === 6) {
            updatedBarChart[5].score += 1;
          }
          if (info.score === 5) {
            updatedBarChart[4].score += 1;
          }
          if (info.score === 4) {
            updatedBarChart[3].score += 1;
          }
          if (info.score === 3) {
            updatedBarChart[2].score += 1;
          }
          if (info.score === 2) {
            updatedBarChart[1].score += 1;
          }
          if (info.score === 1) {
            updatedBarChart[0].score += 1;
          }
          return info.score
        });

        setBarChartData(updatedBarChart);
        setTotalScore(gamesData.reduce((prev, current) => prev + current, 0))
        setGamesPlayed(gamesData.length)
        setStreak(streakData)

      })
      .catch(err => {
        console.log(err);
      })
  }, [open]);



  return (
    <div>
      <IconButton color='inherit' onClick={handleOpen}><BarChartIcon fontSize='large' /></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <AssessmentIcon /> Stats
          </Typography>
          <div className="bar-graph">
            <Container>
              <MainContainer>
                {barChartData.map(({ score, colors }, i) => {
                  return (
                    <BarChartContainer key={i} >
                      <Number color={colors[1]}>{barChartData[i].score}</Number>
                      <MakeBar height={score} colors={colors} />
                    </BarChartContainer>
                  );
                })}
              </MainContainer>
              <BlackLine />
            </Container>
          </div>
          <div className="bar-graph-numbers"><p></p>123456</div>
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
                <p>{totalScore && (totalScore / gamesPlayed).toFixed(2)}</p>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}