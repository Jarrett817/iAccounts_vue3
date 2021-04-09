<template>
  <i-layout>
    <template v-slot:header>
      <balance-tab v-model:active="activeIndex"></balance-tab>
    </template>
    <template v-slot:main>
      <section>
        <router-link
          class="single-icon"
          v-for="item in iconList"
          :key="item.id"
          :to="`/tags/edit/${item.id}`"
        >
          <svg-icon :name="item.icon"></svg-icon>
          <span>{{ item.name }}</span>
        </router-link>
      </section>
    </template>
    <template v-slot:footer>
      <i-tabbar></i-tabbar>
    </template>
  </i-layout>
</template>

<script lang="ts">
import { tagService } from "@/services";
import { defineComponent, ref, watchEffect } from "vue";

interface Icon {
  name: string;
  id: number;
  icon: string;
}
export default defineComponent({
  setup() {
    const activeIndex = ref(0);
    const iconList = ref<Icon[]>([]);
    watchEffect(() => {
      tagService.getTags({ type: activeIndex.value ? "income" : "expend" }).then(res => {
        iconList.value = res;
      });
    });
    return {
      activeIndex,
      iconList
    };
  }
});
</script>

<style lang="scss" scoped>
section {
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 100%;
  .single-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 12px;
    .svg-icon {
      fill: red;
      font-size: 36px;
      margin-bottom: 4px;
    }
    span {
      font-size: 12px;
    }
  }
}
</style>
