import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LightSwitch from './Switch';
import StatsModal from './StatsModal';
import HelpModal from './HelpModal';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Grid } from '@mui/material';

const pages = [];

export function ResponsiveAppBar({ displayName, user }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <AppBar position="static">
      <Grid container  justifyContent='space-between' alignItems='center' padding>
          <div className='switch'>

          <LightSwitch />
          </div>
          <div className='app-name'>
              <LibraryMusicIcon />
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Name That Tune
              </Typography>
            
          </div>
          <div className='icons'>
            <HelpModal />
            <StatsModal user={user}/>
            
              <Chip icon={<FaceIcon />} label={displayName} variant="filled" color='warning' />
            
          
          </div>
      </Grid>
    </AppBar>
  );
};
export default ResponsiveAppBar;
