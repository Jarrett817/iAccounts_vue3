import F2 from "@antv/f2";

interface DataItem {
  name: "支出" | "收入";
  xAxisVal: string;
  yAxisVal: number;
}
export const barFn = (chart: F2.Chart, data: DataItem[]) => {
  chart.source(data);
  chart.legend({
    position: "bottom",
    offsetY: -5
  });
  chart.interval().position("xAxisVal*yAxisVal").color("name").adjust({
    type: "dodge",
    marginRatio: 0.05 // 设置分组间柱子的间距
  });
};
