import F2 from "@antv/f2";

interface DataItem {
  name: "支出" | "收入";
  xAxisVal: string;
  yAxisVal: number;
}
export const barFn = (chart: F2.Chart, data: DataItem[]) => {
  if (data.length >= 30) {
    chart.axis("xAxisVal", {
      label: function label(text, index, total) {
        const cfg = {};
        if (index % 2 === 0) {
          return cfg;
        }
      }
    });
  }
  chart.tooltip({
    showTitle: true, // 展示  tooltip 的标题
    background: {
      radius: 2,
      fill: "rgba(0, 0, 0,0.3)",
      padding: [6, 10]
    }
  });
  chart.source(data);
  chart.legend({
    position: "bottom",
    offsetY: -5
  });
  chart
    .interval()
    .position("xAxisVal*yAxisVal")
    .color("name")
    .adjust({
      type: "dodge",
      marginRatio: 0.05 // 设置分组间柱子的间距
    })
    .color("name", ["#4ca2f8", "#e67e81"]);
};
