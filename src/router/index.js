import Vue from 'vue'
import VueRouter from 'vue-router'
import Sign from '../views/Sign.vue'
import store from '@/store/index.js'

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
        path: '/commodity/item/:goodId',
        name: 'CommodityItem',
        component: () =>
            import ('../views/CommodityItem.vue'),
        props: true
    },
    { // 需求详情页
        path: '/demand/item/:goodId',
        name: 'DemandItem',
        component: () =>
            import ('../views/DemandItem.vue'),
        props: true
    },
    { // 发布页
        path: '/release',
        name: 'Release',
        component: () =>
            import ('../views/Release.vue')
    },
    { // 个人主页
        path: '/user',
        component: () =>
            import ('../views/UserPage.vue'),
        meta: { requiresAuth: true },
        children: [{ // 个人信息
                path: '',
                name: 'UserInfo',
                component: () =>
                    import ('../components/user/UserInfo.vue')
            },
            { // 当前发布
                path: 'released',
                name: 'UserReleased',
                component: () =>
                    import ('../components/user/UserReleased.vue')
            },
            { // 交易历史
                path: 'history',
                name: 'UserHistory',
                component: () =>
                    import ('../components/user/UserHistory.vue')
            },
            { // 消息记录
                path: 'message',
                name: 'UserMessage',
                component: () =>
                    import ('../components/user/UserMessage.vue')
            },
            { // 我的关注
                path: 'follow',
                name: 'UserFollow',
                component: () =>
                    import ('../components/user/UserFollow.vue')
            },
            { // 我的收藏
                path: 'favorites',
                name: 'UserFavorites',
                component: () =>
                    import ('../components/user/UserFavorites.vue')
            }
        ]
    },
    { // 他人访问主页
        path: '/user/watch/:initialUserID',
        name: 'UserWatch',
        component: () =>
            import ('../views/UserWatch.vue'),
        props: true,
    },
    { // 管理员
        path: '/admin',
        name: 'Admin',
        component: () =>
            import ('../views/Admin.vue')
    },
    {
        path: '/error',
        name: 'error',
        component: () =>
            import ('../views/Error.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    var url = 'inform/infolist/';
    var data = {
        "token": router.app.$store.state.token,
    }
    router.app.axios.post(url, data).then((res) => {
        if (res.data['result'] === 1) {
            var isdot = true;
            var list = res.data.inform;
            for (var i in list) {
                isdot &= list[i].isread;
            }
            isdot = !isdot;
            router.app.$store.commit('updateDot', !isdot);
        }
    })
    if (to.matched.length === 0) {
        next('/')
        router.app.$message({
            message: '该页面不存在',
            type: 'warning'
        })
    } else if (to.matched.some(record => record.meta.requiresAuth) &&
        !store.state.isLogin) {
        next('/')
        router.app.$message({
            message: '尚未登录，请先登录',
            type: 'warning'
        })
    } else {
        next()
    }
})


export default router