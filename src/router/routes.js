import defaultLayout from '@/layout/default'
import topLayout from '@/layout/top'
// 左边菜单
export const menus = {
  admin: [
    {
      path: '/',
      component: defaultLayout,
      children: [
        {
          path: '',
          meta: { menu: 'index', title: '首页', icon: 'l-icon-01'},
          component: resolve => require(['../views/home'], resolve)
        },
        {
          path: '/fjd/order/list',
          meta: { menu: 'fjd', title: '附加贷管理', icon: 'l-icon-03' },
          component: resolve => require(['../views/fjd-order-list'], resolve)
        },
        {
          path: '/dzdc/order/list',
          hidden: true,
          meta: { menu: 'dzdc', title: '垫资代采管理', icon: 'l-icon-03' },
          component: resolve => require(['../views/order-list'], resolve)
        },
        {
          path: '/hyfq/order/list',
          meta: { menu: 'hyfq', title: '会员分期管理', icon: 'l-icon-03' },
          component: resolve => require(['../views/hyfq-order-list'], resolve)
        },
        {
          path: '/shop/list',
          meta: { menu: 'shop', title: '汽贸店管理', icon: 'l-icon-02' },
          component: resolve => require(['../views/shop-list'], resolve)
        },
        {
          path: '/agent/list',
          meta: { menu: 'agent', title: '渠道商管理', icon: 'l-icon-02' },
          component: resolve => require(['../views/agent-list'], resolve)
        },
        {
          path: '/dzdc/order/info',
          hidden: true,
          meta: { menu: 'dzdc', title: '垫资订单详情' },
          component: resolve => require(['../views/order-info'], resolve)
        },
        {
          path: '/hyfq/order/info',
          hidden: true,
          meta: { menu: 'hyfq', title: '会员分期详情' },
          component: resolve => require(['../views/hyfq-order-info'], resolve)
        },
        {
          path: '/shop/info',
          hidden: true,
          meta: { menu: 'shop', title: '汽贸店详细信息' },
          component: resolve => require(['../views/shop-info'], resolve)
        },
        {
          path: '/user/list',
          meta: { menu: 'user', title: '账号管理', icon: 'l-icon-04', role: 'SUPPER_ADMIN,ADMIN,MANAGER' },
          component: resolve => require(['../views/user-list'], resolve)
        },
        {
          path: '/menu/list',
          meta: { menu: 'menu', title: '系统权限', icon: 'l-icon-05', role: 'SUPPER_ADMIN,ADMIN' },
          component: resolve => require(['../views/menu-list'], resolve)
        },
        {
          path: '/department/list',
          hidden: true,
          meta: { menu: 'user', title: '部门岗位管理', role: 'SUPPER_ADMIN,ADMIN' },
          component: resolve => require(['../views/department-list'], resolve)
        },
        {
          path: '/role/list',
          hidden: true,
          meta: { menu: 'menu', title: '角色列表', role: 'SUPPER_ADMIN,ADMIN'},
          component: resolve => require(['../views/role-list'], resolve)
        },
      ]
    },
    {
      path: '/',
      component: defaultLayout,
      children: [
        {
          path: '/me',
          meta: { title: '个人中心' },
          component: resolve => require(['../views/me'], resolve)
        },
        {
          path: '/notice',
          meta: { title: '待办事项' },
          component: resolve => require(['../views/notice'], resolve)
        },
      ]
    },
  ],
  shop: [
    
  ]
}

export const routes = [
  {
    path: '/',
    component: topLayout,
    children: [
      {
        path: '/login',
        meta: { title: '登录', auth: false },
        component: resolve => require(['../views/login'], resolve)
      },
      {
        path: '/forgot',
        meta: { title: '重置密码', auth: false },
        component: resolve => require(['../views/forgot'], resolve)
      },
      {
        path: '/403',
        meta: { title: '无权限访问', auth: false },
        component: resolve => require(['../views/403'], resolve)
      },
      {
        path: '/404',
        meta: { title: '找不到页面', auth: false },
        component: resolve => require(['../views/404'], resolve)
      },
    ]
  },
  { path: '*', redirect: '/404', auth: false }
]

export default routes
