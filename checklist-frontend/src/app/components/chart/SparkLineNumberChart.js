import React from 'react';
import { Box, Paper, Typography, Avatar, Icon, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import './chart.css';
import SparkLineSkeleton from '../../utils/components/SparkLineSkeleton';

const useStyles = makeStyles((theme) => ({
  container: {
    minWidth: '340px',
    margin: '0px 20px'
  },
  root: {
    display: 'flex',
    flex: 1,
    justifyContent: 'left',
    alignItems: 'center',
    textAlign: 'left',
    margin: '20px 20px',
    flexGrow: 1,
    flexBasis: 0
  },
  title: {
    color: theme.palette.type == 'light' ? theme.palette.primary.dark : '#DCE6EC',
    fontSize: '9pt',
    fontWeight: 600
  },
  subtitle: {
    color: theme.palette.type == 'light' ? '#333333' : '#DCE6EC',
    fontSize: '24pt'
  },
  paper: {
    padding: '1px',
  },
  chip: {
    marginLeft: '10px',
    color: '#f5f5f5'
  },
  avatar: {
    marginLeft: 'auto', 
    width: '64px', 
    height: '64px',
    backgroundColor: theme.palette.primary.dark
  }
}));

const SparkLineNumberChart = ({ loading, title, icon, data, oldData, ...rest }) => {
  const classes = useStyles();
  const percent = ((data/oldData)).toLocaleString("en", {style: "percent"});

  if(!data) return <SparkLineSkeleton />
  return (
    <Paper className={classes.paper} elevation={0}>
      <Box component='div' display='flex' className={classes.root}>
        <Box component='div' display='block'>
          <Typography variant='overline' className={classes.title}>
            {title}
          </Typography>
          <Typography variant='h3' className={classes.subtitle}>
            {data}
            {
              oldData && (
                <Chip label={percent} size='small' className={classes.chip} style={{backgroundColor: '#447104'}} />
              )
            }
          </Typography>
        </Box>
        <Avatar className={classes.avatar}>
          <Icon className={icon} fontSize='large' style={{color: '#f5f5f5', width: 'auto' }}/>
        </Avatar>
      </Box>
    </Paper>
  );
}

export default SparkLineNumberChart;