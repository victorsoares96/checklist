import React from 'react';
import { Container, Box, CssBaseline, Paper, Typography, Button } from '@material-ui/core';

/* Animation's */
import Lottie from 'react-lottie';
import error from '../../../../assets/animations/error.json';
import useAuth from '../../../utils/useAuth';

const Pending = () => {
  const { logout } = useAuth();
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
      <Box display='flex' justifyContent='center' alignItems='center' textAlign='center' flexDirection='column' height='100vh' margin='0 10px'>
        <Lottie options={defaultOptions} height='250px' width='250px' isStopped={isStopped} isPaused={isPaused} speed={0.5} />
        <Typography variant='h6' color='textPrimary' style={{ fontWeight: 600 }}>
          Acesso negado!
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' style={{ fontWeight: 600 }}>
          Seu cadastro possuí inconsistências e não pode ser utilizado, favor contatar o administrador!
        </Typography>
        <Button variant='contained' disableElevation href='/' onClick={logout} style={{ margin: '10px 0', fontWeight: 600 }}>
          Sair
        </Button>
      </Box>
    </>
  );
}

export default Pending;