<template>
  <div>
    <el-card style="margin: 20px 0px">
      <categorySelect @getCategoryId="getCategoryId" :show="!isShowTable" />
    </el-card>
    <el-card>
      <!-- 属性数据表格 -->
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 0 0 10px"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="250px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性值列表"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                style="margin: 0 10px"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="250px"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <!-- 修改属性按钮 -->
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <!-- 删除属性按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性或修改属性 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="54px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          border=""
          style="margin: 20px 0 20px"
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            label="序号"
            type="index"
            width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性值名称"
            prop="prop"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                v-if="row.flag"
                @blur="toSpan(row)"
                @keyup.native.enter="toSpan(row)"
                :ref="$index"
              ></el-input>
              <span
                v-else
                @click="toInput(row, $index)"
                style="display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="prop"
            width="300px"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除 ${row.valueName}？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
export default {
  name: 'Attr',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      attrList: [],
      // 控制表格显隐
      isShowTable: true,
      // 收集新增修改属性数据
      attrInfo: {
        attrName: '',
        attrValueList: [
          // {
          //   attrId: '',
          //   valueName: '',
          // },
        ],
        categoryId: '',
        categoryLevel: 3,
      },

    }
  },
  methods: {
    // 自定义事件 获取子组件传过来的数据
    getCategoryId({ categoryId, level }) {
      // console.log(categoryId);
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = '';
        this.category3Id = '';
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = '';
      } else {
        this.category3Id = categoryId;
        this.getAttrList();
      }
    },
    // 获取平台属性的数据
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id);
      // console.log(result);
      if (result.code == 200) {
        // console.log(result.data);
        this.attrList = result.data
      }
    },
    // 修改属性按钮
    updateAttr(row) {
      this.isShowTable = false;
      // console.log(row);
      // this.attrInfo = row;
      // 深拷贝
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach(item => {
        // 添加响应式数据（数据变化视图变化）  this.$set(对象, 新数据, 值)
        this.$set(item, 'flag', false)
      })
    },
    // 删除属性按钮
    deleteAttr() { },
    // 添加属性按钮
    addAttr() {
      this.isShowTable = false;
      // 清除数据
      this.attrInfo = {
        attrName: '',
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      }
    },
    // 添加属性值按钮
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        // 属性值input、span切换
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      })
    },
    // 查看模式 input失去焦点事件
    toSpan(row) {
      // 属性值非空处理
      if (row.valueName.trim() == '') {
        this.$message('请输入属性值！');
        return;
      }
      // 属性值重复处理
      let repeat = this.attrInfo.attrValueList.some(item => {
        // 非己
        if (row !== item) {
          return row.valueName == item.valueName
        }
      })
      // console.log(repeat);
      if (repeat) {
        this.$message('属性值重复！')
      }
      row.flag = false
      // console.log(row);
    },
    // 编辑模式 
    toInput(row, index) {
      row.flag = true;
      // this.$nextTick 节点渲染完毕时执行
      this.$nextTick(() => {
        // 获取input节点实现自动对焦
        this.$refs[index].focus();
        // console.log(index);
      })
    },
    // 删除属性值确定按钮
    deleteAttrValue(index) {
      // console.log(index);
      this.attrInfo.attrValueList.splice(index, 1);
    },
    // 保存按钮  添加或修改属性
    async addOrUpdateAttr() {
      // 整理参数
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        // 非空属性
        // console.log(item);
        if (item.valueName != '') {
          delete item.flag;
          return true;
        }
      })
      // console.log(this.attrInfo.attrValueList);
      // 发请求
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.$message({ type: 'success', message: '保存成功！' })
        this.isShowTable = true;
        this.getAttrList()
      } catch (error) {
        this.$message(error.message)
      }
    },
  }
}
</script>

<style>
</style>
