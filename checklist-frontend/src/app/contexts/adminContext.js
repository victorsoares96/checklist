import React, { createContext, useState, useCallback } from 'react';
import * as admin from '../services/admin';
import { useSnackbar } from 'notistack';

import delay from '../utils/delay';
import { UnityProvider } from './unityContext';
import { ChecklistProvider } from './checklistContext';

const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const getUsers = useCallback( async (cancelToken) => {
    setLoading(true);
    try {
      const response = await admin.getAllUsers(cancelToken);
      //await delay(2000);
      setError(false);
      return response.data.users;
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
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserByID = useCallback( async (id) => {
    setLoading(true);
    try {
      const response = await admin.getUserByID(id);
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
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback( async (newUser) => {
    setLoading(true);
    try {
      const response = await admin.createUser(newUser); 
      //await delay(2000);
      setError(false);
      enqueueSnackbar(`${response.data.user_.apelido} criado com sucesso!`, {
        variant: 'success',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
      });
    } catch (error) {
      console.log(error)
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
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUserByID = useCallback( async (id, updatedData) => {
    setLoading(true);
    try {
      const response = await admin.updateUserByID(id, updatedData);
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
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPasswordUserByID = useCallback( async (id, newPassword) => {
    setLoading(true);
    try {
      const response = await admin.resetPasswordUserByID(id, newPassword);
      //await delay(2000);
      setError(false);
      enqueueSnackbar(`Senha atualizada com sucesso!`, {
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
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUserByID = useCallback( async (myUserID, userID) => {
    setLoading(true);
    try {
      if(myUserID === userID) {
        enqueueSnackbar('Não é possível deletar o próprio usuário!', {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      } else {
        const response = await admin.deleteUserByID(userID);
        console.log(response)
        //await delay(2000);
        setError(false);
        enqueueSnackbar(`${response.data.apelido} deletado com sucesso!`, {
          variant: 'success',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
      }
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
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AdminContext.Provider value={{ 
    getUsers, 
    getUserByID, 
    createUser, 
    updateUserByID, 
    resetPasswordUserByID, 
    deleteUserByID, 
    loading,
    error
    }}>
      <UnityProvider>
        <ChecklistProvider>
          {children}
        </ChecklistProvider>
      </UnityProvider>
    </AdminContext.Provider>
  );
}


export default AdminContext;