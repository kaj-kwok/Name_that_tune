import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
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
        default: '#0D0D0D',
        paper: '#0D0D0D'
        
      },
    }),
    secondary: {
        ...(mode === 'dark' && {
            main: '#E4E4E4',
          }),
    },
    text: {
      ...(mode === 'dark'
        ? {
            primary:    '#E4E4E4',
            secondary: '#E4E4E4',
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
