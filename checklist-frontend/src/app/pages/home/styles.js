import { makeStyles } from '@material-ui/styles';

const drawerWidth = 300;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  icon: {
    
    width: 'auto',
  },
  root2: {
    '& > .fa': {
      margin: theme.spacing(2),
    },
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    marginLeft: drawerWidth,
  },
  /*toolbar: {
    flexGrow: 1
  },*/
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  listItemButton: {
    borderRadius: '10px'
  }
}));