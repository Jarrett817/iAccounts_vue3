interface ChartOption {
  title?: object;
  toolTip?: object;
  legend?: object | object[];
  grid?: object | object[];
  xAxis?: object | object[];
  yAxis?: object | object[];
  series?: object[];
}
interface ChartInterface {
  option: object;
  data: object;
  getChartOpt: () => object;
  addCustomOpt: (option: object) => void;
}
// type legend = {
//   data: string[];
// };
type Serie = {
  name: string;
  data: number[];
};
type category = {};
type DataItem = {
  name: string;
  value: number;
};
type DataSet = {
  legendData: string[] | string[][];
  seriesData: Serie[];
  categoryData?: object[] | string[][];
};
type PluginFn = (option: ChartOption, data: any) => void;

export { ChartOption, PluginFn, DataSet, ChartInterface, Serie, DataItem };
