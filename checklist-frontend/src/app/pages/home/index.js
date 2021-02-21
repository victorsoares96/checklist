import React, { useState, useEffect, useContext, useRef } from 'react';
import { loadCSS } from 'fg-loadcss';
import { useHistory } from "react-router-dom";

/* Component's */
import AvatarBox from './components/AvatarBox';
import ManagementBox from './components/ManagementBox';
import AnalysisBox from './components/AnalysisBox';
import MyActivitiesBox from './components/MyActivitiesBox';

import { useStyles } from './styles';

import {
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
  Icon,
  Button, SwipeableDrawer, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Checkbox
} from '@material-ui/core';

import AppRoutes from '../../routes/app.routes';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useAuth from '../../utils/useAuth';
import { ThemeContext } from '../../contexts/themeContext';
import FAQBox from './components/FAQBox';
import ConfigBox from './components/ConfigBox';

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { user, logout } = useAuth();
  const themeContext = useContext(ThemeContext);
  const [drawerState, setDrawerState] = useState(false);
  
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });
  
  const shouldOpenSidebar = isDesktop ? true : drawerState;
  
  useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
  };
  const toggleDrawer = (state) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerState(state);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {
            !isDesktop && (
              <IconButton
              aria-label="open drawer"
              onClick={() => setDrawerState(oldState => !oldState)}
              style={{marginRight: '10px', color: '#f5f5f5'}}
              edge="start"
              >
                <MenuIcon />
              </IconButton>
            )
          }
          <IconButton
            onClick={() => history.goBack()}
            style={{color: '#f5f5f5'}}
            edge="start"
            >
              <ArrowBackIcon />
          </IconButton>
          <Button onClick={() => history.push('/')} style={{ marginRight: '10px', color: '#f5f5f5', fontSize: 18, fontWeight: 600 }}>
            Inicio
          </Button>
          <IconButton aria-label="theme_type" component="span" style={{marginLeft: 'auto'}} onClick={() => history.push('/faq')}>
            <Icon style={{color: '#f5f5f5'}} className='fas fa-question-circle' />
          </IconButton>
          <IconButton aria-label="theme_type" component="span" onClick={themeContext.toggleTheme}>
            <Icon style={{color: '#f5f5f5'}} className={themeContext.theme.palette.type === 'dark' ? `fas fa-sun` : `fas fa-moon`} />
          </IconButton>
          <IconButton aria-label="logout" component="span" onClick={handleLogout}>
            <Icon style={{color: '#f5f5f5'}} className='fas fa-sign-out-alt' />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <SwipeableDrawer
        className={classes.drawer} 
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        open={shouldOpenSidebar}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        variant={isDesktop ? 'persistent' : 'temporary'} 
        classes={{paper: classes.drawerPaper}} 
        anchor="left">
        <AvatarBox setDrawerState={setDrawerState} />
        <Divider />
        {
          (user.type !== 'comum' && user.type !== 'gerencial') && (
            <>
              <AnalysisBox setDrawerState={setDrawerState} />
              <Divider />
              <ManagementBox setDrawerState={setDrawerState} />
              <Divider />
            </>
          )
        }
        <MyActivitiesBox setDrawerState={setDrawerState} />
        <Divider />
        <FAQBox setDrawerState={setDrawerState} />
        <Divider />
        {/*<ConfigBox setDrawerState={setDrawerState} />*/}
        <Divider />
        <Typography variant='subtitle2' style={{ fontWeight: 600, margin: '10px 10px 10px auto' }} color='textSecondary'>
          {process.env.REACT_APP_VERSION}
        </Typography>
      </SwipeableDrawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/*<LoadingAnimation />*/}
        <AppRoutes />
      </main>
    </div>
  );
}
