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
            <li>Adicionado período especifico para responder determinado checklist</li>
            <li>Correção de bugs</li>
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