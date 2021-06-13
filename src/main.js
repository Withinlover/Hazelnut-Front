import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios'
import './theme/index.css';
import './icon';

const config = {
    color: '255,0,0',
    count: 88,
};

// Using config rendering effect at 'element'.
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios.create({
    baseURL: 'http://123.57.194.168:8000',
    timeout: 5000
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')