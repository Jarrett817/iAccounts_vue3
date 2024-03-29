import { loginService } from "@/services/login";
import { createStore } from "vuex";
import { Notify } from "vant";
import { router } from "@/router";
interface GlobalData {
  token: string | null;
}
const store = createStore<GlobalData>({
  state: {
    token: null
  },
  mutations: {
    login: (state, data) => {
      window.localStorage.token = data;
      state.token = (data as unknown) as string | null;
    },
    logout: state => {
      localStorage.removeItem("token");
      state.token = null;
    }
  },
  actions: {
    loginAsync: ({ commit }, data) => {
      return loginService
        .login({ id: data.id.trim(), password: data.password.trim() })
        .then(res => {
          // 服务端返回一个jwt token
          if (res && res.token) {
            commit("login", res.token);
          }
        });
    },
    registerAsync: ({ commit }, data) => {
      return loginService
        .register({ id: data.id.trim(), password: data.password.trim() })
        .then(res => {
          Notify({ type: "success", message: "注册成功" });
          router.push({ name: "login" });
        });
    }
  }
});
export { store };
