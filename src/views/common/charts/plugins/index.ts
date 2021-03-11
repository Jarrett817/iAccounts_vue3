import { PluginFn } from '../types';

/**
 * 插件函数，接收两个参数
 * @param option 生成图表的option变量
 * @param data 由用户传入的数据对象
 * @param otherParams 由用户传入的额外的参数
 */

export {
  barPlugin,
  stackBarPlugin,
  transverseBarPlugin,
  lineBarMixPlugin,
  ReflectedBarPlugin,
} from './bar';
export { pictorialPlugin } from './pictorial';
export { piePlugin, pieLegendFormatterPlugin, pieToRingPlugin } from './pie';
export { heatMapPlugin } from './heat-map';
