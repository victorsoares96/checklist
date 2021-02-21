/* eslint-disable react-hooks/exhaustive-deps */
import { 
  Box, 
  Breadcrumbs, 
  Typography,
  Link, 
  Chip, 
  Card, 
  CardHeader, 
  Divider, 
  CardContent, 
  Button
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AsyncButton from '../../../components/form/AsyncButton';
import AnswerType from '../../../components/form/CheckList/AnswerType';
import useChecklist from '../../../utils/useChecklist';

import { useStyles } from './styles';

const ChecklistDetail = () => {
  const classes = useStyles();
  const { checklistID } = useParams();
  const history = useHistory();
  const { getChecklistByID, deleteChecklistByID, loading: checklistLoading } = useChecklist();
  const [checklist, setCheckist] = useState([]);
  
  useEffect(() => {
    async function loadChecklist(checklistID) {
      try {
        const checklist = await getChecklistByID(checklistID);
        //console.log(checklist);
        setCheckist(checklist);
      } catch (error) {
        console.log(error);
      }
    }
    loadChecklist(checklistID);
  }, []);

  const Status = ({ ativo }) => (
    ativo ? <Chip label="Ativo" style={{backgroundColor: '#447104', fontWeight: 600, color: '#fff'}}/>
    : <Chip label="Inativo" style={{backgroundColor: '#ba000d', fontWeight: 600, color: '#fff'}}/>
  )
  const Expires = ({ expirationTime }) => (
    expirationTime?.isUndefined ? 'Nunca'
    : new Date(expirationTime?.expiratedAt).toLocaleString()
  );

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}} onClick={() => history.push('/home/dashboard')}>
          Gerenciamento
        </Link>
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}} onClick={() => history.push('/checklist/manage')}>
          Checklist
        </Link>
        <Typography color='textPrimary' style={{fontWeight: 600}}>{checklistLoading === true ? 'Carregando...' : checklist?.nome}</Typography>
      </Breadcrumbs>
      <Typography component='div' gutterBottom color='textPrimary' className={classes.title}>
        {checklist?.nome}
      </Typography>
      <Typography component='div' gutterBottom color='textPrimary' className={classes.description}>
        {checklist?.descricao}
      </Typography>
      <Typography component='div' gutterBottom color='textSecondary' className={classes.details}>
        Criada em: {new Date(checklist?.createdAt).toLocaleString()}
      </Typography>
      <Typography component='div' gutterBottom color='textSecondary' className={classes.details}>
        Atualizado em: {new Date(checklist?.updatedAt).toLocaleString()}
      </Typography>
      <Typography component='div' gutterBottom color='textSecondary' className={classes.details}>
        Nº Perguntas: {checklist?.perguntas?.length}
      </Typography>
      <Typography component='div' gutterBottom color='textSecondary' className={classes.details}>
        Expira em: {<Expires expirationTime={checklist?.expirationTime} />}
      </Typography>
      <Typography component='div' gutterBottom color='textSecondary' className={classes.details}>
        Tempo para responder: {checklist?.expirationTime?.timeToAnswer} horas
      </Typography>
      <Typography component='div' gutterBottom color='textSecondary' className={classes.details}>
        Status: {<Status ativo={checklist?.ativo} />}
      </Typography>
      <Typography className={classes.actionTitle}>Ações Administrativas</Typography>
      <Box border={1} borderRadius='10px' display='flex' flexDirection='row' margin='5px 0'>
        <Button 
        variant='contained' 
        size='small' 
        disableElevation 
        onClick={() => history.push(`/checklist/edit/${checklistID}`)}
        style={{ margin: '10px', fontWeight: 600 }}>
          Editar
        </Button>
        <AsyncButton
        color='secondary' 
        variant='contained' 
        size='small'
        loading={checklistLoading} 
        loadingSize={20}
        disableElevation 
        onClick={() => deleteChecklistByID(checklistID)}
        style={{ margin: '10px', fontWeight: 600 }}>
          Deletar
        </AsyncButton>
      </Box>
      {
        checklist?.perguntas?.map((pergunta, index) => (
          <Card key={index} elevation={0} className={classes.answerCard}>
            <CardHeader title={<Typography className={classes.cardTitle}>{pergunta?.pergunta}</Typography>} subheader={`Pergunta ${index+1}`} />
            <Divider />
            <CardContent>
              <Typography variant='h6' color='textSecondary'>
                Resposta
              </Typography>
              <AnswerType type={pergunta?.type}/>
            </CardContent>
          </Card>
        ))
      }
    </Box>
  )
}

export default ChecklistDetail;
