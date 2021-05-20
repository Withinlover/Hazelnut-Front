import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state() {
        return {
            isLogin: false,
            token: "",
        }
    },
    mutations: {
        setToken(state, token) {
            this.isLogin = true;
            this.token = token;
        }
    },
    actions: {},
    modules: {}
})