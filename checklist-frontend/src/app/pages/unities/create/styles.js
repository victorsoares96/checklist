import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    margin: '10px 0px',
    width: '100%'
  },
  card: {
    margin: '10px 0px',
    flex: 1
  },
  title: {
    fontWeight: 600,
    marginTop: '15px'
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginTop: '15px'
  },
  actionButton: {
    margin: 'auto 10px',
    color: '#f5f5f5',
    fontWeight: 600
  },
  textInput: {
    marginRight: '10px'
  }
}));