<template>
  <i-layout>
    <template v-slot:header>
      <balance-tab v-model:active="activeIndex"></balance-tab>
    </template>
    <template v-slot:main>
      <section v-if="iconList?.length">
        <router-link
          class="single-icon"
          v-for="item in iconList"
          :key="item.id"
          :to="{
            name: 'tags.detail',
            params: { id: item.id },
            query: {
              type: item.type,
              from: 'tags'
            }
          }"
        >
          <svg-icon :name="item.icon"></svg-icon>
          <span>{{ item.name }}</span>
        </router-link>
        <router-link
          class="single-icon"
          :to="{
            name: 'tags.detail',
            params: { id: null },
            query: {
              mode: 'add',
              type: activeIndex ? 'income' : 'expend',
              from: 'tags'
            }
          }"
        >
          <van-icon size="36" color="#c8c9cc" name="add" />
          <span>添加</span>
        </router-link>
      </section>
      <van-empty
        v-else
        class="custom-image"
        image="src/assets/emptyStatus/noTags.png"
        description=""
      >
        <template v-slot:description>
          <div class="click-me">
            一个标签都没有，赶快<router-link
              :to="{
                name: 'tags.detail',
                params: { id: null },
                query: {
                  mode: 'add',
                  type: activeIndex ? 'income' : 'expend',
                  from: 'tags'
                }
              }"
              >添加</router-link
            >一个吧~
          </div>
        </template>
      </van-empty>
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
  type: "expend" | "income";
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
  display: grid;
  grid-template-columns: repeat(auto-fill, 60px);
  justify-content: space-between;
  height: 100%;
  align-content: start;
  .single-icon {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    margin: 12px;
    .van-icon {
      margin-bottom: 4px;
    }
    .svg-icon {
      font-size: 36px;
      margin-bottom: 4px;
    }
    span {
      font-size: 12px;
    }
  }
}
.van-empty__description {
  a {
    text-decoration: underline;
    color: #155bd4;
  }
}
</style>
