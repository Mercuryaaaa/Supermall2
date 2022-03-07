<template>
  <div>
    <!--
      :inline="true"行内表单 
    -->
    <el-form :inline="true" class="demo-form-inline" :model="cFrom">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择"
          v-model="cFrom.category1Id"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :label="item1.name"
            :value="item1.id"
            v-for="(item1, index) in list1"
            :key="item1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          v-model="cFrom.category2Id"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :label="item2.name"
            :value="item2.id"
            v-for="(item2, index) in list2"
            :key="item2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          v-model="cFrom.category3Id"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :label="item3.name"
            :value="item3.id"
            v-for="(item3, index) in list3"
            :key="item3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['show'],
  data() {
    return {
      // 一二三级分类数据
      list1: [],
      list2: [],
      list3: [],
      // 收集id
      cFrom: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
      }
    }
  },
  mounted() {
    // 获取一级分类数据
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类数据
    async getCategory1List() {
      // console.log(this.$API.attr.reqCategory1List());
      let result = await this.$API.attr.reqCategory1List();
      // console.log(result);
      if (result.code == 200) {
        this.list1 = result.data
      } else {
        alert('getCategory1List file!')
      }
    },
    // 一级分类选择后的事件回调
    async handler1() {
      // 清除数据
      this.list2 = [];
      this.list3 = [];
      this.cFrom.category2Id = '';
      this.cFrom.category3Id = '';
      // 解构数据
      const { category1Id } = this.cFrom;
      // 向父组件传数据
      this.$emit('getCategoryId', { categoryId: category1Id, level: 1 });
      let result = await this.$API.attr.reqCategory2List(category1Id);
      // console.log(result);
      if (result.code == 200) {
        this.list2 = result.data
      } else {
        alert('handler1 file!')
      }
    },
    // 二级分类选择后的事件回调
    async handler2() {
      // 清除数据
      this.list3 = [];
      this.cFrom.category3Id = '';
      // 解构数据
      const { category2Id } = this.cFrom;
      // 向父组件传数据
      this.$emit('getCategoryId', { categoryId: category2Id, level: 2 });
      let result = await this.$API.attr.reqCategory3List(category2Id);
      // console.log(result);
      if (result.code == 200) {
        this.list3 = result.data
      } else {
        alert('handler2 file!')
      }
    },
    // 三级分类选择后的事件回调
    async handler3() {
      const { category3Id } = this.cFrom;
      // 向父组件传数据
      this.$emit('getCategoryId', { categoryId: category3Id, level: 3 });
      // let result = await this.$API.attr.reqCategory3List(category2Id);
      // // console.log(result);
      // if (result.code == 200) {
      //   this.list3 = result.data
      // } else {
      //   alert('handler2 file!')
      // }
    },
  }  // end methods
}
</script>

<style>
</style>