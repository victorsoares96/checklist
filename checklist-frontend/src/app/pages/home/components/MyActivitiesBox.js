import React from 'react';
import {
  Box,
  Icon,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import {
  makeStyles
} from '@material-ui/styles';
import useAuth from '../../../utils/useAuth';

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

const MyActivitiesBox = ({ setDrawerState }) => {
  const { user } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  //console.log(user);
  const subHeader = (
    <ListSubheader component="div" id="nested-list-subheader" className={classes.listSubHeaderContainer}>
      Minhas Atividades
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
          <ListItem button className={classes.listItemButton} onClick={() => goTo('checklist/availables')} selected={`/checklist/availables` === history.location.pathname ? true : false}>
            <ListItemIcon>
              <Icon className='fas fa-clipboard-list' style={{ width: 'auto' }} />
            </ListItemIcon>
            <ListItemText primary='Responder Checklists' />
          </ListItem>
          <ListItem button className={classes.listItemButton} onClick={() => goTo('checklist/pending')} selected={`/checklist/pending` === history.location.pathname ? true : false}>
            <ListItemIcon>
              <Icon className='fas fa-clipboard' style={{ width: 'auto' }} />
            </ListItemIcon>
            <ListItemText primary='Checklists Andamento' />
          </ListItem>
          {
            user.type !== 'comum' && (
              <ListItem button className={classes.listItemButton} onClick={() => goTo('checklist/answereds')} selected={`/checklist/answereds` === history.location.pathname ? true : false}>
                <ListItemIcon>
                  <Icon className='far fa-eye' style={{ width: 'auto' }} />
                </ListItemIcon>
                <ListItemText primary='Visualizar Respostas' />
              </ListItem>
            )
          }
        </Box>
      </List>
    </Box>
  );
}

export default MyActivitiesBox;