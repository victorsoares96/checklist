import React from 'react';
import { TextField, Box, Typography, Select, MenuItem } from '@material-ui/core';
import TextAnswerType from './TextAnswerType';
import RatingStarAnswerType from './RatingStarAnswerType';
import RatingFaceAnswerType from './RatingFaceAnswerType';

const AnswerType = ({ type, errorMessage, ...rest }) => {
  switch (type) {
    case 'great_good_regular_bad_terrible': 
      return (
        <Box display='flex' flexDirection='column'>
          <Select
            {...rest}
            variant='outlined'
            defaultValue={0}
            label="Selecione a Resposta"
          >
            <MenuItem value={0} disabled>Selecione uma resposta</MenuItem>
            <MenuItem value={5}>Ótimo</MenuItem>
            <MenuItem value={4}>Bom</MenuItem>
            <MenuItem value={3}>Regular</MenuItem>
            <MenuItem value={2}>Ruim</MenuItem>
            <MenuItem value={1}>Péssimo</MenuItem>
          </Select>
          <Typography variant='caption' color='error'>{errorMessage}</Typography>
        </Box>
      )
    case 'yes_not':
      return (
        <Box display='flex' flexDirection='column'>
          <Select
            {...rest}
            variant='outlined'
            defaultValue={0}
            label="Selecione a Resposta"
          >
            <MenuItem value={0} disabled>Selecione uma resposta</MenuItem>
            <MenuItem value={5}>Sim</MenuItem>
            <MenuItem value={1}>Não</MenuItem>
          </Select>
          <Typography variant='caption' color='error'>{errorMessage}</Typography>
        </Box>
      )
    case 'not_yes':
      return (
        <Box display='flex' flexDirection='column'>
          <Select
            {...rest}
            variant='outlined'
            defaultValue={0}
            label="Selecione a Resposta"
          >
            <MenuItem value={0} disabled>Selecione uma resposta</MenuItem>
            <MenuItem value={1}>Sim</MenuItem>
            <MenuItem value={5}>Não</MenuItem>
          </Select>
          <Typography variant='caption' color='error'>{errorMessage}</Typography>
        </Box>
      )
    case 'text_multiline':
      return (
        <TextAnswerType margin='normal' label='Insira a resposta:' {...rest} />
      )
    case 'number':
      return (
        <TextField {...rest} fullWidth type='number' margin='normal' placeholder="Insira a resposta:" variant="outlined"/>
      )
    case 'star':
      return (
        <Box display='flex' flexDirection='column'>
          <RatingStarAnswerType {...rest}/>
          <Typography variant='caption' color='error'>{errorMessage}</Typography>
        </Box>
      )
    case 'emote':
      return (
        <Box display='flex' flexDirection='column'>
          <RatingFaceAnswerType {...rest}/>
          <Typography variant='caption' color='error'>{errorMessage}</Typography>
        </Box>
      )
    default:
      return (
        <Typography variant='subtitle1' color='textPrimary'>
          Erro ao renderizar
        </Typography>
      )
  }
}

export default AnswerType;