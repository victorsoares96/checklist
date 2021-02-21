import React from 'react';
import { Box, Typography, LinearProgress } from '@material-ui/core';

const LoadingUsers = () => (
  <Box margin='10px'>
    <Typography variant='subtitle1' style={{ fontSize: 14, fontWeight: 600 }}>
        Carregando...
    </Typography>
    <LinearProgress variant='indeterminate' color='primary'/>
  </Box>
);

export default LoadingUsers;