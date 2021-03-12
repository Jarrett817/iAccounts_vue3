// 图表静态样式
const rectLegendStyle = {
  icon: "rect",
  bottom: 0,
  itemHeight: 10,
  itemWidth: 10
};
const circleLegendStyle = {
  icon: "circle",
  orient: "vertical",
  top: "center",
  left: "46%",
  itemHeight: 5,
  itemWidth: 5
};
const twoDecimalsFormatter = value => {
  return (value * 100).toFixed(2) + "%";
};
const barSerieBaseStyle = {
  type: "bar",
  barMaxWidth: 25,
  barMinWidth: 20
};
const valueAxisStyle = {
  type: "value",
  min: 0,
  axisLabel: {
    formatter: "{value}"
  },
  axisLine: {
    show: false
  },
  splitLine: {
    show: true,
    lineStyle: {
      type: "dashed"
    }
  }
};

const baseChartStyle = {
  legend: {},
  tooltip: {},
  xAxis: {
    type: "category"
  },
  yAxis: {
    type: "value"
  },
  series: []
};
const pieStyle = {
  ...baseChartStyle,
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c} ({d}%)"
  },
  width: "100%",
  legend: {
    ...circleLegendStyle,
    textStyle: {
      rich: {
        title: {
          align: "left",
          width: 48,
          padding: [0, 24, 0, 0]
        },
        default: {
          align: "left",
          width: 48,
          padding: [0, 24, 0, 0],
          color: "#b8c8ee"
        }
      }
    }
  },
  series: [
    {
      type: "pie",
      // radius: ['28%', '44%'],
      center: ["23%", "50%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "18",
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: false
      }
    }
  ]
};
const barStyle = {
  ...baseChartStyle,
  legend: rectLegendStyle,
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  grid: {
    left: "3%",
    right: "3%",
    // bottom: "40",
    // top: "3%",
    containLabel: true
  },
  xAxis: {
    type: "category",
    axisLabel: {
      formatter: "{value}"
    }
  },
  yAxis: {
    ...valueAxisStyle
  },
  series: [
    {
      ...barSerieBaseStyle
    },
    {
      ...barSerieBaseStyle
    }
  ]
};
const lineBarMixStyle = {
  ...barStyle,
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999"
      }
    }
  },
  xAxis: {
    axisLabel: {
      formatter: "{value}"
    }
  },
  legend: rectLegendStyle,
  grid: {
    left: "3%",
    right: "3%",
    bottom: "12%",
    top: "12%",
    containLabel: true
  },
  yAxis: [
    {
      name: "量级（柱状图）",
      ...valueAxisStyle
    },
    {
      name: "饱和度（折线图）",
      ...valueAxisStyle,
      axisLabel: {
        formatter: twoDecimalsFormatter
      }
    }
  ]
};
export { pieStyle, barStyle, lineBarMixStyle, barSerieBaseStyle };
