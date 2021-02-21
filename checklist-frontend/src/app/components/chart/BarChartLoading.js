import React from 'react';
import { Box, Card, CardContent, Divider } from "@material-ui/core";
import { Skeleton } from '@material-ui/lab';

const bars = new Array(7).fill(
  <Skeleton 
  variant='rect' 
  width='7%' 
  height={400} 
  style={{ 
    borderTopLeftRadius: 28, 
    borderTopRightRadius: 28 
  }} />
);

const BarChartLoading = () => (
  <Card elevation={0}>
    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' padding='20px'>
      <Box width='100%'>
        <Skeleton variant="text" width='30%' />
        <Skeleton variant="text" width='40%' />
      </Box>
      <Skeleton variant="text" width={50} height={60} />
    </Box>
    <Divider />
    <CardContent>
      <Box display='flex' flexDirection='row' justifyContent='space-evenly' alignItems='flex-end'>
        {bars.map(bar => bar)}
      </Box>
      <Divider />
    </CardContent>
  </Card>
)

export default BarChartLoading;