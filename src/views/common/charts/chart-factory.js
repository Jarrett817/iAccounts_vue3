import { merge, mergeWith, isArray } from "lodash";

class ChartFactory {
  constructor() {
    if (new.target === ChartFactory) {
      throw new Error("抽象类不能实例化");
    }
  }
  getChartOption() {
    throw new Error("不能调用抽象方法，请自己实现");
  }
  mergeChartOption(chartOpt, customOpt) {
    return merge({}, chartOpt, customOpt);
  }
  mergeChartOptionWith(
    chartOpt,
    customOpt,
    fn = (objValue, srcValue) => {
      if (isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    }
  ) {
    return mergeWith({}, chartOpt, customOpt, fn);
  }
}

export { ChartFactory };
