<template>
  <div class="dash-board">
    <h2>
      当月支出·<span>{{ expend }}</span>
    </h2>
    <h3>
      当月收入·<span>{{ income }}</span>
    </h3>
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
}
</style>
