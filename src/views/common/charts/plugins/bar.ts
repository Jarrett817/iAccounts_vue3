import { PluginFn, Serie } from '../types';
import { stackBarStyle, lineBarMixStyle, reflectedBarStyle } from './style';
import { merge } from 'lodash';
interface NormalBarData {
  legendData: [];
  categoryData: [];
  seriesData: Serie[];
}
const barPlugin: PluginFn = (option, data: NormalBarData) => {
  const { legendData, categoryData, seriesData } = data;
  const getSeries = (series: Serie[]) => {
    const result: object[] = [];
    series.forEach((serie) => {
      result.push({
        name: serie.name,
        type: 'bar',
        barMaxWidth: 25,
        barMinWidth: 20,
        barGap: '100%',
        barCategoryGap: '40%',
      });
    });
    return result;
  };
  merge(option, stackBarStyle, {
    legend: {
      data: legendData,
    },
    xAxis: {
      data: categoryData,
      axisLabel: {
        rotate: categoryData.length >= 10 ? 45 : 0,
      },
    },
    series: getSeries(seriesData),
  });
};

const stackBarPlugin: PluginFn = (option, data) => {
  option.series &&
    option.series.forEach((item) => {
      item.stack = true;
    });
};
const transverseBarPlugin: PluginFn = (option, data) => {
  const { xAxis, yAxis, series } = option;
  // 转换xy轴
  option.yAxis = xAxis;
  option.xAxis = yAxis;
  // 转换markLine
  series?.forEach((item) => {
    if (item.markLine && item.markLine.data) {
      item.markLine.data.forEach((item: { xAxis?: number; yAxis?: number }) => {
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
interface LineBarMixData {
  leftYAxisName: string;
  rightYAxisName: string;
  legendData: [];
  categoryData: [];
  seriesData: Serie[];
}
const lineBarMixPlugin: PluginFn = (option, data: LineBarMixData) => {
  const { leftYAxisName, rightYAxisName, legendData, categoryData, seriesData } = data;
  const getLineSerie = (serie: Serie, color: string) => {
    return {
      name: serie.name,
      type: 'line',
      yAxisIndex: 1,
      data: serie.data,
      smooth: false,
      symbolSize: '7',
      symbol: 'circle',
      itemStyle: {
        color: '#252F4D',
        borderColor: color,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowBlur: 3,
        shadowOffsetY: 2,
        opacity: 1,
        borderType: 'solid',
        borderWidth: 1,
      },
      lineStyle: {
        color: color,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowBlur: 4,
        shadowOffsetY: 3,
        opacity: 1,
        width: 2,
      },
    };
  };
  merge(option, lineBarMixStyle, {
    legend: {
      data: legendData,
    },
    xAxis: {
      data: categoryData,
      axisLabel: {
        rotate: categoryData.length >= 10 ? 45 : 0,
        formatter: '{value}',
      },
    },
    yAxis: [
      {
        name: leftYAxisName,
      },
      {
        name: rightYAxisName,
      },
    ],
    series: [
      {
        name: seriesData[0].name,
        data: seriesData[0].data,
      },
      {
        name: seriesData[1].name,
        data: seriesData[1].data,
      },
      getLineSerie(seriesData[2], '#30b9f3'),
      getLineSerie(seriesData[3], '#676ce5'),
    ],
  });
};
interface ReflectedBarData {
  legendData: string[][];
  categoryData: string[];
  seriesData: number[][];
}
const ReflectedBarPlugin: PluginFn = (option, data: ReflectedBarData, otherParams) => {
  const { legendData, categoryData, seriesData } = data;
  const reflectA: (number | null)[] = [];
  const reflectB: (number | null)[] = [];
  seriesData[1].forEach((item) => {
    if (item >= otherParams.splitNum) {
      reflectA.push(item);
      reflectB.push(null);
    }
    if (item < otherParams.splitNum) {
      reflectA.push(null);
      reflectB.push(item);
    }
  });

  return merge(option, reflectedBarStyle, {
    legend: legendData.map((item) => {
      return {
        data: item,
      };
    }),
    xAxis: [
      {
        data: categoryData,
      },
      {
        data: categoryData,
      },
    ],
    series: [
      {
        name: legendData[0][0],
        data: seriesData[0],
      },
      {
        name: legendData[1][0],
        data: reflectA,
      },
      {
        name: legendData[1][1],
        data: reflectB,
      },
    ],
  });
};
export { barPlugin, stackBarPlugin, transverseBarPlugin, lineBarMixPlugin, ReflectedBarPlugin };
