/**
 * @file 本文件为路由对象实现
 * @author PRD UX R&D Dept.
 */

export default [
  {
    name: 'login',
    path: '/',
    meta: {
      title: '登录',
      noRequireAuth: true // 添加该字段，表示进入这个路由是不需要登录
    },
    component: require('../modules/login.vue')
  },
  {
    path: '*',
    meta: {
      title: 'not found'
    },
    component: {
      template: '<div>not found</div>'
    }
  },
  // ================== 项目管理 ==============
  {
    name: 'management',
    path: '/management',
    meta: {},
    component: require('../modules/index.vue'),
    children: [
      {
        name: 'workplace',
        path: '/workplace',
        meta: {
          title: '我的工作台',
          isMenu: true
        },
        component: require('../modules/workplace/index.vue')
      }
    ]
  }
]
