import Vue from 'vue'
import Vuex from 'vuex'
import product from './products'
import common from './common'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    product,
    common
  }
})
