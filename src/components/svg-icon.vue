<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName"></use>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "SvgIcon",
  props: {
    iconName: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  components: {},

  setup(props) {
    const svgName = computed(() => {
      return `#iAccounts-${props.iconName}`;
    });
    const svgClass = computed(() => {
      return props.className ? `svg-icon ${props.className}` : "svg-icon";
    });
    return { svgName, svgClass };
  }
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  vertical-align: middle;
}
</style>
