import { pieStyle } from "./style";
import { merge } from "lodash";
const pieToRing = option => {
  return option.series?.forEach(item => {
    item.radius = ["28%", "44%"];
  });
};
export function getPieOption(config) {
  const result = {
    dataset: {}
  };
  const { isRing, legendFormatter, data, tooltipFormatter } = config;
  merge(result, pieStyle);
  result.dataset.source = data;
  if (legendFormatter) result.legend.formatter = legendFormatter;
  if (tooltipFormatter) result.tooltip.formatter = tooltipFormatter;
  if (isRing) pieToRing(result);
  return result;
}
