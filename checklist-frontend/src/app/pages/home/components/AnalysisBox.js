import React, { useState, useEffect } from 'react';
import {
  Box,
  Icon,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > .fa': {
      width: 'auto'
    },
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItemContainer: {
    margin: '0px 15px'
  },
  listItemButton: {
    borderRadius: '10px',
    //backgroundColor: fade(theme.palette.primary.main, 0.25)
  },
  listSubHeaderContainer: {
    fontWeight: 600
  }
}));

const Analysis = ({ setDrawerState }) => {
  const classes = useStyles();
  const history = useHistory();
  const options = [
    { 
      title: 'Dashboard',
      url: 'dashboard', 
      icon: 'fas fa-chart-line',
      disabled: false
    },
    { 
      title: 'Relatórios',
      url: 'relatorios', 
      icon: 'far fa-file-alt',
      disabled: true
    },
  ];
  const subHeader = (
    <ListSubheader component="div" id="nested-list-subheader" className={classes.listSubHeaderContainer}>
      Análise
    </ListSubheader>
  );
  function goTo(route) {
    history.replace(`/${route}`);
    setDrawerState(oldState => !oldState);
  }
  const ListItems = ({ data }) => {
    const { icon, title, url, disabled } = data;
    return (
      <ListItem 
      button 
      className={classes.listItemButton} 
      onClick={() => goTo(url)} 
      disabled={disabled}
      selected={`/${url}` === history.location.pathname ? true : false}>
        <ListItemIcon>
          <Icon className={icon} />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    );
  };
  return (
    <Box component='div'>
      <List component="nav" subheader={subHeader} className={classes.root}>
        <Box className={classes.listItemContainer}>
        {
          options.map((item) => <ListItems key={item.url} data={item} />)
        }
        </Box>
      </List>
    </Box>
  );
}

export default Analysis;