import { PluginFn } from '../types';
import { heatMapStyle } from './style';
import { merge } from 'lodash';
interface HeatMapItem {
  yData: {
    label: string;
  };
  xGroup: { label: string; value: number }[];
}
const heatMapPlugin: PluginFn = (option, data: HeatMapItem[]) => {
  interface Model {
    xData: string[];
    yData: string[];
    mapData: {}[];
    maxData: number;
    minData: number | null;
  }
  const model: Model = {
    xData: [],
    yData: [],
    mapData: [],
    maxData: 0,
    minData: null,
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
  model.xData = data[0].xGroup.map((item) => item.label);
  const { xData, yData, mapData, maxData, minData } = model;
  return merge(option, heatMapStyle, {
    xAxis: {
      data: xData,
      axisLabel: {
        rotate: xData.length >= 10 ? 45 : 0,
      },
    },
    yAxis: {
      data: yData,
    },
    visualMap: {
      min: minData,
      max: maxData,
    },
    series: [
      {
        data: mapData,
      },
    ],
  });
};

export { heatMapPlugin };
