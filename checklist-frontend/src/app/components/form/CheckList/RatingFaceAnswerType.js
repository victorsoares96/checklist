import React from 'react';

/* Emote Faces */
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const RatingFaceAnswerType = ({ name, value, ...rest }) => {
  const [hover, setHover] = React.useState(-1);
  const labels = {
    1: 'Péssimo',
    2: 'Ruim',
    3: 'Regular',
    4: 'Bom',
    5: 'Ótimo',
  };
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon fontSize='large' />,
      label: 'Péssimo',
    },
    2: {
      icon: <SentimentDissatisfiedIcon fontSize='large' />,
      label: 'Ruim',
    },
    3: {
      icon: <SentimentSatisfiedIcon fontSize='large' />,
      label: 'Regular',
    },
    4: {
      icon: <SentimentSatisfiedAltIcon fontSize='large' />,
      label: 'Bom',
    },
    5: {
      icon: <SentimentVerySatisfiedIcon fontSize='large' />,
      label: 'Ótimo',
    },
  };
  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other} style={{ width: '45px', height: '45px'}}>{customIcons[value].icon}</span>;
  }
  return (
    <Box component='div' display='flex' flexDirection='column' alignItems='center' width='100%' justifyContent='center' marginTop='25px'>
      <Rating
        name={name || 'face_rating'}
        size='large'
        value={value}
        getLabelText={(value_) => customIcons[value_].label}
        IconContainerComponent={IconContainer}
        onChangeActive={(event, newHover) => {
          setHover(Number(newHover));
        }}
        {...rest}
      />
      {Number(value) !== null && <Typography variant='h6'>{labels[hover !== -1 ? hover : Number(value)]}</Typography>}
    </Box>
  )
}

export default RatingFaceAnswerType;