import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputLabel, Typography } from '@material-ui/core';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { startOfMonth, startOfWeek, startOfYear } from 'date-fns';

const FilterDialog = ({ filterDate, openStatus, handleOpenStatus }) => {
  const defaultBeforeDate = startOfMonth(new Date());
  const defaultAfterDate = new Date();
  const [beforeDate, setBeforeDate] = useState(defaultBeforeDate);
  const [afterDate, setAfterDate] = useState(defaultAfterDate);

  const resetFilters = () => {
    setBeforeDate(defaultBeforeDate);
    setAfterDate(defaultAfterDate);
    filterDate(beforeDate, afterDate);
    handleOpenStatus();
  }

  return (
    <Dialog
      fullWidth
      open={openStatus}
      onClose={handleOpenStatus}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Filtro por Data:</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" component='div'>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Box marginBottom='20px'>
              <Typography color='textSecondary' variant='subtitle1'>
                Filtro rápido:
              </Typography>
              <Chip label='Hoje' onClick={() => {
                setBeforeDate(new Date().setHours(0, 0, 0));
                setAfterDate(new Date());
              }} />
              <Chip style={{ marginLeft: '10px' }} label='Semana' onClick={() => {
                setBeforeDate(startOfWeek(new Date(), { weekStartsOn: 1 }));
                setAfterDate(new Date());
              }} />
              <Chip style={{ marginLeft: '10px' }} label='Mês' onClick={() => {
                setBeforeDate(startOfMonth(new Date()));
                setAfterDate(new Date());
              }} />
              <Chip style={{ marginLeft: '10px' }} label='Ano' onClick={() => {
                setBeforeDate(startOfYear(new Date()));
                setAfterDate(new Date());
              }} />
            </Box>
            <InputLabel style={{ fontWeight: 600, fontSize: 14, margin: '10px 0' }}>
              De:
            </InputLabel>
            <KeyboardDateTimePicker
              fullWidth
              autoOk
              variant="inline"
              format="dd/MM/yyyy HH:mm"
              ampm={false}
              value={beforeDate}
              onChange={(date) => setBeforeDate(date)}
              inputVariant='outlined'
              InputAdornmentProps={{ position: "end" }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                'variant': 'outlined'
              }}
            />
            <InputLabel style={{ fontWeight: 600, fontSize: 14, margin: '10px 0' }}>
              Até:
            </InputLabel>
            <KeyboardDateTimePicker
              fullWidth
              autoOk
              variant="inline"
              format="dd/MM/yyyy HH:mm"
              ampm={false}
              value={afterDate}
              onChange={(date) => setAfterDate(date)}
              inputVariant='outlined'
              InputAdornmentProps={{ position: "end" }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                'variant': 'outlined'
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContentText>
        <Typography variant='subtitle1' color='textSecondary'>
          Clique em <b>Filtrar</b> após resetar o filtro
        </Typography>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Button onClick={handleOpenStatus} color='secondary' variant='contained' disableElevation fullWidth>
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button onClick={resetFilters} variant='contained' disableElevation fullWidth>
              Resetar
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button onClick={() => {
              filterDate(beforeDate, afterDate);
              handleOpenStatus();
            }} color='primary' variant='contained' disableElevation fullWidth>
              Filtrar
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default FilterDialog;