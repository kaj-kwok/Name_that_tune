import React from 'react';
import "./GuessBox.css"


export default function GuessBox({ value, placeholder }) {
  if (value) {
    return (
      <input className="answer_row_value answer_row" placeholder={"Guess #" + placeholder} disabled value={value} />
    );
  } else {
    return (
      <input className="answer_row" placeholder={"Guess #" + placeholder} disabled value={value} />
    );
  }

}