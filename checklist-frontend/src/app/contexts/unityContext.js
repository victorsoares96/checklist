import React, { createContext, useState, useCallback } from 'react';
import * as unity from '../services/unity';
import { useSnackbar } from 'notistack';

import delay from '../utils/delay';

const UnityContext = createContext({});

export const UnityProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const listUnities = useCallback( async () => {
    setLoading(true);
    try {
      const response = await unity.listUnities();
      //await delay(2000);
      setError(false);
      return response.data.unities;
    } catch (error) {
      if(!error.response) {
        enqueueSnackbar('Ocorreu um erro, favor atualize a página', {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(error.response.data.error, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      }
      setError(true);
      return [''];
    } finally {
      setLoading(false);
    }
  }, []);

  const listCargos = useCallback( async (unityID, sectorID) => {
    setLoading(true);
    try {
      const response = await unity.listCargos(unityID, sectorID);
      //await delay(2000);
      setError(false);
      return response.data;
    } catch (error) {
      if(!error.response) {
        enqueueSnackbar('Ocorreu um erro, favor atualize a página', {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(error.response.data.error, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      }
      setError(true);
      return [''];
    } finally {
      setLoading(false);
    }
  }, []);

  const getUnityByID = useCallback( async (id) => {
    setLoading(true);
    try {
      const response = await unity.getUnityByID(id);
      //await delay(2000);
      setError(false);
      return response.data;
    } catch (error) {
      if(!error.response) {
        enqueueSnackbar('Ocorreu um erro, favor atualize a página', {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(error.response.data.error, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      }
      setError(true);
      return [''];
    } finally {
      setLoading(false);
    }
  }, []);

  const getSectorByID = useCallback( async (unityID, sectorID) => {
    setLoading(true);
    try {
      const response = await unity.getSectorByID(unityID, sectorID);
      //await delay(2000);
      setError(false);
      return response.data;
    } catch (error) {
      if(!error.response) {
        enqueueSnackbar('Ocorreu um erro, favor atualize a página', {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(error.response.data.error, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      }
      console.log(error);
      setError(true);
      return [''];
    } finally {
      setLoading(false);
    }
  }, []);

  const getCargoByID = useCallback( async (unityID, sectorID, cargoID) => {
    setLoading(true);
    try {
      const response = await unity.getCargoByID(unityID, sectorID, cargoID);
      //await delay(2000);
      setError(false);
      return response.data;
    } catch (error) {
      if(!error.response) {
        enqueueSnackbar('Ocorreu um erro, favor atualize a página', {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(error.response.data.error, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      }
      console.log(error);
      setError(true);
      return [''];
    } finally {
      setLoading(false);
    }
  }, []);

  const getUnitySectorsByID = useCallback( async (id) => {
    setLoading(true);
    try {
      const response = await unity.getUnitySectorsByID(id)
      //await delay(2000);
      setError(false);
      return response.data;
    } catch (error) {
      if(!error.response) {
        enqueueSnackbar('Ocorreu um erro, favor atualize a página', {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(error.response.data.error, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      }
      setError(true);
      return ['']
    } finally {
      setLoading(false);
    }
  }, []);

  const createUnity = useCallback( async (newUnity) => {
    setLoading(true);
    try {
      const response = await unity.createUnity(newUnity); 
      //await delay(2000);
      setError(false);
      enqueueSnackbar(`${response.data.unity.apelido} criado com sucesso!`, {
        variant: 'success',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
      });
    } catch (error) {
      if(!error.response) {
        enqueueSnackbar('Ocorreu um erro, favor atualize a página', {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(error.response.data.error, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      }
      setError(true);
      return [''];
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUnityByID = useCallback( async (userID, updatedUnity) => {
    setLoading(true);
    try {
      const response = await unity.updateUnityByID(userID, updatedUnity);
      //await delay(2000);
      setError(false);
      enqueueSnackbar(`${response.data.apelido} atualizado com sucesso!`, {
        variant: 'success',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
      });
      return response.data;
    } catch (error) {
      if(!error.response) {
        enqueueSnackbar('Ocorreu um erro, favor atualize a página', {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(error.response.data.error, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      }
      setError(true);
      return [''];
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUnityByID = useCallback( async (unityID) => {
    setLoading(true);
    try {
      const response = await unity.deleteUnityByID(unityID);
      //await delay(2000);
      setError(false);
      enqueueSnackbar(`${response.data.apelido} deletado com sucesso!`, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } catch (error) {
      if(!error.response) {
        enqueueSnackbar('Ocorreu um erro, favor atualize a página', {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(error.response.data.error, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      }
      setError(true);
      return [''];
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <UnityContext.Provider value={{ 
    listUnities,
    listCargos, 
    getUnityByID,
    getSectorByID,
    getCargoByID,
    getUnitySectorsByID,
    createUnity, 
    updateUnityByID, 
    deleteUnityByID, 
    loading,
    error
    }}>
      {children}
    </UnityContext.Provider>
  );
}


export default UnityContext;