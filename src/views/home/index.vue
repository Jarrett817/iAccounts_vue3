<template>
  <i-layout>
    <template v-slot:header>
      <van-nav-bar title="iAccounts·爱记账" @click-left="onClickLeft" @click-right="onClickRight">
        <template #left>
          <van-icon name="search" size="18" />
        </template>
        <template #right>
          <van-icon name="setting-o" size="18" />
        </template>
      </van-nav-bar>
    </template>
    <template v-slot:main> </template>
    <template v-slot:footer> <i-tabbar></i-tabbar> </template>
  </i-layout>
</template>

<script lang="ts">
import ILayout from '@/components/i-layout.vue';
import ITabbar from '@/components/i-tabbar.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { ILayout, ITabbar },
  setup() {},
});
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
}
</style>
