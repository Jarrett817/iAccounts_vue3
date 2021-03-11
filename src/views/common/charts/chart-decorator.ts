import { ChartInterface, ChartOption, PluginFn } from './types';
import { merge } from 'lodash';

const chartDecorator = (targetClass: any, plugins: PluginFn[]) => {
  let getChatOpt = targetClass.prototype.getChatOpt;
  targetClass.prototype.getChatOpt = function () {
    plugins.forEach((fn: PluginFn) => {
      fn(this.option, this.data, this.otherParams);
    });
    getChatOpt.apply(this);
  };
  return targetClass;
};
class Chart implements ChartInterface {
  option: ChartOption;
  data: object;
  otherParams: any;
  constructor(data: object) {
    this.option = {};
    this.data = data;
    this.otherParams = null;
  }
  getChartOpt() {
    return this.option;
  }
  addCustomOpt(option: object) {
    merge(this.option, option);
  }
}

const decorator = (plugins: PluginFn[]) => {
  return chartDecorator(Chart, plugins);
};
export { decorator };
