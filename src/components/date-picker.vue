<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      :type="type"
      :title="title"
      :visible-item-count="visibleItemCount"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    ></van-datetime-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  components: {},
  props: {
    timeValue: {
      type: String,
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
    }
  },
  emits: ["update:time-value", "date-confirm"],
  setup(props, context) {
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
    return { handleConfirm, currentDate, handleCancel };
  }
});
</script>

<style lang="scss" scoped></style>
