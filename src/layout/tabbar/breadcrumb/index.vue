<template>
  <el-icon class="icon" @click="handleFold">
    <component :is="LayoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      :to="item.path"
      v-show="item.meta.title"
    >
      <el-icon style="vertical-align: middle">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin-left: 5px">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
let $route = useRoute()
let LayoutSettingStore = useLayoutSettingStore()

const handleFold = () => {
  LayoutSettingStore.toggleFold()
}
</script>

<style scoped lang="scss">
.icon {
  margin: 0px 20px;
  cursor: pointer;
}
</style>
