<template>
  <layout><template v-slot:header> 这是头部 </template></layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: { Layout },
  setup() {},
});
</script>

<style lang="scss" scoped></style>
