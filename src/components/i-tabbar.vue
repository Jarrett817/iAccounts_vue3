<template>
  <header class="tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="tabItem in tabList"
        :icon="tabItem.icon"
        :key="tabItem.field"
      ></van-tabbar-item>
    </van-tabbar>
  </header>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'Layout',
  setup() {
    const tabList = reactive([
      {
        icon: 'wap-home-o',
        field: 'home',
      },
      {
        icon: 'label-o',
        field: 'tags',
      },
      {
        icon: 'add-o',
        field: 'add',
      },
      {
        icon: 'chart-trending-o',
        field: 'statistic',
      },
      { icon: 'setting-o', field: 'setting' },
    ]);
    const active = ref(0);
    return { tabList, active };
  },
});
</script>

<style lang="scss" scoped>
.tabbar {
  :v-deep(.van-tabbar-item--active) {
    .van-icon {
      font-weight: bold;
    }
  }
}
</style>
