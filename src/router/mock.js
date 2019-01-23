// 引入mockjs
const Mock = require('mockjs')
import service from '../conf/services.js'
// 使用mockjs模拟数据
function mockInterceptor(val, url) {
  Mock.mock(window.APP_CONF.baseURL.http + val, (req, res) => {
    return url
  })
  Mock.mock(val, (req, res) => {
    return url
  })
}
mockInterceptor(service.loginPost, require('../../static/data/login/loginPost.json')) // 登录
mockInterceptor(service.loginOut, require('../../static/data/success.json')) // 登录
mockInterceptor(service.loginInfo, require('../../static/data/login/userInfo.json')) // 个人信息
mockInterceptor(service.menuList, require('../../static/data/meauList.json')) // 菜单
