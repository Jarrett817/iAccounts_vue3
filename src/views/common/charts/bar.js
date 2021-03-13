import { barStyle, lineBarMixStyle, barSerieBaseStyle } from "./style";
import { merge } from "lodash";
const stackSeries = option => {
  return (
    option.series &&
    option.series.forEach(item => {
      item.stack = true;
    })
  );
};
const transverse = option => {
  const { xAxis, yAxis, series } = option;
  // 转换xy轴
  option.yAxis = xAxis;
  option.xAxis = yAxis;
  // 转换markLine
  series?.forEach(item => {
    if (item.markLine && item.markLine.data) {
      item.markLine.data.forEach(item => {
        if (item.xAxis) {
          item.yAxis = item.xAxis;
          delete item.xAxis;
        }
        if (item.yAxis) {
          item.xAxis = item.yAxis;
          delete item.yAxis;
        }
      });
    }
  });
};
const getLineSerie = color => {
  return {
    type: "line",
    yAxisIndex: 1,
    smooth: false,
    symbolSize: "7",
    symbol: "circle",
    itemStyle: {
      color: "#252F4D",
      borderColor: color,
      shadowColor: "rgba(0, 0, 0, 0.6)",
      shadowBlur: 3,
      shadowOffsetY: 2,
      opacity: 1,
      borderType: "solid",
      borderWidth: 1
    },
    lineStyle: {
      color: color,
      shadowColor: "rgba(0, 0, 0, 0.6)",
      shadowBlur: 4,
      shadowOffsetY: 3,
      opacity: 1,
      width: 2
    }
  };
};
export function getBarOption(config) {
  const result = {
    dataset: {}
  };
  const { isTransverse, isStack, tooltipFormatter, addLines, data, showLegend } = config;
  if (addLines) {
    merge(result, lineBarMixStyle);
    result.series.push(getLineSerie("#30b9f3"));
    result.series.push(getLineSerie("#676ce5"));
  } else {
    merge(result, barStyle);
    result.series = [];
    let seriesNum = 0;
    data.forEach(item => {
      item.length > seriesNum ? (seriesNum = item.length - 1) : "";
    });
    for (let i = 0; i < seriesNum; i++) {
      result.series.push(barSerieBaseStyle);
    }
  }
  result.dataset.source = data;
  if (tooltipFormatter) result.tooltip.formatter = tooltipFormatter;
  if (isStack) stackSeries(result);
  if (isTransverse) transverse(result);
  if (showLegend === false) {
    result.legend.show = false;
    result.grid.bottom = "3%";
  }
  return result;
}
