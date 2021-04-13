import { loginService } from "@/services/login";
import { createStore } from "vuex";

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
        commit("login", res);
      });
    }
  }
});

export { store };
