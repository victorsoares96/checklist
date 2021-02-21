import React, { useState } from 'react';

import {
  Box,
  Icon,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core';

import { useHistory, useRouteMatch } from 'react-router-dom';

import {
  makeStyles
} from '@material-ui/styles';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import useAuth from '../../../utils/useAuth';

const options = [
  { 
    title: 'Checklist',
    subtitle: [
      { name: 'Gerenciar', icon: 'fas fa-users-cog', url: 'checklist/manage' },
      { name: 'Adicionar', icon: 'fas fa-user-plus', url: 'checklist/create' },
      { name: 'Editar', icon: 'fas fa-users-cog', url: 'checklist/edit' },
    ],
    permission: ['admin', 'diretor'],
    icon: 'fas fa-clipboard-list' 
  },
  { 
    title: 'Plano de Ação',
    subtitle: [
      { name: 'Gerenciar', icon: 'fas fa-users-cog', url: 'plano/manage' },
      { name: 'Adicionar', icon: 'fas fa-user-plus', url: 'plano/create' },
      { name: 'Editar', icon: 'fas fa-users-cog', url: 'plano/edit' },
    ],
    permission: ['admin'],
    icon: 'fas fa-bullhorn' 
  },
  { 
    title: 'Usuário',
    subtitle: [
      { name: 'Gerenciar', icon: 'fas fa-users-cog', url: 'users/manage' },
      { name: 'Adicionar', icon: 'fas fa-user-plus', url: 'users/create' },
      { name: 'Editar', icon: 'fas fa-users-cog', url: 'users/edit' },
    ],
    permission: ['admin', 'diretor'],
    icon: 'fas fa-user' 
  },
  { 
    title: 'Unidade',
    subtitle: [
      { name: 'Gerenciar', icon: 'fas fa-users-cog', url: 'unity/manage' },
      { name: 'Adicionar', icon: 'fas fa-user-plus', url: 'unity/create' },
      { name: 'Editar', icon: 'fas fa-users-cog', url: 'unity/edit' },
    ],
    permission: ['admin'],
    icon: 'fas fa-building' 
  },
];

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
    fontWeight: 600
  },
  listSubItemButton: {
    borderRadius: '10px',
    margin: '5px 0px',
    paddingLeft: theme.spacing(4)
  },
  listSubHeaderContainer: {
    fontWeight: 600
  }
}));

const ManagementBox = ({ setDrawerState }) => {
  const history = useHistory();
  const classes = useStyles();
  const { user } = useAuth();
  const subHeader = (
    <ListSubheader component="div" id="nested-list-subheader" className={classes.listSubHeaderContainer}>
      Gerenciamento
    </ListSubheader>
  );
  const goTo = (route) => {
    history.replace(`/${route}`);
    setDrawerState(oldState => !oldState);
  }
  const ListItems = ({ name, icon, options, permission }) => {
    const [open, setOpen] = useState(false);
    const handleClick = () => setOpen(oldState => !oldState);
    return (
      <Box className={classes.listItemContainer}>
        <ListItem button onClick={handleClick} className={classes.listItemButton} disabled={Boolean(permission.indexOf(user.type) === -1)}>
          <ListItemIcon>
            <Icon className={icon} />
          </ListItemIcon>
          <ListItemText primary={name}/>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {
              options.map((item) =>
                <ListItem key={item.url} button className={classes.listSubItemButton}  selected={`/${item.url}` === history.location.pathname ? true : false} onClick={() => goTo(item.url)}>
                  <ListItemText primary={item.name} />
                </ListItem>
              )
            }
          </List>
        </Collapse>
      </Box>
    );
  };

  return (
    <Box component='div'>
      <List component="nav" subheader={subHeader}>
        {
          options.map((item) => 
            <ListItems key={item.title} name={item.title} icon={item.icon} options={item.subtitle} permission={item.permission} />
          )
        }
      </List>
    </Box>
  );
};

export default ManagementBox;