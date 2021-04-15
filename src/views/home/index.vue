<template>
  <i-layout>
    <template v-slot:header>
      <van-nav-bar title="iAccounts"> </van-nav-bar>
    </template>
    <template v-slot:main>
      <div class="home-main-wrap">
        <dash-board
          :curMonth="dashBoardMonth"
          :expend="monthlyExpend"
          :income="monthlyIncome"
        ></dash-board>
        <van-sticky :offset-top="45">
          <van-dropdown-menu>
            <van-dropdown-item ref="datePickerDropdown" :title="formattedDate">
              <date-picker
                title="选择年月"
                v-model:time-value="timeValue"
                @date-confirm="handleConfirm"
              ></date-picker>
            </van-dropdown-item>
            <van-dropdown-item v-model="curType" :options="listTypeOptions"> </van-dropdown-item>
          </van-dropdown-menu>
        </van-sticky>
        <div class="list-wrap"><bill-list :listData="detailList"></bill-list></div>
      </div>
    </template>
    <template v-slot:footer> <i-tabbar></i-tabbar> </template>
  </i-layout>
</template>
<script lang="ts">
import DashBoard from "../components/dash-board.vue";
import DatePicker from "@/components/date-picker.vue";
import BillList from "./bill-list.vue";
import { computed, defineComponent, ref, watch } from "vue";
import { billService } from "@/services/";
import { ListItem } from "../common/types";
import dayjs from "dayjs";
export default defineComponent({
  components: {
    DashBoard,
    DatePicker,
    BillList
  },
  setup() {
    BillList;
    const datePickerDropdown = ref<{ toggle: Function } | null>(null);
    const monthlyExpend = ref<number>(0);
    const monthlyIncome = ref<number>(0);
    const detailList = ref<ListItem[]>([]);
    // 默认获取当月时间
    const curDate = new Date();
    // 给datePicker设置默认值
    const timeValue = ref<Date>(curDate);
    const dashBoardMonth = ref<Date>(curDate);
    const formattedDate = computed(() => {
      return dayjs(timeValue.value).format("YYYY-MM");
    });
    const listContainer = ref(null);
    const listTypeOptions = [
      { text: "全部", value: 0 },
      { text: "支出", value: 1 },
      { text: "收入", value: 2 }
    ];
    const curType = ref(0);

    const getStatistic = (date: Date, listType: number) => {
      const startTime = dayjs(date).startOf("month").valueOf();
      const endTime = dayjs(date).endOf("month").valueOf();
      billService.getListByTimeSlot({ startTime, endTime, listType }).then(res => {
        detailList.value = res;
      });
      billService.getBalanceByTimeSlot({ startTime, endTime }).then(res => {
        const { expend, income } = res;
        monthlyExpend.value = expend;
        monthlyIncome.value = income;
      });
    };
    getStatistic(timeValue.value, curType.value);
    const handleConfirm = (value: Date) => {
      if (value) {
        getStatistic(value, curType.value);
        dashBoardMonth.value = value;
      }
      datePickerDropdown.value!.toggle();
    };
    watch(curType, val => {
      getStatistic(timeValue.value, val);
    });
    return {
      monthlyExpend,
      monthlyIncome,
      timeValue,
      formattedDate,
      datePickerDropdown,
      handleConfirm,
      curType,
      listTypeOptions,
      dashBoardMonth,
      detailList,
      listContainer
    };
  }
});
</script>

<style lang="scss" scoped>
.home-main-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  .van-datetime-picker {
    height: 50px;
  }
  .list-wrap {
    overflow: auto;
    flex: 1;
  }
}
</style>
