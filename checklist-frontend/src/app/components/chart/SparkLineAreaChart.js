import React, { useRef } from 'react';
import ReactApexCharts from 'react-apexcharts';
import { Card, Box, Button, Paper } from '@material-ui/core';
import './chart.css';

function getSum(array) {
  let total = 0;
  for (let index = 0; index < array.length; index++) {
    total = total + array[index];
  }
  return total;
}

const SparkLineAreaChart = ({ title, type, data }) => {
  var options = {
    series: [{
      data: data
    }],
    chart: {
    type: type,
    height: 160,
      sparkline: {
        enabled: true
      },
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0,
    },
    colors: ['#DCE6EC'],
    title: {
      text: getSum(data),
      offsetX: 0,
      style: {
        fontSize: '28px',
        color: '#DCE6EC'
      }
    },
    subtitle: {
      text: title,
      offsetX: 0,
      style: {
        fontSize: '18px',
        fontWeight: 600,
        color: '#DCE6EC'
      }
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: false,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: undefined,
      style: {
        fontSize: '14px',
      },
      onDatasetHover: {
          highlightDataSeries: false,
      },
      marker: {
          show: true,
      },
      items: {
         display: 'flex',
      },
      fixed: {
          enabled: false,
          position: 'topRight',
          offsetX: 0,
          offsetY: 0,
      },
      x: {
        show: true,
        format: 'dd MMM',
        formatter: undefined,
      },
      y: {
        formatter: undefined,
        title: {
            formatter: (seriesName) => seriesName,
        },
      },
  }
  };
  return (
    <Paper elevation={1}>
      <ReactApexCharts options={options} series={options.series} type={type} height='120' width="280"/>
    </Paper>
  )
}

export default SparkLineAreaChart;