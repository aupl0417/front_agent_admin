<template>
  <transition id="app" name="fade" mode="out-in">
    <router-view />
  </transition>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
@import '~nprogress/nprogress.css';
@import './assets/css/base.less';
@import './assets/css/elementui.less';
</style>
