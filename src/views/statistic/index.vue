<template>
  <i-layout>
    <template #header>
      <van-tabs v-model:active="activeIndex" animated>
        <van-tab v-for="item in ['月报', '年报']" :title="item" :key="item"></van-tab>
      </van-tabs>
    </template>
    <template #main>
      <section>
        <month-module v-if="!activeIndex" :wholeTimeSlot="wholeTimeSlot"></month-module>
        <year-module v-else :wholeTimeSlot="wholeTimeSlot"></year-module>
      </section>
    </template>
    <template #footer>
      <i-tabbar></i-tabbar>
    </template>
  </i-layout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Chart from "@/views/components/chart.vue";
import { accountsService } from "@/services";
import DatePicker from "@/components/date-picker.vue";
import MonthModule from "./month.vue";
import YearModule from "./year.vue";
export default defineComponent({
  components: { Chart, DatePicker, MonthModule, YearModule },
  setup() {
    const activeIndex = ref<0 | 1>(0);

    const wholeTimeSlot = reactive<{ minDate: number | null; maxDate: number | null }>({
      minDate: null,
      maxDate: null
    });
    accountsService.getTimeSlot().then(res => {
      wholeTimeSlot.minDate = res.minDate;
      wholeTimeSlot.maxDate = res.maxDate;
    });

    const onWeekChange = (index: number) => {};
    return {
      wholeTimeSlot,
      activeIndex,
      onWeekChange
    };
  }
});
</script>

<style lang="scss" scoped>
section {
  overflow: auto;
  height: 100%;
}
</style>
