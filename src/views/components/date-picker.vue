<template>
  <div>
    <van-action-sheet
      v-model:show="handleShow"
      :actions="actions"
      @select="onSelect"
      @opened="handleSheetOpen"
    >
      <van-datetime-picker
        v-model="currentMonth"
        type="year-month"
        title="选择年月"
        visible-item-count="7"
        :confirm="handleConfirm"
        ref="pickerRef"
      ></van-datetime-picker>
    </van-action-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, nextTick } from 'vue';
import dayjs from 'dayjs';
export default defineComponent({
  components: {},
  props: {
    curMonth: {
      type: Number,
      default: null,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  setup(props, context) {
    const pickerRef = ref(null);
    const curYear = dayjs().format('YYYY');
    const curMonth = dayjs().format('YYYY-MM');
    const handleShow = computed({
      get: () => props.visible,
      set: (val) => {
        context.emit('update:visible', val);
      },
    });
    const handleSheetOpen = async () => {
      await nextTick();
      const pickerInstance = pickerRef.value.getPicker();
      //设置默认日期
      pickerInstance.setColumnValue(0, curYear);
      pickerInstance.setColumnValue(1, curMonth);
    };
    // const handleConfirm = (value) => {
    //   console.log(value);
    //   handleShow.value = false;
    // };
    return { handleShow, pickerRef, handleSheetOpen, handleConfirm };
  },
});
</script>

<style lang="scss" scoped></style>
