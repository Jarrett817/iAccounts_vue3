<template>
  <van-action-sheet
    title="选择标签"
    v-model:show="listShow"
    closeable
    position="bottom"
    :style="{ height: '100vh' }"
  >
    <div class="icon-list-wrap">
      <svg-icon v-for="icon in iconList" :key="icon" :name="icon" @click="onClick"></svg-icon>
    </div>
  </van-action-sheet>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:show", "selected"],
  setup(props, ctx) {
    const iconList = [
      "business",
      "bonus",
      "clothes",
      "daily",
      "food",
      "donate",
      "houserent",
      "intrest",
      "fuel",
      "entertainment",
      "medicine",
      "salary",
      "makeup",
      "shopping",
      "study",
      "phone",
      "tour",
      "smoke_wine",
      "traffic",
      "winning",
      "investment",
      "other"
    ];
    const listShow = computed({
      get() {
        return props.show;
      },
      set(val) {
        ctx.emit("update:show", val);
      }
    });
    const onClick = (event: MouseEvent) => {
      let name = (event.currentTarget! as SVGElement).children[0].attributes[0].value.split("-")[1];

      ctx.emit("selected", name);
    };
    return { listShow, iconList, onClick };
  }
});
</script>

<style lang="scss" scoped>
.icon-list-wrap {
  padding: 0 12px 12px 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  overflow: auto;
  .svg-icon {
    font-size: 36px;
    margin: 16px;
  }
}
</style>
