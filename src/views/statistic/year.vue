<template>
  <van-sticky>
    <van-tabs v-model:active="activeIndex">
      <van-tab v-for="item in monthList" :title="item + '年'" :key="item" />
    </van-tabs>
  </van-sticky>
  <div class="chart-wrap"><chart :source="lineSource" chartType="line"></chart></div>
  <div class="chart-wrap"><chart :source="barSource" chartType="bar"></chart></div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from "vue";
import dayjs from "dayjs";
import Chart from "@/views/components/chart.vue";
import { billService } from "@/services";
import DatePicker from "@/components/date-picker.vue";
import { CommonDataItem } from "../common/types";

interface ListItem {
  month: number;
  expend: number;
  income: number;
}
export default defineComponent({
  components: { Chart, DatePicker },
  props: {
    wholeTimeSlot: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const barSource = ref<CommonDataItem[]>([]);
    const lineSource = ref<CommonDataItem[]>([]);
    const activeIndex = ref<number>(0);
    const monthList = computed(() => {
      let start = dayjs(props.wholeTimeSlot.minDate).year();
      const end = dayjs(props.wholeTimeSlot.maxDate).year();
      const result = [];
      while (start <= end) {
        result.push(start);
        start++;
      }
      return result;
    });
    const dataFormatter = (data: ListItem[], source: Ref<CommonDataItem[]>, type: string) => {
      const _data = data;
      _data.sort((pre: ListItem, next: ListItem) => {
        if (pre.month > next.month) {
          return -1;
        } else if (pre.month < next.month) {
          return 1;
        } else {
          return 0;
        }
      });
      source.value = [];
      const result: { name: "支出" | "收入"; xAxisVal: string; yAxisVal: number }[] = [];
      _data.forEach((item: ListItem) => {
        if (type === "bar") {
          [
            {
              name: "支出" as "支出" | "收入",
              xAxisVal: dayjs(item.month).format("MM"),
              yAxisVal: item.expend
            },
            {
              name: "收入" as "支出" | "收入",
              xAxisVal: dayjs(item.month).format("MM"),
              yAxisVal: item.income
            }
          ].forEach(item => {
            result.push(item);
          });
        } else {
          [
            {
              xAxisVal: dayjs(item.month).format("MM"),
              yAxisVal: item.expend,
              name: "支出" as "支出" | "收入"
            },
            {
              xAxisVal: dayjs(item.month).format("MM"),
              yAxisVal: item.income,
              name: "收入" as "支出" | "收入"
            }
          ].forEach(item => {
            result.push(item);
          });
        }

        result.push();
      });
      source.value = result;
    };
    watch(
      activeIndex,
      () => {
        billService
          .getListByYear({
            year: dayjs(((monthList as unknown) as [])[activeIndex.value]).valueOf()
          })
          .then(res => {
            dataFormatter(res, barSource, "bar");
            dataFormatter(res, lineSource, "line");
          });
      },
      {
        immediate: true
      }
    );

    return {
      activeIndex,
      monthList,
      barSource,
      lineSource
    };
  }
});
</script>

<style lang="scss" scoped>
.chart-wrap {
  border: 1px solid #ebedf0;
  margin: 12px 14px;
  border-radius: 8px;
}
</style>
