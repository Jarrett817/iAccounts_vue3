<template>
  <div style="margin: 16px">
    <van-button round block type="primary" @click="handleClick"> 退出登录 </van-button>
  </div>
  <i-tabbar></i-tabbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {},

  setup() {
    const store = useStore();
    const router = useRouter();
    const handleClick = async () => {
      await store.commit("logout");
      router.push({
        name: "billList"
      });
    };
    return { handleClick };
  }
});
</script>

<style lang="scss" scoped></style>
