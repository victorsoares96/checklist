import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const RatingStarAnswerType = ({ name, value, ...rest }) => {
  const [hover, setHover] = React.useState(-1);
  const labels = {
    1: 'Péssimo',
    2: 'Ruim',
    3: 'Regular',
    4: 'Bom',
    5: 'Ótimo',
  };
  return (
    <Box component='div' display='flex' flexDirection='column' alignItems='center' width='100%' justifyContent='center' marginTop='25px'>
      <Rating
      name={name || 'star_rating'}
      value={value}
      size='large'
      onChangeActive={(event, newHover) => {
        setHover(Number(newHover));
      }}
      {...rest}/>
      {Number(value) !== null && <Typography variant='h6'>{labels[hover !== -1 ? hover : Number(value)]}</Typography>}
    </Box>
  )
};

export default RatingStarAnswerType;