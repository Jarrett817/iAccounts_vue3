import { DataItem, PluginFn, Serie } from './types';
import { stackBarStyle, lineBarMixStyle, pieStyle } from './style';
import { merge } from 'lodash';
import { digitUnitFormat } from '../digit-unit-format';
/**
 * 核心插件库，以数组形式传入，会在图表类产出option前依次调用
 * @param option 生成图表的option变量，直接使用即可
 * @param data 由用户传入的数据对象
 */
const stackBarPlugin: PluginFn = (option, data) => {
  const { legendData, categoryData, seriesData } = data;
  const getSeries = (series: Serie[]) => {
    const result: object[] = [];
    series.forEach((serie) => {
      result.push({
        name: serie.name,
        type: 'bar',
        barMaxWidth: 25,
        barMinWidth: 20,
        stack: true,
        barGap: '100%',
        barCategoryGap: '40%',
      });
    });
    return result;
  };
  merge(option, stackBarStyle, {
    legend: {
      data: legendData,
    },
    yAxis: {
      data: categoryData,
      axisLabel: {
        rotate: categoryData.length >= 10 ? 45 : 0,
      },
    },
    series: getSeries(seriesData),
  });
};
const lineBarMixPlugin: PluginFn = (option, data) => {
  const { legendData, categoryData, seriesData } = data;
  const getLineSerie = (serie: Serie, color: string) => {
    return {
      name: serie.name,
      type: 'line',
      yAxisIndex: 1,
      data: serie.data,
      smooth: false,
      symbolSize: '7',
      symbol: 'circle',
      itemStyle: {
        color: '#252F4D',
        borderColor: color,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowBlur: 3,
        shadowOffsetY: 2,
        opacity: 1,
        borderType: 'solid',
        borderWidth: 1,
      },
      lineStyle: {
        color: color,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowBlur: 4,
        shadowOffsetY: 3,
        opacity: 1,
        width: 2,
      },
    };
  };
  merge(option, lineBarMixStyle, {
    legend: {
      data: legendData,
    },
    xAxis: {
      data: categoryData,
      axisLabel: {
        rotate: categoryData.length >= 10 ? 45 : 0,
        formatter: '{value}',
      },
    },
    series: [
      {
        name: seriesData[0].name,
        data: seriesData[0].data,
      },
      {
        name: seriesData[1].name,
        data: seriesData[1].data,
      },
      getLineSerie(seriesData[2], '#30b9f3'),
      getLineSerie(seriesData[3], '#676ce5'),
    ],
  });
};
const piePlugin: PluginFn = (option, data) => {
  interface Model {
    nameData: string[];
    valueData: object[];
    sum: number;
  }
  const model: Model = {
    nameData: [],
    valueData: [],
    sum: 0,
  };
  data.forEach((item: DataItem) => {
    model.nameData.push(item.name);
    model.valueData.push({
      name: item.name,
      value: item.value,
    });
    model.sum += item.value;
  });
  const { nameData, valueData, sum } = model;
  merge(option, pieStyle, {
    legend: {
      data: nameData,
      formatter: (name: string) => {
        const target = data.find((item: DataItem) => item.name === name);
        return [
          `{title|${name}}{default|${((target.value / sum) * 100).toFixed(
            2
          )}%}{default|${digitUnitFormat(target.value)}}`,
        ];
      },
    },
    series: {
      data: valueData,
    },
  });
};
const pictorialPlugin: PluginFn = (option, data) => {};
const heatMapPlugin: PluginFn = (option, data) => {};

export { lineBarMixPlugin, stackBarPlugin, piePlugin, pictorialPlugin, heatMapPlugin };
