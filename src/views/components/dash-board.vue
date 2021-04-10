<template>
  <div class="dash-board">
    <h2>{{ month }}月支出</h2>
    <h2 class="expend">-{{ expend }}</h2>
    <h3>
      <span>{{ month }}月收入</span><span class="income">+{{ income }}</span>
    </h3>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import dayjs from "dayjs";
export default defineComponent({
  components: {},
  props: {
    expend: {
      type: Number,
      required: true,
      default: 0
    },
    income: {
      type: Number,
      required: true,
      default: 0
    },
    curMonth: {
      type: Date,
      default: null,
      required: true
    }
  },
  setup(props) {
    const month = computed(() => {
      if (dayjs().isSame(props.curMonth, "month")) return "当";
      return dayjs(props.curMonth).month();
    });
    return { month };
  }
});
</script>

<style lang="scss" scoped>
.dash-board {
  text-align: left;
  padding: 4px 24px;
  h2 {
    font-size: 18px;
    &.expend {
      color: #4ca2f8;
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
      color: #e67e81;
    }
  }
}
</style>
