<template>
  <el-button
    size="small"
    icon="Refresh"
    circle
    @click="handleRefresh"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    circle
    @click="handleFullScreen"
  ></el-button>
  <el-button size="small" icon="Setting" circle></el-button>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0px 10px"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '../../../store/modules/user'
let userStore = useUserStore()
let LayoutSettingStore = useLayoutSettingStore()
let $route = useRoute()
let $router = useRouter()
const logout = () => {
  userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
// 刷新
const handleRefresh = () => {
  LayoutSettingStore.refresh = !LayoutSettingStore.refresh
}
// 全屏
const handleFullScreen = () => {
  let isFullScreen = document.fullscreenElement

  if (isFullScreen) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}
</script>

<style scoped lang="scss"></style>
