<template>
  <el-row :gutter="10" style="margin-top:10px">
    <el-col :span="12"><search></search></el-col>
    <el-col :span="12"><category /></el-col>
  </el-row>
</template>

<script>
import Search from './Search';
import Category from './Category';
export default {
  components:{
    Search,
    Category
  }
}
</script>

<style>

</style>