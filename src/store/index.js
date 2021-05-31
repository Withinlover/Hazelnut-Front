import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
    state() {
        return {
            isLogin: false,
            token: ''
        }
    },
    mutations: {
        setToken(state, token) {
            state.isLogin = true
            state.token = token
        },
        clearToken(state){
            state.isLogin=false
            state.token=''
        }
    },
    actions: {},
    modules: {}
})

export default store