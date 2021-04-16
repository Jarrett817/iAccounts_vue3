<template>
  <van-sticky>
    <van-dropdown-menu>
      <van-dropdown-item ref="datePickerDropdown" :title="formattedDate">
        <date-picker
          title="选择年月"
          v-model:time-value="timeValue"
          @date-confirm="handleConfirm"
        ></date-picker>
      </van-dropdown-item>
    </van-dropdown-menu>
  </van-sticky>
  <div class="chart-wrap"><chart :source="barSource" chartType="bar"></chart></div>
  <div class="chart-wrap">
    <balance-tab v-model:active="ringActiveIndex"></balance-tab>
    <chart :source="ringSource" chartType="ring"> </chart>
  </div>
</template>

<script lang="ts">
import { computed, watch, defineComponent, ref, watchEffect } from "vue";
import dayjs from "dayjs";
import Chart from "@/views/components/chart.vue";
import { billService } from "@/services";
import { CommonDataItem, ListItem } from "../common/types";
import DatePicker from "@/components/date-picker.vue";

interface RingDataItem {
  name: string;
  value: number;
  type: "expend" | "income";
}

export default defineComponent({
  components: { Chart, DatePicker },
  setup() {
    const barSource = ref<CommonDataItem[]>([]);
    let ringSource = ref<RingDataItem[]>([]);
    const ringActiveIndex = ref(0);
    const datePickerDropdown = ref<{ toggle: Function } | null>(null);
    const curDate = new Date();
    const timeValue = ref<Date>(curDate);
    const renderByDatePicker = () => {
      const startTime = dayjs(timeValue.value).startOf("month").valueOf();
      const endTime = dayjs(timeValue.value).endOf("month").valueOf();
      billService.getListByTimeSlot({ startTime, endTime, listType: 0 }).then(res => {
        barDataFormatter(res);
        ringDataFormatter(res);
      });
    };
    renderByDatePicker();
    watch(ringActiveIndex, () => {
      const startTime = dayjs(timeValue.value).startOf("month").valueOf();
      const endTime = dayjs(timeValue.value).endOf("month").valueOf();
      billService.getListByTimeSlot({ startTime, endTime, listType: 0 }).then(res => {
        ringDataFormatter(res);
      });
    });
    const barDataFormatter = (data: ListItem[]) => {
      const curMonthDataList: ListItem[] = data.filter((item: ListItem) => {
        return dayjs(item.createdAt).month() === dayjs(timeValue.value).month();
      });
      curMonthDataList.sort((pre: ListItem, next: ListItem) => {
        if (pre.createdAt! > next.createdAt!) {
          return 1;
        } else if (pre.createdAt! < next.createdAt!) {
          return -1;
        } else {
          return 0;
        }
      });
      barSource.value = [];
      const result: CommonDataItem[] = [];
      for (let i = 0; i < dayjs(timeValue.value).endOf("month").date(); i++) {
        let dayilyExpend = 0;
        let dailyIncome = 0;
        const date = dayjs(timeValue.value).date(i + 1);
        curMonthDataList.forEach((item: ListItem) => {
          if (date.isSame(dayjs(item.createdAt), "day")) {
            item.type === "expend" ? (dayilyExpend += item.value) : (dailyIncome += item.value);
          }
        });
        [
          { name: "支出", xAxisVal: date.format("DD"), yAxisVal: dayilyExpend },
          { name: "收入", xAxisVal: date.format("DD"), yAxisVal: dailyIncome }
        ].forEach(item => {
          result.push(item as CommonDataItem);
        });
      }
      barSource.value = result;
    };
    const ringDataFormatter = (data: ListItem[]) => {
      const activeType = ringActiveIndex.value ? "income" : "expend";
      const curMonthDataList: ListItem[] = data.filter((item: ListItem) => {
        return (
          dayjs(item.createdAt).month() === dayjs(timeValue.value).month() &&
          item.type === activeType
        );
      });
      ringSource.value = [];
      const keyMap: { [key: string]: number } = {};
      curMonthDataList.forEach((item: ListItem) => {
        const tagName = item.tag.name;

        keyMap[tagName] ? (keyMap[tagName] += item.value) : (keyMap[tagName] = item.value);
      });

      const result: { name: string; value: number; type: "expend" | "income" }[] = [];
      Object.keys(keyMap).forEach(key => {
        result.push({
          name: key,
          value: keyMap[key],
          type: activeType
        });
      });
      ringSource.value = result;
    };
    const formattedDate = computed(() => {
      return dayjs(timeValue.value).format("YYYY-MM");
    });
    const handleConfirm = (value: Date) => {
      datePickerDropdown.value!.toggle();
      renderByDatePicker();
    };
    return {
      handleConfirm,
      formattedDate,
      barSource,
      ringSource,
      ringActiveIndex,
      datePickerDropdown,
      timeValue
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
