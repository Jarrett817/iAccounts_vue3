<template>
  <van-popup v-model:show="handleShow" position="bottom" get-container="body">
    <van-tabs v-model="tabActive" @click="handleTabsClick">
      <van-tab v-for="tab in ['支出', '收入']" :title="tab" :key="tab"></van-tab>
    </van-tabs>
    <div class="icon-list"></div>
  </van-popup>
  
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:show"],
  setup(props, context) {
    const tabActive = ref(0);
    const activeColor = ref("#4ca2f8");
    const moneyPannelVisible = ref<boolean>(false);

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
    return { tabActive, handleTabsClick, moneyPannelVisible, handleShow, activeColor };
  }
});
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs__line) {
  background-color: v-bind(activeColor);
}
.icon-list {
  height: 2em;
  width: 100%;
  overflow: auto;
}
</style>
