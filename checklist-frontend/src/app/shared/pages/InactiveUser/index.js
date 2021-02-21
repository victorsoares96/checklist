import React from 'react';
import { 
  Box, 
  CssBaseline, 
  Typography, 
  Button 
} from '@material-ui/core';

/* Animation's */
import Lottie from 'react-lottie';
import inactive from '../../../../assets/animations/inactive.json';
import useAuth from '../../../utils/useAuth';

const Inactive = () => {
  const { logout } = useAuth();
  const isStopped = false;
  const isPaused = false;
  const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: inactive,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <>
      <CssBaseline />
      <Box display='flex' justifyContent='center' alignItems='center' textAlign='center' flexDirection='column' height='100vh' margin='0 10px'>
        <Lottie options={defaultOptions} height='250px' width='250px' isStopped={isStopped} isPaused={isPaused} speed={1} />
        <Typography variant='h6' color='textPrimary' style={{ fontWeight: 600 }}>
          Acesso negado!
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' style={{ fontWeight: 600 }}>
          Seu cadastro foi desativado ou deletado, assim impedindo você de entrar no sistema.
        </Typography>
        <Button variant='contained' disableElevation onClick={logout} style={{ margin: '10px 0', fontWeight: 600 }}>
          Sair
        </Button>
      </Box>
    </>
  );
}

export default Inactive;