import React, { useEffect, useState, useCallback } from 'react';
import { 
  Box, 
  CssBaseline, 
  Breadcrumbs, 
  Link, 
  Typography, 
  Tabs, 
  Tab, 
  Card, 
  makeStyles, 
  Paper,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  Button,
  Icon,
  Grid,
} from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';

/* Utils */
import AsyncButton from '../../../components/form/AsyncButton';
import useAuth from '../../../utils/useAuth';
import useUnity from '../../../utils/useUnity';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '10px 0px'
  },
  spaceVertical: {
    margin: '10px 0px'
  },
  spaceHorizontal: {
    margin: '0px 10px'
  },
  tab: {
    fontWeight: 600, 
    color: '#f5f5f5'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DetailBox = (props) => {
  const { selectedUnity } = props;
  const classes = useStyles();
  const UnityInfo = () => (
    <Card>
      <CardHeader title='Dados Cadastrais'/>
      <Divider/>
      <CardContent>
        <Typography variant='h6'>
          Informações Gerais:
        </Typography>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Razão Social:</b> {selectedUnity?.razao_social}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Nome Fantasia:</b> {selectedUnity?.nome_fantasia}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>CNPJ:</b> {selectedUnity?.cnpj}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Apelido:</b> {selectedUnity?.apelido}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Status:</b> {selectedUnity?.status}
        </Box>
        
        <Divider />
        <Typography variant='h6'>
          Localização:
        </Typography>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>País:</b> {selectedUnity?.contact?.pais}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Estado:</b> {selectedUnity?.contact?.estado}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Cidade:</b> {selectedUnity?.contact?.cidade}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Bairro:</b> {selectedUnity?.contact?.bairro}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>CEP:</b> {selectedUnity?.contact?.cep}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Logradouro:</b> {selectedUnity?.contact?.logradouro}, {selectedUnity?.contact?.numero}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Complemento:</b> {selectedUnity?.contact?.complemento}
        </Box>
        <Divider />

        <Divider />
        <Typography variant='h6'>
          Contato:
        </Typography>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>E-Mail:</b> {selectedUnity?.contact?.email}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Telefone Fixo:</b> {selectedUnity?.contact?.phone}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Telefone Móvel:</b> {selectedUnity?.contact?.phone2}
        </Box>
        <Divider />
        
        <Divider />
        <Typography variant='h6'>
          Setores:
        </Typography>
        {
          selectedUnity?.setores?.map((setor) => {
            return (
              <>
                <Box variant='subtitle1' className={classes.spaceVertical}>
                  <b>Nome:</b> {setor.nome}
                </Box>
                <Box variant='subtitle1' className={classes.spaceVertical}>
                  <Typography style={{ fontWeight: 600, fontSize: 18 }}>Cargos:</Typography>
                  {
                    setor?.cargos?.map(cargo => {
                      return <Typography>{cargo?.nome}</Typography>
                    })
                  }
                </Box>
                <Divider />
              </>
            )
          })
        }
        <Divider />
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Criado em:</b> {new Date(selectedUnity?.createdAt).toLocaleString()}
        </Box>
        <Box variant='subtitle1' className={classes.spaceVertical}>
          <b>Atualizado em:</b> {new Date(selectedUnity?.updatedAt).toLocaleString()}
        </Box>
      </CardContent>
      <Divider/>
      <CardActions>
        <Box display='flex' flexDirection='row' margin='10px 10px'>
          <Button 
          variant='contained' 
          href={`/unity/edit/${selectedUnity?._id}`} 
          size='small'
          style={{fontWeight: 600}}
          disableElevation>
            Editar Unidade
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
  const Actions = () => {
    const history = useHistory();
    const { updateUnityByID, deleteUnityByID, loading } = useUnity();
    const deactivateUnity = useCallback( async () => {
      await updateUnityByID(selectedUnity._id, { status: 'inativo'});
    }, []);
    const deleteUnity = useCallback( async () => {
      await deleteUnityByID(selectedUnity._id);
      history.replace('/unity/manage');
    }, []);
    return (
      <Card>
        <CardHeader title='Ações Administrativas'/>
        <Divider/>
        <CardContent>
          <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='flex-start'>
            <AsyncButton 
            style={{fontWeight: 600}} 
            className={classes.spaceVertical}
            startIcon={<Icon className='fas fa-ban'/>}
            disableElevation
            loading={loading}
            loadingSize={20}
            onClick={deactivateUnity}>
              Desativar Unidade
            </AsyncButton>
            <AsyncButton
            style={{fontWeight: 600}} 
            className={classes.spaceVertical}
            loading={loading}
            loadingSize={20}
            startIcon={<Icon className='fas fa-save'/>}
            disableElevation>
              Exportar Dados
            </AsyncButton>
            <Box>
              <AsyncButton 
              variant='contained' 
              color='secondary' 
              style={{fontWeight: 600, margin: '20px 0px'}} 
              startIcon={<Icon className='fas fa-trash-alt'/>}
              disableElevation
              loading={loading}
              loadingSize={20}
              onClick={deleteUnity}>
                Deletar Unidade
              </AsyncButton>
              <Typography variant='body2' component='p'>
                Esta ação remove os dados desta unidade e seu cadastro do sistema, 
                após concluída, esta ação não pode ser desfeita e os dados não podem ser recuperados, 
                além de afetar e inválidar usuários vinculados a ela.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    )
  }
  return (
    <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='flex-start' marginLeft='0'>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <UnityInfo />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Actions />
        </Grid>
      </Grid>
    </Box>
  );
}
const UnityDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { getUnityByID, loading } = useUnity();
  const [unity, setUnity] = useState([]);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function loadUnity(id) {
      try {
        const response = await getUnityByID(id);
        setUnity(response);
      } catch (error) {
        console.log(error);
      }
    }
    loadUnity(id);
  }, []);
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
        <Typography color='textPrimary' style={{fontWeight: 600}}>
          {loading ? 'Carregando...' : unity?.apelido}
        </Typography>
      </Breadcrumbs>
      <Box marginTop='20px'>
        <Typography variant='h4' className={classes.spaceVertical}>
          {unity?.apelido}
        </Typography>
        <Paper>
          <Tabs value={value} onChange={handleChange} indicatorColor='primary' textColor='primary'>
            <Tab label="Detalhes" {...a11yProps(0)} />
            <Tab label="Atividades" {...a11yProps(1)} disabled/>
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <DetailBox selectedUnity={unity}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Atividades
        </TabPanel>
      </Box>
    </Box>
  )
}

export default UnityDetail;