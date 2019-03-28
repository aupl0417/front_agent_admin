import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import config from './config'
import api from './api/index'
import router from './router/'
import store from './store/'
import { storage, utils } from './assets/js/utils'
import App from './app.vue'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 工具插件
Vue.use({
  install: function (Vue, options) {
    // 注入组件
    Vue.mixin({
      created () {
        this.$config = config

        this.$$href = function (url, action = 'push') {
          if (!url) return

          if (/^http(s?)/i.test(url)) {
            window.location[action === 'push' ? 'assign' : action](url)
          } else {
            router[action] && router[action](url)
          }
        }
      }
    })

    // 添加实例方法
    Object.defineProperties(Vue.prototype, {
      $nprogress: {
        get: () => NProgress
      },
      $storage: {
        get: () => storage
      },
      $utils: {
        get: () => utils
      },
      $api: {
        get: () => api
      }
    })
  }
})

// 过滤器
// 只显示年月日
Vue.filter('Ymd', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.split(' ')[0]
})
// 万元
Vue.filter('Wan', function (value) {
  if (!value) return ''
  return (value / 10000).toFixed(2)
})

// 整数去两位小数点 10.00 -> 10
Vue.filter('Int0', function (value) {
  if (!value) return 0
  return (value * 100) / 100
})
// 货币格式
Vue.filter('Currency', function (value) {
  value = Number(value)
  if (Number.isNaN(value)) return 0
  return value.currency()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
