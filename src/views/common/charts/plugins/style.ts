// 图表静态样式
const rectLegendStyle = {
  icon: 'rect',
  bottom: 0,
  itemHeight: 10,
  itemWidth: 10,
};
const circleLegendStyle = {
  icon: 'circle',
  orient: 'vertical',
  top: 'center',
  left: '46%',
  itemHeight: 5,
  itemWidth: 5,
};
const twoDecimalsFormatter = (value: number) => {
  return (value * 100).toFixed(2) + '%';
};
const barSerieBaseStyle = {
  type: 'bar',
  barMaxWidth: 25,
  barMinWidth: 20,
};
const valueAxisStyle = {
  type: 'value',
  min: 0,
  axisLabel: {
    formatter: '{value}',
  },
  axisLine: {
    show: false,
  },
  splitLine: {
    show: true,
    lineStyle: {
      type: 'dashed',
    },
  },
};

const baseChartStyle = {
  legend: {},
  tooltip: {},
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
  },
  series: [],
};

const barStyle = {
  ...baseChartStyle,
  legend: rectLegendStyle,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '40',
    top: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      formatter: '{value}',
    },
  },
  yAxis: {
    ...valueAxisStyle,
  },
  series: [
    {
      ...barSerieBaseStyle,
    },
    {
      ...barSerieBaseStyle,
    },
  ],
};
const stackBarStyle = {
  ...barStyle,
  xAxis: {
    ...valueAxisStyle,
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      formatter: '{value}',
    },
  },
};
const lineBarMixStyle = {
  ...barStyle,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999',
      },
    },
  },
  xAxis: {
    axisLabel: {
      formatter: '{value}',
    },
  },
  legend: rectLegendStyle,
  grid: {
    left: '3%',
    right: '3%',
    bottom: '12%',
    top: '12%',
    containLabel: true,
  },
  yAxis: [
    {
      //   name: '量级（柱状图）',
      ...valueAxisStyle,
    },
    {
      //   name: '饱和度（折线图）',
      ...valueAxisStyle,
      axisLabel: {
        formatter: twoDecimalsFormatter,
      },
    },
  ],
};
const reflectedBarStyle = {
  ...barStyle,
  legend: [
    {
      // data: ['tgi>=100', 'tgi<=100'],
      x: 'left',
      bottom: 0,
    },
    {
      // data: ['Android'],
      x: 'right',
      bottom: 0,
    },
  ],
  axisPointer: {
    link: { xAxisIndex: 'all' },
  },
  grid: [
    {
      left: '52%',
      right: 50,
    },
    {
      left: 50,
      right: '52%',
    },
  ],
  xAxis: [
    {
      type: 'value',
    },
    {
      gridIndex: 1,
      type: 'value',
      inverse: true,
    },
  ],
  yAxis: [
    {
      type: 'category',
    },
    {
      gridIndex: 1,
      axisLabel: {
        show: false,
      },
      type: 'category',
    },
  ],
  series: [
    {
      barMaxWidth: 25,
      barMinWidth: 20,
      // name: 'Android',
      type: 'bar',
      label: {
        show: true,
        position: 'top',
      },
      // data: [7, 0.96, 0.96, 0.95],
    },
    {
      barMaxWidth: 25,
      barMinWidth: 20,
      // name: 'tgi>=100',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      label: {
        show: true,
        position: 'bottom',
      },
      // data: [2, null, 6, null],
    },
    {
      barMaxWidth: 25,
      barMinWidth: 20,
      // name: 'tgi<=100',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      label: {
        show: true,
        position: 'bottom',
      },
      // data: [null, 3, null, 7],
      barGap: '-100%',
      markLine: {
        silent: true,
        symbol: 'none',
        lineStyle: {
          symbol: 'none',
          color: '#333',
        },
        data: [
          {
            xAxis: 100,
          },
        ],
      },
    },
  ],
};
const heatMapStyle = {
  ...baseChartStyle,
  grid: {
    height: '68%',
    width: '80%',
    top: '15%',
    left: '12%',
  },
  xAxis: {
    type: 'category',
    splitArea: {
      show: true,
    },
    axisLabel: {
      color: '#B8C8EE',
      interval: 0,
    },
    position: 'top',
  },
  yAxis: {
    type: 'category',
    splitArea: {
      show: true,
    },
    axisLabel: {
      color: '#B8C8EE',
      interval: 0,
    },
  },
  visualMap: {
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '2%',
    text: ['高', '低'],
    precision: 2,
    textStyle: {
      color: '#B8C8EE',
    },
    inRange: {
      color: ['#FFF6E3', '#f1a699', '#f3241d'],
    },
  },
  series: [
    {
      type: 'heatmap',
      label: {
        show: true,
      },
      blur: {
        itemStyle: {
          opacity: 0.8,
        },
      },
      emphasis: {
        focus: 'self',
        blurScope: 'coordinateSystem',
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
        },
        label: {
          fontSize: 18,
        },
      },
    },
  ],
};

const pictorialBarStyle = {
  tooltip: {
    formatter: (params: any) => {
      if (params?.length) {
        return `${params[0].name}：${params[0].value}`;
      } else {
        return `${params.name}：${params.value}`;
      }
    },
  },
  yAxis: {
    inverse: true,
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      margin: 10,
      color: '#9DACD1',
      fontSize: 16,
    },
    axisPointer: {
      show: true,
      type: 'none',
      label: {
        show: false,
      },
    },
  },
  xAxis: {
    show: false,
  },
  grid: {
    top: 'center',
    height: 200,
    left: '15%',
    right: '25%',
    width: '50%',
  },
};

const pieStyle = {
  ...baseChartStyle,
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
  },
  width: '100%',
  legend: {
    ...circleLegendStyle,
    textStyle: {
      rich: {
        title: {
          align: 'left',
          width: 48,
          padding: [0, 24, 0, 0],
        },
        default: {
          align: 'left',
          width: 48,
          padding: [0, 24, 0, 0],
          color: '#b8c8ee',
        },
      },
    },
  },
  series: [
    {
      type: 'pie',
      // radius: ['28%', '44%'],
      center: ['23%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '18',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
    },
  ],
};

export {
  lineBarMixStyle,
  stackBarStyle,
  pieStyle,
  pictorialBarStyle,
  heatMapStyle,
  reflectedBarStyle,
};
