import React, { createContext, useState, useCallback } from 'react';
import * as checklist from '../services/checklist';
import * as feedback from '../services/feedback';
import { useSnackbar } from 'notistack';

import delay from '../utils/delay';

const ChecklistContext = createContext({});

export const ChecklistProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const listChecklists = useCallback( async () => {
    setLoading(true);
    try {
      const response = await checklist.listChecklists();
      //await delay(2000);
      setError(false);
      return response.data.checklist;
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
  }, [enqueueSnackbar]);

  const getChecklistByID = useCallback( async (id) => {
    setLoading(true);
    try {
      const response = await checklist.getChecklistByID(id);
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
  }, [enqueueSnackbar]);

  const createChecklist = useCallback( async (newChecklist) => {
    setLoading(true);
    try {
      const response = await checklist.createChecklist(newChecklist); 
      //await delay(2000);
      setError(false);
      enqueueSnackbar(`${response.data.checklist.nome} criado com sucesso!`, {
        variant: 'success',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
      });
    } catch (error) {
      console.log(error);
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
  }, [enqueueSnackbar]);

  const updateChecklistByID = useCallback( async (checklistID, updatedChecklist) => {
    setLoading(true);
    try {
      const response = await checklist.updateChecklistByID(checklistID, updatedChecklist);
      //await delay(2000);
      setError(false);
      enqueueSnackbar(`${response.data.nome} atualizado com sucesso!`, {
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
  }, [enqueueSnackbar]);

  const deleteChecklistByID = useCallback( async (checklistID) => {
    setLoading(true);
    try {
      const response = await checklist.deleteChecklistByID(checklistID);
      await delay(2000);
      setError(false);
      enqueueSnackbar(`${response.data.nome} deletado com sucesso!`, {
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
  }, [enqueueSnackbar]);

  /* ------------------------------------------------------------------------ */

  const countAnsweredChecklists = useCallback( async (unity, checklistID, beforeDate, afterDate) => {
    setLoading(true);
    try {
      const response = await checklist.countAnswerChecklists(unity, checklistID, beforeDate, afterDate)
      //await delay(2000);
      setError(false);
      return response.data
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
  }, [enqueueSnackbar]);

  const listAnsweredChecklists = useCallback(async (page, beforeDate, afterDate, unityID, checklistID, answeredBy, sortType) => {
    setLoading(true);
    try {
      const response = await checklist.listAnsweredChecklists(page, beforeDate, afterDate, unityID, checklistID, answeredBy, sortType);
      setError(false);
      return response.data
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
  }, [enqueueSnackbar]);

  const getAnsweredChecklistByID = useCallback( async (answeredChecklistID) => {
    setLoading(true);
    try {
      const response = await checklist.getAnsweredChecklistByID(answeredChecklistID);
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
  }, [enqueueSnackbar]);

  const answerChecklist = useCallback( async (answeredChecklist) => {
    setLoading(true);
    try {
      const response = await checklist.answerChecklist(answeredChecklist); 
      //await delay(2000);
      return response.data;
      /*setError(false);
      enqueueSnackbar(`Respondido com sucesso!`, {
        variant: 'success',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
      });*/
    } catch (error) {
      console.log(error);
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
  }, [enqueueSnackbar]);

  const deleteAnsweredChecklistByID = useCallback( async (answeredChecklistID) => {
    setLoading(true);
    try {
      const response = await checklist.deleteAnsweredChecklistByID(answeredChecklistID);
      //await delay(2000);
      console.log(response);
      setError(false);
      enqueueSnackbar(`Resposta deletada com sucesso!`, {
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
  }, [enqueueSnackbar]);

  const sendAttachment = useCallback( async (file) => {
    setLoading(true);
    try {
      const response = await checklist.sendAttachment(file);
      //await delay(2000);
      setError(false);
      return response.data;
    } catch (error) {
      console.log(error);
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
  }, [enqueueSnackbar]);

  const registerFeedback = useCallback( async (name, message) => {
    setLoading(true);
    try {
      await feedback.registerFeedback({ name, message });
      setError(false);
      enqueueSnackbar(`Comentário registrado com sucesso!`, {
        variant: 'success',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
      });
    } catch (error) {
      console.log(error);
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
  }, [enqueueSnackbar]);

  return (
    <ChecklistContext.Provider value={{ 
    listChecklists,
    listAnsweredChecklists,
    getChecklistByID,
    getAnsweredChecklistByID,
    createChecklist,
    answerChecklist,
    countAnsweredChecklists,
    updateChecklistByID, 
    deleteChecklistByID,
    deleteAnsweredChecklistByID,
    sendAttachment,
    registerFeedback,
    loading,
    error
    }}>
      {children}
    </ChecklistContext.Provider>
  );
}


export default ChecklistContext;