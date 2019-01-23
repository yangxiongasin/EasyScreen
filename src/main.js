/**
 * @file 本文件实现了应用初始化逻辑
 * @author PRD UX R&D Dept.
 */

// 引入第三方库
import 'babel-polyfill'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'

// 引入Taurus库
import taurus from 'aid-taurus-desktop'

import store from './store/store'
import router from './router/router'
import http from './http'
import serviceAPI from './conf/services.js'
import pbulicFunc from './conf/publicFunc.js'
import components from './components/index.js'
import mock from './router/mock'

import App from './app.vue'

Vue.use(taurus)
Vue.use(components)
Vue.use(http)
Vue.use(mock)
Vue.prototype.$service = serviceAPI
Vue.prototype.$pbulicFunc = pbulicFunc

// 将路由状态同步到store中
sync(store, router)

// 创建应用根组件
const app = new Vue({
  store,
  router,
  components: { App },
  template: '<App/>'
})

// webpack热更新支持
if (module.hot) {
  module.hot.accept()
}

// 将DOM结构注入页面
app.$mount('#app')
