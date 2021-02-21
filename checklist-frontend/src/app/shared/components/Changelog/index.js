import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';

const Changelog = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Modificações {process.env.REACT_APP_VERSION}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" component='div'>
          <ul>
            <li>Melhoria significativa de performance na obtenção de dados da "Dashboard" e "Visualizar Respostas"</li>
            <li>Adicionado prazo para responder um checklist</li>
            <li>Correção de bugs e pequenas melhorias</li>
            <li>Adicionado página de "Deixe sua Sugestão"</li>
          </ul>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant='contained' disableElevation>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Changelog;