import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
// import Cookies from 'js-cookie'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    delegate: null,
    userLogged: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.userLogged = true
      } else {
        state.userLogged = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setDelegate (state, delegate) {
      state.delegate = delegate
    },
    logout (state) {
      state.user = null
      state.token = null
      state.userLogged = false
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.userLogged
    },
    getUser (state) {
      return state.user
    },
    getDelegate (state) {
      return state.delegate
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setDelegate ({commit}, delegate) {
      commit('setDelegate', delegate)
    },
    logout ({commit}) {
      commit('logout')
    }
  },
  plugins: [vuexLocalStorage.plugin]
})
