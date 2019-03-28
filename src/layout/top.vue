<template>
  <div id="app">
    <el-container class="l-app" direction="vertical">
      <el-header class="l-header" height="70px">
        <h2 class="_logo-txt">粤商保理金融管理系统</h2>
      </el-header>
      <el-main class="l-main">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </el-main>
      <el-footer class="l-copyright" height="40px">
        ©2018 深圳市粤商商业保理有限公司
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'top-layout',
  data () {
    return {

    }
  },
}
</script>
<style lang="less" scoped>
.l-app{
  height: 100%;
  // background: url('../assets/images/bg.jpg') no-repeat 50% 50%;
  background-color: #373d41;
  background-size: cover;
}
.l-copyright{ text-align: center; color: #788da3; font-size: 14px; line-height: 40px; }
</style>

