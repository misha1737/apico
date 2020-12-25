import firebase from 'firebase/app'
import User from './user_help.js'

export default {

    state: {
        user: null,
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },

    },
    actions: {
        async registerUser({ commit }, { email, password, userName }) {
            commit('clearError')
            commit('setLoading', true)
         
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                await firebase.database().ref('users/' + user.user.uid + '/name').set(userName);
                commit('setUser', new User(user.user.uid, userName))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }

        },
        async loginUser({ commit }, { email, password }) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password);
                const userInfo = await (await firebase.database().ref('users/' + user.user.uid).once('value')).val();
                commit('setUser', new User(user.user.uid, userInfo.name))
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        async loggedUser({ commit }, payload) {
            commit('clearError')
            commit('setLoading', true)
            try {
            if (payload) {
                const userInfo = await (await firebase.database().ref('users/' + payload.uid).once('value')).val();
                if (userInfo){commit('setUser', new User(payload.uid, userInfo.name))}
            }
        } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        logoutUser({ commit }) {
            firebase.auth().signOut();
            commit('setUser', null);
        },
    },
    getters: {
        user(state) {
            return state.user
        },
        checkUser(state) {
            return state.user !== null
        },
    }
}