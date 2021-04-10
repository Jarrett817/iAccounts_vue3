<template>
  <i-layout>
    <template #header>
      <van-tabs v-model:active="activeIndex" animated>
        <van-tab v-for="item in ['周报', '月报']" :title="item" :key="item"></van-tab>
      </van-tabs>
    </template>
    <template #main>
      <div class="chart-wrap"><chart :source="data"></chart></div>
    </template>
    <template #footer>
      <i-tabbar></i-tabbar>
    </template>
  </i-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import Chart from "@/views/components/chart.vue";
import { accountsService } from "@/services";
export default defineComponent({
  components: { Chart },
  setup() {
    const activeIndex = ref<0 | 1>(0);
    watchEffect(() => {
      if (!activeIndex) {
        //   const startTime=dayjs()
        // accountsService.getListByTimeSlot({{ startTime, endTime, listType }});
      } else {
      }
    });
    const data = [
      {
        name: "London",
        xAxisVal: "Jan.",
        yAxisVal: 18.9
      },
      {
        name: "London",
        xAxisVal: "Feb.",
        yAxisVal: 28.8
      },
      {
        name: "London",
        xAxisVal: "Mar.",
        yAxisVal: 39.3
      },
      {
        name: "London",
        xAxisVal: "Apr.",
        yAxisVal: 81.4
      },
      {
        name: "London",
        xAxisVal: "May.",
        yAxisVal: 47
      },
      {
        name: "London",
        xAxisVal: "Jun.",
        yAxisVal: 20.3
      },
      {
        name: "London",
        xAxisVal: "Jul.",
        yAxisVal: 24
      },
      {
        name: "London",
        xAxisVal: "Aug.",
        yAxisVal: 35.6
      },
      {
        name: "Berlin",
        xAxisVal: "Jan.",
        yAxisVal: 12.4
      },
      {
        name: "Berlin",
        xAxisVal: "Feb.",
        yAxisVal: 23.2
      },
      {
        name: "Berlin",
        xAxisVal: "Mar.",
        yAxisVal: 34.5
      },
      {
        name: "Berlin",
        xAxisVal: "Apr.",
        yAxisVal: 99.7
      },
      {
        name: "Berlin",
        xAxisVal: "May.",
        yAxisVal: 52.6
      },
      {
        name: "Berlin",
        xAxisVal: "Jun.",
        yAxisVal: 35.5
      },
      {
        name: "Berlin",
        xAxisVal: "Jul.",
        yAxisVal: 37.4
      },
      {
        name: "Berlin",
        xAxisVal: "Aug.",
        yAxisVal: 42.4
      }
    ];
    return {
      activeIndex,
      data
    };
  }
});
</script>

<style lang="scss" scoped></style>
