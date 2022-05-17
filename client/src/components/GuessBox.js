import React from 'react';
import "./GuessBox.css"


export default function GuessBox({ value, placeholder }) {
  if (value) {
    return (
      <div className="answer_row_value answer_row" placeholder={"Guess #" + placeholder} disabled value={value}>{value}</div>
    );
  } else {
    return (
      <div className="answer_row" placeholder={"Guess #" + placeholder} disabled value={value} />
    );
  }

<<<<<<< HEAD
=======
  return (
    <>
    
    <div className='box'> 
      {value}
    </div>
    </>

  
  );
>>>>>>> 44f5f32e5a2df51c5df21fdaf26fd06a4f186ded
}