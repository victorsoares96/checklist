import React from 'react';

import { 
  Avatar,
  Typography,
  Box
} from '@material-ui/core';

import {
  makeStyles
} from '@material-ui/styles';

import PersonIcon from '@material-ui/icons/Person';
import useAuth from '../../../utils/useAuth';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: '20px',
    width: '128px',
    height: '128px',
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  avatarImage: {
    width: '92px',
    height: '92px'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  nameContainer: {
    margin: '20px'
  },
}));

const AvatarBox = () => {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <div className={classes.avatarContainer}>
      <Avatar className={classes.avatar}>
        <PersonIcon className={classes.avatarImage}/>
      </Avatar>
      <Box className={classes.nameContainer}>
        <Typography variant='h5' align='center'>
          {user.apelido}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          {user.unityName}
        </Typography>
        <Typography variant='subtitle1' align='center' color='textSecondary'>
        {user.sectorName}, {user.cargoName}
        </Typography>
      </Box>
    </div>
  );
};

export default AvatarBox;