<template>
  <div id="app">
    <el-container direction="vertical " class="l-h100" :class="{'l-fullscreen': fullscreen}">
      <el-header class="l-header l-flex-hc">
        <h2 class="_logo-txt">粤商保理金融管理系统</h2>
        <div class="l-rest">
          <!-- <div class="l-header-nav">
            <el-menu class="l-menu" :default-active="$route.path" mode="horizontal" :router="true" background-color="#263142" text-color="#b7c3d1" active-text-color="#21a0ff">
              <el-menu-item index="/">&ensp;首页&ensp;</el-menu-item>
              <el-menu-item index="/order">附加贷订单管理</el-menu-item>
            </el-menu>
          </div> -->
        </div>
        <div class="l-txt-right">
          <!-- <el-badge :value="9" style="margin-right: 50px;">
            <i class="el-icon-bell"/>
            待办事项
          </el-badge> -->
          <el-dropdown class="l-margin-r" trigger="click">
            <span>
              <img class="_avatar" :src="userInfo.portrait || $config.avatar" alt="">
              {{userInfo.userName || userInfo.phone}}
              <i class="el-icon-caret-bottom" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item>个人信息</el-dropdown-item> -->
              <el-dropdown-item @click.native="$router.push('/me')">
                <i class="l-icon l-margin-r-m">&#xe6b6;</i>个人中心
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">
                <i class="l-icon l-margin-r-m">&#xe682;</i>退出系统
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <span class="l-margin-r" @click="fullScreen">
            <i class="el-icon-rank" title="切换全屏" />
          </span>
        </div>
      </el-header>
      <el-container class="l-h100">
        <el-aside class="l-aside" :class="{'l-aside-collapse': collapse}">
          <el-menu class="l-menu" :default-active="$route.meta.menu" router :collapse="collapse" background-color="#343b47" text-color="#fff">
            <el-menu-item v-for="menu in userMenus" :index="menu.meta.menu" :key="menu.path" :route="{path: menu.path}">
              <i :class="menu.meta.icon"></i>
              <span slot="title">{{menu.meta.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="l-main">
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import screenfull from 'screenfull'

export default {
  name: 'layout',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'fullscreen',
      'collapse'
    ]),
    userMenus() {
      let menuList = this.$router.options.routes[0].children.filter(item => {
        if(item.meta.role && !this.$utils.strcpr(item.meta.role, this.userInfo.roleCode)) {
          item.hidden = true
        }
        return !item.hidden
      })
      
      return menuList.map(item => {
        return {
          meta: item.meta,
          path: item.path || '/'
        }
      })
    }
  },
  methods: {
    doCollapse () {
      this.$store.dispatch('toggleCollapse')
    },
    initSomething () {
      // 全屏设置
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          this.$store.dispatch('toggleFullscreen', screenfull.isFullscreen)
        })
      }
      document.addEventListener('keyup', e => {
        e = e || window.event
        if (e && e.keyCode === 122) {
          this.fullScreen()
        }
      })
    },
    fullScreen () {
      if (!screenfull.enabled) {
        this.$message({
          message: 'sorry, you browser can not work!',
          type: 'warning'
        })
        this.$store.dispatch('toggleFullscreen')
        return false
      }
      screenfull.toggle()
    },
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/login')
      })
    }
  },
  mounted () {
    this.initSomething()
  }
}
</script>
