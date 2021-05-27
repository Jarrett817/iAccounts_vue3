<template>
  <van-popup v-model:show="handleShow" position="bottom" get-container="body">
    <balance-tab v-model:active="activeIndex"></balance-tab>
    <div class="icon-list" v-if="iconList?.length">
      <div @click="onIconClick" v-for="item in iconList" :key="item.name">
        <div class="icon-name-wrap" :key="item.name">
          <svg-icon :class="['tag-icon', item.selected ? 'selected' : '']" :name="item.icon" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div v-else class="click-me">
      一个标签都没有，赶快<router-link
        :to="{
          name: 'tags.detail',
          params: { id: null },
          query: {
            mode: 'add',
            type: activeIndex ? 'income' : 'expend',
            from: 'tags'
          }
        }"
        >添加</router-link
      >一个吧~
    </div>
    <van-divider />
    <section>
      <div class="desc-wrap">
        <svg-icon class="icon-edit" name="edit"></svg-icon>
        <van-field
          v-model="result.desc"
          left-icon="winning"
          placeholder="点击写备注"
          maxlength="60"
        />
      </div>
      <div class="date-value-wrap">
        <van-button size="large" :icon="calendar" @click="handleClick">
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
          v-model:time-value="timeValue"
          @date-confirm="handleDateConfirm"
        ></date-picker>
      </keep-alive>
    </transition>
  </van-popup>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect, inject } from "vue";
import DatePicker from "@/components/date-picker.vue";
import { billService, tagService } from "@/services/";
import dayjs, { Dayjs } from "dayjs";
import { Notify } from "vant";
import calendar from "@/assets/svg/calendar.svg";
type BalanceType = "expend" | "income";
interface Result {
  createdAt: number;
  value: string;
  type: BalanceType;
  desc: string;
  tagId: number | null;
  id?: number;
}
export default defineComponent({
  components: { DatePicker },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  emits: ["update:show"],
  setup(props, context) {
    const activeIndex = ref(0);
    const moneyPannelVisible = ref<boolean>(false);
    const result = reactive<Result>({
      createdAt: dayjs().valueOf(),
      value: "",
      type: "expend",
      desc: "",
      tagId: null
    });
    const iconList = ref<{ id: number; icon: string; name: string; selected?: boolean }[]>([]);
    const reload: Function = inject("reload") as Function;
    const datePickerShow = ref(false);
    const curDate = props.params
      ? props.params.createdAt
        ? dayjs(props.params.createdAt)
        : new Date()
      : new Date();
    // 给datePicker设置默认值
    const timeValue = ref<Date | Dayjs>(curDate);
    watchEffect(() => {
      // 若已有参数，打开面板时进行填充
      if (props.params) {
        Object.assign(result, { ...props.params, value: props.params.value.toString() });
        activeIndex.value = props.params.type === "expend" ? 0 : 1;
      }
    });

    watchEffect(() => {
      const types = ["expend", "income"];
      result.type = types[activeIndex.value] as BalanceType;
      tagService.getTags({ type: result.type }).then(res => {
        iconList.value = res;
        if (res?.length) {
          iconList.value.forEach(item => {
            if ((result.tagId || result.tagId === 0) && item.id === result.tagId) {
              item.selected = true;
            }
          });
        }
      });
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
      if (dayjs(result.createdAt).isSame(dayjs(), "day")) {
        return "今天";
      } else if (dayjs(result.createdAt).isSame(dayjs().subtract(1, "day"), "day")) {
        return "昨天";
      } else {
        return dayjs(result.createdAt).format("YYYY-MM-DD");
      }
    });
    const handleClick = () => {
      datePickerShow.value = !datePickerShow.value;
    };
    const handleDateConfirm = (date: Date) => {
      result.createdAt = dayjs(date).valueOf();
      datePickerShow.value = false;
    };
    const onCloseValidator = () => {
      let flag = true;
      if (!(result.tagId || result.tagId === 0)) {
        Notify({ type: "warning", message: "至少需要选择一个记账标签" });
        flag = false;
      } else if (Number(result.value) === 0) {
        Notify({ type: "warning", message: "金额不能为0" });
        flag = false;
      }
      return flag;
    };
    const onClose = () => {
      const closePannelAndclearParams = () => {
        handleShow.value = false;
        setTimeout(() => {
          const emptyResult = {
            date: dayjs().valueOf(),
            value: "",
            type: "expend",
            desc: "",
            tagId: null
          };
          Object.assign(result, emptyResult);
        }, 500);
        reload();
      };
      if (props.params) {
        if (onCloseValidator()) {
          billService
            .updateTargetBill({
              desc: result.desc,
              type: result.type,
              value: Number(result.value),
              id: result.id as number,
              tagId: result.tagId as number,
              createdAt: result.createdAt
            })
            .then(res => {
              Notify({ type: "success", message: "修改成功" });
            });
          closePannelAndclearParams();
        }
      } else {
        if (onCloseValidator()) {
          billService
            .addBill({ ...result, value: Number(Number(result.value).toFixed(2)) })
            .then(res => {
              Notify({ type: "success", message: "新增成功" });
            });

          closePannelAndclearParams();
        }
      }
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
      activeIndex,
      timeValue,
      calendar
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
.no-tag {
  font-size: 16px;
  margin: 6px 0;
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
  .desc-wrap {
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

.click-me {
  font-size: 14px;
  margin: 12px 0;
  a {
    text-decoration: underline;
    color: #155bd4;
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
