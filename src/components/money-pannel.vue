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
    <transition name="fade">
      <keep-alive>
        <van-number-keyboard
          v-if="!datePickerShow"
          v-model="result.value"
          :show="true"
          theme="custom"
          extra-key="."
          close-button-text="完成"
          @close="onClose"
          :hide-on-click-outside="false"
          maxlength="12"
        >
        </van-number-keyboard>
        <date-picker
          v-else
          class="date-picker"
          title="选择日期"
          type="date"
          visibleItemCount="4"
          @date-confirm="handleDateConfirm"
        ></date-picker>
      </keep-alive>
    </transition>
  </van-popup>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import DatePicker from "@/components/date-picker.vue";
import { accountsService } from "@/services/";
import dayjs from "dayjs";
interface Result {
  date: number;
  value: string;
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
      value: "",
      type: "",
      note: ""
    });
    const datePickerShow = ref(false);
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
      datePickerShow.value = !datePickerShow.value;
    };
    const handleDateConfirm = (date: Date) => {
      result.date = dayjs(date).valueOf();
      datePickerShow.value = false;
    };
    const onClose = () => {
      accountsService.addAccount({ ...result, value: Number(Number(result.value).toFixed(2)) });
      handleShow.value = false;
    };

    return {
      onClose,
      datePickerShow,
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
    line-height: 1em;
    font-size: 1em;
    text-align: right;
    flex: 1;
  }
  .van-button {
    border: none;
    width: fit-content;
  }
}
.date-picker {
  height: 222px;
}
.van-number-keyboard {
  position: static;
  padding-bottom: 0;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  position: absolute;
}

.fade-leave-active {
  position: absolute;
  transition: opacity 0.5s ease;
}

.fade-leave-to {
  position: absolute;
  opacity: 0;
}
</style>
