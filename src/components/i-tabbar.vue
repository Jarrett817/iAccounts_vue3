<template>
  <header class="tabbar">
    <van-tabbar route>
      <van-tabbar-item
        v-for="tabItem in tabList"
        :icon="tabItem.icon"
        :key="tabItem.field"
        replace
        :to="tabItem.route"
      ></van-tabbar-item>
    </van-tabbar>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "iTabbar",
  setup() {
    const tabList = [
      {
        icon: "wap-home-o",
        field: "home",
        route: "/"
      },
      {
        icon: "label-o",
        field: "tags",
        route: "/tags"
      },
      {
        icon: "add-o",
        field: "add"
      },
      {
        icon: "chart-trending-o",
        field: "statistic",
        route: "/statistic"
      },
      { icon: "setting-o", field: "setting", route: "/settings" }
    ];
    return { tabList };
  }
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
