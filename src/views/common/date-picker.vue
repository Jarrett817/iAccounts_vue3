<template lang="pug">
.block
  span.demonstration 选择时段：
  el-date-picker(
    @input="handleInput",
    :value="dateTimeArray",
    type="daterange",
    align="right",
    range-separator="至",
    start-placeholder="开始日期",
    end-placeholder="结束日期",
    :picker-options="pickerOptions",
    value-format="timestamp",
    :clearable="false"
  )
</template>

<script>
import dayjs from "dayjs";
export default {
  props: {
    dateTimeArray: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      curDateTime: "",
      pickerOptions: {
        disabledDate: this.disabledDate,
        onPick: this.onPick,
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = dayjs()
                .hour(23)
                .minute(59)
                .second(59)
                .millisecond(999)
                .valueOf();
              const start = dayjs(
                dayjs()
                  .subtract(6, "day")
                  .format("YYYY-MM-DD")
              ).valueOf();
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近15天",
            onClick(picker) {
              const end = dayjs()
                .hour(23)
                .minute(59)
                .second(59)
                .millisecond(999)
                .valueOf();
              const start = dayjs(
                dayjs()
                  .subtract(14, "day")
                  .format("YYYY-MM-DD")
              ).valueOf();
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    onPick(date) {
      //第一次pick是最小日期,以这个日期为中心取前后各14天
      if (!date.maxDate) {
        this.curDateTime = date.minDate;
      } else {
        this.curDateTime = "";
      }
    },
    getEndTimeOfTheDay(time) {
      const dayObj = time ? dayjs(time) : dayjs();
      return dayObj
        .hour(23)
        .minute(59)
        .second(59)
        .millisecond(999)
        .valueOf();
    },
    handleInput(newArray) {
      const dateTimeArray = [newArray[0], this.getEndTimeOfTheDay(newArray[1])];
      this.$emit("update:dateTimeArray", dateTimeArray);
    },
    disabledDate(time) {
      const diff = dayjs(time).diff(dayjs(this.curDateTime), "day");
      if (dayjs(time) > dayjs()) return true;
      return Math.abs(diff) >= 15;
    }
  }
};
</script>

<style lang="scss" scoped>
.block {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .demonstration {
    font-size: 12px;
    white-space: nowrap;
  }
}
</style>
