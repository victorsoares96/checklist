/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import { 
  Typography, 
  Box, 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Divider, 
  Button, 
  Icon, 
  Grid, 
  Select, 
  MenuItem, 
  Collapse, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
} from '@material-ui/core';

/* Form Component's */
import { Formik, Form } from 'formik';
import AnswerType from '../../../../components/form/CheckList/AnswerType';
import * as Yup from 'yup';
import AsyncButton from '../../../../components/form/AsyncButton';
import TextAnswerType from '../../../../components/form/CheckList/TextAnswerType';
import InputFiles from 'react-input-files';


/* Hook's */
import useAuth from '../../../../utils/useAuth';
import useChecklist from '../../../../utils/useChecklist';
import useUnity from '../../../../utils/useUnity';
import { useSnackbar } from 'notistack';

/* Util's */
import handleStorageChecklist from '../../../../utils/handleStorageChecklist';
import removeStoredChecklist from '../../../../utils/removeStoredChecklist';
import isValidAttachType from '../../../../utils/isValidAttachType';
import isValidAttachSize from '../../../../utils/isValidAttachSize';
import LinearLoading from '../../../../shared/components/LinearLoading';
import { mimeTypes } from '../../../../utils/mimeTypes';

/* StyleSheet */
import useStyles from './styles';
import isMoreThan4Hours from '../../../../utils/isMoreThan4Hours';
import { addHours, isAfter } from 'date-fns';
import ChecklistExpireDialog from '../../../../shared/components/ChecklistExpireDialog';

