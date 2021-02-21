import { Box, Button, CssBaseline, Typography } from '@material-ui/core';
import React from 'react';

/* Animation's */
import Lottie from 'react-lottie';
import { useHistory } from 'react-router-dom';
import error from '../../../../assets/animations/error.json';

const ErrorPage = () => {
  const history = useHistory();
  const isStopped = false;
  const isPaused = false;
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: error,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <>
      <CssBaseline />
      <Box display='flex' justifyContent='center' alignItems='center' textAlign='center' flexDirection='column' height='80vh'>
        <Lottie options={defaultOptions} height='250px' width='250px' isStopped={isStopped} isPaused={isPaused} />
        <Typography variant='h6' color='textPrimary' style={{ fontWeight: 600 }}>
          Opa!
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' style={{ fontWeight: 600 }}>
          Algo estranho aconteceu...
        </Typography>
        <Button variant='contained' disableElevation onClick={() => history.replace('/')} style={{ margin: '10px 0', fontWeight: 600 }}>
          Recarregar
        </Button>
      </Box>
    </>
  )
}

export default ErrorPage;