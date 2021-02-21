import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 600,
    marginTop: '20px'
  },
  description: {
    fontSize: 18,
    fontWeight: 600,
    margin: '30px 0'
  },
  details: {
    fontSize: 16,
    fontWeight: 600,
    margin: '10px 0'
  },
  answerCard: {
    margin: '20px 0'
  },
  answerMedia: {
    height: '28px',
    paddingTop: '56.25%', // 16:9
  },
  actionButton: {
    fontWeight: 600,
    color: '#fff'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 600
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 600
  }
}));