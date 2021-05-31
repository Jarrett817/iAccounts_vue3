<template>
  <van-sticky>
    <van-dropdown-menu>
      <van-dropdown-item ref="datePickerDropdown" :title="formattedDate">
        <date-picker
          title="选择年月"
          v-model:time-value="timeValue"
          @date-confirm="handleConfirm"
          :wholeTimeSlot="wholeTimeSlot"
        ></date-picker>
      </van-dropdown-item>
    </van-dropdown-menu>
  </van-sticky>
  <div class="chart-wrap"><chart :source="barSource" chartType="bar"></chart></div>
  <div class="chart-wrap">
    <balance-tab v-model:active="ringActiveIndex"></balance-tab>
    <chart :source="ringSource" chartType="ring"> </chart>
  </div>
  <div class="leader-board">
    <h2>
      <span>当月支出排行</span><van-icon name="medal-o" color="#fad20c" size="24px"></van-icon>
    </h2>
    <ul class="top10-wrap">
      <li v-for="item in top10" :key="item.name" class="top10-item">
        <svg-icon :name="item.icon"></svg-icon>
        <span>{{ item.name }}</span>
        <van-progress :percentage="item.percentage" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, watch, defineComponent, ref } from "vue";
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
  props: {
    wholeTimeSlot: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const barSource = ref<CommonDataItem[]>([]);
    let ringSource = ref<RingDataItem[]>([]);
    const ringActiveIndex = ref(0);
    const datePickerDropdown = ref<{ toggle: Function } | null>(null);
    const curDate = new Date();
    const timeValue = ref<Date>(curDate);
    const top10 = ref<{ name: string; value: number; icon: string; percentage: string }[]>([]);
    const renderByDatePicker = () => {
      const startTime = dayjs(timeValue.value).startOf("month").valueOf();
      const endTime = dayjs(timeValue.value).endOf("month").valueOf();
      billService.getListByTimeSlot({ startTime, endTime, listType: 0 }).then(res => {
        barDataFormatter(res);
        ringDataFormatter(res);
        top10Formatter(res);
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
      barSource.value = [];
      if (!data?.length) return;
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
      ringSource.value = [];
      if (!data?.length) return;
      const activeType = ringActiveIndex.value ? "income" : "expend";
      const curMonthDataList: ListItem[] = data.filter((item: ListItem) => {
        return (
          dayjs(item.createdAt).month() === dayjs(timeValue.value).month() &&
          item.type === activeType
        );
      });
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
    const top10Formatter = (data: ListItem[]) => {
      if (!data?.length) return;
      const curMonthDataList: ListItem[] = data.filter((item: ListItem) => {
        return (
          dayjs(item.createdAt).month() === dayjs(timeValue.value).month() && item.type === "expend"
        );
      });
      const keyMap: { [key: string]: { value: number; icon: string } } = {};
      let total = 0;
      curMonthDataList.forEach((item: ListItem) => {
        total += item.value;
        const tagName = item.tag.name;
        const tagIcon = item.tag.icon;
        keyMap[tagName]
          ? (keyMap[tagName].value += item.value)
          : (keyMap[tagName] = { value: 0, icon: "" }) &&
            (keyMap[tagName].value = item.value) &&
            (keyMap[tagName].icon = tagIcon);
      });
      const result: { name: string; value: number; icon: string; percentage: string }[] = [];
      Object.keys(keyMap).forEach(key => {
        result.push({
          name: key,
          value: keyMap[key].value,
          icon: keyMap[key].icon,
          percentage: ((keyMap[key].value / total) * 100).toFixed(2)
        });
      });
      top10.value = result
        .sort(
          (
            pre: { name: string; value: number; icon: string },
            next: { name: string; value: number; icon: string }
          ) => {
            if (pre.value! > next.value!) return -1;
            else if (pre.value! < next.value!) return 1;
            else return 0;
          }
        )
        .splice(0, 10);
    };
    return {
      top10,
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
h2 {
  font-size: 18px;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ebedf0;
  padding: 0 8px 8px 8px;
}
.leader-board {
  border: 1px solid #ebedf0;
  padding: 0 16px 0 16px;
  margin: 12px 14px;
  border-radius: 8px;
  .top10-wrap {
    width: 100%;
    .top10-item {
      display: grid;
      justify-content: start;
      align-content: center;
      grid-template-areas:
        "icon title"
        "icon progress";
      grid-template-columns: 48px 85%;
      grid-auto-rows: 1fr auto;
      padding: 12px 8px 8px 8px;
      .svg-icon {
        font-size: 36px;
        grid-area: icon;
      }
      .van-progress {
        width: 100%;
        grid-area: progress;
        margin-bottom: 2px;
      }
      span {
        grid-area: title;
        font-size: 14px;
        justify-self: left;
      }
    }
  }
}
</style>
