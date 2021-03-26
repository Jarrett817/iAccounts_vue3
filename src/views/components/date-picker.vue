<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="year-month"
      title="选择年月"
      visible-item-count="5"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    ></van-datetime-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
export default defineComponent({
  components: {},
  props: {
    timeValue: {
      type: Date,
      default: null,
    },
  },
  emits: ['update:timeValue', 'dateConfirm'],
  setup(props, context) {
    const currentDate = computed({
      get: () => props.timeValue as Date,
      set: (val: Date) => {
        context.emit('update:timeValue', val);
      },
    });
    const handleConfirm = (value: Date) => {
      context.emit('dateConfirm', value);
    };
    const handleCancel = () => {
      context.emit('dateConfirm');
    };
    return { handleConfirm, currentDate, handleCancel };
  },
});
</script>

<style lang="scss" scoped></style>
