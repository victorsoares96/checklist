import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

function ChecklistExpireDialog({ open, handleClose, ...rest }) {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        disableBackdropClick
        {...rest}
      >
        <DialogTitle id="alert-dialog-title">Seu tempo acabou</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            O tempo para responder o checklist acabou, 
            clique em sair para voltar à página inicial.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary' style={{ fontWeight: 600 }} variant='contained' autoFocus fullWidth disableElevation>
            Sair
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default ChecklistExpireDialog;