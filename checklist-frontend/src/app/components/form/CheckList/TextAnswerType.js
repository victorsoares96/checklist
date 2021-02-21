import React from 'react';
import { TextField } from '@material-ui/core';

const TextAnswerType = ({ ...rest }) => (
  <TextField
    fullWidth
    multiline
    rows={10}
    //required
    //onChange={handleChange}
    //value={values.perguntas[index]?.resposta}
    //placeholder="Insira a resposta:"
    variant="outlined"
    {...rest}/>
);

export default TextAnswerType;