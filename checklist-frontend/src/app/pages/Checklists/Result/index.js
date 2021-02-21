import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import useChecklist from '../../../utils/useChecklist';

/* Animation's */
import Lottie from 'react-lottie';
import send from '../../../../assets/animations/send2.json';

/* Stylesheet */
import { useStyles } from './styles';

const ChecklistResult = () => {
  const classes = useStyles();
  const { checklistID } = useParams();
  const history = useHistory();
  const { getAnsweredChecklistByID } = useChecklist();
  const [answeredChecklist, setAnsweredChecklist] = useState([]);
  
  const isStopped = false;
  const isPaused = false;
  const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: send,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    async function loadAnsweredChecklist(checklistID) {
      try {
        const answeredChecklist = await getAnsweredChecklistByID(checklistID);
        //console.log(answeredChecklist);
        setAnsweredChecklist(answeredChecklist);
      } catch (error) {
        console.log(error);
      }
    }
    loadAnsweredChecklist(checklistID);
  }, []);

  const Message = ({ nota }) => {

    const ResultMessage = ({ nota }) => (
      <Typography variant='subtitle1' color='textSecondary' className={classes.description}>
        {
          nota === 10 ? 'Parabéns! Este é o caminho, continue assim!!!'
          : nota < 10 && nota >= 7 ? 'Há muito o que melhorar mas este é o caminho certo'
          : nota < 7 ? 'Atenção, reveja seus processos. Só assim podemos atingir nossos objetivos!'
          : 'Atenção, reveja seus processos. Só assim podemos atingir nossos objetivos!'
        }
      </Typography>
    )

    return (
      <Box textAlign='center' margin='20px 0'>
        <Typography variant='h4' color='textPrimary' className={classes.title}>
          Resposta enviada!
        </Typography>
        <Typography variant='h4' color='textSecondary' className={classes.subTitle}>
          Nota obtida: {nota}
        </Typography>
        <ResultMessage nota={nota} />
      </Box>
    )
  }
  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100%'>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Lottie options={defaultOptions} height={150} width={150} isStopped={isStopped} isPaused={isPaused} />
      </Box>
      <Message nota={answeredChecklist?.nota} />  
      <Button 
      className={classes.buttonGoBack}
      variant='contained' 
      color='primary' 
      disableElevation 
      size='large'
      onClick={() => history.replace('/checklist/availables')}>
        VOLTAR AO INICIO
      </Button>

      <Box marginTop='30px' display='flex' flexDirection='column' justifyContent='center'>
        <Typography variant='subtitle1' color='textSecondary' className={classes.description}>
          Tem algo a comentar? Deixe sua opnião
        </Typography>
        <Button 
        className={classes.buttonGoBack}
        variant='contained' 
        color='secondary'
        disableElevation
        size='large'
        onClick={() => history.replace('/feedback')}>
          DEIXE SUA OPNIÃO
        </Button>
      </Box>
    </Box>
  );
}

export default ChecklistResult;