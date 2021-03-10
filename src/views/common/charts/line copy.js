/**
 * 获取折线图option
 * @param {Object} list 图表生成参数
 * {
 *  //对应图例进行分组
 *  legendData:[
 *    {name:"ANDROID",field:"androidSaturation"},
 *    {name:"IOS",field:"iosSaturation"}
 *  ],
 *  valueAxisData: "饱和度（折线图）",
 *  data:[
 *    {
 *      categoryData:'',
 *      iosSaturation:''
 *      androidSaturation:''
 *    }
 *  ]
 * }
 */
import { merge } from "lodash";
import { ChartFactory } from "./chart-factory";
class LineFactory extends ChartFactory {
  constructor() {
    super();
  }
  getChartOption(list) {
    const model = {
      legendData: [],
      categoryAxisData: [],
      seriesData: []
    };
    model.legendData = list.legendData.map(item => item.name);
    model.legendData.forEach(legendName => {
      const dataArray = list.data.map(item => {
        model.categoryAxisData.push(item.categoryData);
        const seriesField = list.legendData.find(item => item.name === legendName).field;
        return item[seriesField];
      });
      model.seriesData.push({
        name: legendName,
        type: "line",
        data: dataArray
      });
    });
    if (Object.keys(model.legendData).length > 1)
      model.categoryAxisData = model.categoryAxisData.slice(0, model.categoryAxisData.length / 2);
    const { legendData, seriesData, categoryAxisData } = model;
    return merge({}, this.lineStyle, {
      legend: {
        data: legendData.length > 1 ? legendData : []
      },
      yAxis: [
        {
          name: list.valueAxisData || ""
        }
      ],
      xAxis: {
        type: "category",
        data: categoryAxisData,
        axisLabel: {
          rotate: categoryAxisData.length >= 10 ? 45 : 0,
          formatter: "{value}"
        }
      },
      series: seriesData
    });
  }
  lineStyle = {
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
    yAxis: [
      {
        type: "value",
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

export { LineFactory };
