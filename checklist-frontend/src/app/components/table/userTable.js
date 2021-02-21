import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

import useAdmin from '../../utils/useAdmin';
import AsyncButton from '../form/AsyncButton';
import stableSort from '../../utils/stableSort';
import compararNumeros from '../../utils/compararNumeros';
import getComparator from '../../utils/getComparator';
import { Button, Icon, Chip, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import filterArrayObjects from '../../utils/filterArrayObjects';
import useAuth from '../../utils/useAuth';
import useUnity from '../../utils/useUnity';

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key='actions' align='right'>
          Ações
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 auto',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, title, userID } = props;
  const { deleteUserByID, loading } = useAdmin();
  const { user } = useAuth();
  const history = useHistory();
  function goTo(route) {
    history.replace(route);
  }
  async function deleteUsers(myUserID, users) {
    const promises = users.map(async (user, index) => 
      await deleteUserByID(myUserID, user)
    );
    await Promise.all(promises);
    /*for (const [index, user] of users.entries()) {
      const todo = await deleteUserByID(user);
      console.log(`Received Todo ${index+1}:`, todo);
    }*/
    /* Isso abaixo é uma gambiarra :) */
    history.replace('/users/manag')
  }
  async function handleDeleteUser(users) {
    await deleteUsers(users);
  }
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selecionados
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Box display='flex' flexDirection='row'>
        <Tooltip title={'Atualiza as informações de um usuário'}>
          <Button
          disabled={numSelected > 1 ? true : false}
          disableElevation
          fullWidth
          variant="contained"
          color='inherit'
          size="small"
          style={{margin: '0px 10px', width: '200px', fontWeight: 600, color: '#000000'}}
          onClick={() => goTo(`/users/edit/${userID.toString()}`)}
          startIcon={<Icon className='fas fa-user-edit' style={{width: 'auto'}}/>}
          >
            Editar Usuário
          </Button>
        </Tooltip>
        {
          user.type === 'admin' && (
            <Tooltip title="Exclui um usuário">
              <AsyncButton
              disableElevation
              fullWidth
              variant="contained"
              color='inherit'
              size="small"
              style={{width: '200px',fontWeight: 600, color: '#000000'}}
              onClick={() => deleteUsers(user._id, userID)}
              loading={loading}
              loadingSize={20}
              startIcon={<Icon className='fas fa-user-times' style={{width: 'auto'}}/>}
              >
                {numSelected > 1 ? 'Deletar Usuários' : 'Deletar Usuário'}
              </AsyncButton>
            </Tooltip>
          )
        }
        {/*<Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        </Box>
      ) : (
        <>
          <Tooltip title="Adiciona um usuário">
            <Button
            disableElevation
            fullWidth
            variant="contained"
            color="primary"
            size="small"
            style={{width: '200px',fontWeight: 600, color: '#f5f5f5'}}
            onClick={() => goTo('/users/create')}
            startIcon={<Icon className='fas fa-user-plus' style={{width: 'auto'}}/>}
            >
            Adicionar Usuário
            </Button>
          </Tooltip>
          <Tooltip title="Filtrar">
            <IconButton aria-label="filter list" disabled>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,

};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function UserTable({ title, headCells, rows }) {
  const classes = useStyles();
  const history = useHistory();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('description');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function goTo(route) {
    history.push(route);
  }
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      setRowsPerPage(parseInt(rows.length, 10));
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, row) => {
    const selectedIndex = selected.indexOf(row.id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    //console.log(newSelected)
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} title={title} userID={selected} rows={rows}/>
        <TableContainer style={{maxHeight: 440}}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.description}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          id={row.id}
                          onClick={(event) => handleClick(event, row.description, row)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <Typography variant='subtitle2' style={{fontWeight: 600}}>
                          {row.description}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {
                          row.col1 === 'ativo' ?
                          <Chip label="Ativo" style={{backgroundColor: '#447104', fontWeight: 600, color: '#fff'}}/>
                          : row.col1 === 'pendente' ? <Chip label="Pendente" style={{backgroundColor: '#FFBF46', fontWeight: 600, color: '#fff'}}/>
                          : row.col1 === 'inativo' ? <Chip label="Inativo" style={{backgroundColor: '#ba000d', fontWeight: 600, color: '#fff'}}/>
                          : <Chip label="Erro" style={{backgroundColor: '#45F0DF'}}/>
                        }
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant='subtitle2' style={{fontWeight: 600}}>
                          {row.col2}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant='subtitle2' style={{fontWeight: 600}}>
                          {row.col3}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant='subtitle2' style={{fontWeight: 600}}>
                          {row.col4}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title='Editar usuário'>
                          <IconButton size="medium" onClick={() => goTo(`/users/edit/${row.id}`)}>
                            <Icon fontSize="small" className='far fa-edit' style={{width: 'auto'}}/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Ver detalhes'>
                          <IconButton size="medium" onClick={() => goTo(`/users/detail/${row.id}`)}>
                            <Icon fontSize="small" className='fas fa-arrow-right' style={{width: 'auto'}}/>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, rows.length].sort(compararNumeros)}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage='Linhas por página:'
          labelDisplayedRows={({ from, to, count }) => `Mostrando ${from}-${to} de ${count !== -1 ? `${count} itens` : `mais do que ${to}`}`}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/*<FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />*/}
    </div>
  );
}
