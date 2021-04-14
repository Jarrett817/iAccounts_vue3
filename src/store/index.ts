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
      return loginService.login({ id: data.id, password: data.password }).then(res => {
        // 服务端返回一个jwt token
        if (res.status === 0 && res.token) {
          commit("login", res);
        }
      });
    },
    registerAsync: ({ commit }, data) => {
      return loginService.register({ id: data.id, password: data.password }).then(res => {
        // 服务端返回一个jwt token
        if (res.status === 0) {
          Notify({ type: "success", message: res.msg });
          router.push({ name: "login" });
        }
      });
    }
  }
});

export { store };
