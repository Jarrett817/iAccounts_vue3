<template>
  <van-tabs v-model:active="activeIndex" @click="handleTabsClick">
    <van-tab v-for="tab in ['支出', '收入']" :title="tab" :key="tab"></van-tab>
  </van-tabs>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  components: {},
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  emits: ["change", "update:active"],
  setup(props, ctx) {
    const activeColor = ref("#4ca2f8");
    const handleTabsClick = (index: number) => {
      if (index) {
        activeColor.value = "#e67e81";
        ctx.emit("change", "expend");
      } else {
        activeColor.value = "#4ca2f8";
        ctx.emit("change", "income");
      }
    };
    const activeIndex = computed({
      get() {
        return props.active;
      },
      set(val) {
        ctx.emit("update:active", val);
      }
    });
    return { handleTabsClick, activeIndex, activeColor };
  }
});
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs__line) {
  background-color: v-bind(activeColor);
}
</style>
