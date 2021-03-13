import { getPieOption } from "./pie";
import { getBarOption } from "./bar";
import { getPictorialOption } from "./pictorial";
import { getHeatmapOption } from "./heatmap";
export function getChartOpt(config) {
  switch (config.chartType) {
    case "pie":
      return getPieOption(config);
    case "bar":
      return getBarOption(config);
    case "pictorial":
      return getPictorialOption(config);
    case "heatmap":
      return getHeatmapOption(config);
  }
}
