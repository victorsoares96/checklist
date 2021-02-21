import React from 'react';
import {
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';

/* Icon's */
import { MdSchedule } from 'react-icons/md';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > .fa': {
      margin: theme.spacing(2),
    },
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItemContainer: {
    margin: '0px 15px'
  },
  listItemButton: {
    borderRadius: '10px'
  },
  listSubHeaderContainer: {
    fontWeight: 600
  }
}));

const ConfigBox = ({ setDrawerState }) => {
  const history = useHistory();
  const classes = useStyles();
  
  const subHeader = (
    <ListSubheader component="div" id="nested-list-subheader" className={classes.listSubHeaderContainer}>
      Configurações
    </ListSubheader>
  );
  
  function goTo(route) {
    history.push(`/${route}`);
    setDrawerState(oldState => !oldState);
  }
  
  return (
    <Box component='div'>
      <List component="nav" subheader={subHeader} className={classes.root}>
        <Box className={classes.listItemContainer}>
          <ListItem button disabled className={classes.listItemButton} onClick={() => goTo('faq')} selected={`/faq` === history.location.pathname ? true : false}>
            <ListItemIcon>
              <MdSchedule size={24} />
            </ListItemIcon>
            <ListItemText primary='Tarefas Programadas' />
          </ListItem>
        </Box>
      </List>
    </Box>
  );
}

export default ConfigBox;