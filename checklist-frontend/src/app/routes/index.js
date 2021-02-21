import React, { useEffect, useState } from 'react';
import * as Router from "react-router-dom";

/* Route's & Pages */
import AuthRoutes from './auth.routes';
import Home from '../pages/home';
import Pending from '../shared/pages/Pending';
import InactiveUser from '../shared/pages/InactiveUser';

/* Hook's */
import useAuth from '../utils/useAuth';
import { Box, Button, CssBaseline, LinearProgress, Typography } from '@material-ui/core';

import { useSnackbar } from 'notistack';

const Routes = () => {
  const { user, signed, logout } = useAuth();
  
  const { enqueueSnackbar } = useSnackbar();

  function updateServiceWorker(registration) {
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  };

  useEffect(() => {
    async function load() {
      // get the ServiceWorkerRegistration instance
      const registration = await navigator.serviceWorker.getRegistration();
      // (it is also returned from navigator.serviceWorker.register() function)
      if(registration) { // if there is a SW active
        registration.addEventListener('updatefound', () => {
          enqueueSnackbar('Uma atualização foi encontrada. Atualizando...', { 
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'warning',
          });
          setTimeout(() => {
            updateServiceWorker(registration);
          }, 3000);
          console.log('Service Worker update detected!');
        });
      }
    }
    load();
  }, []);

  const [slowConnection, setSlowConnectionStatus] = useState(false);
  
  useEffect(() => {
    const slowConnTimeout = setTimeout(() => {
      setSlowConnectionStatus(true);
    }, 5000);
    return () => {
      clearTimeout(slowConnTimeout);
      setSlowConnectionStatus(false);
    }
  }, []);
  return (
    <Router.BrowserRouter>
      {
        !signed ? <AuthRoutes />
        : user.status === 'ativo' ? <Home/>
        : user.status === 'pendente' ? <Pending />
        : user.status === 'inativo' ? <InactiveUser />
        : (
          <Box height='100vh'>
            <CssBaseline />
            <LinearProgress color='primary' />
            {slowConnection && (
              <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100vh' textAlign='center'>
                <Typography variant='h6'>
                  Carregando...
                </Typography>
                <Typography variant='subtitle1'>
                  Caso demore clique em <b>Deslogar</b> <br/>e tente novamente
                </Typography>
                <Button 
                variant='contained' 
                color='primary' 
                disableElevation 
                onClick={logout} 
                style={{ width: '25%', margin: '10px 0', fontWeight: 600 }}>
                  Deslogar
                </Button>
              </Box>
            )}
          </Box>
        )
      }
    </Router.BrowserRouter>
  );
}

export default Routes;
