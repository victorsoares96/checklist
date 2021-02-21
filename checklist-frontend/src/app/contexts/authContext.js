import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as auth from '../services/auth';
import * as unity from '../services/unity';
import useLocalStorage from '../utils/useLocalStorage';

import delay from '../utils/delay';
import { useSnackbar } from 'notistack';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [storageRememberMe, setStorageRememberMe, removeStorageRememberMe] = useLocalStorage('@authApp: rememberMe');
  const [storageUser, setStorageUser, removeStorageUser] = useLocalStorage('@authApp: user');
  const [storageToken, setStorageToken, removeStorageToken] = useLocalStorage('@authApp: token');

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (storageUser && storageToken) {
      setUser(storageUser);
      //api.defaults.headers.Authorization = `Bearer ${storageToken}`;
    }
    setLoading(false);        
  }, []);
  
  const login = useCallback( async (data) => {
    const { password, user, remember } = data;
    setLoading(true);
    try {
      const response = await auth.LoginService(user, password);
      setStorageToken(response.data.token);
      const unityResponse = await unity.getUnityByID(response.data.user_.group);
      const sectorResponse = await unity.getSectorByID(response.data.user_.group, response.data.user_.setor);
      const cargoResponse = await unity.getCargoByID(response.data.user_.group, response.data.user_.setor, response.data.user_.funcao);
      enqueueSnackbar(`Bem vindo ${response.data.user_.apelido}!`, {
        variant: 'success',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
      });
      //setUser(response.data.user_);
      setUser({
        ...response.data.user_,
        unityName: unityResponse.data.apelido,
        sectorName: sectorResponse.data.nome,
        cargoName: cargoResponse.data.nome || 'Sem Cargo',
        //status: cargoResponse.data.nome ? response.data.user_.status : 'pendente'
      });
      //console.log(user);
      //api.defaults.headers.Authorization = `Bearer ${response.token}`;
      setStorageUser({
        ...response.data.user_,
        unityName: unityResponse.data.apelido,
        sectorName: sectorResponse.data.nome,
        cargoName: cargoResponse.data.nome
      });
      if(remember === true) {
        setStorageRememberMe({
          status: remember,
          userName: response.data.user_.user
        });
      } else {
        removeStorageRememberMe();
      }
      } catch (error) {
        if(!error.response) {
          enqueueSnackbar('Ocorreu um erro, favor atualize a página', {
            variant: 'error',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },
          });
        } else {
          enqueueSnackbar(error.response.data.error, {
            variant: 'error',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },
          });
        }
      } finally {
        setLoading(false);
      }
  }, []);

  const logout = useCallback(() => { 
    setLoading(true);
    try {
      removeStorageUser();
      removeStorageToken()
      setUser({});
      enqueueSnackbar('Deslogado com sucesso!', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
        },
      });
    } catch (error) {
      enqueueSnackbar('Ocorreu um erro desconhecido', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
        },
      });
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider 
      value={{ 
        signed: storageToken ? true : false, 
        user, 
        login, 
        logout, 
        loading, 
        storageRememberMe 
      }}>
      {children}
    </AuthContext.Provider>
  );
}


export default AuthContext;