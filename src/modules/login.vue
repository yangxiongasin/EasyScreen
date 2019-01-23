<template>
  <div class="row no-gutters bg-gray-lightest-5 medium-container">
    <div class="login-img-box d-none d-lg-block col-lg-6">
    </div>
    <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
      <div class="user-form-box">
        <h2 class="text-center mb-5 text-xxl">
          <img src="../assets/images/login-logo.png" alt="" style="height: 35px;">
          Easy Screen
        </h2>
        <t-form ref="loginForm" :model="formData" :rules="loginFormrules">
          <t-form-item prop="userName">
            <t-input v-model="formData.userName" icon="account" placeholder="请输入手机或者邮箱">
            </t-input>
          </t-form-item>
          <t-form-item prop="passwd">
            <t-input v-model="formData.passwd" type="password" icon="lock-unlocked-outline" placeholder="请输入密码">
            </t-input>
          </t-form-item>
          <t-form-item prop="verify">
            <t-input v-model="formData.verify" placeholder="请输入验证码">
              <!--<img src="../../assets/images/code.png" style="height:38px; margin: 0 -12px;"/>-->
              <div slot="append" style="height:38px; margin: 0 -12px;" @click="refreshCode">
                <es-identify :identify-code="identifyCode"></es-identify>
              </div>
            </t-input>
          </t-form-item>
          <t-form-item>
            <div class="d-flex justify-content-between">
              <t-checkbox v-model="formData.rememberMe" label="记住密码"></t-checkbox>
              <a href="#" class="text-muted">忘记密码？</a>
            </div>
          </t-form-item>
          <t-form-item>
            <t-button type="primary" block @click="$_login">登录</t-button>
          </t-form-item>
        </t-form>
        <p class="mt-4 pt-3 text-center">
          <span class="text-muted">还没有账号？</span> <a href="#" class="text-primary">注册新账号</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        userName: '',
        passwd: '',
        verify: '',
        rememberMe: false
      },
      identifyCodes: '1234567890',
      identifyCode: ''
    }
  },
  computed: {
    loginFormrules () {
      let rules = {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        verify: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
      return rules
    },
    rememberStatus () {
      return this.$store.getters.getRememberStatus
    },
    loginMessage () {
      return JSON.parse(localStorage.getItem('loginMessage'))
    }
  },
  mounted () {
    const vm = this
    vm.$refs.loginForm.resetFields()
    vm.identifyCode = ''
    vm.makeCode()
    // 如果有记住密码的状态，那么进入页面的时候即刻调用登录接口
    if (vm.rememberStatus) {
      vm.formData.userName = vm.loginMessage.userName
      vm.formData.passwd = vm.loginMessage.passwd
      vm.formData.rememberMe = true
    }
  },
  methods: {
    $_login () {
      const vm = this
      vm.$refs.loginForm.validate(passed => {
        if (vm.formData.verify !== vm.identifyCode) {
          vm.$Message.danger('验证码错误')
          return false
        }
        if (passed) {
          // 如果是记住密码状态，那么将账号密码保存到localStorge里面去,否则清空值
          if (vm.formData.rememberMe) {
            localStorage.setItem('loginMessage', JSON.stringify({
              userName: vm.formData.userName,
              passwd: vm.formData.passwd
            }))
          } else {
            localStorage.setItem('loginMessage', JSON.stringify({}))
          }
          vm.$qmcJson.post(vm.$service.loginPost, {
            userName: vm.formData.userName,
            passwd: vm.formData.passwd
          }).then(res => {
            if (res.data && res.data.code === 200) {
              vm.$Message.success(res.data.data.message)
              vm.$store.commit('setLoginStatus', true)
              vm.$store.commit('setRememberStatus', vm.formData.rememberMe)
              // 获取登录用户信息
              vm.getLoginInfo()
              if (vm.$route.query.redirect !== undefined) {
                let first = vm.$route.query.redirect.indexOf('/')
                let last = vm.$route.query.redirect.indexOf('/', 4)
                let result
                if (last === -1) {
                  result = vm.$route.query.redirect.substring(first)
                } else {
                  result = vm.$route.query.redirect.substring(first, last)
                }
                if (result === 'projectreport') {
                  vm.$router.push({name: 'project-report', params: { projectId: vm.$route.query.redirect }})
                } else {
                  vm.$router.push({path: result})
                }
              } else {
                vm.$router.push({name: 'home'})
              }
            } else {
              vm.$Message.danger(res.data.data.message)
            }
          }).catch(res => {
            vm.$Message.danger(res.data.data.message)
          })
        }
      })
    },
    getLoginInfo() {
      this.$qmcJson.post(this.$service.loginInfo).then(res => {
        if (res.data && res.data.code === 200) {
          this.$store.commit('setLoginInfo', res.data.data)
        } else {
          this.$Message.danger(res.data.message)
        }
      }).catch(res => {
        this.$Message.danger(res.data.data.message)
      })
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode()
    },
    makeCode () {
      for (let i = 0; i < 4; i++) {
        this.identifyCode += this.identifyCodes[Math.floor(Math.random() * (this.identifyCodes.length - 0) + 0)]
      }
    }
  }
}
</script>
