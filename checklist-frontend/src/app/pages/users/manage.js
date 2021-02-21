import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  Box, 
  CssBaseline, 
  Typography, 
  Breadcrumbs, 
  Link, 
  makeStyles, 
  Card, 
  AppBar, 
  Tabs, 
  Tab, 
  LinearProgress
} from '@material-ui/core';

import UserTable from '../../components/table/userTable';
import createData from '../../utils/createData';
import useAdmin from '../../utils/useAdmin';
import useUnity from '../../utils/useUnity';
import findUnity from '../../utils/findUnity';
import findSector from '../../utils/findSector';
import findCargo from '../../utils/findCargo';
import filterArrayObjects from '../../utils/filterArrayObjects';
import useAuth from '../../utils/useAuth';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '10px auto'
  },
  card: {
    margin: '10px auto'
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
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const UserManage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();
  const { getUsers, loading } = useAdmin();
  const { listUnities } = useUnity();
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const headCells = [
    { id: 'description', align: 'left', disablePadding: true, label: 'Apelido' },
    { id: 'col1', align: 'center', disablePadding: false, label: 'Situação' },
    { id: 'col2', align: 'center', disablePadding: false, label: 'Unidade' },
    { id: 'col3', align: 'center', disablePadding: false, label: 'Setor' },
    { id: 'col4', align: 'center', disablePadding: false, label: 'Função' },
  ];
  
  useEffect(() => {
    async function mountTableUsers() {
      try {
        let table = [];
        const userResponse = await getUsers();
        let filteredUsers = [];
        if(user.type === 'admin') {
          filteredUsers = userResponse;
        } else {
          filteredUsers = userResponse.filter(user => {
            return user.type !== 'admin'
          });
        }
        const unityResponse = await listUnities();
        for (const [index, user] of filteredUsers.entries()) {
          table.push(createData(
            user._id,
            user.name,
            user.status,
            findUnity(unityResponse, user.group).apelido || 'Sem unidade',
            findSector(unityResponse, user.setor),
            findCargo(unityResponse, user.funcao)
          ));
        }
        setUsers(table);
      } catch (error) {
        console.log(error);
      }
    }
    mountTableUsers();
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
        <Typography color='textPrimary' style={{fontWeight: 600}}>Gerenciar</Typography>
      </Breadcrumbs>
      <Box className={classes.container}>
        <Typography variant='h5'>Controle de Usuários</Typography>
        <Card className={classes.card} variant="outlined">
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} indicatorColor={loading ? 'primary' : 'secondary'}>
              <Tab label="Todos" {...a11yProps(0)} className={classes.tab} disabled={loading}/>
              <Tab label="Ativos" {...a11yProps(1)} className={classes.tab} disabled={loading}/>
              <Tab label="Inativos" {...a11yProps(2)} className={classes.tab} disabled={loading}/>
              <Tab label="Pendentes" {...a11yProps(3)} className={classes.tab} disabled={loading}/>
            </Tabs>
          </AppBar>
          
          <TabPanel value={value} index={0}>
            {
              loading ? <LinearProgress color='secondary' />
              : <UserTable title='Usuários - Todos' headCells={headCells} rows={users}/>
            }
          </TabPanel>
          <TabPanel value={value} index={1}>
            {
              loading ? <LinearProgress color='secondary' />
              : <UserTable title='Usuários - Ativos' headCells={headCells} rows={filterArrayObjects(users, 'ativo', 'col1')}/>
            }
          </TabPanel>
          <TabPanel value={value} index={2}>
            {
              loading ? <LinearProgress color='secondary' />
              : <UserTable title='Usuários - Inativos' headCells={headCells} rows={filterArrayObjects(users, 'inativo', 'col1')}/>
            }
          </TabPanel>
          <TabPanel value={value} index={3}>
            {
              loading ? <LinearProgress color='secondary' />
              : <UserTable title='Usuários - Pendentes' headCells={headCells} rows={filterArrayObjects(users, 'pendente', 'col1')}/>
            }
          </TabPanel>
        </Card>
      </Box>
    </Box>
  );
};

export default UserManage;