<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select>
            <el-option v-for="(item,index) in c1Arr" :key="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select>
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select>
            <el-option></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqC1 } from '../../api/product/attr';

const c1Arr = ref<any[]>([])
const getC1 = async () =>{
  let res = await reqC1()
  if(res.code==200){
   
    
    c1Arr.value = res.data
  }
}
onMounted(() => {
  

  getC1()
})
</script>

<style scoped lang="scss"></style>
