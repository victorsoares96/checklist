import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  CssBaseline, 
  Typography, 
  Breadcrumbs, 
  Link, 
  Card, 
  AppBar, 
  Tabs, 
  Tab, 
  LinearProgress
} from '@material-ui/core';

import { useStyles } from './styles';

/* Component's */
import createData from '../../../utils/createData';
import useAdmin from '../../../utils/useAdmin';
import filterArrayObjects from '../../../utils/filterArrayObjects';
import useUnity from '../../../utils/useUnity';
import UnityTable from '../../../components/table/unityTable';
import { useHistory } from 'react-router-dom';


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

const UnityManage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { getUsers } = useAdmin();
  const { listUnities } = useUnity();
  const [mainLoading, setMainLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const headCells = [
    { id: 'description', align: 'left', disablePadding: true, label: 'Apelido' },
    { id: 'col1', align: 'center', disablePadding: false, label: 'Situação' },
    { id: 'col2', align: 'center', disablePadding: false, label: 'Cidade' },
    { id: 'col3', align: 'center', disablePadding: false, label: 'Bairro' },
    { id: 'col4', align: 'right', disablePadding: false, label: 'Setores' },
  ];
  useEffect(() => {
    async function load() {
      try {
        let aux = [];
        setMainLoading(true);
        const response = await listUnities();
        console.log(response);
        response.map((item) => aux.push(
          createData(
            item._id, 
            item.apelido, 
            item.status, 
            item.contact.cidade, 
            item.contact.bairro, 
            item.setores.length
          )
        ));
        setUsers(aux);
      } catch (error) {
        console.log(error);
      } finally {
        setMainLoading(false);
      }
    }
    load();
  }, []);
  return (
    <Box>
      <CssBaseline />
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}} onClick={() => history.push('/home/dashboard')}>
          Gerenciamento
        </Link>
        <Link color="inherit" style={{fontWeight: 600, cursor: 'pointer'}} onClick={() => history.push('/unity/manage')}>
          Unidades
        </Link>
        <Typography color='textPrimary' style={{fontWeight: 600}}>Gerenciar</Typography>
      </Breadcrumbs>
      <Box className={classes.container}>
        <Typography variant='h5'>Controle de Unidades</Typography>
        <Card className={classes.card} variant="outlined">
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} indicatorColor={mainLoading === true ? 'primary' : 'secondary'}>
              <Tab label="Todos" {...a11yProps(0)} className={classes.tab} disabled={mainLoading}/>
              <Tab label="Ativos" {...a11yProps(1)} className={classes.tab} disabled={mainLoading}/>
              <Tab label="Inativos" {...a11yProps(2)} className={classes.tab} disabled={mainLoading}/>
              <Tab label="Pendentes" {...a11yProps(3)} className={classes.tab} disabled={mainLoading}/>
            </Tabs>
          </AppBar>
          
          <TabPanel value={value} index={0}>
            {
              mainLoading === true ?
              <LinearProgress color='secondary' />
              :
              <UnityTable title='Unidades - Todos' headCells={headCells} rows={users}/>
            }
          </TabPanel>
          <TabPanel value={value} index={1}>
            {
              mainLoading === true ?
              <LinearProgress color='secondary' />
              :
              <UnityTable title='Unidades - Ativos' headCells={headCells} rows={filterArrayObjects(users, 'ativo', 'col1')}/>
            }
          </TabPanel>
          <TabPanel value={value} index={2}>
            {
              mainLoading === true ?
              <LinearProgress color='secondary' />
              :
              <UnityTable title='Unidades - Inativos' headCells={headCells} rows={filterArrayObjects(users, 'inativo', 'col1')}/>
            }
          </TabPanel>
          <TabPanel value={value} index={3}>
            {
              mainLoading === true ?
              <LinearProgress color='secondary' />
              :
              <UnityTable title='Usuários - Pendentes' headCells={headCells} rows={filterArrayObjects(users, 'pendente', 'col1')}/>
            }
          </TabPanel>
        </Card>
      </Box>
    </Box>
  );
};

export default UnityManage;