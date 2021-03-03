<template>
  <div class="dash-board">
    <h2>当月支出</h2>
    <h2 class="expend">{{ expend }}</h2>
    <h3>
      <span>当月收入</span><span class="income">{{ income }}</span>
    </h3>
    <van-divider dashed></van-divider>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    expend: {
      type: Number,
      required: true,
      default: 0,
    },
    income: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  setup(props) {},
});
</script>

<style lang="scss" scoped>
.dash-board {
  text-align: left;
  padding: 4px 24px;
  h2 {
    font-size: 24px;
    &.expend {
      color: #e67e81;
    }
  }
  h3 {
    font-size: 18px;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    padding-right: 100px;
    span.income {
      color: #4ca2f8;
    }
  }
}
</style>
