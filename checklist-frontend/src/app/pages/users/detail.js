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
  Grid
} from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';

/* Utils */
import useAdmin from '../../utils/useAdmin';
import AsyncButton from '../../components/form/AsyncButton';
import useAuth from '../../utils/useAuth';
import useUnity from '../../utils/useUnity';

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
    color: '#f5f5f5',
    '& .MuiBox-root': {
      padding: '0px',
    },
  },
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
  const { selectedUser } = props;
  const classes = useStyles();
  
  const UserInfo = () => (
    <Card>
      <CardHeader title='Dados Cadastrais'/>
      <Divider/>
      <CardContent>
        <Box className={classes.spaceVertical}>
          <b>Nome:</b> {selectedUser?.name}
        </Box>
        <Box className={classes.spaceVertical}>
          <b>Apelido:</b> {selectedUser?.apelido}
        </Box>
        <Box className={classes.spaceVertical}>
          <b>Usuário:</b> {selectedUser?.user}
        </Box>
        <Box className={classes.spaceVertical}>
          <b>E-Mail:</b> {selectedUser?.email}
        </Box>
        <Box className={classes.spaceVertical}>
          <b>Unidade:</b> {selectedUser?.group}
        </Box>
        <Box className={classes.spaceVertical}>
          <b>Setor:</b> {selectedUser?.sector}
        </Box>
        <Box className={classes.spaceVertical}>
          <b>Cargo:</b> {selectedUser?.cargo}
        </Box>
        <Box className={classes.spaceVertical}>
          <b>Tipo:</b> {selectedUser?.type}
        </Box>
      </CardContent>
      <Divider/>
      <CardActions>
        <Box display='flex' flexDirection='row' margin='10px'>
          <Button 
          variant='contained' 
          href={`/users/edit/${selectedUser?._id}`} 
          size='small'
          style={{fontWeight: 600}}
          disableElevation>
            Editar Usuário
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
  const Actions = () => {
    const { user } = useAuth();
    const history = useHistory();
    const { updateUserByID, deleteUserByID, loading } = useAdmin();
    
    const desactivateUser = useCallback( async () => {
      await updateUserByID(selectedUser._id, { status: 'inativo'});
    }, []);

    const deleteUser = useCallback( async () => {
      await deleteUserByID(user._id, selectedUser._id);
      history.replace('/users/manage');
    }, []);

    return (
      <Card>
        <CardHeader title='Ações Administrativas'/>
        <Divider/>
        <CardContent>
          <Box display='flex' flexDirection='column' justifyContent='flex-start'>
            <AsyncButton 
            style={{fontWeight: 600}} 
            className={classes.spaceVertical}
            startIcon={<Icon className='fas fa-ban'/>}
            disableElevation
            color='secondary'
            loading={loading}
            loadingSize={20}
            onClick={desactivateUser}>
              Desativar Conta
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
            {
              user.type === 'admin' && (
                <Box>
                  <AsyncButton 
                  variant='contained' 
                  color='secondary' 
                  style={{fontWeight: 600, margin: '20px 0px'}} 
                  startIcon={<Icon className='fas fa-trash-alt'/>}
                  disableElevation
                  loading={loading}
                  loadingSize={20}
                  onClick={deleteUser}>
                    Deletar Conta
                  </AsyncButton>
                  <Typography variant='body1'>
                    Esta ação remove os dados deste usuário e seu cadastro do sistema, 
                    após concluída, esta ação não pode ser desfeita e os dados não podem ser recuperados.
                  </Typography>
                </Box>
              )
            }
          </Box>
        </CardContent>
      </Card>
    )
  }
  return (
    <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='flex-start'>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <UserInfo />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Actions />
        </Grid>
      </Grid>
    </Box>
  );
}

const UserDetail = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { getUserByID, loading } = useAdmin();
  const { getUnityByID, getSectorByID, getCargoByID } = useUnity();
  const [user, setUser] = useState([]);
  const [value, setValue] = useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function loadUser(id) {
      try {
        const user = await getUserByID(id);
        const userUnity = await getUnityByID(user.group);
        const userSector = await getSectorByID(user.group, user.setor);
        const userCargo = await getCargoByID(user.group, user.setor, user.funcao);
        setUser({
          ...user,
          group: userUnity.apelido,
          sector: userSector.nome,
          cargo: userCargo.nome
        });
      } catch (error) {
        console.log(error);
      }
    }
    loadUser(id);
  }, []);

  return (
    <Box>
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}} onClick={() => history.push('/home/dashboard')}>
          Gerenciamento
        </Link>
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}} onClick={() => history.push('/users/manage')}>
          Usuários
        </Link>
        <Typography color='textPrimary' style={{fontWeight: 600}}>
          {loading ? 'Carregando...' : user?.apelido}
        </Typography>
      </Breadcrumbs>
      <Box marginTop='20px'>
        <Typography variant='h4' className={classes.spaceVertical}>
          {user?.apelido}
        </Typography>
        <Paper>
          <Tabs value={value} onChange={handleChange} indicatorColor='primary' textColor='primary'>
            <Tab label="Detalhes" {...a11yProps(0)} />
            <Tab label="Atividades" {...a11yProps(1)} disabled/>
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0} classes={{ root: classes.tab }}>
          <DetailBox selectedUser={user}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Atividades
        </TabPanel>
      </Box>
    </Box>
  )
}

export default UserDetail;