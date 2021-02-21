import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Breadcrumbs, 
  Typography, 
} from '@material-ui/core';

import ChecklistsList from '../../../shared/components/ChecklistsList';
import LinearLoading from '../../../shared/components/LinearLoading';

import _ from 'lodash';

const PendingChecklists = () => {
  const [loading, setLoading] = useState(true);
  const [pendingChecklists, setPendingChecklists] = useState([]);
  
  function loadPendingChecklist() {
    const user = JSON.parse(localStorage.getItem('@authApp: user'));
    const { _id: userID } = user;
    const pendingChecklists = JSON.parse(localStorage.getItem(`@storageChecklist: ${userID}`)) || [];
    setPendingChecklists(pendingChecklists);
  }
  
  useEffect(() => {
    loadPendingChecklist();
    setLoading(false);
  }, []);

  if(loading) return <LinearLoading />
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color='inherit' style={{fontWeight: 600}}>Checklist's em Progresso</Typography>
      </Breadcrumbs>
      <Typography component='p' color='textPrimary' style={{ textAlign: 'left', fontSize: 18, marginTop: '1.2rem' }}>
        Aqui ficam armazenados os checklist's que você começou e não terminou, clique em algum deles abaixo para continuar a respondê-lo.
      </Typography>
      <Typography component='p' color='error' style={{ marginTop: '20px' }}>
        <b>Atenção</b>! Seus arquivos em anexo não foram salvos automaticamente caso tenha inserido algum.
      </Typography>
      <Typography component='p' color='textPrimary' style={{ marginTop: '20px' }}>
        <b>Os checklists em progresso ficam armazenados no seu dispositivo e não na sua conta</b>!
      </Typography>
      {
        pendingChecklists.length < 1 ? (
          <Typography color='textSecondary' style={{  fontWeight: 600, margin: '1.5rem 0' }}>
            Nenhum checklist em andamento.
          </Typography>
        ) : <ChecklistsList data={pendingChecklists} storageType='local' />
      }
    </Box>
  );
}

export default PendingChecklists;
