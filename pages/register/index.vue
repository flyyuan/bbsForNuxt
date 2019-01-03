<template>
  <div class="login-container">

    <el-form 
      ref="loginForm" 
      :model="loginForm" 
      :rules="loginRules" 
      class="login-form" 
      auto-complete="on" 
      label-position="left">

      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="请输入密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-form-item prop="repassword">
        <el-input
          :type="passwordType"
          v-model="loginForm.repassword"
          placeholder="请再次输入密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-button 
        :loading="loading" 
        type="primary" 
        style="width:100%;margin-bottom:30px;" 
        @click.native.prevent="handleLogin">注册</el-button>

      <nuxt-link
        class="link_button" 
        style="float:right" 
        to="/login">
        已经注册，点我登录
      </nuxt-link>

    </el-form>
  </div>
</template>

<script>
import { register } from '~/plugins/api'
import { isvalidUsername } from '~/plugins/validate'

export default {
  layout: 'loginLay',
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入密码不少于6位'))
      } else {
        callback()
      }
    }
    const validateRepassword = (rule, value, callback) => {
      if (value !== this.loginForm.password) {
        callback(new Error('请输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        repassword: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        repassword: [
          { required: true, trigger: 'blur', validator: validateRepassword }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          console.log(this.loginForm)
          register(this.loginForm)
            .then(rs => {
              const h = this.$createElement
              if (rs.data.success) {
                this.loading = false
                this.$notify({
                  title: '注册成功',
                  message: h('i', { style: 'color: teal' }, rs.data.msg)
                })
                this.$router.push({ path: this.redirect || '/login' })
              } else {
                this.loading = false
                const h = this.$createElement
                this.$notify({
                  title: '注册失败',
                  message: h('i', { style: 'color: teal' }, rs.data.msg)
                })
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.title {
  font-size: 26px;
  color: rgb(85, 81, 81);
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
</style>
