import { decorator } from './chart-decorator';
import { PluginFn } from './types';
import {
  lineBarMixPlugin,
  barPlugin,
  stackBarPlugin,
  transverseBarPlugin,
  piePlugin,
  pictorialPlugin,
  heatMapPlugin,
  pieToRingPlugin,
  ReflectedBarPlugin,
} from './plugins';
export class ChartFactory {
  constructor() {}
  produceChartOpt(plugins: PluginFn[], data: object, otherParams?: any) {
    const TargetClass = decorator(plugins);
    const chart = new TargetClass(data, otherParams);
    return chart.getChartOpt();
  }
  // 将插件函数以数组形式传入，会在图表类产出option前依次调用
  getChartOption(chartType: string, data: object) {
    switch (chartType) {
      case 'Bar':
        return this.produceChartOpt([barPlugin], data);
      case 'Strip':
        return this.produceChartOpt([barPlugin, stackBarPlugin, transverseBarPlugin], data);
      case 'LineBarMix':
        return this.produceChartOpt([lineBarMixPlugin], data);
      case 'ReflectedBar':
        return this.produceChartOpt([ReflectedBarPlugin], data);
      case 'TransverseReflectedBar':
        return this.produceChartOpt([ReflectedBarPlugin, transverseBarPlugin], data);
      case 'Pie':
        return this.produceChartOpt([piePlugin], data);
      case 'Ring':
        return this.produceChartOpt([piePlugin, pieToRingPlugin], data);
      case 'PictorialBar':
        return this.produceChartOpt([pictorialPlugin], data);
      case 'HeatMap':
        return this.produceChartOpt([heatMapPlugin], data);
      default:
        break;
    }
  }
}
