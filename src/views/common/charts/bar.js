/**
 * 获取横向柱形图option
 * @param {Object} list 图表生成参数
 * {
 *  //对应图例进行分组
 *  lengendData:{
 *    "ANDROID":androidCount,
 *    "IOS":iosCount
 * }
 *  data:[
 *    {
 *      yData:'',
 *      iosCount:''
 *      androidCount:''
 *    }
 *  ]
 * }
 */
import { merge } from "lodash";
class Bar {
  getBarOpt(list) {
    const model = {
      lengendData: [],
      yAxisData: [],
      seriesData: []
    };
    model.lengendData = Object.keys(list.lengendData);
    model.lengendData.forEach(lengend => {
      const dataArray = list.data.map(item => {
        model.yAxisData.push(item.yData);
        return item[list.lengendData[lengend]];
      });
      model.seriesData.push({
        name: lengend,
        type: "bar",
        barMaxWidth: 25,
        barMinWidth: 20,
        stack: "总量",
        data: dataArray,
        barGap: "100%",
        barCategoryGap: "40%"
      });
    });
    model.yAxisData = model.yAxisData.slice(0, model.yAxisData.length / 2);
    const { lengendData, seriesData, yAxisData } = model;
    return merge({}, this.barStyle, {
      legend: {
        data: lengendData
      },
      yAxis: {
        data: yAxisData
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
      top: 8,
      containLabel: true
    },
    yAxis: {
      type: "category"
    },
    xAxis: {
      type: "value",
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
  };
}

export { Bar };
