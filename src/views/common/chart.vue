//
<template lang="pug">
// .chart-wrap
//   #e-chart(v-if="!emptyString", ref="chartEl")
//   .secondary-content(v-else) {{ emptyString }}
// </template>

//
<script>
// import * as echarts from "echarts";
// import { debounce } from "@/common/utils/";
// import { getChartOpt } from "./charts/chart-maker";
// export default {
//   props: {
//     emptyString: {
//       type: String,
//       default: ""
//     }
//   },
//   data() {
//     return {
//       chart: null,
//       resizeHandle: debounce(this.resizeChart, 500)
//     };
//   },
//   methods: {
//     resizeChart() {
//       this.chart && this.chart.resize();
//     },
//     render(config, renderer) {
//       if (!this.chart) {
//         window.addEventListener("resize", this.resizeHandle);
//       }
//       const options = getChartOpt(config);
//       console.log(options);
//       this.$nextTick(() => {
//         const dom = this.$refs.chartEl;
//         const theme =
//           document.getElementsByTagName("html")[0].getAttribute("data-theme") || "default";
//         !this.chart && (this.chart = echarts.init(dom, theme, { renderer }));
//         this.chart.setOption(options);
//       });
//     },
//     initChart(instance, domName, options, renderer) {
//       window.addEventListener("resize", this.resizeHandle);
//       this.$nextTick(() => {
//         const dom = this.$refs[domName];
//         const theme =
//           document.getElementsByTagName("html")[0].getAttribute("data-theme") || "default";
//         !this[instance] && (this[instance] = echarts.init(dom, theme, { renderer }));
//         this[instance].setOption(options);
//       });
//     },
//     setChartOpt(options, renderer) {
//       if (!this.chart) {
//         this.initChart("chart", "chartEl", options, renderer);
//       } else {
//         this.chart.setOption(options);
//       }
//     },
//     destroy() {
//       window.removeEventListener("resize", this.resizeHandle);
//       if (this.chart) {
//         echarts.dispose(this.chart);
//         this.chart = null;
//       }
//     }
//   },
//   watch: {
//     emptyString(newVal) {
//       if (newVal) {
//         this.destroy();
//       }
//     }
//   },
//   beforeDestroy() {
//     this.destroy();
//   }
// };
//
</script>

//
<style lang="scss" scoped>
// .chart-wrap {
//   height: 100%;
// }
// #e-chart {
//   width: 100%;
//   height: 100%;
// }
// .secondary-content {
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   height: 100%;
//   font-size: 14px;
//   font-weight: 400;
//   width: 100%;
// }
//
</style>
