import React from 'react';
import { Box, LinearProgress, Typography } from '@material-ui/core';

const LinearLoading = () => (
  <Box display='flex' flexDirection='column' marginTop='10px'>
    <Typography variant='h6' gutterBottom>Carregando...</Typography>
    <LinearProgress variant='indeterminate' color='primary' />
  </Box>
);

export default LinearLoading;