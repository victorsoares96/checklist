import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > .fa': {
      margin: theme.spacing(8),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  buttonIcon: {
    color: '#fff'
  },
  buttonText: {
    color: '#fff'
  },
  avatar: {
    margin: '10px',
    width: '60px',
    height: '60px',
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

export default useStyles;