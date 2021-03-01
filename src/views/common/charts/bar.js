/**
 * 获取柱形图(默认横向)option
 * @param {Object} list 图表生成参数
 * {
 *  //对应图例进行分组
 *  legendData:{
 *    "ANDROID":androidCount,
 *    "IOS":iosCount
 *  },
 *  valueAxisData: "量级（柱状图）",
 *  data:[
 *    {
 *      categoryData:'',
 *      iosCount:''
 *      androidCount:''
 *    }
 *  ]
 * }
 */
import { merge } from "lodash";
import { ChartFactory } from "./chart-factory";
class BarFactory extends ChartFactory {
  constructor() {
    super();
  }
  getChartOption(list, stack = "", isTransverse = true) {
    const model = {
      legendData: [],
      categoryAxisData: [],
      seriesData: []
    };
    model.legendData = Object.keys(list.legendData);
    model.legendData.forEach(legend => {
      const dataArray = list.data.map(item => {
        model.categoryAxisData.push(item.categoryData);
        return item[list.legendData[legend]];
      });
      model.seriesData.push({
        name: legend,
        type: "bar",
        barMaxWidth: 25,
        barMinWidth: 20,
        stack,
        data: dataArray,
        barGap: "100%",
        barCategoryGap: "40%"
      });
    });
    if (Object.keys(model.legendData).length > 1)
      model.categoryAxisData = model.categoryAxisData.slice(0, model.categoryAxisData.length / 2);
    const { legendData, seriesData, categoryAxisData } = model;
    const valueAxisStyle = {
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
    return merge({}, this.barStyle, {
      legend: {
        data: legendData.length > 1 ? legendData : []
      },
      [isTransverse ? "xAxis" : "yAxis"]: [
        {
          type: "value",
          name: list.valueAxisData || "",
          ...valueAxisStyle
        }
      ],
      [isTransverse ? "yAxis" : "xAxis"]: {
        type: "category",
        data: categoryAxisData,
        axisLabel: {
          rotate: isTransverse ? "" : categoryAxisData.length >= 10 ? 45 : 0,
          formatter: "{value}"
        }
      },
      series: seriesData
    });
  }
  barStyle = {
    legend: {
      icon: "rect",
      bottom: 0,
      itemHeight: 10,
      itemWidth: 10
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      left: "3%",
      right: "3%",
      bottom: "40",
      top: "3%",
      containLabel: true
    }
  };
}

export { BarFactory };
