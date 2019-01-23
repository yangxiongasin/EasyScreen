
import Vuex from 'vuex'
import Vue from 'vue'

import http from '../http.js'

import frame from './modules/frame'

Vue.use(Vuex)
Vue.use(http)

const store = new Vuex.Store({
  state: {
    loginStatus: null, // 管理登录状态
    loginInfo: null, // 管理登录者信息
    rememberStatus: null, // 管理登录状态
    approvalData: null, // 审批数据管理
    approvalFinishParams: null // 审批数据管理
  },
  mutations: {
    setLoginStatus (state, data) {
      state.loginStatus = data
      localStorage.setItem('setLoginStatus', JSON.stringify(data))
    },
    setRememberStatus (state, data) {
      state.rememberStatus = data
      localStorage.setItem('rememberStatus', JSON.stringify(data))
    },
    setLoginInfo (state, data) {
      state.loginInfo = data
      localStorage.setItem('loginInfo', JSON.stringify(data))
    }
  },
  getters: {
    getLoginStatus (state) {
      const cache = localStorage.getItem('setLoginStatus')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.loginStatus !== null) {
        return state.loginStatus
      } else {
        return cacheData
      }
    },
    getRememberStatus (state) {
      const cache = localStorage.getItem('rememberStatus')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.rememberStatus !== null) {
        return state.rememberStatus
      } else {
        return cacheData
      }
    },
    getLoginInfo (state) {
      const cache = localStorage.getItem('loginInfo')
      let cacheData = null
      if (cache) {
        cacheData = JSON.parse(cache)
      }
      if (state.loginInfo && state.loginInfo !== null) {
        return state.loginInfo
      } else {
        return cacheData
      }
    }
  },
  modules: {
    frame
  }
})

export default store
