import React from 'react';
import { Box, Typography, TextField } from '@material-ui/core';

const OnlyChoiceAnswerType = ({ name, value, touched, errors, ...rest }) => {
  return (
    <Box marginTop='10px'>
      <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h6' color='textPrimary'>
          Opções
        </Typography>
        <Typography variant='subtitle1' color='textPrimary' style={{ fontSize: 14, fontWeight: 600 }}>
          Separe as opções por vírgula, <em>Ex: Bom, Regular, Ruim</em>
        </Typography>
      </Box>
      <TextField
      fullWidth
      name={name}
      variant='outlined'
      margin='normal'
      required
      label={value ? 'Opções:' : 'Opções:'}
      value={value}
      helperText={touched ? errors : ""}
      error={touched && Boolean(errors)}/>
    </Box>
  );
};

export default OnlyChoiceAnswerType;