import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { 
  Box, 
  CssBaseline,
  TextField,
  Breadcrumbs, 
  Link, 
  Typography, 
  Button, 
  Grid, 
  CircularProgress, 
  IconButton, 
  Icon, 
  InputAdornment, 
  Divider, 
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import useUnity from '../../../utils/useUnity';

/* Form Components */
import ReactInputMask from 'react-input-mask';
import { 
  Formik, 
  FieldArray,
  Form,
} from 'formik';
import normalize from '../../../utils/normalize';
import * as Yup from 'yup';

import getLocationByCEP from '../../../utils/getLocationByCEP';
import getCompanyByCNPJ from '../../../utils/getCompanyByCNPJ';

/* StyleSheet */
import { useStyles } from './styles';

const UnityEdit = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { updateUnityByID, getUnityByID, loading } = useUnity();
  const [loadingCEPInfo, setLoadingCEPInfo] = useState(false);
  //const [sectors, setSectors] = useState([]);
  //const [cargos, setCargos] = useState([]);
  const initialValues_ = {
    apelido: ' ',
    cnpj: '',
    nome_fantasia: '',
    razao_social: '',
    contact: {
      pais: 'Brasil',
      bairro: '',
      cep: '',
      cidade: '',
      complemento: '',
      email: '',
      estado: '',
      logradouro: '',
      numero: '',
      phone: '',
      phone2: ''
    },
    setores: [
      {
        nome: '',
        cargos: []
      },
    ],
    status: 'ativo'
  };
  const [initialValues, setInitialValues] = useState(initialValues_);
  useEffect(() => {
    async function loadUnity(id) {
      try {
        const response = await getUnityByID(id);
        //setSectors(response.setores);
        setInitialValues(response);
      } catch (error) {
        console.log(error);
      }
    }
    loadUnity(id);
  }, []);
  
  const validationSchema = Yup.object().shape({
    razao_social: Yup.string().required('A razão social é obrigatória')
      .min(6, 'Digite um nome válido com no minimo 6 caracteres'),
    nome_fantasia: Yup.string().required('O nome fantasia é obrigatório')
      .min(6, 'Digite um nome válido com no minimo 6 caracteres'),
    apelido: Yup.string().required('O apelido é obrigatório')
      .min(4, 'Digite um nome válido com no minimo 4 caracteres'),
    cnpj: Yup.string().required('O cnpj é obrigatório')
      .min(14, 'Digite um cnpj válido com 14 digitos'),
    contact: Yup.object().shape({
      cep: Yup.string().required('O cep é obrigatório'),
      email: Yup.string().required('O e-mail é obrigatório')
        .email('Digite um e-mail válido'),
      logradouro: Yup.string().required('O logradouro é obrigatório')
        .min(6, 'Digite um logradouro válido com no minimo 6 digitos'),
      numero: Yup.string().required('O número é obrigatório'),
      estado: Yup.string().required('O estado é obrigatório'),
      cidade: Yup.string().required('A cidade é obrigatória'),
      bairro: Yup.string().required('O bairro é obrigatório'),
      phone: Yup.string().required('O telefone fixo é obrigatório')
        .min(12, 'Digite um telefone válido'),
    }),
    setores: Yup.array().of(Yup.object().shape({
      nome: Yup.string().required('O nome do setor é obrigatório'),
      cargos: Yup.array().of(Yup.object().shape({
        nome: Yup.string().required('O cargo é obrigatório')
      }))
    }))
  });

  async function handleLocationInfo(cep, setFieldValue) {
    if(cep) {
      try {
        setLoadingCEPInfo(true);
        const response = await getLocationByCEP(cep);
        setLoadingCEPInfo(false);
        setFieldValue('contact.cep', normalize(cep));
        setFieldValue('contact.logradouro', response.logradouro);
        setFieldValue('contact.complemento', response.complemento || '');
        setFieldValue('contact.estado', response.estado_info.nome);
        setFieldValue('contact.cidade', response.cidade);
        setFieldValue('contact.bairro', response.bairro);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingCEPInfo(false);
      }
    }
  }
  
  /*async function handleCompanyInfo(cnpj) {
    if(cnpj) {
      try {
        const response = await getCompanyByCNPJ(normalize(cnpj));
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }*/
  
  async function handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      //console.log(values);
      await updateUnityByID(id, values);
      history.push('/unity/manage');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      //handleCloseDialog();
    }
  }
  const MainInfo = ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
    const classes = useStyles();
    return (
      <Box className={classes.card}>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          Principal
        </Typography>
        <TextField    
        name="razao_social"
        variant='outlined'
        margin='normal'
        required
        fullWidth
        disabled={loading}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.razao_social}
        helperText={touched.razao_social ? errors.razao_social : ""}
        error={touched.razao_social && Boolean(errors.razao_social)}
        label='Razão Social:'
        autoComplete='organization' />
        <TextField 
        name="nome_fantasia"
        variant='outlined'
        margin='normal'
        required
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.nome_fantasia}
        helperText={touched.nome_fantasia ? errors.nome_fantasia : ""}
        error={touched.nome_fantasia && Boolean(errors.nome_fantasia)}
        fullWidth
        label='Nome Fantasia:'
        autoComplete='organization-title' />
        <TextField 
        name="apelido"
        variant='outlined'
        margin='normal'
        required
        fullWidth
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.apelido}
        helperText={touched.apelido ? errors.apelido : ""}
        error={touched.apelido && Boolean(errors.apelido)}
        label='Apelido:'
        autoComplete='nickname' />
        <ReactInputMask
        mask="99.999.999/9999-99" 
        onChange={handleChange} 
        onBlur={(e) => setFieldValue('cnpj', normalize(e.target.value))} 
        value={values.cnpj}>
          {() => {
            return (
              <TextField 
              name="cnpj"
              variant='outlined'
              margin='normal'
              required
              fullWidth
              helperText={touched.cnpj ? errors.cnpj : ""}
              error={touched.cnpj && Boolean(errors.cnpj)}
              label='CNPJ:'
              autoComplete='organization' />
            )
          }}
        </ReactInputMask>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography className={classes.title} color="textPrimary" gutterBottom>
            Localização
          </Typography>
          {loadingCEPInfo && <CircularProgress size={25} />}
        </Box>
        <Box display='flex' flexDirection='row' alignItems='center'>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={2}>
              <TextField
              disabled
              fullWidth
              name="contact.pais"
              variant='outlined'
              margin='normal'
              label='País:'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.pais}
              autoComplete='country' />
            </Grid>
            <Grid item xs={12} sm={2}>
              <ReactInputMask 
              mask="99999-999" 
              disabled={loadingCEPInfo} 
              onBlur={(e) => handleLocationInfo(e.target.value, setFieldValue)} 
              onChange={handleChange} 
              value={values.contact?.cep}>
                {() => {
                  return (
                    <TextField
                    fullWidth
                    name="contact.cep"
                    variant='outlined'
                    margin='normal'
                    label={values.logradouro ? '' : 'CEP:'}
                    helperText={touched.cep ? errors.cep : ""}
                    error={touched.cep && Boolean(errors.cep)}
                    autoComplete='postal-code' />
                  )
                }}
              </ReactInputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              disabled={loadingCEPInfo}
              fullWidth
              name="contact.logradouro"
              variant='outlined'
              margin='normal'
              label={values.logradouro ? '' : 'Logradouro:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.logradouro}
              helperText={touched.logradouro ? errors.logradouro : ""}
              error={touched.logradouro && Boolean(errors.logradouro)}
              autoComplete='address-line1' />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
              disabled={loadingCEPInfo}
              fullWidth
              name="contact.numero"
              variant='outlined'
              margin='normal'
              label={values.numero ? '' : 'Numero:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.numero}
              helperText={touched.numero ? errors.numero : ""}
              error={touched.numero && Boolean(errors.numero)}
              autoComplete='address-line2' />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
              disabled={loadingCEPInfo}
              fullWidth
              name="contact.complemento"
              variant='outlined'
              margin='normal'
              label={values.complemento ? '' : 'Complemento:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.complemento}
              helperText={touched.complemento ? errors.complemento : ""}
              error={touched.complemento && Boolean(errors.complemento)}
              autoComplete='address-line3' />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
              disabled={loadingCEPInfo}
              fullWidth
              name="contact.estado"
              variant='outlined'
              margin='normal'
              label={values.estado ? '' : 'Estado:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.estado}
              helperText={touched.estado ? errors.estado : ""}
              error={touched.estado && Boolean(errors.estado)}
              autoComplete='address-line4' />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
              disabled={loadingCEPInfo}
              fullWidth
              name="contact.cidade"
              variant='outlined'
              margin='normal'
              label={values.cidade ? '' : 'Cidade:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.cidade}
              helperText={touched.cidade ? errors.cidade : ""}
              error={touched.cidade && Boolean(errors.cidade)}
              autoComplete='address-line4' />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
              disabled={loadingCEPInfo}
              fullWidth
              name="contact.bairro"
              variant='outlined'
              margin='normal'
              label={values.bairro ? '' : 'Bairro:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.bairro}
              helperText={touched.bairro ? errors.bairro : ""}
              error={touched.bairro && Boolean(errors.bairro)}
              autoComplete='address-line4' />
            </Grid>
            <Grid item xs={12} sm={3}>
              <ReactInputMask 
              mask="+55 (99) 9999-9999" 
              onChange={handleChange} 
              onBlur={(e) => setFieldValue('contact.phone', normalize(e.target.value))} 
              value={values.contact?.phone}>
                {() => {
                  return (
                    <TextField
                    name="contact.phone"
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    helperText={touched.phone ? errors.phone : ""}
                    error={touched.phone && Boolean(errors.phone)}
                    label='Telefone Fixo:'
                    autoComplete='tel' />
                  )
                }}
              </ReactInputMask>
            </Grid>
            <Grid item xs={12} sm={3}>
              <ReactInputMask 
              mask="+55 (99) 99999-9999" 
              onChange={handleChange} 
              onBlur={(e) => setFieldValue('contact.phone2', normalize(e.target.value))} 
              value={values.contact?.phone2}>
                {() => {
                  return (
                    <TextField
                    name="contact.phone2"
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    helperText={touched.phone2 ? errors.phone2 : ""}
                    error={touched.phone2 && Boolean(errors.phone2)}
                    label='Telefone Móvel:'
                    autoComplete='tel2' />
                  )
                }}
              </ReactInputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              disabled={loadingCEPInfo}
              fullWidth
              name="contact.email"
              variant='outlined'
              margin='normal'
              label={values.email ? '' : 'E-Mail:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.email}
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              autoComplete='address-line4' />
            </Grid>
          </Grid>
        </Box>
      </Box>
    )
  }
  const Setor = ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
    const classes = useStyles();
    return (
      <FieldArray name="setores">
        {({ insert, remove, push }) => (
          <Box>
            <Typography className={classes.title} color="textPrimary" gutterBottom>
              Setores
            </Typography>
            {values.setores.length > 0 && values.setores.map((friend, index) => (
              <Box key={index}>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                  <Typography className={classes.subTitle} color="textSecondary" gutterBottom>
                    Adicionar Setor
                  </Typography>
                  {
                    values.setores.length > 1 ?
                    <IconButton className={classes.title} onClick={() => remove(index)}>
                      <Icon className='fas fa-minus-circle' fontSize='small' color='textPrimary'/>
                    </IconButton>
                    :
                    []
                  }
                </Box>
                <TextField
                fullWidth
                name={`setores.${index}.nome`}
                variant='outlined'
                margin='normal'
                label='Nome do Setor:'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.setores[index]?.nome}
                helperText={touched.setores?.[index]?.nome ? errors.setores?.[index]?.nome : ""}
                error={touched.setores?.[index]?.nome && Boolean(errors.setores?.[index]?.nome)}/>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                  <Typography className={classes.subTitle} color="textSecondary" gutterBottom>
                    Adicionar Funções
                  </Typography>
                </Box>
                <FieldArray name={`setores.${index}.cargos`}>
                  {fieldArrayProps => (
                    <div>
                      {values.setores[index]?.cargos?.length > 0 &&
                        values.setores[index]?.cargos?.map((cargo, subIndex) => {
                          return (
                            <TextField
                            name={`setores.${index}.cargos.${subIndex}.nome`}
                            fullWidth
                            variant='outlined'
                            placeholder='Exemplo: Gerente'
                            margin='dense'
                            size='small'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.setores?.[index]?.cargos?.[subIndex].nome}
                            helperText={touched.setores?.[index]?.cargos?.[subIndex]?.nome ? errors.setores?.[index]?.cargos?.[subIndex]?.nome : ""}
                            error={touched.setores?.[index]?.cargos?.[subIndex]?.nome && Boolean(errors.setores?.[index]?.cargos?.[subIndex]?.nome)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <IconButton 
                                  disabled={values.setores?.[index]?.cargos.length < 2 ? true : false}
                                  className={classes.margin} 
                                  onClick={() => fieldArrayProps.remove(subIndex)}>
                                    <Icon className='fas fa-times' fontSize='small'/>
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}/>
                          )
                        })}
                        <Button 
                        variant='contained' 
                        color='default' 
                        disableElevation 
                        size='small'
                        style={{ margin: '10px 0', fontWeight: 600 }}
                        onClick={() => fieldArrayProps.push({ nome: "" })}>
                          Adicionar Função
                        </Button>
                    </div>
                  )}
                </FieldArray>
                <Divider style={{ margin: '1.2rem' }}/>
              </Box>
            ))}
            <Button 
            variant='contained' 
            color='default' 
            disableElevation 
            style={{ margin: '10px 0', fontWeight: 600 }}
            onClick={() => push({ nome: '', cargos: [{ nome: '' }] })}>
              Adicionar Setor
            </Button>
          </Box>
        )}
      </FieldArray>
    )
  }
  const Status = ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
    const classes = useStyles();
    return (
      <Grid style={{ marginTop: '1.8rem' }}>
        <Grid item xs={12} sm={3}>
          <InputLabel id="status-select" className={classes.title}>Status</InputLabel>
          <Select
            name='status'
            style={{ marginTop: '0.8rem' }}
            variant='outlined'
            labelId="status-select"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.status}
            defaultValue='ativo'
            fullWidth
            label="Status"
          >
            <MenuItem value='ativo'>Ativo</MenuItem>
            <MenuItem value='pendente'>Pendente</MenuItem>
            <MenuItem value='inativo'>Inativo</MenuItem>
          </Select>
        </Grid>
      </Grid>
    );
  }
  return (
    <Box>
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}} onClick={() => history.push('/home/dashboard')}>
          Gerenciamento
        </Link>
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}} onClick={() => history.push('/unity/manage')}>
          Unidade
        </Link>
        <Typography color='textPrimary' style={{fontWeight: 600}}>Editar</Typography>
      </Breadcrumbs>
      <Box className={classes.container}>
        <Box>
          <Typography variant='h5'>Editar Unidade</Typography>
        </Box>
          <Box display='flex' alignItems='flex-start' justifyContent='flex-start' flex={1}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize={true}>
              {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue, 
                  resetForm,
                  /* and other goodies */
                }) => (
                  <Form>
                    <MainInfo 
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}/>
                    <Setor
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}/>
                    <Status
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}/>
                    <Box display='flex' flexDirection='row' marginTop='1.8rem'>
                      <Divider />
                      <Button type='submit' color='primary' style={{ marginRight: '1.2rem', color: '#fff' }} variant='contained' disabled={isSubmitting} disableElevation>
                        Enviar
                      </Button>
                      <Button color='secondary' style={{ color: '#fff' }} variant='contained' disableElevation onClick={() => setInitialValues(initialValues_)}>
                        Limpar tudo
                      </Button>
                    </Box>
                  </Form>
                )}
            </Formik>
          </Box>
      </Box>
    </Box>
  )
}

export default UnityEdit;