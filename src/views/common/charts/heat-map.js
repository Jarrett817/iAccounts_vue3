/**
 * 获取热力图option
 * @param {Array []} data 图表生成参数
 [
  {
    yData:{label:'a1'},
    xGroup:[{label:'b1',value:100},{label:'b2',value:100}]
  },
  {
    yData:{label:'a2'},
    xGroup:[{label:'b1',value:100},{label:'b2',value:100}]
  }
 ]
 */
import { merge } from "lodash";
class HeatMap {
  getHeatMapOpt(data) {
    const model = {
      xData: [],
      yData: [],
      mapData: [],
      maxData: 0,
      minData: null
    };
    data.forEach((yItem, yIndex) => {
      model.yData.push(yItem.yData.label);
      yItem.xGroup.forEach((xItem, xIndex) => {
        model.mapData.push([xIndex, yIndex, xItem.value || 0]);
        if (xItem.value > model.maxData) model.maxData = xItem.value;
        if (model.minData === null) model.minData = xItem.value;
        if (xItem.value < model.minData) model.minData = xItem.value;
      });
    });
    model.xData = data[0].xGroup.map(item => item.label);
    const { xData, yData, mapData, maxData, minData } = model;
    return merge({}, this.heatMapStyle, {
      xAxis: {
        data: xData
      },
      yAxis: {
        data: yData
      },
      visualMap: {
        min: minData,
        max: maxData
      },
      series: [
        {
          data: mapData
        }
      ]
    });
  }
  heatMapStyle = {
    tooltip: {},
    grid: {
      height: "68%",
      width: "80%",
      top: "15%",
      left: "12%"
    },
    xAxis: {
      type: "category",
      splitArea: {
        show: true
      },
      axisLabel: {
        rotate: 45,
        color: "#B8C8EE",
        interval: 0
      },
      position: "top"
    },
    yAxis: {
      type: "category",
      splitArea: {
        show: true
      },
      axisLabel: {
        color: "#B8C8EE",
        interval: 0
      }
    },
    visualMap: {
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "2%",
      text: ["高", "低"],
      precision: 2,
      textStyle: {
        color: "#B8C8EE"
      },
      inRange: {
        color: ["#FFF6E3", "#f1a699", "#f3241d"]
      }
    },
    series: [
      {
        type: "heatmap",
        label: {
          show: true
        },
        blur: {
          itemStyle: {
            opacity: 0.8
          }
        },
        emphasis: {
          focus: "self",
          blurScope: "coordinateSystem",
          itemStyle: {
            shadowBlur: 15,
            shadowColor: "rgba(0, 0, 0, 0.6)"
          },
          label: {
            fontSize: 18
          }
        }
      }
    ]
  };
}

export { HeatMap };
