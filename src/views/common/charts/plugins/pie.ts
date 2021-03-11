import { PluginFn } from '../types';
import { pieStyle } from './style';
import { merge } from 'lodash';
import { digitUnitFormat } from '../../digit-unit-format';
interface PieItem {
  name: string;
  value: number;
}
const piePlugin: PluginFn = (option, data: PieItem[]) => {
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
  data.forEach((item) => {
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
        const target = data.find((item) => item.name === name);
        return [
          `{title|${name}}{default|${((target ? target.value / sum : 0) * 100).toFixed(
            2
          )}%}{default|${digitUnitFormat(target?.value)}}`,
        ];
      },
    },
    series: {
      data: valueData,
    },
  });
};
const pieLegendFormatterPlugin: PluginFn = (option, data: PieItem[]) => {
  const sum = data.reduce((sum: number, item: PieItem) => {
    return sum + item.value;
  }, 0);
  option.legend.formatter = (name: string) => {
    const target = data.find((item) => item.name === name);
    return [`{title|${name}}{default|${((target ? target.value / sum : 0) * 100).toFixed(2)}%}`];
  };
};
const pieToRingPlugin: PluginFn = (option, data: PieItem[]) => {
  option.series?.forEach((item) => {
    item.radius = ['28%', '44%'];
  });
};
export { piePlugin, pieLegendFormatterPlugin, pieToRingPlugin };
