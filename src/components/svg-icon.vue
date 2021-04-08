<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="svgName"></use>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  components: {},

  setup(props) {
    const svgName = computed(() => {
      return `#icon-${props.name}`;
    });

    return { svgName };
  }
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  vertical-align: -0.15em;
}
</style>
