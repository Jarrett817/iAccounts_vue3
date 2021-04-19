<template>
  <div class="total-wrapper">
    <div class="login-pannel">
      <h1>iAccounts</h1>
      <van-form @submit="onSubmit">
        <van-field
          v-model="userInfo.id"
          name="id"
          label="账号"
          placeholder="账号"
          maxLength="10"
          autocomplete
          :rules="[
            {
              pattern: /^.*(?=.{6,10})/,
              message: '账号最少6位'
            },
            { pattern: /[a-z0-9A-Z]{6,10}/, message: '账号必须由英文字母或数字组成' },
            { required: true, message: '请填写账号' }
          ]"
        />
        <van-field
          v-model="userInfo.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          maxLength="14"
          autocomplete
          :rules="[
            {
              pattern: /^.*(?=.{6,10})/,
              message: '密码最少6位'
            },
            {
              pattern: /^.*(?=.*\d)(?=.*[A-Za-z])(?=.*[@!#$%^&*?]).*$/,
              message: '密码至少包括1个英文字母，1个数字，1个特殊字符'
            },
            { required: true, message: '请填写密码' }
          ]"
        />
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit">
            {{ type === "register" ? "注册" : "登录" }}
          </van-button>
        </div>
        <p v-if="type !== 'register'">
          还未注册？点击<router-link :to="{ name: 'login', params: { type: 'register' } }"
            >注册</router-link
          >
        </p>
        <p v-else>已有账号？点击<router-link :to="{ name: 'login' }">登录</router-link></p>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  components: {},
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const userInfo = reactive({
      id: "",
      password: ""
    });
    const store = useStore();
    const router = useRouter();
    const reload: Function = inject("reload") as Function;
    const onSubmit = async (values: { id: string; password: string }) => {
      if (props.type === "register") {
        await store.dispatch("registerAsync", values);
      } else {
        await store.dispatch("loginAsync", values);
        if (store.state.token) {
          router.push({
            path: "/"
          });
        }
      }
    };
    watch(
      () => props.type,
      () => {
        reload();
      }
    );
    return { userInfo, onSubmit };
  }
});
</script>

<style lang="scss" scoped>
.total-wrapper {
  height: 100vh;
  $blue: #27bbd7;
  $white: #f6f7fb;
  background: rgb(39, 187, 215);
  background: linear-gradient(145deg, rgba(39, 187, 215, 1) 50%, rgba(246, 247, 251, 1) 50%);
  color: #4c4d5f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.login-pannel {
  width: 80%;
  border-radius: 10px;
  background: #f6f7fb;
  box-shadow: 0 0 50px -20px #27bbd7;
  position: relative;
  z-index: 1;
  &::before,
  &::after {
    content: "";
    display: block;
    height: 50px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    border-radius: 8px;
    z-index: -1;
  }
  &::before {
    width: 88%;
    background: rgba(246, 247, 251, 0.4);
    margin-top: -30px;
  }
  &::after {
    width: 94%;
    position: absolute;
    background: rgba(246, 247, 251, 0.6);
    margin-top: -15px;
    top: 0;
  }
  & > h1 {
    font-size: 32px;
    margin: 18px 0;
  }
  .van-field {
    background: inherit;
    align-items: flex-start;
  }
  p {
    font-size: 14px;
    margin-bottom: 12px;
    a {
      text-decoration: underline;
      color: #155bd4;
    }
  }
}
</style>
