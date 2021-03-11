interface ChartOption {
  title?: object;
  toolTip?: object;
  legend?: any | any[];
  grid?: object | object[];
  xAxis?: object | object[];
  yAxis?: object | object[];
  series?: any[];
}
interface ChartInterface {
  option: object;
  data: object;
  getChartOpt: () => object;
  addCustomOpt: (option: object) => void;
}

type Serie = {
  name: string;
  data: number[];
};

type PluginFn = (option: ChartOption, data: any, otherParams?: any) => void;

export { ChartOption, PluginFn, ChartInterface, Serie };
