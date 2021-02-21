import React, { useCallback, useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
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

import { useStyles } from './styles';
import getCompanyByCNPJ from '../../../utils/getCompanyByCNPJ';
import { useHistory } from 'react-router-dom';
import validateCNPJ from '../../../utils/validateCNPJ';

const UnityCreate = () => {
  const classes = useStyles();
  const history = useHistory();
  const { createUnity, loading } = useUnity();
  const [loadingCEPInfo, setLoadingCEPInfo] = useState(false);
  const [dialogState, setDialogState] = useState(false);
  
  const handleOpenDialog = () => {
    setDialogState(true);
  };

  const handleCloseDialog = () => {
    setDialogState(false);
  };
  
  const validationSchema = Yup.object().shape({
    razao_social: Yup.string().required('A razão social é obrigatória')
      .min(6, 'Digite um nome válido com no minimo 6 caracteres'),
    nome_fantasia: Yup.string().required('O nome fantasia é obrigatório')
      .min(6, 'Digite um nome válido com no minimo 6 caracteres'),
    apelido: Yup.string().required('O apelido é obrigatório')
      .min(4, 'Digite um nome válido com no minimo 4 caracteres'),
    cnpj: Yup.string().required('O cnpj é obrigatório')
      .min(14, 'Digite um cnpj válido com 14 digitos')
      .test('is-valid', 'Digite um cnpj válido', value => validateCNPJ(value) === true),
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
  function handleCNPJ(cnpj, setFieldValue, setFieldError) {
    if(cnpj) {
      try {
        if(!validateCNPJ(normalize(cnpj))) throw 'Digite um CNPJ válido';
        setFieldError('cnpj', '');
      } catch (error) {
        setFieldError('cnpj', error);
      } finally {
        setFieldValue('cnpj', normalize(cnpj));
      }
    }
  }
  async function handleLocationInfo(cep, setFieldValue, setFieldError) {
    if(cep) {
      try {
        setLoadingCEPInfo(true);
        const response = await getLocationByCEP(cep);
        //console.log(response);
        setLoadingCEPInfo(false);
        setFieldValue('contact.cep', normalize(cep));
        setFieldValue('contact.logradouro', response.logradouro);
        setFieldValue('contact.complemento', response.complemento || '');
        setFieldValue('contact.estado', response.estado_info.nome);
        setFieldValue('contact.cidade', response.cidade);
        setFieldValue('contact.bairro', response.bairro);
        setFieldError('contact.cep', '');
      } catch (error) {
        setFieldError('contact.cep', 'CEP Inválido');
      } finally {
        setLoadingCEPInfo(false);
      }
    }
  }
  /*async function handleCompanyInfo(cnpj) {
    if(cnpj) {
      try {
        const response = await getCompanyByCNPJ(normalize(cnpj));
      } catch (error) {
        //console.log(error);
      }
    }
  }*/
  async function handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      await createUnity(values);
      //console.log(values);
      setSubmitting(false);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  }
  const initialValues = {
    apelido: '',
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
    setores: [{
      nome: '',
      cargos: [
        { nome: '' },
      ]
    }],
    status: 'ativo'
  };
  const MainInfo = ({ values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldError }) => {
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
        onBlur={(e) => handleCNPJ(e.target.value, setFieldValue, setFieldError)}
        value={values.cnpj}>
          {() => {
            return (
              <TextField 
              name="cnpj"
              variant='outlined'
              margin='normal'
              required
              fullWidth
              helperText={errors.cnpj}
              error={Boolean(errors.cnpj)}
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
              defaultValue='Brasil'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.pais}
              autoComplete='country' />
            </Grid>
            <Grid item xs={12} sm={2}>
              <ReactInputMask 
              mask="99999-999" 
              disabled={loadingCEPInfo} 
              onBlur={(e) => handleLocationInfo(e.target.value, setFieldValue, setFieldError)} 
              onChange={handleChange} 
              value={values.contact?.cep}>
                {() => {
                  return (
                    <TextField
                    fullWidth
                    name="contact.cep"
                    variant='outlined'
                    margin='normal'
                    required
                    label='CEP:'
                    helperText={errors.contact?.cep}
                    error={Boolean(errors.contact?.cep)}
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
              required
              label={values.logradouro ? '' : 'Logradouro:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.logradouro}
              helperText={touched.contact?.logradouro ? errors.contact?.logradouro : ""}
              error={touched.contact?.logradouro && Boolean(errors.contact?.logradouro)}
              autoComplete='address-line1' />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
              disabled={loadingCEPInfo}
              fullWidth
              name="contact.numero"
              variant='outlined'
              margin='normal'
              required
              label={values.numero ? '' : 'Numero:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.numero}
              helperText={touched.contact?.numero ? errors.contact?.numero : ""}
              error={touched.contact?.numero && Boolean(errors.contact?.numero)}
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
              required
              label={values.estado ? '' : 'Estado:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.estado}
              helperText={touched.contact?.estado ? errors.contact?.estado : ""}
              error={touched.contact?.estado && Boolean(errors.contact?.estado)}
              autoComplete='address-line4' />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
              disabled={loadingCEPInfo}
              fullWidth
              name="contact.cidade"
              variant='outlined'
              margin='normal'
              required
              label={values.cidade ? '' : 'Cidade:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.cidade}
              helperText={touched.contact?.cidade ? errors.contact?.cidade : ""}
              error={touched.contact?.cidade && Boolean(errors.contact?.cidade)}
              autoComplete='address-line4' />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
              disabled={loadingCEPInfo}
              fullWidth
              name="contact.bairro"
              variant='outlined'
              margin='normal'
              required
              label={values.bairro ? '' : 'Bairro:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.bairro}
              helperText={touched.contact?.bairro ? errors.contact?.bairro : ""}
              error={touched.contact?.bairro && Boolean(errors.contact?.bairro)}
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
                    required
                    fullWidth
                    helperText={touched.contact?.phone ? errors.contact?.phone : ""}
                    error={touched.contact?.phone && Boolean(errors.contact?.phone)}
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
              required
              label={values.email ? '' : 'E-Mail:'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact?.email}
              helperText={touched.contact?.email ? errors.contact?.email : ""}
              error={touched.contact?.email && Boolean(errors.contact?.email)}
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
        <Typography color='textPrimary' style={{fontWeight: 600}}>Adicionar</Typography>
      </Breadcrumbs>
      <Box className={classes.container}>
        <Box>
          <Typography variant='h5'>Adicionar Unidade</Typography>
        </Box>
        <Box display='flex' alignItems='flex-start' justifyContent='flex-start' flex={1}>
          <Formik 
          initialValues={initialValues} 
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={validationSchema} 
          validateOnBlur={false} 
          validateOnChange={false}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                setFieldError,
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
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}/>
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
                    <Button color='primary' style={{ marginRight: '1.2rem', color: '#fff' }} variant='contained' onClick={handleSubmit} disabled={isSubmitting} disableElevation>
                      Enviar
                    </Button>
                    <Button color='secondary' style={{ color: '#fff' }} variant='contained' disableElevation onClick={resetForm}>
                      Limpar tudo
                    </Button>
                  </Box>
                  <Dialog
                    open={dialogState}
                    onClose={handleCloseDialog}
                    aria-labelledby="unity-confirm-dialog-title"
                    aria-describedby="unity-confirm-dialog-description"
                  >
                    <DialogTitle id="unity-confirm-dialog-title">{"Confira as informações"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="unity-confirm-dialog-description">
                        <Typography>
                          <strong>Razão Social: </strong>
                          {values.razao_social}
                        </Typography>
                        <Typography>
                          <strong>Nome Fantasia: </strong>
                          {values.nome_fantasia}
                        </Typography>
                        <Typography>
                          <strong>Apelido: </strong>
                          {values.apelido}
                        </Typography>
                        <Typography>
                          <strong>CNPJ: </strong>
                          {values.cnpj}
                        </Typography>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color='secondary' variant='contained' disableElevation>
                        Voltar
                      </Button>
                      <Button type='submit' color="primary" variant='contained' disableElevation disabled={isSubmitting} onClick={handleSubmit}>
                        Confirmar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Form>
              )}
          </Formik>
        </Box>
      </Box>
    </Box>
  )
}

export default UnityCreate;