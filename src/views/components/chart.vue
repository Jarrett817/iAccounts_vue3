<template>
  <template v-if="source?.length">
    <canvas :id="canvasId"></canvas>
  </template>
  <template v-else>
    <van-empty class="custom-image" :image="emptyStatistic" description="暂无数据" />
  </template>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, watch } from "vue";
import dayjs from "dayjs";
import { barFn, ringFn, lineFn } from "./charts";
import F2, { Chart } from "@antv/f2";
import emptyStatistic from "@/assets/emptyStatus/emptyStatistic.png";
export default defineComponent({
  components: {},
  props: {
    source: {
      type: Array,
      default: () => [],
      required: true
    },
    chartType: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const canvasId = `chart${dayjs().valueOf() + Math.random() * 1000}`;
    const fns: { [key: string]: Function } = {
      bar: barFn,
      ring: ringFn,
      line: lineFn
    };
    let chart: Chart | null = null;
    watch(
      () => props.source,
      async newSource => {
        if (newSource?.length) {
          if (!chart) {
            await nextTick();
            chart = new F2.Chart({
              id: canvasId,
              pixelRatio: window.devicePixelRatio // 指定分辨率
            });
            fns[props.chartType](chart, props.source as []);
            chart.render();
          } else {
            chart.clear(); // 清除
            fns[props.chartType](chart, props.source as []);
            chart.render();
          }
        } else {
          chart && chart.clear() && (chart = null);
        }
      },
      {
        immediate: true
      }
    );
    onBeforeUnmount(() => {
      if (chart) {
        chart.destroy();
      }
    });
    return { canvasId, emptyStatistic };
  }
});
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
