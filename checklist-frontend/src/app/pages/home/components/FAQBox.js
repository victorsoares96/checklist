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

const FAQBox = ({ setDrawerState }) => {
  const history = useHistory();
  const classes = useStyles();
  
  const subHeader = (
    <ListSubheader component="div" id="nested-list-subheader" className={classes.listSubHeaderContainer}>
      Ajuda
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
          <ListItem button className={classes.listItemButton} onClick={() => goTo('faq')} selected={`/faq` === history.location.pathname ? true : false}>
            <ListItemIcon>
              <Icon className='fas fa-question-circle' style={{ width: 'auto' }} />
            </ListItemIcon>
            <ListItemText primary='Perguntas Frequentes' />
          </ListItem>
          <ListItem button className={classes.listItemButton} onClick={() => goTo('feedback')} selected={`/feedback` === history.location.pathname ? true : false}>
            <ListItemIcon>
              <Icon className='fas fa-comment' style={{ width: 'auto' }} />
            </ListItemIcon>
            <ListItemText primary='Deixar Sugestão' />
          </ListItem>
        </Box>
      </List>
    </Box>
  );
}

export default FAQBox;