import React from 'react';
import { Box, Button, CssBaseline, Typography } from '@material-ui/core';

/* Animation's */
import Lottie from 'react-lottie';
import offline from '../../../../assets/animations/offline.json';
import { useHistory } from 'react-router-dom';

const isStopped = false;
const isPaused = false;
const defaultOptions = {
  loop: false,
  autoplay: true, 
  animationData: offline,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const OfflinePage = () => {
  const history = useHistory();
  return (
    <>
      <CssBaseline />
      <Box display='flex' justifyContent='center' alignItems='center' textAlign='center' flexDirection='column' height='80vh'>
        <Lottie options={defaultOptions} height='250px' width='250px' isStopped={isStopped} isPaused={isPaused} />
        <Typography variant='h6' color='textPrimary' style={{ fontWeight: 600, marginTop: '50px' }}>
          Sem conexão!
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' style={{ fontWeight: 600 }}>
          Parece que você está sem conexão com a internet. Verifique sua conexão e tente novamente!
        </Typography>
        <Button variant='contained' disableElevation onClick={() => history.replace('/')} style={{ margin: '10px 0', fontWeight: 600 }}>
          Recarregar
        </Button>
      </Box>
    </>
  );
}

export default OfflinePage;