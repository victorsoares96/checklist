import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardHeader, IconButton, CardContent, CardActions, Typography, Box, Divider, Button, Tooltip, useTheme } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import ReactApexCharts from 'react-apexcharts';
import getSum from '../../../utils/getSum';

import useAdmin from '../../../utils/useAdmin';
import useUnity from '../../../utils/useUnity';

const UsuariosAtivos = ({ title, subtitle }) => {
  const colors = ['#7D84B2', '#8FA6CB', '#DBF4A7', '#D5F9DE', '#DB6C79', '#DEB986'];
  const theme = useTheme();
  const { getUsers } = useAdmin();
  const { listUnities } = useUnity();
  const defaultOptions = {
    series: [{
      data: []
    }],
    options: {
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
          colors: ['#333333']
        }
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [],
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
    },
  }
  const [options, setOptions] = useState(defaultOptions);
  useEffect(() => {
    async function loadGraphData() {
      const users = await getUsers();
      
      function getUsersByUnity(unityID) {
        return users.filter(user => {
          return user.group === unityID && user.status === 'ativo';
        }).length
      }
      
      const unities = await listUnities();
      const activeUnities = unities.filter(unity => {
        return unity.status === 'ativo'
      });
      let unitiesNames = [];
      let unitiesSeries = [];
      activeUnities.forEach(unity => {
        unitiesNames.push(unity.apelido);
        unitiesSeries.push(getUsersByUnity(unity._id));
      });
      setOptions(
        {
          ...options,
          series: [{
            data: unitiesSeries
          }],
          options: {
            xaxis: {
              categories: unitiesNames
            }
          }
        }
      );
    }
    loadGraphData();
  }, []);

  const memoGraph = useMemo(() => (
    <Card elevation={2}>
      <CardHeader
        action={
          <Box component='div' margin='10px 10px 0px 0px'>
            <Tooltip title='Consolidado' arrow>
              <Typography variant='h4'>
                {getSum(options.series[0].data)}
              </Typography>
            </Tooltip>
          </Box>
        }
        title={title}
        subheader={subtitle}
      />
      <Divider />
      <CardContent>
        <ReactApexCharts options={options.options} series={options.series} type='bar' height={400} width={options.options?.chart?.width}/>
      </CardContent>
      <Divider />
      {/*<CardActions disableSpacing>
        <Button
        color='default'
        endIcon={<ShareIcon/>}
        >
        Ver Mais
        </Button>
      </CardActions>*/}
    </Card>
  ), [options]);
  return memoGraph;
}

export default UsuariosAtivos;