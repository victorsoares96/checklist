import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardHeader, 
  CardContent, 
  Divider, 
  CardMedia, 
  Button, 
  TextField, 
  Grid 
} from '@material-ui/core';
import useChecklist from '../../../../utils/useChecklist';
import useAuth from '../../../../utils/useAuth';
import { useStyles } from './styles';

import AsyncButton from '../../../../components/form/AsyncButton';

import * as pdf from '../../../../services/pdf';
import AnswerType from '../../../../components/form/CheckList/AnswerType';

const ViewAnswer = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();
  const { answeredChecklistID } = useParams();
  const { getAnsweredChecklistByID, deleteAnsweredChecklistByID, loading } = useChecklist();
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    async function loadAnsweredChecklist(answeredChecklistID) {
      try {
        const checklist = await getAnsweredChecklistByID(answeredChecklistID);
        //console.log(checklist);
        setChecklist(checklist);
      } catch (error) {
        console.log(error);
      }
    }
    loadAnsweredChecklist(answeredChecklistID);
    return () => {}
  }, []);

  async function handleDeleteAnswer(answeredChecklistID) {
    try {
      await deleteAnsweredChecklistByID(answeredChecklistID);
      history.replace('/checklist/answereds');
    } catch (error) {
      console.log(error);
    }
  }

  const generatePDF = async () => {
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    try {
      const response = await pdf.generatePDF(answeredChecklistID);
      //Create a Blob from the PDF Stream
      const reader = new FileReader();
      const file = new Blob(
      [response.data], 
      {type: 'application/pdf'});
      reader.onloadend = function(e) {
        if(iOS) window.location.href = reader.result;
        else {
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }
      }
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box>
      <Box>
        <Typography gutterBottom color='textPrimary' className={classes.title}>
          {checklist?.checklistName}
        </Typography>
        <Typography gutterBottom color='textSecondary' className={classes.description}>
          Respondido em: {checklist?.checklistUnity?.name}, por: {checklist?.answeredBy?.name}
        </Typography>
        <Typography gutterBottom color='textSecondary' className={classes.description}>
          {checklist?.checklistUserProps?.unity?.name}, {checklist?.checklistUserProps?.sector?.name}, {checklist?.checklistUserProps?.cargo?.name}
        </Typography>
        <Typography gutterBottom color='textSecondary' className={classes.description}>
          Data: {new Date(checklist?.answeredBy?.answeredAt).toLocaleString()}
        </Typography>
        <Typography gutterBottom color='textSecondary' className={classes.description}>
          Nota Obtida: {checklist?.nota}
        </Typography>
          {
            user.type === 'diretor' || user.type === 'admin' ? (
              <>
                <Typography className={classes.actionTitle}>Ações Administrativas</Typography>
                <Box border={1} borderRadius='10px' display='flex' flexDirection='row' margin='5px 0'>
                  <AsyncButton
                  color='secondary' 
                  variant='contained' 
                  size='small'
                  loading={loading} 
                  loadingSize={20}
                  disableElevation 
                  onClick={() => handleDeleteAnswer(answeredChecklistID)}
                  style={{ margin: '10px', fontWeight: 600 }}>
                    Deletar
                  </AsyncButton>
                </Box>
              </>
            ) : ''
          }
      </Box>
      <Box marginTop='30px'>
        {checklist?.answers?.map((answer, index) => {
          return (
            <Card key={index} elevation={0} className={classes.answerCard}>
              <CardHeader title={<Typography className={classes.cardTitle}>{answer.pergunta}</Typography>} subheader={`Pergunta ${index+1}`}/>
              <Divider />
              <CardContent>
                <Typography variant='h6' color='textSecondary'>
                  Resposta
                </Typography>
                <AnswerType
                disabled
                type={answer.type}
                value={answer.resposta}/>
              </CardContent>
              <CardContent>
                <Typography variant='h6' color='textSecondary'>
                  Anexo
                </Typography>
              </CardContent>
              {
                  answer?.anexo ? (
                  <CardMedia
                  component='img'
                  onDoubleClick={() => window.open(answer?.anexo?.url)}
                  image={answer?.anexo?.url}
                  title='Clique 2 vezes para abrir'/>
                ) : (
                  <CardContent>
                    <Typography className={classes.description}>Nenhum anexo adicionado</Typography>
                  </CardContent>
                )
              }
              <Divider />
              <CardContent>
                <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='h6' color='textSecondary'>
                    Comentário
                  </Typography>
                  <Button variant='contained' color='primary' disabled disableElevation className={classes.actionButton}>
                    Plano de Ação
                  </Button>
                </Box>
                {
                  answer?.comentario ? (
                    <TextField
                    fullWidth
                    disabled
                    multiline
                    defaultValue={answer?.comentario}
                    margin='normal'
                    variant="outlined"/>
                  ) : (
                    <Typography className={classes.description} style={{ marginTop: '20px' }}>
                      Nenhum comentário adicionado
                    </Typography>
                  )
                }
              </CardContent>
            </Card>
          )
        })}
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <Button variant='contained' color='secondary' fullWidth disableElevation className={classes.actionButton} onClick={() => history.replace('/')}>
            Sair
          </Button>
        </Grid>
        {/*<Grid item xs={12} sm={3}>
          <Button variant='contained' color='primary' fullWidth disableElevation className={classes.actionButton} onClick={() => generatePDF(JSON.stringify(checklist))}>
            Gerar PDF
          </Button>
        </Grid>*/}
      </Grid>
    </Box>
  );
}

export default ViewAnswer;
