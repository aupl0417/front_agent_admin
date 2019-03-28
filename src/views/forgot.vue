<template>
  <div class="l-login-container l-flex-vhc">
    <el-form class="l-login-form" ref="passForm" label-position="left" label-width="0px" :model="formData.data" :rules="formData.rules" @keyup.native.enter="submit">
      <h3 class="_tit">重置密码</h3>
      <el-form-item prop="phone">
        <el-input type="text" v-model.trim="formData.data.phone" placeholder="请输入手机号码" :maxlength="11">
          <i v-show="formData.checking" slot="suffix" class="el-icon-loading el-input__icon"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="smcode">
        <div class="l-flex-hc">
          <el-input type="text" v-model.trim="formData.data.smcode" placeholder="请输入短信验证码"  :maxlength="6"/>
          <el-button class="l-margin-l" style="width: 120px;" ref="sendCode" type="primary" @click.prevent="sendCode()">获取验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model.trim="formData.data.password" placeholder="请输入新密码" :maxlength="50"/>
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input type="password" v-model.trim="formData.data.repassword" placeholder="请再次确认新密码"  :maxlength="50"/>
      </el-form-item>
      <el-form-item>
        <div class="l-flex-hc">
          <el-button style="width: 50%;" @click.native.prevent="$router.back()">返回</el-button>
          <el-button style="width: 50%;" type="primary" @click.native.prevent="submit" :loading="formData.loading">确定提交</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'forgot',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.formData.data.repassword !== '') {
          this.$refs.passForm.validateField('repassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.formData.data.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        checking: false,
        register: false,
        loading: false,
        data: {
          phone: '',
          smcode: '',
          password: '',
          repassword: '',
        },
        rules: {
          phone: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          smcode: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          repassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    sendCode() {
      this.$refs.passForm.validateField('phone')
      if(this.formData.data.phone && !this.formData.checking) {
        this.formData.checking = true
        this.$api.auth.checkUser(this.formData.data.phone).then(() => {
          this.formData.register = true
          this.$api.sendMobiCode(this.formData.data.phone, this.$refs.sendCode.$el)
        }).finally(() => {
          this.formData.checking = false
        })
      }
    },
    submit () {
      this.$refs.passForm.validate(valid => {
        if (valid) {
          let formData = Object.assign({}, this.formData.data)

          this.formData.loading = true
          this.$api.auth.findPwd(formData).then(() => {
            this.$message({
              type: 'success',
              message: '重置密码成功',
              onClose: () => {
                this.$router.back()
              }
            })
          }).catch(() => {
            this.formData.loading = false
          })
        }
      })
    }
  },
  mounted() {
    if(this.$route.query.phone) {
      this.formData.data.phone = this.$route.query.phone
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
