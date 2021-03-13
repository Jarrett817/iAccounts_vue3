import { pictorialBarStyle } from "./style";
import { merge } from "lodash";
export function getPictorialOption(config) {
  const { data, sum } = config;
  const model = {
    richList: {},
    maxValue: 0,
    legendData: [],
    upperDataList: [],
    lowerDataList: []
  };
  data.forEach(item => {
    model.maxValue += item.value;
    model.richList[item.field] = {
      color: item.color,
      fontSize: 18
    };
    model.legendData.push(item.name);
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
  const { richList, maxValue, legendData, upperDataList, lowerDataList } = model;
  return merge({}, pictorialBarStyle, {
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
      data: legendData
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
            const target = data.find(item => item.name === params.name);
            const percentage = ((params.value / maxValue) * 100).toFixed(2);
            return [`{${target.field}|${percentage} %}`];
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
