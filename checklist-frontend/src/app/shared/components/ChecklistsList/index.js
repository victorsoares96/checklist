import React, { useState } from 'react';
import { 
  Box, 
  List, 
  Typography 
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import ChecklistItem from '../../../components/ChecklistItem';

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
        {
          data
            .slice(offset, offset + PER_PAGE)
              .map((item, index) => {
                
                function isUnavailableChecklist(answer_before = '00:00', answer_after = '23:59') {
                  const [hour_before, minute_before] = answer_before.split(':');
                  const [hour_after, minute_after] = answer_after.split(':');
                  if(new Date().getTime() > new Date().setHours(hour_after, minute_after)
                  || new Date().getTime() < new Date().setHours(hour_before, minute_before)) return true;
                  else return false;
                }
                return (
                  <ChecklistItem 
                  key={index} 
                  checklistID={item._id}
                  isDisabled={isUnavailableChecklist(item.answer_before, item.answer_after)}
                  title={(
                    <Typography style={{ fontSize: 18, fontWeight: 600 }}>
                      {item.nome}
                    </Typography>
                  )} 
                  subtitle={(
                    <Box>
                      <Typography style={{ fontSize: 16, fontWeight: 600 }} color='textSecondary'>
                        Nº Perguntas: {item.perguntas.length}
                      </Typography>
                      <Typography style={{ fontSize: 14, fontWeight: 600 }} color={isUnavailableChecklist(item.answer_before, item.answer_after) ? 'error' : 'textPrimary'}>
                        {
                          isUnavailableChecklist(item.answer_before, item.answer_after) ? `Disponível das ${item?.answer_before} até as ${item?.answer_after}`
                          : 'Disponível'
                        }
                      </Typography>
                    </Box>
                  )}
                  storageType={storageType} />
                )
              })
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