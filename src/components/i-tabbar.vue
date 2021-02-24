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
import { defineComponent, reactive } from 'vue';

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
    return { tabList };
  },
});
</script>

<style lang="scss" scoped></style>
