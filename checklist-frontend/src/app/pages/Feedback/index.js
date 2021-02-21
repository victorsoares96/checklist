import React from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import useChecklist from '../../utils/useChecklist';

const Feedback = () => {
  const classes = useStyles();
  const { replace } = useHistory();
  const { registerFeedback } = useChecklist();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório')
      .min(5, 'Digite um nome válido com no minimo 5 caracteres'),
    message: Yup.string().required('O comentário é obrigatório')
      .min(10, 'Digite um comentário de pelo menos 10 caracteres'),
  });

  const handleSubmit = async (feedback, { setSubmitting }) => {
    const { name, message } = feedback;
    setSubmitting(true);
    await registerFeedback(name, message);
    setSubmitting(false);
    replace('/');
  }
  return (
    <Box>
      <Typography variant='h5'>Deixe sua opnião</Typography>
      <Typography variant='h6' color='textSecondary'>
        Alguma reclamação, dúvida ou sugestão? Por favor nos informe!
      </Typography>
      <Formik
      initialValues={{
        name: '',
        message: '',
      }}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={handleSubmit}>
        {({
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form>
              <Box marginTop='30px'>
                <Card className={classes.card} variant="outlined">
                  <CardContent>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                      Informe seu nome e comentário sobre o sistema
                    </Typography>
                    <TextField
                    autoFocus
                    name="name"
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    disabled={isSubmitting}
                    label='Nome Completo:'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    //value={values.name}
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                    autoComplete='name' />
                    <TextField
                    name='message'
                    fullWidth
                    label='Comentário:'
                    disabled={isSubmitting}
                    margin='normal'
                    multiline
                    rows={10}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    //value={values.message}
                    helperText={touched.message ? errors.message : ""}
                    error={touched.message && Boolean(errors.message)}
                    placeholder="Dê seu comentário ou opnião:"
                    variant="outlined"/>
                  </CardContent>
                </Card>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={3}>
                    <Button
                    variant='contained' 
                    color='primary' 
                    fullWidth
                    disabled={isSubmitting}
                    className={classes.footerButton}
                    disableElevation 
                    onClick={handleSubmit}>
                      Enviar
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button 
                    variant='contained' 
                    color='secondary' 
                    disableElevation 
                    fullWidth 
                    onClick={() => replace('/')} 
                    disabled={isSubmitting}
                    className={classes.footerButton}>
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
      </Formik>
    </Box>
  );
}

export default Feedback;