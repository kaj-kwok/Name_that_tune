import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';
import { CssBaseline } from '@mui/material';
const root = ReactDOM.createRoot(document.getElementById('root'));


const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === 'dark' && {
        main: '#015077',
        warning: '#1DB954'
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: '#4B4848',
        paper: '#015077'
        
      },
    }),
    secondary: {
        ...(mode === 'dark' && {
            main: '#F78E1E',
          }),
    },
    text: {
      ...(mode === 'dark'
        ? {
            primary:    '#77BCA9',
            secondary: '#77BCA9',
          }
        : {
            primary: '#	#77BCA9',
            secondary: '#77BCA9',
          }),
    },
  },
});

const darkModeTheme = createTheme(getDesignTokens('dark'));




root.render(
    <ThemeProvider theme={darkModeTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
);
