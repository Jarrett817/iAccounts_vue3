## 基本遵循 echarts 的 dataset 数据集使用方式

### config 属性

- chartType

```javascript
const pieConfig = {
  chartType: "pie",
  isRing: false,
  legendFormatter: () => {},
  data: [
    ["搜索引擎", 1048],
    ["直接访问", 735],
    ["邮件营销", 580],
    ["联盟广告", 484],
    ["视频广告", 300]
  ]
};
const ringConfig = {
  chartType: "pie",
  isRing: true,
  legendFormatter: () => {},
  data: [
    ["搜索引擎", 1048],
    ["直接访问", 735],
    ["邮件营销", 580],
    ["联盟广告", 484],
    ["视频广告", 300]
  ]
};
const barConfig = {
  chartType: "bar",
  isTransverse: false,
  isStack: false,
  tooltipFormatter: () => {},
  data: [
    ["type", "Android", "IOS"],
    ["2011", 43.3, 85.8],
    ["2012", 83.1, 73.4],
    ["2013", 86.4, 65.2],
    ["2014", 72.4, 53.9]
  ]
};

const linBarMixConfig = {
  chartType: "bar",
  isTransverse: false,
  isStack: false,
  addLines: true,
  tooltipFormatter: () => {},
  data: [
    ["type", "Android", "IOS", "Android", "IOS"],
    ["2011", 43.3, 85.8, 3454, 654],
    ["2012", 83.1, 73.4, 123, 231],
    ["2013", 86.4, 65.2, 123, 123],
    ["2014", 72.4, 53.9, 123, 123]
  ]
};

const stripConfig = {
  chartType: "bar",
  isTransverse: true,
  isStack: false,
  tooltipFormatter: () => {},
  data: [
    ["type", "Android", "IOS"],
    ["2011", 43.3, 85.8],
    ["2012", 83.1, 73.4],
    ["2013", 86.4, 65.2],
    ["2014", 72.4, 53.9]
  ]
};

//特处理殊
const rowReflectBarConfig = {
  chartType: "reflectBar",
  isTransverse: false,
  isStack: false,
  isReflect: true,
  tooltipFormatter: () => {},
  data: [
    ["type", "Android", "tgi>=100", "tgi<=100"],
    ["2011", 43.3, 85.8, null],
    ["2012", 83.1, null, 323],
    ["2013", 86.4, 65.2, null],
    ["2014", 72.4, null, 444]
  ]
};
```
