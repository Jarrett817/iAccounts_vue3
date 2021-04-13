import { createStore } from "vuex";

interface GlobalData {
  count: number;
}
const store = createStore<GlobalData>({
  state() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem("userInfo") || "{}")
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});

export { store };
