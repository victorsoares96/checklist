import { Box, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const SparkLineSkeleton = () => (
  <Paper elevation={0}>
    <Box component='div' display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center' padding='15px' width='100%'>
      <Box display='flex' flexDirection='column' flex={1}>
        <Skeleton animation='wave' width='80%' />
        <Box display='flex' flexDirection='row' alignItems='center'>
          <Skeleton animation='wave' width={80} height={60} />
          {/*<Skeleton animation='wave' width={60} height={40} style={{ marginLeft: '25px', borderRadius: '45px' }}/>*/}
        </Box>
      </Box>
      <Skeleton variant="circle" width={60} height={60} />
    </Box>
  </Paper>
);

export default SparkLineSkeleton;