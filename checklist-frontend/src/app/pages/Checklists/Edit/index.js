/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Box, 
  CssBaseline, 
  Breadcrumbs, 
  Link, 
  Typography, 
  Card, 
  CardHeader, 
  CardContent, 
  TextField, 
  Divider,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Switch,
  Grid,
  Chip,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails, IconButton, Icon
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import tomorrow from '../../../utils/tomorrow';

/* Form Component's */
import { 
  Formik, 
  FieldArray,
  Form, 
} from 'formik';
import * as Yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider, 
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import CheckBoxItem from '../../../components/form/CheckBoxItem';
import AnswerType from '../../../components/form/CheckList/AnswerType';
import LoadingUsers from '../../../components/form/CheckList/LoadingUsers';

/* Stylesheet */
import { useStyles } from './styles';

import useChecklist from '../../../utils/useChecklist';
import useUnity from '../../../utils/useUnity';
import { useParams, useHistory } from 'react-router-dom';
import ErrorPage from '../../../shared/pages/Error';
import ReactInputMask from 'react-input-mask';

const CheckListItem = (props) => {
  const {
    index,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    fieldArrayProps
  } = props;
  const classes = useStyles();
  
  const HeaderComponent = (
    <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
      <Typography 
      className={classes.title} 
      style={{margin: 0}} 
      variant='h6' 
      color='textPrimary' 
      gutterBottom>
        {`Pergunta ${index+1}`}
      </Typography>
      {
        values.perguntas.length > 1 && (
          <IconButton className={classes.title} onClick={() => fieldArrayProps.remove(index)}>
            <Icon className='fas fa-minus-circle' fontSize='small' />
          </IconButton>
        )
      }
    </Box>
  );
  
  const memoCheckItem = useMemo(() => (
    <Card className={classes.checkListItemCard}>
      <CardHeader title={HeaderComponent} />
      <Divider />
      <CardContent>
        <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
          <Typography className={classes.title} variant='h6' color='textPrimary' gutterBottom>
            Título
          </Typography>
          <Typography variant='subtitle1' className={classes.subTitle} color='error' gutterBottom>
            {errors.perguntas?.[index].pergunta}
          </Typography>
        </Box>
        <TextField
        fullWidth
        name={`perguntas.${index}.pergunta`}
        variant='outlined'
        margin='normal'
        label='Pergunta:'
        //required
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.perguntas[index]?.pergunta}
        helperText={touched.pergunta ? errors.perguntas?.[index].pergunta : ""}
        error={touched.perguntas && Boolean(errors.perguntas)}/>
        <Divider style={{margin: '20px 0'}} />
        <Typography className={classes.title} variant='h6' color='textPrimary' gutterBottom>
          Resposta (Pré-visualização)
        </Typography>
        <AnswerType type={values.perguntas[index]?.type}/>
      </CardContent>
      <Divider style={{margin: '20px 0'}} />
      <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between' margin='20px'>
        <Grid container spacing={3} alignItems='center' justify='center'>
          <Grid item xs={12} sm={3}>
            <Box display='flex' flexDirection='column'>
              <InputLabel id="answer-select-label">Tipo de Pergunta</InputLabel>
              <Select
                name={`perguntas.${index}.type`}
                style={{ margin: '10px 0' }}
                labelId="answer-select-label"
                id="answer-select-label"
                value={values.perguntas[index]?.type ? values.perguntas[index]?.type : ' '}
                onChange={handleChange}
                onBlur={handleBlur}
                variant='outlined'
                defaultValue={values.perguntas[index]?.type}
                label="Tipo"
              >
                <MenuItem value='great_good_regular_bad_terrible'>Ótimo,Bom,Regular,Ruim,Péssimo</MenuItem>
                <MenuItem value='yes_not'>Sim (Peso: 5), Não (Peso: 1)</MenuItem>
                <MenuItem value='not_yes'>Sim (Peso: 1), Não (Peso: 5)</MenuItem>
                <MenuItem value='text_multiline'>Texto</MenuItem>
                <MenuItem value='number'>Número</MenuItem>
                <MenuItem value='star'>Avaliação Estrela</MenuItem>
                <MenuItem value='emote'>Avaliação Emote</MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Switch
              name={`perguntas.${index}.comentarios`}
              value={values.perguntas[index]?.comentarios ? values.perguntas[index]?.comentarios : false}
              checked={values.perguntas[index]?.comentarios}
              onChange={handleChange}
              color="primary"/>
              <Typography>Habilitar Comentários</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Switch
              name={`perguntas.${index}.anexos`}
              value={values.perguntas[index]?.anexos ? values.perguntas[index]?.anexos : false}
              checked={values.perguntas[index]?.anexos}
              onChange={handleChange}
              color="primary"/>
              <Typography>Habilitar Anexo</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Switch
              disabled
              name={`perguntas.${index}.obrigatoria`}
              value={values.perguntas[index]?.obrigatoria ? values.perguntas[index]?.obrigatoria : false}
              checked={values.perguntas[index]?.obrigatoria}
              onChange={handleChange}
              color="primary"/>
              <Typography>Obrigatória</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  ), [values.perguntas[index], errors.perguntas?.[index].pergunta]);
  return memoCheckItem;
}

const CheckListEditForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const { checklistID } = useParams();
  const { getChecklistByID, updateChecklistByID, loading, error } = useChecklist();
  const { listUnities } = useUnity();
  const [unities, setUnities] = useState([]);
  
  const defaultValue = {
    nome: '',
    descricao: '',
    expirationTime: {
      expiratedAt: tomorrow(),
      isUndefined: false,
      timeToAnswer: 12
    },
    ativo: true,
    autoSelectUnity: true,
    permissions: {
      view: [],
      write: []
    },
    perguntas: [
      { pergunta: '', type: 'great_good_regular_bad_terrible', comentarios: true, anexos: true, obrigatoria: true },
    ]
  };
  const [initialValues, setInitialValues] = useState(defaultValue);
  
  useEffect(() => {
    async function loadUnities() {
      try {
        const unities = await listUnities();
        setUnities(unities);
      } catch (error) {
        console.log(error);
      }
    }
    async function loadChecklist(checklistID) {
      try {
        const checklist = await getChecklistByID(checklistID);
        //console.log(checklist);
        setInitialValues(checklist);
      } catch (error) {
        console.log(error);
      }
    }
    loadUnities();
    loadChecklist(checklistID);
    return () => { setUnities([]); };
  }, []);
  
  async function handleSubmit(values, { setSubmitting, resetForm }) {
    //console.log(values);
    await updateChecklistByID(checklistID, values);
    resetForm();
    setSubmitting(false);
    history.replace('/checklist/manage');
  }

  function handleReset() {
    setInitialValues(defaultValue);
  }
  
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório')
      .min(5, 'Digite um nome válido com no minimo 5 caracteres'),
    descricao: Yup.string().required('A descrição é obrigatória')
      .min(10, 'Digite uma descrição com no minimo 10 caracteres'),
    answer_before: Yup.string().required('O campo é obrigatório')
      .min(4, 'Digite um horário válido. Ex: 22:00'),
    answer_after: Yup.string().required('O campo é obrigatório')
      .min(4, 'Digite um horário válido. Ex: 22:00'),
    expirationTime: Yup.object().shape({
      expiratedAt: Yup.date().when('isUndefined', {
        is: false,
        then: Yup.date().min(tomorrow(), 'Você precisa escolher um período no minimo 1 dia de diferença')
      })
    }),
    permissions: Yup.object().shape({
      /*view: Yup.array().required('Você precisa escolher ao menos um usuário.')
        .min(1, 'Você precisa escolher ao menos um usuário.'),*/
      write: Yup.array().required('Você precisa escolher ao menos um cargo.')
        .min(1, 'Você precisa escolher ao menos um cargo.')
    }),
    perguntas: Yup.array().of(Yup.object().shape({
      pergunta: Yup.string().required('O titulo da pergunta é obrigatório')
    }))
  });
  
  const CheckListQuestionForm = (props) => {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleReset,
      isValid,
      isSubmitting
    } = props;
    return (
      <FieldArray name='perguntas'>
        {(fieldArrayProps) => (
          <Box>
            {values.perguntas.length > 0 && values.perguntas.map((pergunta, index) => (
              <CheckListItem 
              key={index}
              index={index}
              values={values} 
              touched={touched} 
              errors={errors}
              fieldArrayProps={fieldArrayProps}
              handleChange={handleChange} 
              handleBlur={handleBlur} />
            ))}
            <Box display='flex' flexDirection='column-reverse' className={classes.footer} textAlign='center'>
              <Button 
              type='submit' 
              fullWidth 
              variant='contained' 
              color='default' 
              disableElevation 
              disabled={isSubmitting}
              className={classes.footerButton}>
                Enviar
              </Button>
              <Button 
              variant='contained' 
              color='secondary' 
              disableElevation 
              fullWidth 
              onClick={handleReset} 
              className={classes.footerButton}>
                Limpar Tudo
              </Button>
              <Button
              variant='contained' 
              color='primary' 
              fullWidth
              className={classes.footerButton}
              disableElevation 
              onClick={() => fieldArrayProps.push({ 
                pergunta: '', 
                type: 'great_good_regular_bad_terrible', 
                comentarios: true, 
                anexos: true, 
                obrigatoria: true 
              })}>
                Adicionar Outra
              </Button>
              {isValid ? '' : <Typography style={{ fontSize: 16, fontWeight: 600, margin: '10px 0' }} color='error'>Existem erros no formulário!</Typography>}
            </Box>
          </Box>
        )}
      </FieldArray>
    );
  }
  
  function UnitiesAccordion(props) {
    const {
      values,
      handleChange,
      handleBlur
    } = props;

    const memoUnities = useMemo(() => (
      unities.map(unity => {
        return (
          <Accordion key={unity._id} style={{ backgroundColor: '#447104' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>{unity?.apelido}</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
              {
                unity.setores.map(sector => 
                  <Box key={sector._id}>
                    <Typography>{sector.nome}</Typography>
                    {sector.cargos.map(cargo => 
                        <CheckBoxItem 
                        key={cargo._id}
                        optionData={{
                          cargo: cargo.nome
                        }}
                        name='permissions.write' 
                        value={cargo._id}
                        checked={values.permissions.write?.indexOf(cargo._id) !== -1 ? true : false}
                        onBlur={handleBlur} 
                        onChange={handleChange}/>    
                    )}
                  </Box>
                )
              }
            </AccordionDetails>
          </Accordion>
        )
      })
    ), [unities, values?.permissions?.write]);
    return memoUnities;
  }
  if(error) return <ErrorPage />
  else return (
    <Formik 
    initialValues={initialValues} 
    enableReinitialize={true} 
    onSubmit={handleSubmit} 
    validationSchema={validationSchema}
    validateOnChange={false}
    validateOnBlur={false}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        setFieldValue,
        resetForm,
      }) => (
        <Form>
          <Card className={classes.checkListItemCard}>
            <CardContent>
              <Box>
                <Typography variant='h6' className={classes.title} gutterBottom>
                  Informações Gerais
                </Typography>
                <Divider />
                <TextField
                autoFocus
                fullWidth
                name='nome'
                variant='outlined'
                margin='normal'
                label='Nome do Checklist:'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.nome}
                helperText={touched?.nome ? errors?.nome : ""}
                error={touched?.nome && Boolean(errors?.nome)}/>
                <TextField
                name='descricao'
                fullWidth
                label='Descrição:'
                margin='normal'
                multiline
                rows={10}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.descricao}
                helperText={touched?.descricao ? errors?.descricao : ""}
                error={touched?.descricao && Boolean(errors?.descricao)}
                placeholder="Insira uma descrição para o checklist:"
                variant="outlined"/>
              </Box>
              <Box>
                <Typography variant='h6' className={classes.title} gutterBottom>
                  Permissões de Acesso
                </Typography>
                <Divider />
                <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
                  <Typography variant='subtitle1' className={classes.subTitle} gutterBottom>
                    Quem pode responder este checklist?
                  </Typography>
                  <Typography variant='subtitle1' className={classes.subTitle} color='error' gutterBottom>
                    {errors.permissions?.write}
                  </Typography>
                </Box>
                {
                  loading === true ?
                  <LoadingUsers />
                  : <UnitiesAccordion values={values} handleBlur={handleBlur} handleChange={handleChange}/>
                }
              </Box>
              <Box>
                <Typography variant='h6' className={classes.title} gutterBottom>
                  Escolha de Unidade
                </Typography>
                <Divider />
                <Typography variant='subtitle1' className={classes.subTitle} gutterBottom>
                  {
                    values.autoSelectUnity ? 'O sistema define a unidade pertencente ao checklist com base no cadastro do usuário.'
                    : 'O usuário escolhe a unidade pertencente ao checklist.'
                  }
                </Typography>
                <Box display='flex' flexDirection='row' alignItems='center'>
                <Switch
                  name='autoSelectUnity'
                  value={values.autoSelectUnity}
                  checked={values.autoSelectUnity}
                  onChange={handleChange}
                  /*onChange={(e) => {
                    handleChange(e)
                    if(e.target.checked === true) setFieldValue('expirationTime.expiratedAt', new Date(tomorrow()).toISOString(), true)
                  }}*/
                  color="primary"/>
                  <Typography style={{ fontWeight: 600, fontSize: 16 }} color='textSecondary'>
                    {values.autoSelectUnity ? 'Automático' : 'Manual'}
                  </Typography>
                </Box>
              </Box>
              <Box>
              <Typography variant='h6' className={classes.title} gutterBottom>
                  Disponibilidade
                </Typography>
                <Divider />
                <Typography variant='subtitle1' className={classes.subTitle} gutterBottom>
                  Define um determinado período ao qual o checklist ficará disponível ao usuário
                </Typography>
                <Typography variant='subtitle2' className={classes.subTitle} gutterBottom>
                  Use o formato de 24 horas
                </Typography>
                <Box display='flex' flexDirection='row'>
                  <ReactInputMask
                  mask="99:99" 
                  onChange={handleChange} 
                  onBlur={(e) => setFieldValue('answer_before', e.target.value)}
                  value={values.answer_before}>
                    {() => {
                      return (
                        <TextField 
                        name="answer_before"
                        variant='outlined'
                        margin='normal'
                        size='small'
                        style={{ marginRight: '10px' }}
                        helperText={errors.answer_before}
                        error={Boolean(errors.answer_before)}
                        label={values.answer_before ? '' : 'De:'} />
                      )
                    }}
                  </ReactInputMask>

                  <ReactInputMask
                  mask="99:99" 
                  onChange={handleChange} 
                  onBlur={(e) => setFieldValue('answer_after', e.target.value)}
                  value={values.answer_after}>
                    {() => {
                      return (
                        <TextField 
                        name="answer_after"
                        variant='outlined'
                        margin='normal'
                        size='small'
                        helperText={errors.answer_after}
                        error={Boolean(errors.answer_after)}
                        label={values.answer_after ? '': 'Até:'} />
                      )
                    }}
                  </ReactInputMask>
                </Box>
                <Typography variant='subtitle1' className={classes.subTitle} gutterBottom>
                  Define quanto tempo o usuário tem para terminar de responder o checklist após começá-lo.
                </Typography>
                <Select
                  name='expirationTime.timeToAnswer'
                  variant='outlined'
                  margin='dense'
                  value={values.expirationTime?.timeToAnswer}
                  error={touched.expirationTime?.timeToAnswer && Boolean(errors.expirationTime?.timeToAnswer)}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>1 hora</MenuItem>
                  <MenuItem value={2}>2 horas</MenuItem>
                  <MenuItem value={3}>3 horas</MenuItem>
                  <MenuItem value={6}>6 horas</MenuItem>
                  <MenuItem value={12}>12 horas</MenuItem>
                  <MenuItem value={18}>18 horas</MenuItem>
                  <MenuItem value={24}>24 horas</MenuItem>
                  <MenuItem value={36}>36 horas</MenuItem>
                  <MenuItem value={48}>48 horas</MenuItem>
                  <MenuItem value={72}>72 horas</MenuItem>
                  <MenuItem value={168}>168 horas</MenuItem>
                </Select>
              </Box>
            </CardContent>
          </Card>
          <CheckListQuestionForm 
          values={values}
          errors={errors}
          touched={touched}
          isValid={isValid}
          isSubmitting={isSubmitting}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleReset={handleReset}
          resetForm={resetForm}/>
        </Form>
      )}
    </Formik>
  );
}

const CheckListEdit = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box>
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}} onClick={() => history.push('/home/dashboard')}>
          Gerenciamento
        </Link>
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}} onClick={() => history.push('/checklist/manage')}>
          Checklist
        </Link>
        <Typography color='textPrimary' style={{fontWeight: 600}}>Editar</Typography>
      </Breadcrumbs>
      <Box className={classes.container}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CheckListEditForm />
        </MuiPickersUtilsProvider>
      </Box>
    </Box>
  );
}

export default CheckListEdit;