import firebase from "firebase/app";
import User from "./user_help.js";

export default {
  state: {
    user: null,
    likes: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLikes(state, payload) {
      state.likes = payload;
    },
  },
  actions: {
    async registerUser({ commit }, { email, password, userName }) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await firebase
          .database()
          .ref("users/" + user.user.uid + "/name")
          .set(userName);
        commit("setUser", new User(user.user.uid, userName));
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async loginUser({ commit, dispatch }, { email, password }) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        const userInfo = await (
          await firebase
            .database()
            .ref("users/" + user.user.uid)
            .once("value")
        ).val();
        commit("setUser", new User(user.user.uid, userInfo.name));
        dispatch("getLikes");
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async loggedUser({ commit, dispatch }, payload) {
      commit("clearError");
      commit("setLoading", true);
      try {
        if (payload) {
          const userInfo = await (
            await firebase
              .database()
              .ref("users/" + payload.uid)
              .once("value")
          ).val();
          if (userInfo) {
            commit("setUser", new User(payload.uid, userInfo.name));
          }
          dispatch("getLikes");
        }
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    logoutUser({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    async setLike({ commit, state, dispatch }, payload) {
      if (!state.user) return;
      commit("clearError");
      commit("setLoading", true);
      try {
        firebase
          .database()
          .ref(`likes/${state.user.id}/`)
          .push(payload);
        dispatch("getLikes");
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async delLike({ commit, state, dispatch }, payload) {
      if (!state.user) return;
      commit("clearError");
      commit("setLoading", true);
      let id = null;
      try {
        for (const key in state.likes) {
          if (state.likes[key] === payload) {
            id = key;
          }
        }
        await firebase
          .database()
          .ref(`likes/${state.user.id}/`)
          .child(id)
          .remove();
        dispatch("getLikes");
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
    async getLikes({ commit, state }) {
      if (!state.user) return;
      commit("clearError");
      commit("setLoading", true);
      try {
        let likes = await firebase
          .database()
          .ref(`likes/${state.user.id}/`)
          .once("value");
        likes = likes.val();
        commit("setLikes", likes);
        commit("setLoading", false);
      } catch (error) {
        commit("setLoading", false);
        commit("setError", error.message);
        throw error;
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    checkUser(state) {
      return state.user !== null;
    },
    getLikes(state) {
      return state.likes;
    },
  },
};
