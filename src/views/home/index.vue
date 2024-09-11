<template>
  <div>home首页</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '../../store/modules/user'
let userStore = useUserStore()

onMounted(() => {
  userStore.getUserInfo()
})
</script>

<style scoped lang="scss"></style>
