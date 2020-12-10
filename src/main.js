import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import onepx from './directives/onepx'
import Bridge from './utils/JsBridge'
import filters from './filters'
import * as directives from './directives'
import VueLazyload from 'vue-lazyload'
import vueWechatTitle from 'vue-wechat-title'
import LoadingImg from '@/assets/img/lazyload_img_16x9.jpg'
import VConsole from 'vconsole'

import Vant from 'vant'
import 'vant/lib/index.css'

// svg icon
import '@/icons'

import '@/assets/css/normalize.css'

if (
    process.env.NODE_ENV === 'stage' ||
    process.env.NODE_ENV === 'development'
) {
    // eslint-disable-next-line
  const vConsole = new VConsole() // 能够在vconsole中使用console.log打印 每次使用都需要重新实例化一次
}

// jsbridge和原生app交互
Vue.prototype.$bridge = Bridge

// 解决一像素问题
Vue.use(onepx)

Vue.use(Vant)

// 图片懒加载
Vue.use(VueLazyload, {
    loading: LoadingImg,
    attempt: 1,
})

// 微信中动态更改title
Vue.use(vueWechatTitle)

Object.keys(filters).forEach(item => {
    Vue.filter(item, filters[item])
})

Object.keys(directives).forEach(item => {
    Vue.directive(item, directives[item])
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
