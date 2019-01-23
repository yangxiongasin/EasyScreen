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
// 我的工作台mock数据
mockInterceptor(service.workplace.msgList, require('../../static/data/workplace/holeList.json')) // 漏洞提醒
mockInterceptor(service.workplace.countInfo, require('../../static/data/workplace/countInfo.json')) // 开源软件知识库
mockInterceptor(service.workplace.riskInfo, require('../../static/data/workplace/riskInfo.json')) // 风险总值
mockInterceptor(service.workplace.holeCollect, require('../../static/data/workplace/holeCollect.json')) // 项目中总漏洞数的汇总
mockInterceptor(service.workplace.softwareRank, require('../../static/data/workplace/softwareRank.json')) // 开软使用排行
// 审批管理
