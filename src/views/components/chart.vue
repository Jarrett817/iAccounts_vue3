<template>
  <canvas :id="canvasId"></canvas>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import dayjs from "dayjs";
import { barFn } from "./charts";
import F2 from "@antv/f2";

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
    const canvasId = `chart${dayjs().valueOf()}`;
    onMounted(() => {
      const chart = new F2.Chart({
        id: canvasId,
        pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      barFn(chart, props.source as []);
      chart.render();
    });
    return { canvasId };
  }
});
</script>

<style lang="scss" scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
