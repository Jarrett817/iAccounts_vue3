<template>
  <i-layout>
    <template v-slot:header>
      <van-nav-bar title="iAccounts·爱记账" @click-left="onClickLeft" @click-right="onClickRight">
        <template #left>
          <van-icon name="search" size="18" />
        </template>
        <template #right>
          <van-icon name="setting-o" size="18" />
        </template>
      </van-nav-bar>
    </template>
    <template v-slot:main>
      <dash-board :expend="monthlyExpend" :income="monthlyIncome"></dash-board>
      <van-dropdown-menu>
        <van-dropdown-item @open="handleOpen">{{}}</van-dropdown-item>
      </van-dropdown-menu>
      <date-picker v-model:visible="datePickerVisible"></date-picker>
    </template>
    <template v-slot:footer> <i-tabbar></i-tabbar> </template>
  </i-layout>
</template>

<script lang="ts">
import ILayout from '@/components/i-layout.vue';
import ITabbar from '@/components/i-tabbar.vue';
import DashBoard from '../components/dash-board.vue';
import DatePicker from '../components/date-picker.vue';
import { defineComponent, ref } from 'vue';
import { statisticService } from '@/services/';
export default defineComponent({
  components: { ILayout, ITabbar, DashBoard, DatePicker },
  setup() {
    const monthlyExpend = ref<number>(0);
    const monthlyIncome = ref<number>(0);
    const datePickerVisible = ref(false);
    statisticService.getBalanceByTimeSlot({ startTime: 12312312, endTime: 1231 }).then((res) => {
      const { expend, income } = res;
      monthlyExpend.value = expend;
      monthlyIncome.value = income;
    });
    const handleOpen = () => {
      datePickerVisible.value = !datePickerVisible.value;
    };
    return { monthlyExpend, monthlyIncome, handleOpen, datePickerVisible };
  },
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
}
.van-datetime-picker {
  height: 50px;
}
</style>
