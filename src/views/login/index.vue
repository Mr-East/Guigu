<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="loginFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loding="loading"
              class="login-button"
              type="primary"
              size="default"
              @click="userLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification, FormRules } from 'element-plus'
import { time } from '../../utils/time'
let loginForm = reactive({
  username: '',
  password: '',
})
let $router = useRouter()
let $route: any = useRoute()
let userStore = useUserStore()

const loginFormRef = ref()
const validatorUser = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
// 表单规则
const rules = reactive<FormRules>({
  username: [{ trigger: 'blur', validator: validatorUser }],
  password: [
    { required: true, min: 1, message: '请输入密码', trigger: 'blur' },
  ],
})
const loading = ref(false)

const userLogin = async () => {
  await loginFormRef.value.validate()
  try {
    // 加载效果
    loading.value = true
    await userStore.userLogin(loginForm)
    $router.push({ path: $route.query.redirect || '/' })
    ElNotification({
      message: '欢迎回来',
      type: 'success',
      title: `Hi,${time()}好`,
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      message: (error as Error).message,
      type: 'error',
    })
  }
}
</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  width: 100%;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login-form {
  position: relative;
  top: 30vh;
  width: 80%;
  padding: 40px;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;

  h1 {
    font-size: 40px;
    color: white;
  }

  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
  }

  .login-button {
    width: 100%;
  }
}
</style>
