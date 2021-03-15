<template>
  <article class="layout">
    <van-sticky>
      <header><slot name="header" /></header
    ></van-sticky>
    <main><slot name="main" /></main>
    <footer><slot name="footer" /></footer>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'Layout', setup() {} });
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  justify-self: center;
  height: 100vh;
  width: 100vw;
  main {
    flex: 1;
    overflow: hidden;
  }
  header {
    flex-shrink: 0;
  }
  footer {
    flex-shrink: 0;
  }
}
</style>
