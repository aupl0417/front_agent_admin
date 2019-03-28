import { utils, storage } from '@/assets/js/utils'
import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '../store/index'
import { menus, routes } from './routes'

// 当前系统平台：后台端admin、渠道商端agent、门店端shop
let urlArgs = utils.url.getArgs()
let platform = ''
if(urlArgs._plat) {
  storage.local.set('platform', urlArgs._plat)
  platform = urlArgs._plat
}else{
  platform = storage.local.get('platform') || 'admin'
}
// 当前平台本地存储前缀
storage.setPrefix(platform)


Vue.use(Router)
const router = new Router({
  base: '/',
  mode: 'history',
  routes: [...menus[platform], ...routes]
})

router.platform = platform
router.hostURL = location.origin + (router.options.base || '')

// 路由控制
router.beforeEach((to, from, next) => {
  if(!platform) {
    return next(false)
  }

  // 路径地址必须带上_plat参数
  if(!to.query._plat) {
    to.query._plat = platform
    return next({
      path: to.path,
      query: to.query,
    })
  }

  NProgress.start(0.3)

  if(to.meta.auth !== false) { // 需要验证登录
    return store.dispatch('checkLogin').then(() => { // 已登录
      // 如果是门店，并要求验证，且未通过认证
      if(platform === 'admin' && to.meta.role && 
        !utils.strcpr(to.meta.role, store.state.user.info.roleCode)){
        // 无权限访问
        return next('/403')
      }else {
        next()
      }
    }).catch(() => {
      next('/login?to=' + location.href)
    })
  }else{
    next()
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
