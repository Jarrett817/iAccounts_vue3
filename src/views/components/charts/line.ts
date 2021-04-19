import F2 from "@antv/f2";

interface DataItem {
  name: "支出" | "收入";
  xAxisVal: string;
  yAxisVal: number;
}
export const lineFn = (chart: F2.Chart, data: DataItem[]) => {
  chart.legend({
    position: "bottom",
    offsetY: -5
  });
  chart
    .line()
    .position("xAxisVal*yAxisVal")
    .color("name", ["#4ca2f8", "#e67e81"])
    .shape("name", "line");
  chart.source(data);
};
