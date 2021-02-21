import React, { useEffect, useState } from 'react';
import { 
  Box,
  CssBaseline, 
  Breadcrumbs, 
  Typography, 
} from '@material-ui/core';

import useChecklist from '../../../utils/useChecklist';
import useAuth from '../../../utils/useAuth';
import ChecklistsList from '../../../shared/components/ChecklistsList';
import LinearLoading from '../../../shared/components/LinearLoading';

const AvailableChecklists = () => {
  const { user } = useAuth();
  const { listChecklists, loading: loadingChecklist } = useChecklist();
  const [availableChecklists, setAvailableChecklists] = useState([]);
  
  useEffect(() => {
    async function loadAvailableChecklists() {
      let filteredChecklists = [];
      const checklists = await listChecklists();
      if(user.type === 'admin' || user.type === 'diretor') {
        const filter = checklists.filter(checklist => {
          return checklist.ativo === true;
        });
        setAvailableChecklists(filter);
      }
      else {
        checklists.map((checklist) => {
          checklist.ativo && (
            checklist.permissions.write.map(cargoID => {
              if(cargoID === user.funcao) {
                filteredChecklists.push(checklist);
              }
            })
          )
        });
        setAvailableChecklists(filteredChecklists);
      }
    }
    loadAvailableChecklists();
  }, [listChecklists, user.funcao, user.type]);
  
  if(loadingChecklist) return <LinearLoading />
  return (
    <Box>
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color='inherit' style={{fontWeight: 600}}>Checklist's Disponíveis</Typography>
      </Breadcrumbs>
      <ChecklistsList data={availableChecklists} storageType='online' />
    </Box>
  );
}

export default AvailableChecklists;