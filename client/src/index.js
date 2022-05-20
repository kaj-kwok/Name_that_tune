import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { orange, brown, grey, purple, blue, lightBlue } from '@mui/material/colors';

import { dark } from '@mui/material/styles/createPalette';
import { light } from '@mui/material/styles/createPalette';
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette:{
        primary: grey,
        secondary: blue,
    },
});

root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
