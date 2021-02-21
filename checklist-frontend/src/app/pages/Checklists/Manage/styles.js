import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    margin: '10px 0px',
    width: '100%'
  },
  footer: {
    display: 'flex',
    margin: '20px 0'
  },
  footerButton: {
    margin: '5px',
    fontWeight: 600
  },
  checkListItemCard: {
    marginBottom: '10px',
    width: '100%'
  },
  title: {
    fontWeight: 600,
    marginTop: '15px'
  },
  tab: {
    fontWeight: 600, 
    color: '#f5f5f5'
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: '15px'
  },
}));