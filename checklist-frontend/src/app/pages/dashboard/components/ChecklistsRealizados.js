import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Box, 
  Divider, 
  Tooltip, 
  useTheme, 
  Select, 
  MenuItem, 
  IconButton, 
  Button,
  useMediaQuery,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import ReactApexCharts from 'react-apexcharts';

/* Icon's */
import { RiFilterOffFill, RiFilterFill } from 'react-icons/ri';

/* Component's */
import FilterDialog from '../../../shared/components/FilterDialog';
import getChecklistName from '../../../utils/getChecklistName';
import BarChartLoading from '../../../components/chart/BarChartLoading';

/* Hook's */
import { useFetch } from '../../../utils/useFetch';
import { startOfMonth } from 'date-fns';

const ChecklistsRealizados = () => {

  const colors = [
    '#564787', 
    '#DBCBD8', 
    '#DBF4A7', 
    '#9AD4D6', 
    '#DB6C79', 
    '#DEB986', 
    '#0A6DD5', 
    '#297149', 
    '#829399'
  ];
  const theme = useTheme();

  const [checklistFilter, setChecklistFilter] = useState(' ');

  const initialBeforeDate = new Date(startOfMonth(new Date()));
  const initialAfterDate = new Date();
  const [beforeDate, setBeforeDate] = useState(initialBeforeDate);
  const [afterDate, setAfterDate] = useState(initialAfterDate);
  
  const [filterDialogOpenStatus, setFilterDialogOpenStatus] = useState(false);

  const unities = useFetch('/unity/list');
  const checklists = useFetch('/checklist/list?ativo=true');
  const countChecklists = useFetch(`/checklist/answer/count?beforeDate=${beforeDate}&afterDate=${afterDate}&checklist=${checklistFilter === ' ' ? '' : checklistFilter}`);
  const listChecklistsByUnity = useFetch(`/checklist/answer/count/byunity?beforeDate=${beforeDate}&afterDate=${afterDate}&checklist=${checklistFilter === ' ' ? '' : checklistFilter}`);

  function filterDate(beforeDate, afterDate) {
    setBeforeDate(beforeDate);
    setAfterDate(afterDate);
  }

  const resetFilters = () => {
    setBeforeDate(initialBeforeDate);
    setAfterDate(initialAfterDate);
    setChecklistFilter(' ');
  }

  const options = {
    chart: {
      height: 350,
      sparkline: {
        enabled: false
      },
      type: 'bar',
      events: {
        click: function(chart, w, e) {
          console.log(chart, w, e)
        }
      }
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '24px',
        fontWeight: 600,
        colors: theme.palette.type === 'light' ? ['#333333'] : ['#f5f5f5']
      }
    },
    legend: {
      show: false
    },
    xaxis: {
      labels: {
        style: {
          colors: colors,
          fontSize: '14px',
          fontWeight: 600
        }
      }
    },
    yaxis: {
      show: false,
      min: undefined,
      tickAmount: undefined,
      labels: {
        show: true,
        style: {
          colors: theme.palette.type === 'light' ? '#000000' : '#f5f5f5',
          fontSize: '16px',
          fontWeight: 600 
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      },
    }
  }

  const ChartFilters = () => {
    if(!checklists.data) return <Skeleton variant="text" width='100%' />
    return (
      <>
        <FilterDialog openStatus={filterDialogOpenStatus} handleOpenStatus={() => setFilterDialogOpenStatus(false)} filterDate={filterDate} />
        <Box display='flex' flexDirection='row' margin='5px' alignItems='center'>
          <Typography color='textSecondary' style={{ fontWeight: 600, fontSize: 16, marginRight: '10px' }}>
            Checklist:
          </Typography>
          <Select
          margin='dense' 
          value={checklistFilter}
          color='primary' 
          variant='standard' 
          style={{ fontWeight: 600 }} 
          onChange={e => setChecklistFilter(e.target.value)}
          disabled={!unities.data || !checklists.data}>
            <MenuItem key=' ' value=' '>Todos</MenuItem>
              {checklists.data.checklist.map(unity => <MenuItem key={unity._id} value={unity._id}>{unity.nome}</MenuItem>)}
          </Select>
          <Button
          variant='contained'
          disableElevation
          style={{ marginLeft: 'auto', borderRadius: '25px' }} 
          disabled={!unities.data || !checklists.data}
          onClick={resetFilters}>
            <RiFilterOffFill />
          </Button>
          <IconButton
          disabled={!unities.data || !checklists.data}
          onClick={() => setFilterDialogOpenStatus(true)}>
            <RiFilterFill />
          </IconButton>
        </Box>
        <Divider style={{ marginBottom: '10px' }} />
      </>
    );
  }

  const Chart = () => {
    if(!unities.data || !checklists.data || !countChecklists.data || !listChecklistsByUnity.data) return <BarChartLoading />
    return (
      <Card elevation={0}>
          <CardHeader
          action={
            <Box component='div' margin='10px 10px 0px 0px'>
              <Tooltip title='Consolidado' arrow>
                <Typography variant='h4'>
                  {countChecklists.data?.count}
                </Typography>
              </Tooltip>
            </Box>
          }
          title='Checklists Realizados'
          subheader={
            getChecklistName(checklistFilter, checklists.data.checklist) ? (
              `${getChecklistName(checklistFilter, checklists.data.checklist)}, Período: ${new Date(beforeDate).toLocaleDateString()} até ${new Date(afterDate).toLocaleDateString()}`
            ) : `Consolidado, Período: ${new Date(beforeDate).toLocaleDateString()} até ${new Date(afterDate).toLocaleDateString()}`
          }/>
          <Divider />
        <CardContent>
          <ReactApexCharts 
          options={{
            ...options,
            xaxis: {
              categories: Object.keys(listChecklistsByUnity.data),
              ...options.xaxis
            }
          }} 
          series={[{
            name: 'Realizados',
            data: Object.values(listChecklistsByUnity.data)
          }]} 
          type='bar' 
          height={400} 
          width='100%' />
        </CardContent>
      </Card>
    )
  }
  return (
    <>
      <ChartFilters />
      <Chart />
    </>
  );
}

export default ChecklistsRealizados;