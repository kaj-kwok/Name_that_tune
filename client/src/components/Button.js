import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ColorButtons({ submitAnswer }) {


  return (
    <Button variant="outlined"  color="secondary" onClick={() => submitAnswer()}>
      Submit
    </Button>
  );
}
