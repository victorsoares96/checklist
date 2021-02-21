import React from 'react';
import { Box, Checkbox, Typography } from '@material-ui/core';

const CheckBoxItem = ({ optionData, ...rest }) => {
  const { cargo } = optionData;
  return (
    <Box display='flex' flexDirection='row' alignItems='center'>
      <Checkbox {...rest} />
      <Typography component='span' variant='subtitle1' style={{ fontSize: 16, fontWeight: 600 }}>
        {cargo}
      </Typography>
    </Box>
  )
}

export default CheckBoxItem;