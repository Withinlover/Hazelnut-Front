import Vue from 'vue'
import VueRouter from 'vue-router'
import Sign from '../views/Sign.vue'

Vue.use(VueRouter)

const routes = [{ // 登录注册页
        path: '/',
        name: 'Sign',
        component: Sign
    },
    { // 商品浏览页
        path: '/commodity',
        name: 'Commodity',
        component: () =>
            import ('../views/Commodity.vue')
    },
    { // 需求浏览页
        path: '/demand',
        name: 'Demand',
        component: () =>
            import ('../views/Demand.vue')
    },
    { // 商品详情页
        path: '/commodity/item',
        name: 'CommodityItem',
        component: () =>
            import ('../views/CommodityItem.vue')
    },
    { // 需求详情页
        path: '/demand/item',
        name: 'DemandItem',
        component: () =>
            import ('../views/DemandItem.vue')
    },
    { // 发布页
        path: '/release',
        name: 'Release',
        component: () =>
            import ('../views/Release.vue')
    },
    { // 用户 - 个人信息页
        path: '/user/info',
        name: 'UserInfo',
        component: () =>
            import ('../views/UserInfo.vue')
    },
    { // 用户 - 已发布页
        path: '/user/released',
        name: 'UserReleased',
        component: () =>
            import ('../views/UserReleased.vue')
    },
    { // 用户 - 消息页
        path: '/user/message',
        name: 'UserMessage',
        component: () =>
            import ('../views/UserMessage.vue')
    },
    { // 用户 - 交易历史页
        path: '/user/history',
        name: 'UserHistory',
        component: () =>
            import ('../views/UserHistory.vue')
    },
    { // 用户 - 他人访问
        path: '/user/watch',
        name: 'UserWatch',
        component: () =>
            import ('../views/UserWatch.vue')
    },
    { // 管理员
        path: '/admin',
        name: 'Admin',
        component: () =>
            import ('../views/Admin.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router