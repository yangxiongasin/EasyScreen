/**
 * @file 本文件为服务调用URL常量配置实现
 * @author PRD UX R&D Dept.
 * @example <caption>配置示例</caption>
 * // 配置登录和注销服务地址
 * export default {
 *   LOGIN: '/foo/login',
 *   LOGOUT: '/foo/logout'
 * }
 */
const SERVICE = {
  upload: 'http://10.1.234.29:8088/oshub/upload', // 图片上传地址
  staticTypes: '/oshub/static/queryByCodeType', // 类型查询接口
  approval: {
    list: '/oshub/process/list', // 待审批列表
    projectDetail: '/oshub/project/getProjectApproveInfo', // 项目审批单详情
    softWareDetail: '/oshub/os/approveInfo', // 软件审批单详情
    submit: '/oshub/process/submit', // 审核意见提交
    reply: '/oshub/quest/add', // 审核单问题回复
    reApplyInfo: 'oshub/project/getProjectReApplyInfo', // 重新申请
    finishList: '/oshub/process/list/done' // 已审批列表
  },
  projectManage: {
    search: '/oshub/project/search', // 项目名查询
    getInfo: '/oshub/project/getProjectInfo', // 项目详情
    apply: '/oshub/project/apply', // 项目申请
    types: '/oshub/os/types', // 获取所有软件分类的id和name
    NameList: '/oshub/os/NameList', // 依据分类的id获取分类下所有的软件id和name
    allVersion: '/oshub/os/allVersion', // 依据软件的id和name获取软件版本
    softwareList: '/oshub/os/search/integrated/list', // 软件列表
    softwareVersion: '/oshub/os/version/integrate', // 软件列表内容更新
    softwareFixed: '/oshub/project/os/change/apply', // 项目变更
    bugByGrade: '/oshub/os/version/bugByGrade', // 安全漏洞
    securityHoleBydegree: '/oshub/os/version/securityHoleBydegree', // 安全漏洞
    productType: '/oshub/product/list' // 产品线类别
  },
  projectReport: {
    applicationCount: '/oshub/os/count/info', // 开源软件数量
    riskCount: '/oshub/os/risk/info', // 开源软件风险数量
    licenseCount: '/oshub/os/project/license', // 开源许可证数量
    licenseRiskList: '/oshub/os/project/license/risk', // 开源软件风险列表
    applicationUseList: '/oshub/project/os/report',
    applicationRiskDegree: '/oshub/project/os/degree',
    appRiskCount: '/oshub/os/version/integrate',
    nearbyVersion: '/oshub/os/version/diff' // 相邻版本风险
  },
  softWareApply: {
    search: '/oshub/os/list', // 软件名查询
    types: '/oshub/os/types', // 软件分类
    getInfo: '/oshub/os/info', // 软件详情
    apply: '/oshub/os/apply', // 软件申请
    newVersion: '/oshub/os/newVersion/apply' // 软件版本新增
  },
  securityHole: {
    search: '/oshub/os/getSecurityHole', // 安全漏洞查询
    types: '/oshub/os/securityholetype', // 安全漏洞类型
    newHole: '/oshub/os/createSecurityHole', // 新增安全漏洞
    deleteHole: '/oshub/os/delSecurityHole', // 删除安全漏洞
    editSearch: '/oshub/os/getSecurityHoleByHoleId', // 修改安全漏洞查询
    editHole: '/oshub/os/updateSecurityHole', // 提交修改
    osNameIds: '/oshub/os/securityholetype', // 受影响软件名
    osVersionList: '/oshub/os/securityholetype' // 受影响软件版本
  },
  softWareKnowledge: {
    search: '/oshub/os/search/list', // 开源软件知识库列表
    newSoftWare: '/oshub/os/create', // 新增软件
    editSearch: '/oshub/os/search/osVersionId', // 修改软件查询
    editSoftWare: '/oshub/os/update', // 修改软件
    licenses: '/oshub/licenses', // licenses下拉框静态值
    deleteSoftWare: '/oshub/os/delete' // 删除软件
  },
  userManage: {
    queryByCodeType: '/oshub/static/queryByCodeType', // 下拉菜单
    search: '/oshub/users', // 用户列表
    disableUser: '/oshub/user/disableUser', // 禁用用户
    recoveryUser: '/oshub/user/recoveryUser', // 恢复用户
    createUsers: '/oshub/user/createUsers', // 新增用户
    editSearch: '/oshub/user/edit' // 修改用户查询
  },
  // 软件分类
  securitySoftware: {
    search: '/oshub/os/type/search', // 软件分类列表查询
    update: '/oshub/os/type/update', // 软件分类修改
    delete: '/oshub/os/type/delete', // 软件分类删除
    create: '/oshub/os/type/create' // 软件分类新增
  },
  // 工作台
  workplace: {
    softwareRank: '/oshub/os/top', // 开软使用排行
    msgList: '/oshub/msg/holeList', // 漏洞提醒
    countInfo: '/oshub/os/count/info', // 开源软件知识库
    riskInfo: '/oshub/os/risk/info', // 风险总值
    holeCollect: '/oshub/workBench/projectAllSecHoles' // 项目中总漏洞数的汇总
  },
  // 邮件模版管理
  templateManage: {
    search: '/oshub/mail/template/list', // 邮件模版搜索
    edit: '/oshub/mail/template/update ' // 邮件模版修改提交
  },
  tcManage: {
    setPassPercent: '/oshub/tc/setPassPercent', // 设置通过率
    getTcMembers: '/oshub/tc/user/getTcMembers', // 查看TC组成员
    removeTc: '/oshub/tc/update', // 移除TC组成员
    getNoTcMembers: '/oshub/tc/user/getNoTcMembers', // 查看非TC成员用户
    inTcMember: '/oshub/tc/inTcMember' // 查看非TC成员用户
  },
  loginPost: '/oshub/loginPost', // 登录
  loginOut: '/oshub/logout', // 登录
  loginInfo: '/oshub/user/info', // 获取登录用户信息
  menuList: '/oshub/menuList' // 菜单
}

export default SERVICE
