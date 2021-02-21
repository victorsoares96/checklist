import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Box, CssBaseline, Breadcrumbs, Link, Typography, makeStyles, Card, CardContent, CardActions, Button, MenuItem, TextField, Select, Switch, RadioGroup, FormControlLabel, Radio, LinearProgress, Grid, Divider } from '@material-ui/core';

/* Form Components */
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import AsyncButton from '../../components/form/AsyncButton';
import removeSpaces from '../../utils/removeSpaces';
import useAdmin from '../../utils/useAdmin';
import useUnity from '../../utils/useUnity';
import delay from '../../utils/delay';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '10px 0px',
    width: '100%'
  },
  card: {
    margin: '10px 0px',
    flex: 1
  },
  title: {
    fontWeight: 600,
    fontSize: 16
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 600
  },
  actionButton: {
    color: '#f5f5f5',
    fontWeight: 600
  }
}));

const UserCreate = () => {
  const classes = useStyles();
  const history = useHistory();
  const { createUser } = useAdmin();
  const { listUnities, getUnitySectorsByID } = useUnity();

  const [unities, setUnities] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [functions, setFunctions] = useState([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório')
      .min(5, 'Digite um nome válido com no minimo 5 caracteres'),
    apelido: Yup.string().required('O apelido é obrigatório')
      .min(3, 'Digite um apelido válido com no minimo 3 caracteres'),
    user: Yup.string().required('O usuário é obrigatório')
      .min(4, 'Digite um usuário válido com no minimo 4 caracteres'),
    email: Yup.string().required('O e-mail é obrigatório')
      .email('Digite um e-mail válido'),
    group: Yup.string().required('Você precisa escolher uma unidade'),
    setor: Yup.string().min(2, 'Você precisa escolher um setor'),
    funcao: Yup.string().min(2, 'Você precisa escolher uma função'),
    password: Yup.string().required('A senha é obrigatória')
      .min(8, 'Digite uma senha entre 8 e 20 digitos')
      //.matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$', 'A senha precisa ter um mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número')
      .max(20, 'Digite uma senha entre 8 e 20 digitos'),
    password_confirmed: Yup.string().required('Você precisa digitar a senha novamente')
      .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais'),
  });
  useEffect(() => {
    async function loadUnities() {
      const unities = await listUnities();
      const activeUnities = unities.filter(unity => {
        return unity.status === 'ativo';
      });
      setUnities(activeUnities);
    }
    loadUnities();
    return () => setUnities([]);
  }, []);
  async function handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      await createUser(values);
      resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }
  const initialValues = {
    name: '',
    apelido: '',
    user: '',
    email: '',
    password: '',
    password_confirmed: '',
    type: 'gerencial',
    group: '',
    setor: ' ',
    funcao: ' ',
    status: 'ativo'
  };
  async function handleSectorsUnityInfo(unityId, setFieldValue) {
    setFieldValue('group', unityId);
    setFieldValue('setor', ' ');
    setFieldValue('funcao', ' ');
    setSectors([]);
    if(unityId) {
      try {
        const response = await getUnitySectorsByID(unityId);
        setSectors(response);
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  }
  async function handleFunctionSectorInfo(sectorId, setFieldValue) {
    setFieldValue('setor', sectorId);
    setFieldValue('funcao', ' ');
    if(sectorId) {
      const filtered = sectors.filter((item) => {return item._id === sectorId});
      //console.log(filtered[0].cargos);
      setFunctions(filtered[0].cargos);
      //setFieldValue('funcao', filtered)
    }
  }
  function handleReset() {
    setSectors([]);
    setFunctions([]);
  }
  return (
    <Box>
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer' }} onClick={() => history.push('/')}>
          Gerenciamento
        </Link>
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer' }} onClick={() => history.push('/users/manage')}>
          Usuários
        </Link>
        <Typography color='textPrimary' style={{fontWeight: 600 }}>Adicionar</Typography>
      </Breadcrumbs>
      <Box className={classes.container}>
        <Box>
          <Typography variant='h5'>Adicionar Usuário</Typography>
        </Box>
        <Formik 
        initialValues={initialValues} 
        onSubmit={handleSubmit}
        onReset={handleReset}
        validationSchema={validationSchema}
        enableReinitialize={true}
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
            setFieldValue,
            resetForm
          }) => (
            <Form>
              <Box display='flex' alignItems='flex-start' justifyContent='flex-start' flex={1}>
                <Card className={classes.card} variant="outlined">
                  <CardContent>
                    <Box className={classes.card}>
                      <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Informações Pessoais
                      </Typography>
                      <TextField
                      autoFocus
                      name="name"
                      variant='outlined'
                      margin='normal'
                      fullWidth
                      label='Nome Completo:'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      helperText={touched.name ? errors.name : ""}
                      error={touched.name && Boolean(errors.name)}
                      autoComplete='name' />
                      <TextField 
                      name="apelido"
                      variant='outlined'
                      margin='normal'
                      fullWidth
                      label='Apelido:'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apelido}
                      helperText={touched.apelido ? errors.apelido : ""}
                      error={touched.apelido && Boolean(errors.apelido)}
                      autoComplete='nickname' />
                      <TextField 
                      name="email"
                      variant='outlined'
                      margin='normal'
                      fullWidth
                      label='E-Mail:'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      helperText={touched.email ? errors.email : ""}
                      error={touched.email && Boolean(errors.email)}
                      autoComplete='email' />
                    </Box>
                    <Box className={classes.card}>
                      <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Dados de Acesso
                      </Typography>
                      <TextField 
                      name='user'
                      variant='outlined'
                      margin='normal'
                      fullWidth
                      label='Usuário:'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.user}
                      helperText={touched.user ? errors.user : ""}
                      error={touched.user && Boolean(errors.user)}
                      autoComplete='username' />
                      <TextField 
                      name='password'
                      type='password'
                      variant='outlined'
                      margin='normal'
                      fullWidth
                      label='Senha:'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      helperText={touched.password ? errors.password : ""}
                      error={touched.password && Boolean(errors.password)}
                      autoComplete='new-password' />
                      <TextField 
                      name="password_confirmed"
                      type='password'
                      variant='outlined'
                      margin='normal'
                      fullWidth
                      label='Confirmar Senha:'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password_confirmed}
                      helperText={touched.password_confirmed ? errors.password_confirmed : ""}
                      error={touched.password_confirmed && Boolean(errors.password_confirmed)}
                      autoComplete='new-password' />
                    </Box>
                    <Box className={classes.card}>
                      <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center'>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                          Unidade
                        </Typography>
                        <Typography variant='subtitle1' className={classes.subTitle} color='error' gutterBottom>
                          {errors.group || errors.setor || errors.funcao}
                        </Typography>
                      </Box>
                      <Typography className={classes.subTitle} color="textSecondary" gutterBottom>
                        Selecione uma unidade, setor e função para o usuário
                      </Typography>
                      <RadioGroup aria-label="group" name="group" value={values.group} onChange={(e) => handleSectorsUnityInfo(e.target.value, setFieldValue)}>
                        {
                          unities.length < 1 ?
                          <Box margin='10px'>
                            <Typography variant='subtitle1' style={{ fontSize: 14, fontWeight: 600 }}>
                                Carregando Unidades...
                            </Typography>
                            <LinearProgress variant='indeterminate' color='primary'/>
                          </Box> :
                          unities.map((unity, index) => (
                            <FormControlLabel key={index} value={unity._id} control={<Radio />} label={unity.apelido} />
                          ))
                        }
                      </RadioGroup>
                    </Box>
                    <Grid container spacing={3} justify='flex-start' alignItems='center'>
                      <Grid item xs={12} sm={3}>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                          Setor
                        </Typography>
                        <Select 
                        name="setor" 
                        label="Setor" 
                        variant='outlined'
                        margin='dense'
                        fullWidth
                        onChange={(e) => handleFunctionSectorInfo(e.target.value, setFieldValue)}
                        value={values.setor} 
                        //defaultValue={0}
                        error={touched.setor && Boolean(errors.setor)}
                        disabled={sectors.length < 1 ? true : false}>
                          <MenuItem disabled value=' '>{sectors.length < 1 ? 'Selecione uma unidade' : 'Selecione o setor'}</MenuItem>
                          {
                            sectors.map((sector, index) => (
                              <MenuItem key={index} value={sector._id}>{sector.nome}</MenuItem>
                            ))
                          }
                        </Select>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                          Função
                        </Typography>
                        <Select 
                        name="funcao" 
                        label="Função" 
                        variant='outlined'
                        margin='dense'
                        fullWidth
                        onChange={handleChange} 
                        value={values.funcao} 
                        //defaultValue={0}
                        error={touched.funcao && Boolean(errors.funcao)}
                        disabled={values.setor !== ' ' ? false : true}>
                          <MenuItem disabled value=' '>{functions ? 'Selecione uma função' : 'Carregando...'}</MenuItem>
                          {
                            functions.map((item) => (
                              <MenuItem key={item._id} value={item._id}>{item.nome}</MenuItem>
                            ))
                          }
                        </Select>
                      </Grid>
                    </Grid>
                    <Box marginTop='20px'>
                      <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Status
                      </Typography>
                      <Select name="status" label="Status" onChange={handleChange} value={values.status} variant='outlined' margin='dense'>
                        <MenuItem value="ativo">Ativo</MenuItem>
                        <MenuItem value="pendente">Pendente</MenuItem>
                        <MenuItem value="inativo">Inativo</MenuItem>
                      </Select>
                      <Divider style={{ margin: '10px 0' }}/>
                      <Typography className={classes.subTitle} color="textSecondary" gutterBottom>
                        Define se o cadastro do usuário está ativo, inativo ou pendente no sistema.
                      </Typography>
                    </Box>
                    <Box marginTop='20px'>
                      <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Tipo de Usuário
                      </Typography>
                      <Select
                        name='type'
                        margin='dense'
                        variant='outlined'
                        labelId="status-select"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.type}
                        label="Status"
                      >
                        <MenuItem value='admin'>Administrador</MenuItem>
                        <MenuItem value='diretor'>Diretor</MenuItem>
                        <MenuItem value='gerencial'>Gerencial</MenuItem>
                        <MenuItem value='comum'>Comum</MenuItem>
                      </Select>
                      <Divider style={{ margin: '10px 0' }}/>
                      <Typography className={classes.subTitle} color="textSecondary" gutterBottom>
                        {
                          values.type === 'admin' ? 'Este usuário possuí acesso total as ferramentas do sistema.'
                          : values.type === 'diretor' ? `Este usuário pode criar, editar e deletar checklists e usuários do sistema, 
                          como também responder e visualizar checklists respondidas de qualquer unidade.`
                          : values.type === 'gerencial' ? `Este usuário pode visualizar checklists respondidos por outros usuários da sua unidade.`
                          : 'Este usuário poderá somente responder checklists disponíveis a ele.'
                        }
                      </Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3}>
                        <AsyncButton type="submit" fullWidth className={classes.actionButton} variant='contained' disableElevation color='primary' disabled={isSubmitting} loading={isSubmitting} loadingSize={20}>
                          Confirmar e Enviar
                        </AsyncButton>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Button className={classes.actionButton} fullWidth variant='contained' disableElevation color='secondary' onClick={resetForm}>
                          Limpar Tudo
                        </Button>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default UserCreate;