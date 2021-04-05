<template>
  <van-popup v-model:show="handleShow" position="bottom" get-container="body">
    <van-tabs v-model="result.type" @click="handleTabsClick">
      <van-tab v-for="tab in ['支出', '收入']" :title="tab" :key="tab"></van-tab>
    </van-tabs>
    <div class="icon-list"></div>
    <van-field left-icon="records" v-model="result.note" label="备注" placeholder="点击写备注" />
    <div class="date-value-wrap">
      <van-button size="large" icon="src/assets/svg/date.svg" @click="handleClick">
        {{ buttonText }}
      </van-button>
      <div class="keyboard-value">{{ result.value || 0 }}</div>
    </div>
    <van-number-keyboard
      v-if="!datetPickerShow"
      v-model="result.value"
      :show="true"
      theme="custom"
      extra-key="."
      close-button-text="完成"
    >
    </van-number-keyboard>
    <date-picker
      v-else
      title="选择日期"
      type="date"
      visibleItemCount="4"
      @date-confirm="handleDateConfirm"
    ></date-picker>
  </van-popup>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import DatePicker from "@/components/date-picker.vue";
import dayjs from "dayjs";
interface Result {
  date: number;
  value: number;
  type: string;
  note: string;
}
export default defineComponent({
  components: { DatePicker },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:show"],
  setup(props, context) {
    const activeColor = ref("#4ca2f8");
    const moneyPannelVisible = ref<boolean>(false);
    const result = reactive<Result>({
      date: dayjs().valueOf(),
      value: 0,
      type: "",
      note: ""
    });
    const datetPickerShow = ref(false);
    const handleTabsClick = (index: number) => {
      if (index) {
        activeColor.value = "#e67e81";
      } else {
        activeColor.value = "#4ca2f8";
      }
    };
    const handleShow = computed({
      get() {
        return props.show;
      },
      set(val) {
        context.emit("update:show", val);
      }
    });
    const buttonText = computed(() => {
      if (dayjs(result.date).isSame(dayjs(), "day")) {
        return "今天";
      } else if (dayjs(result.date).isSame(dayjs().subtract(1, "day"), "day")) {
        return "昨天";
      } else {
        return dayjs(result.date).format("YYYY-MM-DD");
      }
    });
    const handleClick = () => {
      datetPickerShow.value = !datetPickerShow.value;
    };
    const handleDateConfirm = (date: Date) => {
      result.date = dayjs(date).valueOf();
    };

    return {
      datetPickerShow,
      handleClick,
      buttonText,
      handleDateConfirm,
      result,
      handleTabsClick,
      moneyPannelVisible,
      handleShow,
      activeColor
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs__line) {
  background-color: v-bind(activeColor);
}
.van-popup {
  background-color: #f2f3f5;
}
.icon-list {
  height: 2em;
  width: 100%;
  overflow: auto;
}
.date-value-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  .keyboard-value {
    line-height: 1.5em;
    font-size: 1.5em;
    text-align: right;
    flex: 1;
  }
  .van-button {
    border: none;
    width: fit-content;
  }
}

.van-number-keyboard {
  position: static;
  padding-bottom: 0;
}
</style>
