import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./GuessBox.css"


export default function GuessBox({ value, placeholder }) {

  return (
    <input className="answer_row" placeholder={"Guess #" + placeholder} disabled value={value} />
  );
}