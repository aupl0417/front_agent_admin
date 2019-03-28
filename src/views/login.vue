<template>
  <div class="l-login-container l-flex-vhc">
    <el-form class="l-login-form" ref="loginForm" label-position="left" label-width="0px" autocomplete="off" :model="loginForm.data" :rules="loginForm.rules" @keyup.native.enter="submit">
      <h3 class="_tit">欢迎使用粤商保理金融管理系统</h3>
      <el-form-item prop="phone">
        <el-input type="text" v-model.trim="loginForm.data.phone" :maxlength="11" auto-complete="off" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model.trim="loginForm.data.password" auto-complete="off" placeholder="请输入登录密码" />
      </el-form-item>
      <div class="l-txt-right">
        <router-link class="l-txt-gray l-fs-s" :to="'/forgot?phone=' + loginForm.data.phone">忘记密码？</router-link>
      </div>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%; margin-top: 1rem;" @click.native.prevent="submit" :loading="loginForm.loading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        loading: false,
        remember: true,
        data: {
          type: 0,          // PC
          phone: '',
          password: ''
        },
        rules: {
          phone: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    submit () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let formData = Object.assign({}, this.loginForm.data)

          this.loginForm.loading = true
          this.$store.dispatch('login', formData).then(() => {
            // this.$$href(this.$route.query.to || '/', 'replace')
            this.$router.replace('/')
          }).finally(() => {
            this.loginForm.loading = false
          })
        }
      })
    }
  }
}

</script>
<style scoped lang="less">
.l-login-container {
  height: 100%;
  padding: 0.75rem;
  box-sizing: border-box;
}
.l-login-form {
  background: rgba(255, 255, 255, 0.95);
  background-clip: padding-box;
  width: 300px;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 5px #cac6c6;
  ._tit {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
}
</style>
