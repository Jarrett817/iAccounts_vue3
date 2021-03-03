<template>
  <article class="layout">
    <header><slot name="header" /></header>
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
  height: 100%;
  width: 100%;

  main {
    flex: 1;
  }
}
</style>
