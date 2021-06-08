import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state() {
        return {
            isLogin: sessionStorage.getItem('token') ? true : false,
            token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : "",
            dotIsHidden: true,
        }
    },
    mutations: {
        setToken(state, token) {
            state.isLogin = true
            state.token = token
            sessionStorage.setItem('token', token)
        },
        clearToken(state) {
            state.isLogin = false
            state.token = ''
            sessionStorage.setItem('token', '')
        },
        updateDot(state, value) {
            dotIsHidden = value;
        }
    },
    actions: {},
    modules: {}
})

export default store