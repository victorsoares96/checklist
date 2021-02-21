import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';

const HandleAppUpdate = () => {
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
            autoHideDuration: 5000,
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            variant: 'warning',
            onExited: updateServiceWorker(registration)
          });
          console.log('Service Worker update detected!');
        });
      }
    }
    load();
  }, []);
  return <div/>;
}

export default HandleAppUpdate