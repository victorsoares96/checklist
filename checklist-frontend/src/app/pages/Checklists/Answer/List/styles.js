import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  filterSelect: { 
    fontSize: 18, 
    fontWeight: 600, 
    marginBottom: '10px' 
  },
  filterButton: {
    marginTop: '25px',
    color: '#fff',
    fontWeight: 600
  },
  styledTypo: {
    fontSize: 16,
    fontWeight: 600,
    paddingTop: '20px'
  },
  avatar: {
    margin: '10px',
    width: '60px',
    height: '60px',
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  orderFilter: {
    margin: '10px 0',
    fontWeight: 600
  }
}));