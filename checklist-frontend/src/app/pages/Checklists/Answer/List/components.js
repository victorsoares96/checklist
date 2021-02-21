import React from 'react';
import { Avatar, Box, Divider, Icon, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const ChecklistItem = ({ checklist }) => {
  const classes = useStyles();
  const history = useHistory();
  const { _id, checklistName, answeredBy, checklistUserProps, nota, checklistUnity } = checklist;

  const Title = (
    <Typography style={{ fontSize: 18, fontWeight: 600 }}>
      {checklistName}
    </Typography>
  );
  
  const Subtitle = (
    <Box>
      <Typography style={{ fontSize: 16, fontWeight: 600 }} color='textSecondary'>
        Respondido por: {answeredBy?.name}
      </Typography>
      <Typography style={{ fontSize: 16, fontWeight: 600 }} color='textSecondary'>
        Data: {new Date(answeredBy?.answeredAt).toLocaleString()}
      </Typography>
      <Typography style={{ fontSize: 14, fontWeight: 600 }} color='textSecondary'>
        Local: {checklistUnity?.name}, Nota: {nota}
      </Typography>
    </Box>
  );
  
  function viewAnsweredChecklist(answeredChecklistID) {
    history.push(`/checklist/answereds/${answeredChecklistID}/view`);
  }
  return (
    <Box>
      <Paper>
        <ListItem button onClick={() => viewAnsweredChecklist(_id)}>
          <ListItemIcon>
            <Avatar className={classes.avatar}>
              <Icon className='fas fa-file-signature' style={{ marginLeft: '0.5rem', width: 'auto'}}/>
            </Avatar>
          </ListItemIcon>
          <ListItemText primary={Title} disableTypography secondary={Subtitle} />
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