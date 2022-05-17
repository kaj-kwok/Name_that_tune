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

}