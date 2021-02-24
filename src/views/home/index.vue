<template>
  <i-layout>
    <template v-slot:header> 这是头部 </template>
    <template v-slot:main> 这是内容 </template>
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

<style lang="scss" scoped></style>
