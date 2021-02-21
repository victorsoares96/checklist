import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
    fontSize: 16
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 600
  },
  actionButton: {
    color: '#f5f5f5',
    fontWeight: 600
  },
  footerButton: {
    fontWeight: 600
  }
}));

export default useStyles;