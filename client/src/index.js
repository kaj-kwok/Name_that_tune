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
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: '#015077',
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
            primary:    '#1DB954',
            secondary: '#1DB954',
          }
        : {
            primary: '#	#1DB954',
            secondary: '#1DB954',
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
