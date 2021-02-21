import { makeStyles } from '@material-ui/styles';

/* Colors */
import { green, common } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
  loginButton: {
    fontWeight: 600,
    color: '#fff'
  },
  paper: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    width: 220,
    height: 220,
    backgroundColor: theme.palette.background.default,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: 600,
    color: '#f5f5f5'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.type === 'light' ? green['800'] : common['white'],
    position: 'absolute',
    top: '50%',
    left: '38%',
    marginTop: -9,
    marginLeft: -12,
  },
}));