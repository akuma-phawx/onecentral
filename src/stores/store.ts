import { createStore, Store } from 'vuex';

interface Result {
  API: string;
  Auth: string;
  Description: string;
  Category: string;
  Link: string;
}

interface State {
  selectedResult: Result | null;
}

const store = createStore<State>({
  state: {
    selectedResult: null,
  },
  mutations: {
    updateResult(state, payload: Result) {
      state.selectedResult = payload;
    },
  },
  actions: {
    updateResult({ commit }, payload) {
      commit('updateResult', payload);
    },
  },
});

export default store as Store<State>;
