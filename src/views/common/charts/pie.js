/**
 * 支持legend颜色与图块颜色对应的饼图
 * @param {list}
 * [{
 *    name:'',
 *    value:0,
 *    richName:'', //可选
 *    color:'' //可选
 * }]
 */
import { digitUnitFormat } from "@/common/utils/number";
import { merge } from "lodash";
import { ChartFactory } from "./chart-factory";
class PieFactory extends ChartFactory {
  constructor() {
    super();
  }
  getChartOption(list, isAnnular = true) {
    const model = {
      nameData: [],
      valueData: [],
      sum: 0,
      richList: {},
      color: []
    };
    list.forEach(item => {
      model.nameData.push(item.name);
      model.valueData.push({
        name: item.name,
        value: item.value
      });
      const color = item.color ? item.color : "#b8c8ee";
      const richName = item.richName ? item.richName : "default";
      model.richList[richName] = {
        color: color,
        align: "left",
        padding: [0, 24, 0, 0],
        width: 48
      };
      if (item.color) model.color.push(item.color);
      model.sum += item.value;
    });
    const { nameData, valueData, sum, richList, color } = model;
    return merge({}, this.pieStyle, {
      color: color,
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)"
      },
      legend: {
        data: nameData,
        formatter: name => {
          const target = list.find(item => item.name === name);
          const richName = target.richName ? target.richName : "default";
          return [
            `{title|${name}}{${richName}|${((target.value / sum) * 100).toFixed(
              2
            )}%}{${richName}|${digitUnitFormat(target.value)}}`
          ];
        },
        textStyle: {
          rich: {
            ...richList,
            title: {
              align: "left",
              width: 48,
              padding: [0, 24, 0, 0]
            }
          }
        }
      },
      series: [
        {
          type: "pie",
          radius: isAnnular ? ["28%", "44%"] : "",
          center: ["23%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "18",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: valueData
        }
      ]
    });
  }
  pieStyle = {
    width: "100%",
    legend: {
      icon: "circle",
      orient: "vertical",
      top: "center",
      left: "46%",
      itemHeight: 5,
      itemWidth: 5
    }
  };
}

export { PieFactory };
