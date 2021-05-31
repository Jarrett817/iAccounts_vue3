<template>
  <button class="text-button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "iButton",
  props: {},
  setup(props) {}
});
</script>

<style lang="scss" scoped>
.text-button {
  text-decoration: underline;
  color: #155bd4;
  background: transparent;
  border: none;
}
</style>
