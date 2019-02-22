<template>
  <div id="login" class="login-container">
    <el-form ref="loginForm" :rules="loginRules" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="el-icon-view"></i>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-view"></i>
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="password"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin('loginForm')" />
        <span class="show-pwd" @click="showPwd">
          <i class="el-icon-view"></i>
        </span>
      </el-form-item>
       <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin('loginForm')">登录</el-button>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/type'
import { isvalidUsername } from '@/utils/validate'
export default {
	meataInfo: {
		title: 'login meata'
	},
	data() {
		const validateUsername = (urle, value, callback) => {
			if (!isvalidUsername(value)) {
				callback(new Error('请输入用户名哦~'))
			} else {
				callback()
			}
		}
		const validatePassword = (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('密码长度不够哟~'))
			} else {
				callback()
			}
		}
		return {
			loginForm: {
				username: '',
				password: ''
			},
			passwordType: 'password',
			loginRules: {
				username: [{ required: true, trigger: 'blur', validator: validateUsername }],
				password: [{ required: true, trigger: 'blur', validator: validatePassword }]
			}
		}
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	methods: {
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = ''
			} else {
				this.passwordType = 'password'
			}
		},
		handleLogin(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.myApi.getLogin({
						name: 'sehnt'
					})
					this.$Utils.setCookie('_USER_COOKIE', this.loginForm.username, 1)
					this.$store.commit(types.SET_USER_INFO, this.loginForm)

					// const url = this.$route.query || '/'
					// console.log(url, 'url')
					// this.$router.replace('/')
					this.$router.go(-1)
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields()
		},
		removeDomain(item) {
			var index = this.loginForm.domains.indexOf(item)
			if (index !== -1) {
				this.loginForm.domains.splice(index, 1)
			}
		},
		addDomain() {
			this.loginForm.domains.push({
				value: '',
				key: Date.now()
			})
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
