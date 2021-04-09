<template>
  <van-popup v-model:show="handleShow" position="bottom" get-container="body">
    <balance-tab v-model:active="activeIndex"></balance-tab>
    <div class="icon-list">
      <div @click="onIconClick" v-for="item in iconList" :key="item.name">
        <div class="icon-name-wrap">
          <svg-icon :class="['tag-icon', item.selected ? 'selected' : '']" :name="item.icon" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <van-divider />
    <section>
      <div class="note-wrap">
        <svg-icon class="icon-edit" name="edit"></svg-icon>
        <van-field v-model="result.note" left-icon="winning" placeholder="点击写备注" />
      </div>
      <div class="date-value-wrap">
        <van-button size="large" icon="src/assets/svg/calendar.svg" @click="handleClick">
          {{ buttonText }}
        </van-button>
        <div class="keyboard-value">{{ result.value || 0 }}</div>
      </div>
    </section>
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
import { computed, defineComponent, reactive, ref, watchEffect } from "vue";
import DatePicker from "@/components/date-picker.vue";
import { accountsService, tagService } from "@/services/";
import dayjs from "dayjs";

type BalanceType = "expend" | "income";
interface Result {
  date: number;
  value: string;
  type: BalanceType;
  note: string;
  tagId: number | null;
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
    const activeIndex = ref(0);
    const moneyPannelVisible = ref<boolean>(false);
    const result = reactive<Result>({
      date: dayjs().valueOf(),
      value: "",
      type: "expend",
      note: "",
      tagId: null
    });
    const iconList = ref<{ id: number; icon: string; name: string; selected?: boolean }[]>([]);
    const datePickerShow = ref(false);
    tagService.getTags({ type: result.type }).then(res => {
      iconList.value = res;
    });
    watchEffect(() => {
      const types = ["expend", "income"];
      result.type = types[activeIndex.value] as BalanceType;
    });
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
      setTimeout(() => {
        result.date = dayjs().valueOf();
        result.type = "expend";
        result.note = "";
        result.value = "";
      }, 500);
    };
    const onIconClick = (event: MouseEvent) => {
      const el = event.currentTarget as HTMLDivElement;
      el!.children[0].children[0].classList.add("selected");
      const targetName = (el!.children[0].children[1] as HTMLSpanElement).innerText;
      iconList.value.forEach(item => {
        if (item.name === targetName) {
          if (item.selected) {
            item.selected = false;
            return;
          }
          item.selected = true;
        } else {
          if (!item.selected) return;
          else item.selected = false;
        }
        if (item.selected) {
          result.tagId = item.id;
        }
      });
    };

    return {
      iconList,
      onClose,
      datePickerShow,
      handleClick,
      buttonText,
      handleDateConfirm,
      result,
      moneyPannelVisible,
      handleShow,
      onIconClick,
      activeIndex
    };
  }
});
</script>

<style lang="scss" scoped>
.van-popup {
  background-color: #f2f3f5;
}
.van-divider {
  margin: 1px 0;
}
.icon-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 56px;
  overflow: auto;
  white-space: nowrap;
  padding: 0 16px;
  margin: 6px 0;
  .icon-name-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
  }
  .tag-icon {
    font-size: 24px;
    margin-bottom: 4px;
    &.selected {
      transform: scale(1.5);
    }
  }
  span {
    font-size: 8px;
  }
}
section {
  padding: 0 16px;
  .note-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    .van-field {
      font-size: 16px;
      padding: 0;
    }
    .icon-edit {
      width: 0.9em;
      height: 0.9em;
    }
  }
  .date-value-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .keyboard-value {
      text-align: right;
      flex: 1;
      line-height: 24px;
      font-size: 24px;
    }
    .van-button {
      border: none;
      width: fit-content;
    }
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
