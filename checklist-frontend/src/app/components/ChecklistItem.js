import React from 'react';
import { 
  Avatar, 
  Box, 
  Divider, 
  Icon, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  makeStyles, 
  Paper, 
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const ChecklistItem = ({ checklistID, isDisabled, title, subtitle, storageType }) => {
  const classes = useStyles();
  const history = useHistory();

  function isExpired(expirationTime) {
    const now = Date.now();
    if(expirationTime.isUndefined) return false
    else if(now > new Date(expirationTime.expiratedAt).getTime()) return true;
  }

  function answerChecklist(checklistID) {
    history.push(`/checklist/answer/${checklistID}/${storageType}`);
  }
  return (
    <Box>
      <Paper elevation={0}>
        <ListItem button onClick={() => answerChecklist(checklistID)} disabled={isDisabled}>
          <ListItemIcon>
            <Avatar className={classes.avatar}>
              <Icon className='fas fa-file-signature' style={{ marginLeft: '0.5rem', width: 'auto'}}/>
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={title} disableTypography secondary={subtitle} />
        </ListItem>
      </Paper>
      <Divider style={{ margin: '10px' }} />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: '10px',
    width: '60px',
    height: '60px',
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
}));

export default ChecklistItem;