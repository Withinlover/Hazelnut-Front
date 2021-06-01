import Vue from 'vue'
import VueRouter from 'vue-router'
import Sign from '../views/Sign.vue'

Vue.use(VueRouter)

const routes = [
    { // 登录注册页
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
    { // 个人主页
        path: '/user',
        component: () => import ('../views/UserPage.vue'),
        meta:{requiresAuth:true},
        children:[
            { // 个人信息
                path: '',
                name: 'UserInfo',
                component:() => import('../components/user/UserInfo.vue')
            },
            { // 当前发布
                path: 'released',
                name: 'UserReleased',
                component:() => import('../components/user/UserReleased.vue')
            },
            { // 交易历史
                path: 'history',
                name: 'UserHistory',
                component:() => import('../components/user/UserHistory.vue')
            },
            { // 消息记录
                path: 'message',
                name: 'UserMessage',
                component:() => import('../components/user/UserMessage.vue')
            },
            { // 我的关注
                path: 'follow',
                name: 'UserFollow',
                component:() => import('../components/user/UserFollow.vue')
            },
            { // 我的收藏
                path: 'favorites',
                name: 'UserFavorites',
                component:() => import('../components/user/UserFavorites.vue')
            }
        ]
    },
    { // 他人访问主页
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

router.beforeEach((to,from,next)=>{
    if(to.matched.some(record => record.meta.requiresAuth) 
        && !router.app.$store.state.isLogin){
        router.app.$message({
            message:'尚未登录，请先登录',
            type:'warning'
        })
        next('/')
    }else{
        next()
    }
})

export default router