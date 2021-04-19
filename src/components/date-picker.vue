<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      :type="type"
      :title="title"
      :visible-item-count="visibleItemCount"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    ></van-datetime-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import dayjs, { Dayjs } from "dayjs";
export default defineComponent({
  components: {},
  props: {
    timeValue: {
      type: Date,
      default: null
    },
    type: {
      type: String,
      default: "year-month"
    },
    visibleItemCount: {
      type: String,
      default: "5"
    },
    title: {
      type: String,
      default: ""
    },
    wholeTimeSlot: {
      type: Object,
      default: () => {}
    }
  },
  emits: ["update:time-value", "date-confirm"],
  setup(props, context) {
    const minDate = ref<Date>(new Date(dayjs().year() - 3, 0));
    const maxDate = ref<Date>(new Date(dayjs().year(), 11));
    if (props.wholeTimeSlot) {
      minDate.value = new Date(props.wholeTimeSlot.minDate);
      maxDate.value = new Date(props.wholeTimeSlot.maxDate);
    }
    const currentDate = computed({
      get: (): string => props.timeValue,
      set: (val: string) => {
        context.emit("update:time-value", val);
      }
    });
    const handleConfirm = (value: Date) => {
      context.emit("date-confirm", value);
    };
    const handleCancel = () => {
      context.emit("date-confirm");
    };

    return { minDate, maxDate, handleConfirm, currentDate, handleCancel };
  }
});
</script>

<style lang="scss" scoped></style>
