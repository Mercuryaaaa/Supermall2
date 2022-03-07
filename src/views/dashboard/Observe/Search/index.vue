<template>
  <el-card>
    <div slot="header" class="search-header">
      <span>线上热门搜索</span>
      <el-dropdown>
        <span>
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="search-body">
      <el-row :gutter="10">
        <el-col :span="12"><lineCharts></lineCharts></el-col>
        <el-col :span="12"><lineCharts></lineCharts></el-col>
      </el-row>
    </div>
    <div class="search-table" style="margin-top: 10px">
      <!-- 表格 -->
      <el-table
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        border=""
      >
        <el-table-column type="index" label="排名" width="80px" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="搜索关键字"
          width="width"
          align="center"
          >>
        </el-table-column>
        <el-table-column
          prop="address"
          label="用户数"
          sortable
          width="width"
          align="center"
          >>
        </el-table-column>
        <el-table-column
          prop="address"
          label="周涨幅"
          sortable
          width="width"
          align="center"
          >>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination layout="prev, pager, next" :total="1000" style="text-align:center;margin-top:5px"> </el-pagination>
    </div>
  </el-card>
</template>

<script>
import LineCharts from './lineCharts';
export default {
  components: {
    LineCharts,
  }
}
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
}
</style>