import React from 'react';
import "./GuessBox.css"
import DangerousIcon from '@mui/icons-material/Dangerous';


export default function GuessBox({ value, placeholder, correctAnswer }) {
  if (value !== correctAnswer && value !== undefined) {
    return (
      <>
        <div className="answer_row_value answer_row" >
          <div className='value'>

          {value} 
          </div>
          <DangerousIcon sx={{fontSize: '25px'}}/> 
          
        </div>  
      </> 
    );
  } else if (value === correctAnswer) {
    return (
      <div className="answer_row_value answer_row">
        <div className='value'>
        {value}
        </div>
      </div>
    )

  } else {
    return (
      <div className="answer_row"/>
    );
  }

}