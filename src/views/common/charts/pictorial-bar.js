/**
 * 获取图形图表option
 * @param {Array[]} list 图表生成参数
 *  [
 *     {
 *         seriesName:'男',
 *         richName:'male',
 *         color:'#30B9F3',
 *         value:891,
 *         symbol:"svg'
 *     },
 *     ...
 *  ]
 * @param {Number} sum 总量，可选
 */
import { merge } from "lodash";
class PictorialBar {
  getPictorialBarOpt(list, sum) {
    const model = {
      richList: {},
      maxValue: 0,
      lengendData: [],
      upperDataList: [],
      lowerDataList: []
    };
    list.forEach(item => {
      model.maxValue += item.value;
      model.richList[item.richName] = {
        color: item.color,
        fontSize: 18
      };
      model.lengendData.push(item.seriesName);
      model.upperDataList.push({
        value: item.value,
        symbol: item.symbol,
        itemStyle: {
          color: item.color
        }
      });
      model.lowerDataList.push({
        value: item.value,
        symbol: item.symbol
      });
    });
    if (sum) model.maxValue = sum;
    const { richList, maxValue, lengendData, upperDataList, lowerDataList } = model;
    return merge({}, this.pictorialBarStyle, {
      tooltip: {
        formatter: params => {
          if (params?.length) {
            return `${params[0].name}：${params[0].value}`;
          } else {
            return `${params.name}：${params.value}`;
          }
        }
      },
      yAxis: {
        data: lengendData
      },
      xAxis: {
        max: maxValue
      },
      series: [
        {
          type: "pictorialBar",
          symbolRepeat: 10,
          symbolClip: true,
          symbolSize: [15, 30],
          z: 10,
          symbolBoundingData: maxValue,
          data: upperDataList,
          label: {
            show: true,
            position: "right",
            offset: [10, 0],
            fontSize: 18,
            formatter: function(params) {
              const target = list.find(item => item.seriesName === params.name);
              const percentage = ((params.value / maxValue) * 100).toFixed(2);
              return [`{${target.richName}|${percentage} %}`];
            },
            rich: richList
          }
        },
        {
          type: "pictorialBar",
          itemStyle: {
            color: "#313b5b"
          },
          animationDuration: 0,
          symbolRepeat: 10,
          symbolSize: [15, 30],
          symbolBoundingData: maxValue,
          z: 5,
          data: lowerDataList
        }
      ]
    });
  }
  pictorialBarStyle = {
    yAxis: {
      inverse: true,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        margin: 10,
        color: "#9DACD1",
        fontSize: 16
      },
      axisPointer: {
        show: true,
        type: "none",
        label: {
          show: false
        }
      }
    },
    xAxis: {
      show: false
    },
    grid: {
      top: "center",
      height: 200,
      left: "15%",
      right: "25%",
      width: "50%"
    }
  };
}

export { PictorialBar };
