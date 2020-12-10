import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

/*  解决vue项目路由出现message: "Navigating to current location (XXX) is not allowed"的问题 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'Home',
    //     component: () => import('@/views/Home'),
    // },
    /**
     * 广告页
     * advertId 广告id
     */
    {
        path: '/advert',
        name: 'advert',
        component: () => import('@/views/Advert/index'),
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404'),
        meta: {
            title: '404',
            keepAlive: true,
        },
    },
    { path: '*', redirect: '/404', hidden: true },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes,
})

router.afterEach(to => {
    store.commit('page/setTitle', to.meta.title)
})

export default router
