/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { 
  Typography, 
  Box, 
  CssBaseline, 
  Breadcrumbs, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid, 
  Button, 
  List, 
  Icon, 
  TextField, 
  InputAdornment, 
  IconButton 
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import useChecklist from '../../../../utils/useChecklist';
import useUnity from '../../../../utils/useUnity';
import useAuth from '../../../../utils/useAuth';

import { useStyles } from './styles';
import { Pagination } from '@material-ui/lab';
import { ChecklistItem } from './components';
import LinearLoading from '../../../../shared/components/LinearLoading';

const ListAnswers = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const { listUnities, loading: loadingUnity } = useUnity();
  const { listAnsweredChecklists, loading: loadingChecklists } = useChecklist();

  const [answeredsChecklists, setAnsweredsChecklists] = useState({ results: [], count: 0 });
  const [unities, setUnities] = useState([]);

  /* Paginate Definition's */
  const PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0 / PER_PAGE);

  const [filterUnityID, setFilterUnityID] = useState('all');
  const [orderFilter, setOrderFilter] = useState('newest');
  const [sortType, setSortType] = useState('-answeredBy.answeredAt');

  const queryTitle = useRef(null);
  const queryName = useRef(null);

  const initialBeforeDate = new Date(`01/${new Date().getMonth()+1}/${new Date().getFullYear()}`).toISOString();
  const initialAfterDate = new Date().toISOString();
  const [beforeDate, setBeforeDate] = useState(initialBeforeDate);
  const [afterDate, setAfterDate] = useState(initialAfterDate);

  async function loadAnsweredsChecklists() {
    try {
      if(user.type === 'admin' || user.type === 'diretor') {
        const { results, count } = await listAnsweredChecklists(
          currentPage, 
          beforeDate, 
          afterDate, 
          filterUnityID === 'all' ? '' : filterUnityID, 
          queryTitle.current.value,
          queryName.current.value,
          sortType
        );
        setPageCount((count / PER_PAGE).toFixed(0));
        setAnsweredsChecklists({ results, count });
      } else if(user.type === 'gerencial') {
        const { results, count } = await listAnsweredChecklists(
          currentPage, 
          beforeDate, 
          afterDate, 
          user.group, 
          queryTitle.current.value,
          queryName.current.value,
          sortType
        );
        setPageCount((count / PER_PAGE).toFixed(0));
        setAnsweredsChecklists({ results, count });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUnityChange = (event) => {
    setFilterUnityID(event.target.value);
  };

  const handleOrderFilter = (event) => {
    setOrderFilter(event.target.value);
    switch (event.target.value) {
      case 'nota_maior':
        setSortType('-nota');
        break;

      case 'nota_menor':
        setSortType('nota');
        break;
    
      case 'a-z':
        setSortType('checklistName');
        break;

      case 'z-a':
        setSortType('-checklistName');
        break;
        
      case 'newest':
        setSortType('-answeredBy.answeredAt');
        break;

      case 'oldest':
        setSortType('answeredBy.answeredAt');
        break;

      default:
        setSortType('');
        break;
    }
  }

  const handleBeforeDateChange = (date) => {
    setBeforeDate(date);
  };

  const handleAfterDateChange = (date) => {
    setAfterDate(date);
  };

  const filterChecklists = () => {
    setCurrentPage(1);
    loadAnsweredsChecklists();
  };

  const defaultFilterValues = useCallback(() => {
    setBeforeDate(initialBeforeDate);
    setAfterDate(initialAfterDate);
    setFilterUnityID('all');
    setOrderFilter('newest');
    setSortType('-answeredBy.answeredAt');
    setCurrentPage(1);
    queryTitle.current.value = '';
    queryName.current.value = '';

    loadAnsweredsChecklists();
  }, []);

  useEffect(() => {
    loadAnsweredsChecklists();
  }, [currentPage, sortType]);
  
  useEffect(() => {
    async function loadUnities() {
      try {
        const unities = await listUnities();
        setUnities(unities);
      } catch (error) {
        console.log(error);
      }
    }
    loadUnities();
  }, [listUnities]);

  const FooterPagination = () => (
    <Box display='flex' justifyContent='center'>
      <Pagination 
      count={Number(pageCount)} 
      color='primary' 
      variant='outlined' 
      shape='rounded' 
      boundaryCount={1}
      siblingCount={0}
      page={currentPage}
      onChange={(e, page) => setCurrentPage(page)}/>
    </Box>
  );
  return (
    <Box>
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color='inherit' style={{fontWeight: 600}}>Checklist's Respondidas</Typography>
      </Breadcrumbs>

      <Box display='flex' justifyContent='flex-start' alignItems='center' marginTop='20px'>
        <Grid container spacing={2} alignItems='center' justify='flex-start'>
          {
            user.type === 'admin' && (
              <Grid item xs={12} sm={5} md={4}>
                <InputLabel id="unity-select-label" className={classes.filterSelect}>Filtrar por Unidade:</InputLabel>
                <Select
                  labelId="unity-select-label"
                  id="unity-select"
                  variant='outlined'
                  fullWidth
                  value={filterUnityID}
                  disabled={loadingChecklists}
                  onChange={handleUnityChange}
                >
                  <MenuItem value='all'><em>Todas</em></MenuItem>
                  {
                    unities?.map((unity) => <MenuItem key={unity?._id} value={unity?._id}>{unity?.apelido}</MenuItem>)
                  }
                </Select>
              </Grid>
            )
          }
          <Grid item xs={12} sm={5} md={4}>
            <InputLabel className={classes.filterSelect}>Buscar por titulo:</InputLabel>
            <TextField
            fullWidth
            disabled={loadingChecklists}
            inputRef={queryTitle}
            placeholder="Ex: Padaria"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                  className={classes.margin} 
                  onClick={() => queryTitle.current.value = ''}>
                    <Icon className='fas fa-times' fontSize='small'/>
                  </IconButton>
                </InputAdornment>
              ),
            }}/>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <InputLabel className={classes.filterSelect}>Respondido por:</InputLabel>
            <TextField
            fullWidth
            disabled={loadingChecklists}
            inputRef={queryName}
            placeholder="Ex: João"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                  className={classes.margin} 
                  onClick={() => queryName.current.value = ''}>
                    <Icon className='fas fa-times' fontSize='small'/>
                  </IconButton>
                </InputAdornment>
              ),
            }}/>
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <InputLabel className={classes.filterSelect}>De:</InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
              fullWidth
              autoOk
              disabled={loadingChecklists}
              style={{ marginRight: '10px' }}
              variant="inline"
              format="dd/MM/yyyy HH:mm"
              ampm={false}
              value={beforeDate}
              onChange={handleBeforeDateChange}
              inputVariant='outlined'
              InputAdornmentProps={{ position: "end" }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                'variant': 'outlined'
              }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <InputLabel className={classes.filterSelect}>Até:</InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
              fullWidth
              autoOk
              disabled={loadingChecklists}
              variant="inline"
              format="dd/MM/yyyy HH:mm"
              ampm={false}
              value={afterDate}
              onChange={handleAfterDateChange}
              inputVariant='outlined'
              InputAdornmentProps={{ position: "end" }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant='contained' color='primary' disableElevation disabled={loadingChecklists} fullWidth size='large' className={classes.filterButton} onClick={filterChecklists}>
              Filtrar
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant='contained' color='secondary' disableElevation disabled={loadingChecklists} fullWidth size='large' className={classes.filterButton} onClick={defaultFilterValues}>
              Resetar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box margin='20px 0'>
        <Typography className={classes.styledTypo}>
          Resultados obtidos: {answeredsChecklists.count}
        </Typography>
        
        <Select 
        variant='outlined' 
        disabled={loadingChecklists} 
        margin='dense' 
        value={orderFilter}
        className={classes.orderFilter} 
        onChange={handleOrderFilter}>
          <MenuItem value='order' disabled><em>Ordenar por:</em></MenuItem>
          <MenuItem value='newest'>Mais recente</MenuItem>
          <MenuItem value='oldest'>Mais antigo</MenuItem>
          <MenuItem value='a-z'>De A-Z</MenuItem>
          <MenuItem value='z-a'>De Z-A</MenuItem>
          <MenuItem value='nota_maior'>Maior nota</MenuItem>
          <MenuItem value='nota_menor'>Menor nota</MenuItem>
        </Select>
        
        <List component="nav">
          {
            (loadingUnity && loadingChecklists) ? <LinearLoading /> 
            : answeredsChecklists.count < 1 ? 
            <Box>
              <Typography variant='h6' color='textSecondary'>
                Nenhum resultado obtido.
              </Typography>
              <FooterPagination />
            </Box> : (
              <>
                {
                  answeredsChecklists.results
                  .map((checklist, index) => <ChecklistItem key={index} checklist={checklist} />)
                }
                <FooterPagination />
              </>
            )
          }
        </List>
      </Box>
    </Box>
  );
}

export default ListAnswers;