
import { createStore } from 'vuex';

const store = createStore({
  state: {
    cartLength: 0,
  },
  mutations: {
    incrementCartLength(state) {
      state.cartLength++;
    },
  },
});

export default store;
