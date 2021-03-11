import { ChartFactory } from './chart-factory';

// 全局单例
export const chartFactory = new ChartFactory();

// const option = chartFactory.getChartOption(data, { name: 'xx' });

this.$refs.Chart.init('chartType', data, { name: sss });
