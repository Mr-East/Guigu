<template>
  <div>
    <el-card>
      <el-button size="default" type="primary" style="margin-bottom: 20px" 
      @click="addTradeMark"
        >添加品牌</el-button
      >
      <!-- 表格 -->
      <el-table border :data="currentTradeMarkList">
        <el-table-column label="序号" align="center" type="index" width="55" />
        <el-table-column label="品牌名称" prop="tmName" />
        <el-table-column label="品牌logo">
          <template #="{ row }">
            <img :src="row.logoUrl" alt="" style="height: 100px; width: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit" @click="editTradeMark(row)"></el-button>
            <el-button type="primary" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        size="large"
        :background="false"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :total="132"
        @size-change="changeSize"
        @current-change="getCurrentList"
      />
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加品牌" v-model="dialogFormVisible">
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="品牌名称">
          <el-input v-model="trademarkName"></el-input>
        </el-form-item>
        <el-form-item label="品牌头像"> 
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click=" dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { reqGetTradeMarkList } from "../../../api/product/trademark";
import type { Records } from "../../../api/product/trademark/type";
const limit = ref(3);
const currentPage = ref(1);
const currentTradeMarkList = ref<Records>([]);
const dialogFormVisible = ref(false);
const trademarkName = ref("");

const addTradeMark = () => {
  dialogFormVisible.value = true;
};
const editTradeMark = () => {
  dialogFormVisible.value = true;
};
const changeSize = () => {
  getCurrentList();
};

const getCurrentList = async (pager = 1) => {
  currentPage.value = pager;
  let res = await reqGetTradeMarkList(limit.value, currentPage.value);
  console.log(res);
  if (res.code == 200) {
    currentTradeMarkList.value = res.data.records;
  }
};
onMounted(() => {
  getCurrentList();
});
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

