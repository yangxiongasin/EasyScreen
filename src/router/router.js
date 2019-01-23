/**
 * @file 本文件实现路由控制逻辑
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import { TGlobalLoading } from 'aid-taurus-desktop'
import routes from './routes'
import store from '../store/store'

// 注册路由插件
Vue.use(VueRouter)

let title = function(title) {
  title = title || '开源软件管理'
  window.document.title = title
}

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  title(to.meta.title)
  store.commit('frame/setCurrentView', to.meta.title)
  if (to.meta.noRequireAuth !== true) {
    // 通过vuex state获取当前的token是否存在
    if (store.getters.getLoginStatus) {
      next()
    } else {
      next({
        path: '/',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
  TGlobalLoading.start()
  next()
})

router.afterEach(() => {
  TGlobalLoading.finish()
})

export default router
