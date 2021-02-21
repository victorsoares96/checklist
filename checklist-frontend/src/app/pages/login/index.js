import React, { useRef, useCallback, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';

/* Animation's */
import Lottie from 'react-lottie';
import checklist from '../../../assets/animations/checklist.json';

import {
  Avatar,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core';

import Input from '../../components/form/TextField';
import { Checkbox } from 'unform-material-ui';
import { Form } from '@unform/web';
import useAuth from '../../utils/useAuth';

import { useStyles } from './styles';
import AsyncButton from '../../components/form/AsyncButton';
import Changelog from '../../shared/components/Changelog';

function Copyright() {
  const [openChangelog, setChangelogOpenStatus] = useState(false);

  return (
    <Box textAlign='center'>
      <Changelog open={openChangelog} handleClose={() => setChangelogOpenStatus(false)}/>
      <Link variant='body2' href='#' color='textSecondary' onClick={() => setChangelogOpenStatus(true)}>
        {process.env.REACT_APP_VERSION}
      </Link>
      <Typography variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link color="inherit" href="https://victorsoares96.netlify.app">
          Victor Soares
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

export default function SignIn() {
  const classes = useStyles();
  const formRef = useRef(null);
  const { login, loading, storageRememberMe } = useAuth();
  const isStopped = false;
  const isPaused = false;
  const defaultOptions = {
    loop: false,
    autoplay: true, 
    animationData: checklist,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  const initialData = { 
    user: storageRememberMe?.userName,
    remember: storageRememberMe?.status 
  };
  useEffect(() => {
    formRef.current.setData({ 
      user: storageRememberMe?.userName,
      remember: storageRememberMe?.status
    });
  }, []);
  const handleLogin = useCallback((data) => {
    const { user, password, remember } = data;

    /* Remove whitespaces from end & start username */
    login({ user: user.trim(), password, remember });
  }, [login]);

  async function handleSubmit(data , { reset }) {
    formRef.current.setErrors({});
    try {
      const schema = Yup.object().shape({
        user: Yup.string().required('O usuário é obrigatório'),
        password: Yup.string().required('A senha é obrigatória')
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      handleLogin(data);
    } catch (error) {
      if(error instanceof Yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });
        formRef.current.setErrors(errorMessages);
      }
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Lottie options={defaultOptions} height={150} width={150} isStopped={isStopped} isPaused={isPaused}/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Checklist
        </Typography>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
          <Input 
          name='user' 
          variant="outlined" 
          margin="normal" 
          fullWidth
          placeholder="Usuário:"
          autoFocus
          />
          <Input
          name='password'
          type='password'
          variant="outlined" 
          margin="normal" 
          fullWidth
          placeholder="Senha:"
          autoComplete='current-password'/>
          <Box marginTop='10px'>
            <Typography variant='subtitle2'>
              <Checkbox name="remember" color='primary'/>
              Lembre de mim
            </Typography>
          </Box>
          <AsyncButton 
          type='submit' 
          fullWidth
          className={classes.loginButton}
          variant='contained' 
          color='primary'
          disabledElevation={loading}
          loading={loading} 
          loadingSize={25}>
            Entrar
          </AsyncButton>
          <Grid container>
            <Grid item xs>
              <Link href='https://api.whatsapp.com/send?phone=5585994302136&text=Oi%2C%20esqueci%20minha%20senha%20do%20checklist' variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href='https://api.whatsapp.com/send?phone=5585994302136&text=Oi%2C%20queria%20tirar%20uma%20dúvida%20sobre%20o%20checklist' variant="body2">
                {"Preciso de ajuda!"}
              </Link>
            </Grid>
          </Grid>
          </Form>
      </Box>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}