import { createStore } from 'vuex';

interface GlobalData {
  count: number;
}
const store = createStore<GlobalData>({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

export { store };
