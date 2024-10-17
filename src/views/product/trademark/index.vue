<template>
  <div>
    <el-card>
      <el-button
        size="default"
        type="primary"
        style="margin-bottom: 20px"
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
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editTradeMark(row)"
            ></el-button>
            <el-popconfirm
              :title="`您确认要删除${row.tmName}吗`"
              @confirm="deleteTradeMark(row)"
              :width="250"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
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
        :total="total"
        @size-change="changeSize"
        @current-change="getCurrentList"
      />
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      :title="trademarkParams.id ? '修改品牌' : '增加品牌'"
      v-model="dialogFormVisible"
    >
      <el-form
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌头像" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmTM">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import { reqGetTradeMarkList,reqUpdateorAddTradeMark,reqDeleteTradeMark } from "../../../api/product/trademark";
import type { Records } from "../../../api/product/trademark/type";
import { ElMessage, type UploadProps } from 'element-plus'

const total = ref(0);
const limit = ref(3);
const currentPage = ref(1);
const currentTradeMarkList = ref<Records>([]);
let formRef = ref()
const dialogFormVisible = ref(false);
const trademarkParams = ref<any>({

  tmName:'',
  logoUrl:''
})
const deleteTradeMark = async (row:any,)=>{
  let res:any = await reqDeleteTradeMark(row.id)
  if(res.code ==200){
    ElMessage({
      type:'success',
      message:'删除成功'
    })
  }else{
      ElMessage({
        type:'warning',
        message:'删除失败'
      })

  }
  getCurrentList(currentTradeMarkList.value.length>1 ? currentPage.value: currentPage.value -1 )

}

const validateTmName = (rule:any,value:string,callback:any)=>{
  if(value.length<3){
    callback(new Error('品牌名称长度不能小于3'))
  }else{
    callback()
  }
}
const validatelogoUrl = (rule:any,value:string,callback:any)=>{
  console.log(value);

  if(value){
    callback()
  }else{
    callback(new Error('请上传图片'))
  }
  }


const rules = {
  tmName: [
    { required: true, trigger: "blur" ,validator:validateTmName},
  ],
  logoUrl:[{ required: true, trigger: "blur" ,validator:validatelogoUrl}]
};

const confirmTM = async () => {

  await formRef.value.validate()
  let res:any = await reqUpdateorAddTradeMark(trademarkParams.value)
  console.log(res);

  if(res.code == 200){
    ElMessage({
      type:'success',
      message:trademarkParams.value.id ?'修改成功':'添加成功'
    })
    dialogFormVisible.value = false
    getCurrentList(trademarkParams.value.id? currentPage.value:undefined)
  }else{
    ElMessage({
      type:'error',
      message:trademarkParams.value.id ?'修改失败':'添加失败'    })

      dialogFormVisible.value = false

  }
}
const addTradeMark = () => {

  dialogFormVisible.value = true;
  trademarkParams.value.id = undefined
  trademarkParams.value.tmName = ''
  trademarkParams.value.logoUrl = ''
  nextTick(()=>{
    formRef.value.resetFields()
  })
};
const editTradeMark = (row:any) => {
  dialogFormVisible.value = true;
  trademarkParams.value.id = row.id
  trademarkParams.value.tmName = row.tmName
  trademarkParams.value.logoUrl = row.logoUrl
  nextTick(()=>{
    formRef.value.resetFields()
  })
};
const changeSize = () => {
  getCurrentList();
};

const getCurrentList = async (pager = 1) => {
  currentPage.value = pager;
  let res = await reqGetTradeMarkList(limit.value, currentPage.value);
  if (res.code == 200) {
    currentTradeMarkList.value = res.data.records;
    total.value = res.data.total;
  }
};
onMounted(() => {
  getCurrentList();
});


// 上传图片之前的hooks
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if(rawFile.type =='image/png' || 'image/jpeg'|| 'image/gif'){
    if(rawFile.size/1024/1024<4){

    } else{
      ElMessage({
        type:'warning',
        message:'文件大小应该小于4MB'
      })
    }
  }else{
    ElMessage({
      type:'warning',
      message:'文件类型应为Png|Gif|jepg'
    })
  }
}
// 上传成功之后的hooks
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
) => {

  trademarkParams.value.logoUrl = response.data
  ElMessage({
    type:'success',
    message:'上传成功'
  })
}
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
