import React, { useState } from 'react';
import { 
  Avatar, 
  Box, 
  Divider, 
  Icon, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Paper, 
  Typography 
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

function isExpired(expirationTime) {
  const now = Date.now();
  if(expirationTime.isUndefined) return false
  else if(now > new Date(expirationTime.expiratedAt).getTime()) return true;
}

const ChecklistItem = ({ data, storageType }) => {
  const { _id, nome, perguntas, expirationTime } = data;
  const classes = useStyles();
  const history = useHistory();
  const expiratedAtDate = new Date(expirationTime.expiratedAt).toLocaleDateString();
  const expiratedAtTime = new Date(expirationTime.expiratedAt).toLocaleTimeString();
  
  const Title = (
    <Typography style={{ fontSize: 18, fontWeight: 600 }}>
      {nome}
    </Typography>
  );
  
  const Subtitle = (
    <Box>
      <Typography style={{ fontSize: 16, fontWeight: 600 }} color='textSecondary'>
        Nº Perguntas: {perguntas.length}
      </Typography>
      <Typography style={{ fontSize: 14, fontWeight: 600 }} color='textPrimary'>
        {
          expirationTime?.isUndefined ? 'Disponível'
          : `Expira em: ${expiratedAtDate} às ${expiratedAtTime}`
        }
      </Typography>
    </Box>
  );

  function answerChecklist(checklistID) {
    history.push(`/checklist/answer/${checklistID}/${storageType}`);
  }
  return (
    <Box>
      <Paper elevation={0}>
        <ListItem button onClick={() => answerChecklist(_id)} disabled={isExpired(expirationTime)}>
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

const ChecklistsList = ({ data, storageType }) => {
  
  /* Paginate Definition's */
  const PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(data.length / PER_PAGE);

  if(data.length < 1) return (
    <Typography style={{ marginTop: '10px' }} variant='h6' color='textSecondary'>
      Nenhum resultado obtido.
    </Typography>
  )
  return (
    <Box margin='20px 0'>
      <List component="nav">
        {/*<ListSubheader>
          sdfdsfsdf
        </ListSubheader>*/}
        {
          data
            .slice(offset, offset + PER_PAGE)
              .map((item, index) => <ChecklistItem key={index} data={item} storageType={storageType} />)
        }
      </List>
      <Box display='flex' justifyContent='center'>
        <Pagination
          count={pageCount} 
          color='primary' 
          variant='outlined' 
          shape='rounded' 
          boundaryCount={1}
          siblingCount={0}
          onChange={(e, page) => setCurrentPage(page - 1)}/>
        </Box>
    </Box>
  );
}

export default ChecklistsList;