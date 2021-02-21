import { Box, Button, CssBaseline, Typography } from '@material-ui/core';
import React from 'react';

/* Animation's */
import Lottie from 'react-lottie';
import { useHistory } from 'react-router-dom';
import sessionExpire from '../../../../assets/animations/session-expire.json';

const SessionExpire = () => {
  const history = useHistory();
  const isStopped = false;
  const isPaused = false;
  const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: sessionExpire,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const handleExpires = () => {
    localStorage.removeItem('@authApp: user');
    localStorage.removeItem('@authApp: token');
    history.replace('/');
  }
  return (
    <>
      <CssBaseline />
      <Box display='flex' justifyContent='center' alignItems='center' textAlign='center' flexDirection='column' height='100vh' margin='0 10px'>
        <Lottie options={defaultOptions} height='250px' width='250px' isStopped={isStopped} isPaused={isPaused} speed={0.5} />
        <Typography variant='h6' color='textPrimary' style={{ fontWeight: 600 }}>
          Acabou o tempo!
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' style={{ fontWeight: 600 }}>
          Sua sessão expirou, clique abaixo para logar novamente.
        </Typography>
        <Button variant='contained' disableElevation href='/' onClick={handleExpires} style={{ margin: '10px 0', fontWeight: 600 }}>
          Login
        </Button>
      </Box>
    </>
  )
}

export default SessionExpire;