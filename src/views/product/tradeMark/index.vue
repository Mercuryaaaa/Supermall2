<template>
  <div>
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin-bottom: 10px"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 数据表格 -->
    <el-table style="width: 100%" border="" :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="" align="center" />
      <el-table-column prop="logoUrl" label="品牌LOGO" width="" align="center">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 每页数据条数:page-size  可以设置的每页数据条数:page-sizes-->
    <el-pagination
      style="margin-top: 10px; textAlign: center"
      :total="total"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[1, 5, 10]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    />
    <!-- 对话框 visible.sync控制显隐-->
    <el-dialog
      :title="tmForm.id ? '修改品牌信息' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <!-- form表单 -->
      <el-form style="width: 80%" :model="tmForm" :rules="rules" ref="ruleFrom">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 上传图片 action:图片上传地址  :on-success：检测图片上传成功，如成功则执行一次 :before-upload:在图片上传之前执行一次-->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 自定义表单校验规则
    var validateTmName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入品牌名称'));
      } else if (value.length < 2 || value.length > 20) {
        callback(new Error('长度在 2 到 10 个字符'))
      } else {
        callback();
      }
    };
    return {
      // 当前页数
      page: 1,
      // 每页数据条数
      limit: 5,
      // 数据总量
      total: 0,
      // 数据列表
      list: [],
      // 对话框显隐
      dialogFormVisible: false,
      // 上传图片属性
      // imageUrl: '',
      // 收集品牌信息
      tmForm: {
        id: '',
        tmName: '',
        logoUrl: ''
      },
      // 表单验证规则
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          // { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change' }
          { validator: validateTmName, trigger: 'change' }

        ],
        logoUrl: [
          { required: true, message: '请上传LOGO图片', trigger: 'change' }
        ],
      }
    }
  },
  mounted() {
    // console.log(this.$API)
    this.getPageList()
  },
  methods: {
    // 获取品牌列表数据
    async getPageList(pager = 1) {
      this.page = pager
      const { page, limit } = this
      const result = await this.$API.tradeMark.reqTradeMarkList(page, limit)
      // console.log(result)
      if (result.code === 200) {
        this.list = result.data.records
        this.total = result.data.total
      } else {
        alert('getPageList file!')
      }
    },
    // 每页数据条数变化
    handleSizeChange(limit) {
      this.limit = limit
      this.getPageList()
    },
    // 添加品牌按钮
    showDialog() {
      this.dialogFormVisible = true
      // 清空数据
      this.tmForm = { tmName: '', logoUrl: '' }
    },
    // 修改品牌数据
    updateTradeMark(row) {
      // row为当前选中品牌信息
      // console.log(row);
      this.dialogFormVisible = true
      this.tmForm = { ...row }
    },
    // 删除品牌数据
    deleteTradeMark(row) {
      // console.log(row);
      this.$confirm(`即将删除${row.tmName}，是否确定？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定触发函数
        // 向服务器发请求
        let result = await this.$API.tradeMark.reqDeleteTradeMark(row.id);
        // console.log(result);
        if (result.code == 200) {
          this.$message({
            type: 'success',
            message: `${row.tmName} 删除成功!`
          });
          this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
        } else {
          this.$message({
            type: 'error',
            message: `${row.tmName} 删除失败!`
          });
        }
      }).catch(() => {
        this.$message({
          // 点击取消触发函数
          type: 'info',
          message: `已取消删除 ${row.tmName}`
        });
      });
    },
    // 弹出框
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = file.response.data
      // console.log(file);
      // console.log('handleAvatarSuccess', res,file);
      this.tmForm.logoUrl = res.data
    },
    // 图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      // console.log('beforeAvatarUpload');
      return isJPG && isLt2M;
    },
    // 添加或修改数据
    addOrUpdateTradeMark() {
      // 表单验证规则
      this.$refs.ruleFrom.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false
          let result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
          if (result.code == 200) {
            // 弹出提示信息
            this.$message({
              type: 'success',
              message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功'
            })
            this.getPageList(this.tmForm.id ? this.page : 1)
          } else {
            alert('addOrUpdateTradeMark file!')
          }
        } else {
          console.log('error submit!');
          return false
        }
      })

    }
  }  // end methods
}

</script>

<style>
/* 弹出框样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
