import { decorator } from './chart-decorator';
import { PluginFn } from './types';
import { stackBarPlugin } from './bar';
class ChartFactory {
  chartType: string;
  constructor(chartType: string) {
    this.chartType = chartType;
  }
  produceChartOpt(plugins: PluginFn[], data: object) {
    const TargetClass = decorator(plugins);
    const chart = new TargetClass(data);
    return chart.getChartOpt();
  }
  getChartOption(chartType: string, data: object) {
    switch (chartType) {
      case 'StackBar':
        return this.produceChartOpt([stackBarPlugin], data);
    }
  }
}

export const chartFactory = (chartType: string) => new ChartFactory(chartType);
//使用时，chartFactory.getChartOption('bar',data)
