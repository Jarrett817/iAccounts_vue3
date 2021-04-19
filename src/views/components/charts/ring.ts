import F2 from "@antv/f2";

interface DataItem {
  name: string;
  value: number;
  type: "expend" | "income";
  series?: string;
}

export const ringFn = (chart: F2.Chart, data: DataItem[]) => {
  const total = data.reduce((sum, item) => {
    return (sum += item.value);
  }, 0);
  const map: { [key: string]: any } = {};
  data.forEach(item => {
    item.series = "1";
    map[item.name] = item.value;
  });
  chart.legend({
    position: "right",
    itemFormatter: function itemFormatter(val) {
      return val + "    " + ((map[val] / total) * 100).toFixed(2) + "%";
    }
  });
  chart.coord("polar", {
    transposed: true,
    innerRadius: 0.7,
    radius: 1
  });
  chart.axis(false);
  chart.interval().position("a*value").color("name").adjust("stack");

  chart.guide().clear();
  chart.guide().html({
    position: ["50%", "45%"],
    html: `<div style="
    position:absolute;
    top:50%;
    tranform:translateY(-50%);
    white-space:nowrap;
    text-align: center;">
      <div style="font-size: 10px">${data[0].type === "expend" ? "月支出" : "月收入"}</div>
      <div  style="font-size: 18px">${total}</div>
    </div>`
  });
  chart.source(data);
  chart.changeData(data);
};
