## 基本遵循 echarts 的 dataset 数据集使用方式

### 1. config 属性

默认都有 chartType 和 data 属性，以下是需要说明的属性，配置方法见使用示例

- chartType 图表类型：‘pie’，‘bar’，‘pictorial’，‘heatmap’
- data 使用 echarts 的 dataset，部分图表除外如 pictorial

- | bar 属性         | 说明                             | 默认  |
  | ---------------- | -------------------------------- | ----- |
  | isStack          | 是否为堆叠图                     | false |
  | isTransverse     | 是否横向                         | false |
  | addLines         | 是否添加折线，仅用于折柱混合图表 | false |
  | tooltipFormatter | 支持自定义 tooltip               | false |

- | pie 属性        | 说明           | 默认  |
  | --------------- | -------------- | ----- |
  | isRing          | 是否为环形图   | false |
  | legendFormatter | 支持自定义图例 | false |

* | heatmap 属性     | 说明               | 默认  |
  | ---------------- | ------------------ | ----- |
  | tooltipFormatter | 支持自定义 tooltip | false |

### 2. 使用示例

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
// 比较特殊，需要设置空值
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

/* field字段是为了使图和文字的颜色一致
   为了展示效果，需要保证value不为null或者undefined
   在数组中增加对象即可增加系列*/
const pictorialBarConfig={
  chartType:'pictorial',
  data:[
    {
      name:'男',
      field:'male',
      color:'#30B9F3',
      value:891,
      symbol:"svg'
    },
    {
      name:'女',
      field:'female',
      color:'#30B9F3',
      value:891,
      symbol:"svg'
    },
  ]
}
// 数组中数据依次为x轴，y轴，xy对应格中的数据
const heatmapConfig={
  chartType:'heatmap',
  data:[
    ['Matcha','2018', 58212],
    ['Matcha','2017', 58212],
    ['Latte','2018', 58212]
    ['Latte','2017', 58212]
  ],
  tooltipFormatter:()=>{}
}
```
