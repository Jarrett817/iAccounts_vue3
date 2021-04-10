<template>
  <div class="tabbar">
    <van-tabbar @change="handleTabbarChange" route>
      <van-tabbar-item
        v-for="tabItem in tabList"
        :icon="tabItem.icon"
        :key="tabItem.field"
        replace
        :to="tabItem.route"
      ></van-tabbar-item>
    </van-tabbar>
  </div>
  <money-pannel v-model:show="moneyPannelVisible"></money-pannel>
</template>

<script lang="ts">
import MoneyPannel from "./money-pannel.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "iTabbar",
  components: { MoneyPannel },
  setup() {
    const tabList = [
      {
        icon: "wap-home-o",
        field: "billList",
        route: "/billList"
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
      { icon: "user-circle-o", field: "user", route: "/user" }
    ];
    const moneyPannelVisible = ref<boolean>(false);
    const handleTabbarChange = (activeIndex: number) => {
      if (activeIndex === 2) {
        moneyPannelVisible.value = true;
      }
    };
    return {
      tabList,
      handleTabbarChange,
      moneyPannelVisible
    };
  }
});
</script>

<style lang="scss" scoped>
.tabbar {
  ::v-deep(.van-tabbar-item--active) {
    .van-icon {
      font-weight: bold;
    }
  }
}
</style>
