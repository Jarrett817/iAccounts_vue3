<template>
  <i-layout>
    <template v-slot:header>
      <van-nav-bar left-text="返回" right-text="分享" left-arrow @click-left="onClickLeft">
        <template #title>
          <svg-icon :name="iconName" />
          <span>{{ iconTitle }}</span>
        </template>
      </van-nav-bar>
    </template>
    <template v-slot:main> </template>
    <template v-slot:footer> </template>
  </i-layout>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  props: {
    iconName: {
      type: String,
      default: ""
    },
    iconTitle: {
      type: String,
      default: ""
    },
    from: {
      type: String,
      default: "/"
    }
  },
  setup(props) {
    const router = useRouter();
    const onClickLeft = () => {
      router.push({ path: props.from });
    };
    return { onClickLeft };
  }
});
</script>

<style lang="scss" scoped></style>
