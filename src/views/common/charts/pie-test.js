import { pieStyle } from "./style";

const pieToRing = option => {
  return option.series?.forEach(item => {
    item.radius = ["28%", "44%"];
  });
};
export function getPieOption(config) {
  let result = {};
  const { isRing, legendFormatter, data } = config;
  result = pieStyle;
  result.dataset.source = data;
  if (legendFormatter) result.legend.formatter = legendFormatter;
  if (isRing) pieToRing(result);
  return result;
}
