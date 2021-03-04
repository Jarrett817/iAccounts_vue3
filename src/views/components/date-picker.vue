<template>
  <div>
    <van-action-sheet v-model:show="handleShow" :actions="actions" @select="onSelect">
      <van-datetime-picker
        v-model="currentMonth"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        visible-item-count="7"
        ref="pickerRef"
      ></van-datetime-picker>
    </van-action-sheet>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue';
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
    const handleShow = computed({
      get: () => props.visible,
      set: (val) => {
        context.emit('update:visible', val);
      },
    });
    onMounted(() => {
      console.log(pickerRef.value);
      // const pickerInstance = pickerRef.value;
      // console.log(pickerInstance.getValues());
    });
    return { handleShow, pickerRef };
  },
});
</script>

<style lang="scss" scoped></style>
