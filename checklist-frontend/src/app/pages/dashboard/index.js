import React from 'react';
import { 
  Breadcrumbs, 
  Link, 
  Typography, 
  Box, 
  Grid
} from '@material-ui/core';
import Consolidado from './components/consolidado';
import ChecklistsRealizados from './components/ChecklistsRealizados';
import ChecklistMedia from './components/ChecklistMedia';

const Dashboard = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}}>
          Dashboard
        </Link>
        <Typography color="textPrimary" style={{fontWeight: 600}}>Indicadores</Typography>
      </Breadcrumbs>
      <Consolidado />
      <Box component='div' display='flex' flexDirection='row' justifyContent='flex-start'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} zeroMinWidth>
            <ChecklistsRealizados />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} zeroMinWidth>
            <ChecklistMedia />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Dashboard;
