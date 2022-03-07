<template>
  <div>
    <el-form ref="form" label-width="80px">
      <!-- SPU名称 -->
      <el-form-item label="SPU名称">{{ spu.spuName }}</el-form-item>
      <!-- SKU名称 -->
      <el-form-item label="SKU名称">
        <el-input
          placeholder="请输入SKU名称"
          v-model="skuInfo.skuName"
        ></el-input>
      </el-form-item>
      <!-- 价格 -->
      <el-form-item label="价格(元)">
        <el-input
          placeholder="请输入价格(元)"
          type="number"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <!-- 重量 -->
      <el-form-item label="重量(kg)">
        <el-input
          placeholder="请输入重量(kg)"
          v-model="skuInfo.weight"
        ></el-input>
      </el-form-item>
      <!-- 规格描述 -->
      <el-form-item label="规格描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder=""
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <!-- 平台属性 -->
      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in attrInfoList"
            :key="attr.id"
          >
            <el-select v-model="attr.attrIdAndValueId" placeholder="请选择">
              <el-option
                v-for="(item, index) in attr.attrValueList"
                :key="item.id"
                :label="item.valueName"
                :value="`${attr.id}:${item.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 销售属性 -->
      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="(saleAttr, index) in spuSaleAttrList"
            :key="saleAttr.id"
          >
            <el-select
              v-model="saleAttr.saleAttrIdAndValueId"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in saleAttr.spuSaleAttrValueList"
                :key="item.id"
                :label="item.saleAttrValueName"
                :value="`${saleAttr.id}:${item.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <!-- 图片列表 -->
      <el-form-item label="图片列表">
        <el-table
          border=""
          :data="spuImageList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="80ox"
            align="center"
          ></el-table-column>
          <el-table-column
            label="图片"
            prop="prop"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <img :src="row.imgUrl" style="width: 80px" />
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            prop="imgName"
            width="width"
            align="center"
          ></el-table-column>
          <el-table-column
            label="操作"
            prop="prop"
            width="250px"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                v-if="row.isDefault == 0"
                @click="changeDefault(row)"
                >设为默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 图片数据
      spuImageList: [],
      // 销售属性列表
      spuSaleAttrList: [],
      // 平台属性的数据
      attrInfoList: [],
      // sku数据(提交服务器)
      skuInfo: {
        // 父组件数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 数据双向绑定数据
        skuName: '',
        price: '',
        weight: '',
        skuDesc: '',
        // 服务器来源列表数据
        skuImageList: [],
        skuSaleAttrValueList: [],
        skuAttrValueList: [],
        // 默认图片
        skuDefaultImg: '',
      },
      spu: {},
      // 收集选择的图片
      selectImageList: [],
    }
  },
  methods: {
    // 获取数据
    async getData(category1Id, category2Id, spu) {
      // 收集父组件数据
      this.skuInfo.category3Id = spu.category3Id;
      this.skuInfo.spuId = spu.id;
      this.skuInfo.tmId = spu.tmId;
      this.spu = spu;
      // 获取图片数据
      let spuImageList = await this.$API.spu.reqSpuImageList(spu.id)
      // console.log(spuImageList);
      if (spuImageList.code == 200) {
        let list = spuImageList.data;
        list.forEach(item => {
          item.isDefault = 0;
        });
        this.spuImageList = list;
      }
      // 获取销售属性列表
      let spuSaleAttrList = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      // console.log(spuSaleAttrList);
      if (spuSaleAttrList.code == 200) {
        this.spuSaleAttrList = spuSaleAttrList.data;
      }
      // 获取平台属性的数据
      let category3Id = spu.category3Id
      // console.log(category3Id);
      let attrInfoList = await this.$API.spu.reqAttrInfoList({ category1Id, category2Id, category3Id })
      // console.log(attrInfoList);
      if (attrInfoList.code == 200) {
        this.attrInfoList = attrInfoList.data;
      }
    },
    // 复选框
    handleSelectionChange(selectImageList) {
      // console.log(selectImageList);
      this.selectImageList = selectImageList;
    },
    // 设为默认
    changeDefault(row) {
      this.spuImageList.forEach(item => {
        item.isDefault = 0;
      })
      row.isDefault = 1;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 保存按钮
    async save() {
      // 整理参数
      // 方法1
      // let arr = [];
      // this.attrInfoList.forEach(item => {
      //   if(item.attrIdAndValueId){
      //     const [attrId, valueId] = item.attrIdAndValueId.split(':');
      //     let obj = {attrId, valueId};
      //     arr.push(obj);
      //   }
      // });
      // this.skuInfo.skuAttrValueList = arr;
      // 方法2
      let result = this.attrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':');
          prev.push({ attrId, valueId })
        }
        return prev;
      }, [])
      // console.log(result);
      this.skuInfo.skuAttrValueList = result;
      let result2 = this.spuSaleAttrList.reduce((prev, item) => {
        if (item.saleAttrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.saleAttrIdAndValueId.split(':');
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // console.log(result2);
      this.skuInfo.skuSaleAttrValueList = result2;
      this.skuInfo.skuImageList = this.selectImageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        }
      })
      let result3 = await this.$API.spu.reqAddSku(this.skuInfo);
      // console.log(result3);
      if (result3.code == 200) {
        this.$message({ type: 'success', message: '保存成功！' })
        this.$emit('changeScene2', 0);
      } else {
        console.log(error.message);
      }
    },
    // 取消按钮
    cancel() {
      this.$emit('changeScene2', 0);
      // 清除数据 
      // Object.assign es6合并对象
      // 组件实例this._data 可以操作data中的响应式数据
      // this.$options 可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空的
      Object.assign(this._data, this.$options.data());
    }
  }, // end methods
}
</script>

<style>
</style>