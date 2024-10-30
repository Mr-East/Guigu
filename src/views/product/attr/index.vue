<template>
  <div>
    <Category/>
    <el-card style="margin-top: 10px">
      <el-button type="primary" size="default" @click="">添加属性</el-button>

      <el-table>
        <el-table-column label="序号" type="index" align="center" width="80px" />
        <el-table-column label="属性名称" width="120px" />
        <el-table-column label="属性值名称" />
        <el-table-column label="操作" width="120px" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref  } from 'vue';
import Category from '@/components/Category/index.vue'



</script>

<style scoped lang="scss"></style>
