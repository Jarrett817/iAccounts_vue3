import { getPieOption } from "./pie-test";
import { getBarOption } from "./bar-test";

export function getChartOpt(config) {
  switch (config.chartType) {
    case "pie":
      return getPieOption(config);
    case "bar":
      return getBarOption(config);
  }
}
