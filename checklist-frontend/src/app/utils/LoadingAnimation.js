import React from 'react';
import Lottie from 'react-lottie';
import loading from '../../assets/animations/loading.json';
import { Box } from '@material-ui/core';

const isStopped = false;
const isPaused = false;
const defaultOptions = {
  loop: true,
  autoplay: true, 
  animationData: loading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const LoadingAnimation = () => {
  return (
    <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh'}}>
    <Lottie 
    options={defaultOptions}
    height={350}
    width={350}
    isStopped={isStopped}
    isPaused={isPaused}/>
    </Box>
  );
};

export default LoadingAnimation;