const CreateAnswer = () => {
  const now = Date.now();
  const history = useHistory();
  const { checklistID, storageType } = useParams();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { getChecklistByID, answerChecklist, sendAttachment, loading: loadingChecklist } = useChecklist();
  const { listUnities, loading: loadingUnities } = useUnity();
  const [initialValues, setInitialValues] = useState([]);
  const [unities, setUnities] = useState([]);

  const validationSchema = Yup.object().shape({
    perguntas: Yup.array().of(Yup.object().shape({
      resposta: Yup.string().required('A resposta é obrigatória'),
    })),
    checklistUnity: Yup.string().when('autoSelectUnity', {
      is: false,
      then: Yup.string().required('Você precisa escolher uma unidade')
    })
  });

  const [storageChecklistDialogOpen, setStorageChecklistDialogOpen] = useState(false);

  const handleClose = () => {
    setStorageChecklistDialogOpen(false);
  };

  async function loadChecklist(checklistID) {
    const checklist = await getChecklistByID(checklistID);
    setInitialValues({
      ...checklist,
      createdAt: new Date().toISOString()
    });
  }

  function loadStoredChecklist(checklistID) {
    const storedChecklists = JSON.parse(localStorage.getItem(`@storageChecklist: ${user._id}`));
    const checklist = storedChecklists.find(checklist => {
      return checklist._id === checklistID
    });
    setInitialValues(checklist);
  }
  
  async function loadUnities() {
    const unities = await listUnities();
    const activeUnities = unities.filter(unity => {
      return unity.status === 'ativo';
    });
    setUnities(activeUnities);
  }

  const StorageChecklistAvailableDialog = () => {
    return (
      <Dialog open={storageChecklistDialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Alerta</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você possui um checklist com este nome em andamento, deseja continuar de onde parou ou recomeçar do inicio?
            <Typography component='p' color='error' style={{ marginTop: '20px' }}>
              <b>Atenção</b> seus arquivos em anexo não foram salvos automaticamente caso tenha inserido algum.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <AsyncButton 
              color='secondary' 
              style={{ color: '#fff', fontWeight: 600 }} 
              variant='contained'
              disabled={loadingChecklist}
              loading={loadingChecklist}
              loadingSize={25}
              fullWidth
              disableElevation
              onClick={() => {
                loadChecklist(checklistID);
                handleClose();
              }}
              >
                Recomeçar
              </AsyncButton>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
              color="primary" 
              variant='contained' 
              style={{ color: '#fff', fontWeight: 600 }}
              disableElevation 
              fullWidth
              onClick={async () => {
                history.replace(`/checklist/answer/${checklistID}/local`);
                await loadStoredChecklist(checklistID);
                handleClose();
              }}>
                Continuar
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }

  useEffect(() => {
    loadUnities();
    if(storageType === 'local') loadStoredChecklist(checklistID);
    else if(storageType === 'online') {
      const storedChecklists = JSON.parse(localStorage.getItem(`@storageChecklist: ${user._id}`));
      const findChecklist = storedChecklists.find(checklist => {
        return checklist._id === checklistID
      });
      if(findChecklist) {
        setStorageChecklistDialogOpen(true);
      } else loadChecklist(checklistID);
    }
  }, []);

  const ChecklistItem = (props) => {
    const { 
      pergunta, 
      index, 
      values, 
      handleChange, 
      handleBlur, 
      errors, 
      touched,
      setFieldError,
      setFieldValue 
    } = props;

    const [commentCollapse, setCommentCollapseStatus] = useState(false);
    const toggleCommentCollapse = () => {
      setCommentCollapseStatus(!commentCollapse);
    };

    const [attachCollapse, setAttachCollapseStatus] = useState(false);
    const toggleAttachCollapse = () => {
      setAttachCollapseStatus(!attachCollapse);
    };

    const handleSubmitAttach = (file) => {
      setFieldValue(`perguntas.${index}.anexo`, file);
      const attachTimestamp = new Date(file.lastModified).getTime();
      if(isMoreThan4Hours(attachTimestamp)) 
        setFieldError(`perguntas.${index}.resposta`, 'São aceitas somente fotos tiradas nas ultimas 4 horas.');
    }

    useEffect(() => {
      if(pergunta.type !== 'text_multiline' || pergunta.type !== 'number') {
        if(pergunta.resposta < 3 && pergunta.comentarios === true) setCommentCollapseStatus(true);
        else setCommentCollapseStatus(false);
      }
    }, [pergunta.resposta]);
    
    const memoQuestion = useMemo(() => (
      <Card style={{ margin: '1.2rem 0' }} elevation={0}>
        <CardHeader subheader={`Pergunta ${index+1}`}/>
        <CardContent>
          <Typography variant='body1' component='p' style={{ fontSize: 18, fontWeight: 600 }}>
            {pergunta.pergunta}
          </Typography>
          <AnswerType 
          type={values.perguntas[index]?.type}
          name={`perguntas.${index}.resposta`}
          style={{ margin: '10px 0' }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.perguntas[index]?.resposta}
          error={Boolean(errors.perguntas?.[index]?.resposta)}
          helperText={errors.perguntas?.[index]?.resposta}
          errorMessage={errors.perguntas?.[index]?.resposta}/>
        </CardContent>
        <Divider />
        <CardActions style={{ margin: 0}}>
          <Grid container spacing={1}>
            {
              pergunta.comentarios && (
                <Grid item xs={6} sm={3}>
                  <Button
                  color='primary'
                  style={{ color: '#fff' }}
                  variant='contained' 
                  fullWidth
                  disabled={attachCollapse}
                  disableElevation 
                  onClick={toggleCommentCollapse}
                  startIcon={<Icon className='fas fa-comment-dots'/>}
                  >
                    Comentar
                  </Button>
                </Grid>
              )
            }
            {
              pergunta.anexos && (
                <Grid item xs={6} sm={3}>
                  <Button 
                  color='primary'
                  style={{ color: '#fff' }}
                  variant='contained' 
                  fullWidth
                  disabled={commentCollapse}
                  disableElevation 
                  onClick={toggleAttachCollapse}
                  startIcon={<Icon className='fas fa-paperclip'/>}
                  >
                    Anexar
                  </Button>
                </Grid>
              )
            }
          </Grid>
        </CardActions>
        
        {/* Comment Collapse Component */}
        <Collapse in={commentCollapse} timeout="auto">
          <CardContent>
            <Typography paragraph>Faça um comentário sobre a questão acima:</Typography>
            <TextAnswerType
            name={`perguntas.${index}.comentario`}
            value={values.perguntas[index]?.comentario}
            onChange={handleChange}
            onBlur={handleBlur}
            label='Insira um comentário:'
            placeholder='Descreva seu comentário detalhadamente'
            helperText={touched.comentario ? errors.comentario : ""}
            error={touched.comentario && Boolean(errors.comentario)}/>
          </CardContent>
          <Divider />
          <CardActions>
            <Button 
            color='secondary' 
            onClick={() => { 
              setFieldValue(`perguntas.${index}.comentario`, '');
              toggleCommentCollapse();
            }}>
              Cancelar e Fechar
            </Button>
            <Button 
            color='primary'
            onClick={toggleCommentCollapse}>
              Salvar e Fechar
            </Button>
          </CardActions>
        </Collapse>

        {/* Attach Collapse Component */}
        <Collapse in={attachCollapse} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph color='textPrimary' style={{ fontWeight: 600 }}>
              Insira um complemento sobre a questão acima:
            </Typography>
            <Typography variant='subtitle2' color='textSecondary' style={{ fontWeight: 600 }} gutterBottom>
              Somente podem ser enviadas fotos tiradas nas ultimas 4 horas e menores que 30 MB. 
            </Typography>
            {<InputFiles
            onChange={files => files.length > 0 && handleSubmitAttach(files[0])}
            accept={mimeTypes} 
            style={{ width: '100%' }}>
              <Button
              color='primary'
              style={{ color: '#fff', fontWeight: 600 }}
              variant='contained' 
              fullWidth
              disabled={commentCollapse}
              disableElevation
              startIcon={<Icon className='fas fa-paperclip'/>}
              >
                Inserir Anexo
              </Button>
            </InputFiles>}
            {
              pergunta.anexo?.name && (
                <Box>
                  <Typography paragraph style={{ margin: '10px 0' }}>
                    Arquivo: {pergunta.anexo?.name}
                  </Typography>
                  <Typography paragraph style={{ margin: '10px 0' }}>
                    Tamanho: {(pergunta.anexo?.size/1000000).toFixed(2)} MB
                  </Typography>
                  <Typography paragraph style={{ margin: '10px 0' }}>
                    Tipo: {pergunta.anexo?.type}
                  </Typography>
                  <Typography paragraph style={{ margin: '10px 0' }}>
                    Criado em: {new Date(pergunta.anexo?.lastModified).toLocaleString('pt-BR')}
                  </Typography>
                </Box>
              )
            }
          </CardContent>
          <Divider />
          <CardActions>
            <Button 
            color='secondary' 
            onClick={() => { 
              setFieldValue(`perguntas.${index}.anexo`, '');
              setFieldError(`perguntas.${index}.resposta`, '');
              setAttachCollapseStatus(false);
            }}>
              Cancelar e Fechar
            </Button>
            <Button color='primary' onClick={toggleAttachCollapse}>
              Salvar e Fechar
            </Button>
          </CardActions>
        </Collapse>
      </Card>
    ), [values.perguntas[index], attachCollapse, commentCollapse, errors?.perguntas?.[index]]);
    return memoQuestion;
  }

  function calcularNota(perguntas) {
    let respostas = [];

    perguntas.map(pergunta => {
      if(pergunta.type !== 'text_multiline' 
      && pergunta.type !== 'number' 
      && isNaN(pergunta.resposta) === false) 
        return respostas.push(Number(pergunta.resposta));
    });

    let sum = respostas.reduce(function(a, b) {
      return a + b;
    }, 0);
    return ((sum/respostas.length).toFixed(1))*2;
  }

  async function handleSubmit(values, { setSubmitting, setFieldError }) {
    const { _id, nome, descricao, checklistUnity, perguntas } = values;
    const output = {
      answeredBy: {
        _id: user._id,
        name: user.apelido,
        answeredAt: new Date().toISOString(),
      },
      checklistID: _id,
      checklistName: nome,
      checklistDesc: descricao,
      checklistUnity: {
        _id: initialValues.autoSelectUnity ? user.group : checklistUnity,
        name: initialValues.autoSelectUnity ? (
          unities.find(unity => { return unity._id === user.group }).apelido
        ) : (
          unities.find(unity => { return unity._id === checklistUnity }).apelido
        )
      },
      checklistUserProps: {
        unity: {
          _id: user.group,
          name: user.unityName
        },
        sector: {
          _id: user.setor,
          name: user.sectorName
        },
        cargo: {
          _id: user.funcao,
          name: user.cargoName
        }
      },
      permissions: {
        view: initialValues.permissions.view
      },
      answers: perguntas,
      nota: calcularNota(perguntas)
    }

    async function handleAttachments() {
      
      async function saveAttachment(file) {
        if(!file) return '';
        let formData = new FormData();
        formData.append('attachment', file);
        const response = await sendAttachment(formData);
        return response;
      }
      
      try {
        setSubmitting(true);
        perguntas.forEach((pergunta, index) => {
          if((!isValidAttachType(pergunta.anexo?.type) && pergunta.anexo?.type !== undefined)) throw new Object({ message: 'O tipo do anexo é inválido!', index: index });
          else if((!isValidAttachSize(pergunta.anexo?.size) && pergunta.anexo?.type !== undefined)) throw new Object({ message: 'O anexo excede o tamanho permitido!', index: index });
          else if(isMoreThan4Hours(pergunta.anexo?.lastModified) && pergunta.anexo?.type !== undefined) throw new Object({ message: 'São aceitas somente fotos tiradas nas ultimas 4 horas.', index: index });
        });
        for (const [idx, pergunta] of perguntas.entries()) {
          if(!pergunta.anexo || !pergunta.anexo?.name) pergunta.anexo = null
          else {
            const anexo = await saveAttachment(pergunta.anexo);
            //console.log(pergunta.anexo);
            //console.log(anexo);
            pergunta.anexo = {
              _id: anexo._id,
              name: pergunta.anexo?.name,
              url: anexo.url,
              size: anexo.size,
              key: anexo.key,
              type: anexo.mimetype
            };
            enqueueSnackbar(`Anexo ${idx+1} enviado!`, {
              variant: 'info',
              anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            });
          }
        }
        const answeredChecklist = await answerChecklist(output);
        removeStoredChecklist(values);
        history.replace(`/checklist/answer/${answeredChecklist._id}/result`);
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
          anchorOrigin: {
              vertical: 'top',
              horizontal: 'right',
          },
        });
        setFieldError(`perguntas.${error.index}.resposta`, error.message);
      } finally {
        setSubmitting(false);
      }
    }
    await handleAttachments();
  }
  
  const ChecklistForm = ({formikProps}) => {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      isValid,
      setFieldValue,
      setFieldError,
      isSubmitting
    } = formikProps;

    const { replace } = useHistory();
    const [checklistExpire, setChecklistExpire] = useState(false);
    /* Adicionar uma descrição */
    useEffect(() => {
      handleStorageChecklist(values);
      return handleStorageChecklist(values);
    }, [values.perguntas]);
    
    /* Retorna o nº da primeira pergunta que possui erro */
    const FirstError = () => {
      const firstErrorIndex = errors.perguntas?.findIndex(x => x);
      return (
        <Box display='flex' flexDirection='column'>
          <Typography style={{ fontSize: 16, fontWeight: 600, margin: '5px 0' }} color='error'>
            Verifique seu checklist
          </Typography>
          {
            errors.checklistUnity ? (
              <Typography style={{ fontSize: 15, fontWeight: 600, margin: '10px 0' }} color='error'>
                {errors.checklistUnity}
              </Typography>
            ) : (
              <Typography style={{ fontSize: 15, fontWeight: 600, margin: '10px 0' }} color='error'>
                A pergunta {firstErrorIndex+1} precisa da sua atenção!
              </Typography>
            )
          }
        </Box>
      )
    }
    return (
      <Form>
        <Typography variant='h4'>
          {values?.nome}
        </Typography>
        <Typography component='p' color='textSecondary' style={{ textAlign: 'left', fontSize: 18, maxWidth: '40rem', marginTop: '1.2rem' }}>
          {values?.descricao}
        </Typography>
        
        <ChecklistExpireDialog 
        open={checklistExpire} 
        handleClose={() => {
          setChecklistExpire(false);
          replace('/checklist/availables');
        }} />

        <Countdown 
        date={addHours(new Date(values.createdAt), values.expirationTime?.timeToAnswer)} 
        //date={Date.now()}
        renderer={({ days, hours, minutes, seconds, completed }) => (
          completed ? (
            <>
              <Typography component='h6' color='error' style={{ textAlign: 'left', fontSize: 18, maxWidth: '40rem', marginTop: '1.2rem' }}>
                Checklist Expirado!
              </Typography>
              <Countdown 
              date={Date.now() + 10000} 
              renderer={({ seconds }) => 
                <Typography variant='p' color='textPrimary'>
                  Você será redirecionado automaticamente para 
                  a tela inicial em {seconds} segundos ou clique 
                  em <b>Voltar</b> para voltar a tela inicial.
                </Typography>
              }
              onComplete={() => {
                removeStoredChecklist(values);
                replace('/checklist/availables');
              }} />
              <Button 
              variant='contained' 
              color='secondary' 
              fullWidth 
              disableElevation 
              style={{ fontWeight: 600, marginTop: '10px' }}
              onClick={() => { 
                removeStoredChecklist(values); 
                replace('/checklist/availables'); 
              }}>
                Voltar
              </Button>
            </>
          ) : (
            <>
              <Typography component='h6' style={{ textAlign: 'left', fontSize: 18, maxWidth: '40rem', marginTop: '1.2rem' }}>
                Expira em: {zeroPad(days)}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
              </Typography>
              {
                values.autoSelectUnity === false && (
                  <Card style={{ margin: '1.2rem 0' }} elevation={0}>
                    <CardHeader title='Em qual unidade está sendo executado este checklist?' />
                    <CardContent>
                      <Box display='flex' flexDirection='column'>
                        <Select
                          name={`checklistUnity`}
                          style={{ margin: '10px 0' }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant='outlined'
                          //disabled={loadingUnities}
                          defaultValue=' '
                          error={errors?.checklistUnity ? true : false}
                          label="Selecione a Resposta"
                        >
                          <MenuItem value=' ' disabled>Selecione uma unidade</MenuItem>
                          {
                            unities.map(unity => <MenuItem key={unity._id} value={unity._id}>{unity.apelido}</MenuItem>)
                          }
                        </Select>
                        <Typography variant='caption' color='error'>{errors.checklistUnity}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                )
              }
              {
                values.perguntas?.map((pergunta, index) => 
                  <ChecklistItem 
                  key={index} 
                  pergunta={pergunta} 
                  index={index} 
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}/>
                )
              }
              <Box textAlign='center'>
                {!isValid && <FirstError />}
                <AsyncButton 
                type='submit' 
                color='primary' 
                style={{ color: '#fff', fontWeight: 600, marginBottom: '10px' }} 
                variant='contained'
                disabled={isSubmitting}
                loading={isSubmitting}
                loadingSize={25}
                fullWidth 
                disableElevation
                >
                  Enviar
                </AsyncButton>
              </Box>
            </>
          )
        )}
        onComplete={() => {
          removeStoredChecklist(values);
          setChecklistExpire(true);
        }} />
        </Form>
    );
  }
  const memoForm = useMemo(() => (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={handleSubmit}
    >
      {formikProps => <ChecklistForm formikProps={formikProps} />}
    </Formik>
  ), [initialValues, unities]);

  if(loadingChecklist && loadingUnities) return <LinearLoading />
  else if(initialValues?.expirationTime?.isUndefined === false 
    && now > new Date(initialValues?.expirationTime?.expiratedAt).getTime()) return (
    <Typography variant='h4' color='textSecondary'>Checklist expirado!</Typography>
  ); else return (
    <>
      <StorageChecklistAvailableDialog />
      {!storageChecklistDialogOpen && memoForm}
    </>
  );
};

export default CreateAnswer;
