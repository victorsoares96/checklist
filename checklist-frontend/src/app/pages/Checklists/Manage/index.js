import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import PropTypes from 'prop-types';
import { 
  Box, 
  CssBaseline, 
  Breadcrumbs, 
  Link, 
  Typography, 
  Card, 
  AppBar, 
  Tabs, 
  Tab, 
  LinearProgress
} from '@material-ui/core';
import useChecklist from '../../../utils/useChecklist';
import createData from '../../../utils/createData';
import ChecklistTable from '../../../components/table/checklistTable';
import filterArrayObjects from '../../../utils/filterArrayObjects';
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

const CheckListManage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { listChecklists } = useChecklist();
  const [checklists, setChecklists] = useState([]);
  const [mainLoading, setMainLoading] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const headCells = [
    { id: 'description', align: 'left', disablePadding: true, label: 'Título' },
    { id: 'col1', align: 'center', disablePadding: false, label: 'Situação' },
    { id: 'col2', align: 'center', disablePadding: false, label: 'Qtde Perguntas' },
    { id: 'col3', align: 'center', disablePadding: false, label: 'Criado' },
    { id: 'col4', align: 'center', disablePadding: false, label: 'Expira' },
  ];
  useEffect(() => {
    async function mountTableChecklists() {
      try {
        let aux = [];
        setMainLoading(true);
        const checklists = await listChecklists();
        checklists.map((checklist) => (
          aux.push(createData(
            checklist._id,
            checklist.nome,
            checklist.ativo ? 'ativo' : 'inativo',
            checklist.perguntas.length,
            new Date(checklist.createdAt).toLocaleDateString(),
            checklist.expirationTime.isUndefined ? 'Indefinido' : new Date(checklist.expirationTime.expiratedAt).toLocaleDateString()
          ))
        ));
        setChecklists(aux);
        setMainLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    mountTableChecklists();
  }, []);
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
        <Typography color='textPrimary' style={{fontWeight: 600}}>Gerenciar</Typography>
      </Breadcrumbs>
      <Box className={classes.container}>
      <Typography variant='h5'>Controle de Checklist's</Typography>
        <Card className={classes.card} variant="outlined">
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} indicatorColor={mainLoading === true ? 'primary' : 'secondary'}>
              <Tab label="Todos" {...a11yProps(0)} className={classes.tab} disabled={mainLoading}/>
              <Tab label="Ativos" {...a11yProps(1)} className={classes.tab} disabled={mainLoading}/>
              <Tab label="Inativos" {...a11yProps(2)} className={classes.tab} disabled={mainLoading}/>
            </Tabs>
          </AppBar>
          
          <TabPanel value={value} index={0}>
            {
              mainLoading === true ?
              <LinearProgress color='secondary' />
              :
              <ChecklistTable title='Checklists - Todas' headCells={headCells} rows={checklists}/>
            }
          </TabPanel>
          <TabPanel value={value} index={1}>
            {
              mainLoading === true ?
              <LinearProgress color='secondary' />
              :
              <ChecklistTable title='Checklists - Ativas' headCells={headCells} rows={filterArrayObjects(checklists, 'ativo', 'col1')}/>
            }
          </TabPanel>
          <TabPanel value={value} index={2}>
            {
              mainLoading === true ?
              <LinearProgress color='secondary' />
              :
              <ChecklistTable title='Checklists - Inativas' headCells={headCells} rows={filterArrayObjects(checklists, 'inativo', 'col1')}/>
            }
          </TabPanel>
        </Card>
      </Box>
    </Box>
  );
}

export default CheckListManage;