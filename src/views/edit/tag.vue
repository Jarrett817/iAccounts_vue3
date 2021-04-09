<template>
  <div>修改标签</div>
  <i-tabbar></i-tabbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  setup(props) {
  }
});
</script>

<style lang="scss" scoped></style>
