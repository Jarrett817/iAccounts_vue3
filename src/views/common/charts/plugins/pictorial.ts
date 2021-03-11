import { PluginFn, Serie } from '../types';
import { pictorialBarStyle } from './style';
import { merge } from 'lodash';
interface PictorialItem {
  seriesName: string;
  richName: string;
  color: string;
  value: number;
  symbol: string;
}
const pictorialPlugin: PluginFn = (option, data: { sum?: number; list: PictorialItem[] }) => {
  interface Model {
    richList: any;
    maxValue: number;
    legendData: string[];
    upperDataList: {
      value: number;
      symbol: string;
      itemStyle: {
        color: string;
      };
    }[];
    lowerDataList: {
      value: number;
      symbol: string;
    }[];
  }

  const model: Model = {
    richList: {},
    maxValue: 0,
    legendData: [],
    upperDataList: [],
    lowerDataList: [],
  };
  data.list.forEach((item: PictorialItem) => {
    model.maxValue += item.value;
    model.richList[item.richName] = {
      color: item.color,
      fontSize: 18,
    };
    model.legendData.push(item.seriesName);
    model.upperDataList.push({
      value: item.value,
      symbol: item.symbol,
      itemStyle: {
        color: item.color,
      },
    });
    model.lowerDataList.push({
      value: item.value,
      symbol: item.symbol,
    });
  });
  if (data.sum) model.maxValue = data.sum;
  const { richList, maxValue, legendData, upperDataList, lowerDataList } = model;
  return merge(option, pictorialBarStyle, {
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
      data: legendData,
    },
    xAxis: {
      max: maxValue,
    },
    series: [
      {
        type: 'pictorialBar',
        symbolRepeat: 10,
        symbolClip: true,
        symbolSize: [15, 30],
        z: 10,
        symbolBoundingData: maxValue,
        data: upperDataList,
        label: {
          show: true,
          position: 'right',
          offset: [10, 0],
          fontSize: 18,
          formatter: function (params: { name: string; value: number }) {
            const target = data.list.find((item: PictorialItem) => item.seriesName === params.name);
            const percentage = ((params.value / maxValue) * 100).toFixed(2);
            return [`{${target?.richName}|${percentage} %}`];
          },
          rich: richList,
        },
      },
      {
        type: 'pictorialBar',
        itemStyle: {
          color: '#313b5b',
        },
        animationDuration: 0,
        symbolRepeat: 10,
        symbolSize: [15, 30],
        symbolBoundingData: maxValue,
        z: 5,
        data: lowerDataList,
      },
    ],
  });
};

export { pictorialPlugin };
