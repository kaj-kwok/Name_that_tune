import React from 'react';
import "./GuessBox.css"
import DangerousIcon from '@mui/icons-material/Dangerous';


export default function GuessBox({ value, placeholder, correctAnswer }) {
  if (value !== correctAnswer) {
    return (
     <> <div className="answer_row_value answer_row" placeholder={"Guess #" + placeholder} disabled value={value}>{value} <DangerousIcon /> </div> </> 
    );
  } else if (value === correctAnswer) {
    return (
      <div className="answer_row_value answer_row" placeholder={"Guess #" + placeholder} disabled value={value}>{value}</div>
    )

  } else {
    return (
      <div className="answer_row" placeholder={"Guess #" + placeholder} disabled value={value} />
    );
  }

}