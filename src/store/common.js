import firebase from "firebase/app";

export default {
  state: {
    loading: false,
    error: null,
    search: false,
    avatar: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    searchOpen(state, payload) {
      state.search = payload;
    },
    avatar(state, payload) {
      state.avatar = payload;
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit("setLoading", payload);
    },
    setError({ commit }, payload) {
      commit("setError", payload);
    },
    clearError({ commit }) {
      commit("clearError");
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    search(state) {
      return state.search;
    },
    avatar(state) {
      return state.avatar;
    },
  },
};
