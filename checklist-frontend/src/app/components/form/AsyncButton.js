import React from 'react';
import { makeStyles, Button, CircularProgress } from '@material-ui/core';
import { green, common } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    //margin: theme.spacing(1),
    flex: 1,
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.type === 'light' ? green['800'] : common['white'],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -11,
    marginLeft: -12,
  },
}));

const AsyncButton = ({ loading, loadingSize, children, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button disabled={loading} {...rest}>
        {children}
        {loading === true ? <CircularProgress size={loadingSize} color='inherit' className={classes.buttonProgress} /> : []}
      </Button>
    </div>
  );
}

export default AsyncButton;