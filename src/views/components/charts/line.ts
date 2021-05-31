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
  chart.tooltip({
    showTitle: true, // 展示  tooltip 的标题
    background: {
      radius: 2,
      fill: "rgba(0, 0, 0,0.3)",
      padding: [6, 10]
    }
  });
  chart
    .line()
    .position("xAxisVal*yAxisVal")
    .color("name", ["#4ca2f8", "#e67e81"])
    .shape("name", "line");
  chart.area().position("xAxisVal*yAxisVal").color("name", ["#4ca2f8", "#e67e81"]);
  chart.source(data);
};
