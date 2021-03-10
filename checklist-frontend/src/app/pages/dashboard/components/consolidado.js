import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Divider, 
  Grid, 
  IconButton, 
  MenuItem, 
  Select, 
  Typography, 
} from '@material-ui/core';

/* Chart's */
import FilterDialog from '../../../shared/components/FilterDialog';
import SparkLineNumberChart from '../../../components/chart/SparkLineNumberChart';

/* Util's */
import SparkLineSkeleton from '../../../utils/components/SparkLineSkeleton';

/* Hook's */
import { useFetch } from '../../../utils/useFetch';

/* Icon's */
import { RiFilterOffFill, RiFilterFill } from 'react-icons/ri';
import { Skeleton } from '@material-ui/lab';
import { startOfMonth } from 'date-fns';

const Consolidado = () => {

  const [unityFilter, setUnityFilter] = useState(' ');

  const [filterDialogOpenStatus, setFilterDialogOpenStatus] = useState(false);
  
  const initialBeforeDate = new Date(startOfMonth(new Date()));
  const initialAfterDate = new Date();
  const [beforeDate, setBeforeDate] = useState(initialBeforeDate);
  const [afterDate, setAfterDate] = useState(initialAfterDate);

  const resetFilters = () => {
    setBeforeDate(initialBeforeDate);
    setAfterDate(initialAfterDate);
    setUnityFilter(' ');
  }

  const unities = useFetch('/unity/list');
  const users = useFetch('/user/count?status=ativo');
  const checklists = useFetch('/checklist/count?ativo=true');
  const answeredsChecklists = useFetch(`/checklist/answer/count?beforeDate=${beforeDate}&afterDate=${afterDate}&unity=${unityFilter === ' ' ? '' : unityFilter}`);
  const answeredsChecklistsAverage = useFetch(`/checklist/answer/average?beforeDate=${beforeDate}&afterDate=${afterDate}&unity=${unityFilter === ' ' ? '' : unityFilter}`);

  const isLoading = !unities.data || !users.data || !checklists.data || !answeredsChecklists.data;

  function filterDate(beforeDate, afterDate) {
    setBeforeDate(beforeDate);
    setAfterDate(afterDate);
  }

  const data = [
    { title: 'Checklists Realizados', icon: 'fas fa-clipboard-check', data: answeredsChecklists.data?.count, oldData: answeredsChecklists.data?.count },
    { title: 'Checklists Ativos', icon: 'fas fa-clipboard-list', data: checklists.data?.count, oldData: checklists.data?.count },
    { title: 'Média Geral', icon: 'fas fa-chart-bar', data: answeredsChecklistsAverage.data?.average, oldData: null },
    { title: 'Usuários Cadastrados', icon: 'fas fa-user', data: users.data?.count, oldData: users.data?.count },
  ];

  const ConsolidadoSkeleton = () => (
    <Box marginTop='25px'>
      <Skeleton animation='wave' style={{ margin: '10px 0' }} />
      <Divider style={{ marginBottom: '10px' }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={3} zeroMinWidth>
          <SparkLineSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} zeroMinWidth>
          <SparkLineSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} zeroMinWidth>
          <SparkLineSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} zeroMinWidth>
          <SparkLineSkeleton />
        </Grid>
      </Grid>
    </Box>
  );
  
  if(isLoading) return <ConsolidadoSkeleton />
  return (
    <Box component='div' style={{margin: '20px 0px'}}>
      <Box display='flex' flexDirection='row' margin='5px' alignItems='center'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box display='flex' flexDirection='row' marginBottom='10px'>
              <Typography color='textSecondary' style={{ fontWeight: 600, fontSize: 16, marginRight: '10px' }}>
                Unidade:
              </Typography>
              <Select 
              margin='dense' 
              value={unityFilter}
              color='primary' 
              variant='standard' 
              style={{ fontWeight: 600 }} 
              onChange={e => setUnityFilter(e.target.value)}
              disabled={isLoading}>
                <MenuItem key='consolidated' value=' '>Empresa</MenuItem>
                {unities.data.unities.map(unity => <MenuItem key={unity._id} value={unity._id}>{unity.apelido}</MenuItem>)}
              </Select>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography color='textSecondary' style={{ fontWeight: 600, fontSize: 16, marginLeft: '10px' }}>
              Período: {new Date(beforeDate).toLocaleDateString()} até {new Date(afterDate).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
        <Button
        variant='contained'
        disableElevation
        style={{ marginLeft: 'auto', borderRadius: '25px' }} 
        disabled={isLoading} 
        onClick={resetFilters}>
          <RiFilterOffFill />
        </Button>
        <IconButton
        disabled={isLoading} 
        onClick={() => setFilterDialogOpenStatus(true)}>
          <RiFilterFill />
        </IconButton>
      </Box>
      <Divider style={{ marginBottom: '10px' }} />
      <FilterDialog openStatus={filterDialogOpenStatus} handleOpenStatus={() => setFilterDialogOpenStatus(false)} filterDate={filterDate} />
      <Grid container spacing={2}>
        {
          data.map((item) =>
            <Grid key={item.title} item xs={12} sm={6} md={6} lg={3} zeroMinWidth>
              <SparkLineNumberChart 
              key={item.title} 
              loading={item.data} 
              title={item.title} 
              icon={item.icon} 
              data={item.data} 
              oldData={item.oldData} />
            </Grid>
          )
        }  
      </Grid>
    </Box>
  )
}

export default Consolidado;