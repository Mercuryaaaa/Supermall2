<template>
  <div>
    <!-- SPU名称 -->
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <!-- 品牌 -->
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- SPU描述 -->
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <!-- SPU图片 -->
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}个属性未选择`"
          v-model="unSelectAttrIdAndAttrName"
        >
          <el-option
            v-for="(item, index) in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          >
          </el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 10px"
          :disabled="!unSelectAttrIdAndAttrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <!-- 表格 -->
        <el-table
          style="width: 100%; margin-top: 10px"
          border=""
          :data="spu.spuSaleAttrList"
        >
          <!-- 序号 -->
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <!-- 属性名 -->
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="300px"
            align="center"
          >
          </el-table-column>
          <!-- 属性值 -->
          <el-table-column
            prop="prop"
            label="属性值名称列表"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row, index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
                :ref="$index"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row, $index)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            prop="prop"
            label="操作"
            width="150px"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttr($index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item label="">
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 上传图片el数据
      dialogImageUrl: '',
      dialogVisible: false,
      // 接口数据
      spu: {
        category3Id: 0,
        description: '',
        // spu名称
        spuName: '',
        // 名牌id
        tmId: '',
        // 收集spu图片的信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: 'string',
          //   imgUrl: 'string',
          //   spuId: 0,
          // },
        ],
        // 平台属性与属性值收集
        spuSaleAttrList: [],
      },
      tradeMarkList: [],
      spuImageList: [],
      baseSaleAttrList: [],
      // 销售属性属性值名称列表tag数据
      // dynamicTags: ['标签一', '标签二', '标签三'],
      // inputVisible: false,
      // inputValue: '',
      // 未选择的销售属性id和名字
      unSelectAttrIdAndAttrName: '',
    }
  },
  computed: {
    // 还未选择的销售属性
    unSelectSaleAttr() {
      // 过滤数组
      // 全部属性 this.baseSaleAttrList
      // 自身属性 spu.spuSaleAttrList
      // 返回没有的属性
      let result = this.baseSaleAttrList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        })
      })
      return result;
    }
  },
  methods: {
    // 上传图片
    // 删除图片
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.spuImageList = fileList;
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      // 显示对话框
      this.dialogVisible = true;
    },
    // 上传成功
    handleSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      this.spuImageList = fileList
    },
    // 初始化SpuForm数据
    async initSpuData(row) {
      // console.log('子组件', row);
      // 获取spu基本信息
      let spu = await this.$API.spu.reqSpu(row.id);
      // console.log(spu);
      if (spu.code == 200) {
        this.spu = spu.data;
      }
      // 获取品牌信息 
      let tradeMarkList = await this.$API.spu.reqTradeMarkList();
      // console.log(tradeMarkList);
      if (tradeMarkList.code == 200) {
        this.tradeMarkList = tradeMarkList.data;
      }
      // 获取Spu图片
      let spuImageList = await this.$API.spu.reqSpuImageList(row.id);
      // console.log(spuImageList);
      if (spuImageList.code == 200) {
        let listArr = spuImageList.data;
        // 照片墙展示图片的数据需要数组，数组里面的元素必须有name和url属性
        listArr.forEach(item => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr
      }
      // 获取平台全部销售属性  最多三个
      let baseSaleAttrList = await this.$API.spu.reqBaseSaleAttrList();
      // console.log(baseSaleAttrList);
      if (baseSaleAttrList.code == 200) {
        this.baseSaleAttrList = baseSaleAttrList.data;
      }
    },
    //  销售属性属性值名称列表tag方法
    // 删除属性值tag
    handleClose(row, index) {
      // console.log(row);
      row.spuSaleAttrValueList.splice(index, 1)
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;
      // 非空处理
      if (inputValue.trim() == '') {
        this.$message('属性值不能为空！');
        row.inputVisible = false
        return;
      }
      // 重复处理
      let repeat = row.spuSaleAttrValueList.every(item => item.saleAttrValueName != inputValue)
      // console.log(repeat);
      if (!repeat) {
        this.$message('属性值重复！');
        row.inputVisible = false
        return;
      }
      let newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false;
    },
    // 添加新的销售属性
    addSaleAttr() {
      // console.log(this.unSelectAttrIdAndAttrName);
      const [baseSaleAttrId, saleAttrName] = this.unSelectAttrIdAndAttrName.split(':')
      let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.unSelectAttrIdAndAttrName = '';
    },
    // 添加新的销售属性值
    addSaleAttrValue(row, index) {
      // console.log(row);
      // 设置响应式数据
      this.$set(row, 'inputVisible', true)
      // 收集新增属性值
      this.$set(row, 'inputValue', '')
      this.$nextTick(() => {
        // 获取input节点实现自动对焦
        this.$refs[index].focus();
        // console.log(index);
      })
    },
    // 删除属性
    deleteAttr(index) {
      // console.log(row);
      this.spu.spuSaleAttrList.splice(index, 1)
    },
    // 保存spu
    async addOrUpdateSpu() {
      // 整理参数
      this.spu.spuImageList = this.spuImageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
        }
      })
      // 发请求
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      // console.log(result);
      if (result.code == 200) {
        this.$message({ type: 'success', message: '保存成功！' })
        this.$emit('changeScene', { scene: 0, flag: this.spu.id ? '修改' : '添加' })
      }
      // 清除数据
      Object.assign(this._data, this.$options.data());
    },
    // 添加spu的请求
    async addSpuData(category3Id) {
      this.spu.category3Id = category3Id;
      // 获取品牌信息 
      let tradeMarkList = await this.$API.spu.reqTradeMarkList();
      // console.log(tradeMarkList);
      if (tradeMarkList.code == 200) {
        this.tradeMarkList = tradeMarkList.data;
      }
      // 获取平台全部销售属性  最多三个
      let baseSaleAttrList = await this.$API.spu.reqBaseSaleAttrList();
      // console.log(baseSaleAttrList);
      if (baseSaleAttrList.code == 200) {
        this.baseSaleAttrList = baseSaleAttrList.data;
      }
    },
    // 取消按钮
    cancel() {
      this.$emit('changeScene', { scene: 0, flag: '' });
      // 清除数据 
      // Object.assign es6合并对象
      // 组件实例this._data 可以操作data中的响应式数据
      // this.$options 可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data, this.$options.data());
    }
  }  // end methods
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>