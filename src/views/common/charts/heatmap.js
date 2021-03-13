import { heatMapStyle } from "./style";
import { merge } from "lodash";
export function getHeatmapOption(config) {
  const { data, tooltipFormatter } = config;
  const result = {
    dataset: {}
  };
  merge(result, heatMapStyle);
  let minData = null;
  let maxData = 0;
  const xData = {};
  data.forEach(item => {
    xData[item[0]] = true;
    if (item[2] > maxData) maxData = item[2];
    if (minData === null) minData = item[2];
    if (item[2] < minData) minData = item[2];
  });
  result.dataset.source = data;
  merge(result, {
    xAxis: {
      axisLabel: {
        rotate: Object.keys(xData).length >= 10 ? 45 : 0
      }
    },
    visualMap: {
      min: minData,
      max: maxData
    }
  });
  if (tooltipFormatter) result.tooltip.formatter = tooltipFormatter;
  return result;
}
