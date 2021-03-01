import { merge } from "lodash";
class LineBarMix {
  getLineBarMixOpt({ dataTime, androidCount, androidSaturation, iosCount, iosSaturation }) {
    return merge({}, this.lineBarMixStyle, {
      legend: {
        data: ["Android", "IOS"]
      },
      tooltip: {},
      xAxis: [
        {
          data: dataTime,
          axisLabel: {
            rotate: dataTime.length >= 10 ? 45 : 0,
            formatter: "{value}"
          }
        }
      ],
      series: [
        {
          name: "Android",
          type: "bar",
          barMaxWidth: 25,
          barMinWidth: 20,
          data: androidCount
        },
        {
          name: "IOS",
          type: "bar",
          barMaxWidth: 25,
          barMinWidth: 20,
          data: iosCount
        },
        {
          name: "Android",
          type: "line",
          yAxisIndex: 1,
          data: androidSaturation,
          smooth: false,
          symbolSize: "7",
          symbol: "circle",
          itemStyle: {
            color: "#252F4D",
            borderColor: "#30b9f3",
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowBlur: 3,
            shadowOffsetY: 2,
            opacity: 1,
            borderType: "solid",
            borderWidth: 1
          },
          lineStyle: {
            color: "#30b9f3",
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowBlur: 4,
            shadowOffsetY: 3,
            opacity: 1,
            width: 2
          }
        },
        {
          name: "IOS",
          type: "line",
          yAxisIndex: 1,
          data: iosSaturation,
          smooth: false,
          symbolSize: "7",
          symbol: "circle",
          itemStyle: {
            color: "#252F4D",
            borderColor: "#676ce5",
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowBlur: 3,
            shadowOffsetY: 2,
            opacity: 1,
            borderType: "solid",
            borderWidth: 1
          },
          lineStyle: {
            color: "#676ce5",
            shadowColor: "rgba(0, 0, 0, 0.6)",
            shadowBlur: 4,
            shadowOffsetY: 3,
            opacity: 1,
            width: 2
          }
        }
      ]
    });
  }
  lineBarMixStyle = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999"
        }
      }
    },
    legend: {
      icon: "rect",
      bottom: 16,
      itemHeight: 10,
      itemWidth: 10
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "12%",
      top: "12%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category"
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "量级（柱状图）",
        min: 0,
        axisLabel: {
          formatter: "{value}"
        },
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: "dashed"
          }
        }
      },
      {
        type: "value",
        name: "饱和度（折线图）",
        min: 0,
        axisLabel: {
          formatter: value => {
            return (value * 100).toFixed(2) + "%";
          }
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
      }
    ]
  };
}

export { LineBarMix };
