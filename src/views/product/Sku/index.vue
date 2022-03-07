<template>
  <div>
    <!-- 表格数据 -->
    <el-table :data="records" style="width: 100%" border="">
      <!-- 序号 -->
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <!-- 名称 -->
      <el-table-column prop="skuName" label="名称" width="width" align="center">
      </el-table-column>
      <!-- 描述 -->
      <el-table-column prop="skuDesc" label="描述" width="width" align="center">
      </el-table-column>
      <!-- 默认图片 -->
      <el-table-column
        prop="prop"
        label="默认图片"
        width="120px"
        align="center"
      >
        <template slot-scope="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 80px" />
        </template>
      </el-table-column>
      <!-- 重量 -->
      <el-table-column
        prop="weight"
        label="重量(kg)"
        width="100px"
        align="center"
      >
      </el-table-column>
      <!-- 价格 -->
      <el-table-column
        prop="price"
        label="价格(元)"
        width="100px"
        align="center"
      >
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column
        header-align="center"
        align="center"
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="info"
            icon="el-icon-shopping-cart-2"
            title="上架"
            size="mini"
            v-if="row.isSale == 0"
            @click="onSale(row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-shopping-cart-full"
            title="下架"
            size="mini"
            v-else
            @click="cancelSale(row)"
          ></el-button>
          <el-button
            type="primary"
            icon="el-icon-edit"
            title="编辑"
            size="mini"
            @click="edit(row)"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            title="信息"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            title="删除"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 每页数据条数:page-size  可以设置的每页数据条数:page-sizes -->
    <el-pagination
      style="margin-top: 10px; text-align: center"
      :total="total"
      :current-page="page"
      :page-size="limit"
      :page-sizes="[1, 5, 10]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
    />
    <!-- sku信息抽屉效果 -->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :show-close="false"
      size="40%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag
              type="success"
              v-for="(item, index) in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin-bottom: 5px; margin-right: 5px"
              >{{ item.attrName }} - {{ item.valueName }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel style="height: 400px; width: 400px">
            <el-carousel-item
              v-for="(item, index) in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" style="width: 400px; height: 400px" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'sku',
  data() {
    return {
      // 分页器数据
      page: 1,
      total: 0,
      limit: 5,
      // sku列表数据
      records: [],
      // sku详情信息
      skuInfo: {},
      // 抽屉数据
      drawer: false,
      direction: 'rtl',
    }
  },  // end data
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获取sku列表数据
    async getSkuList(pages = 1) {
      this.page = pages;
      let result = await this.$API.sku.reqSkuList(this.page, this.limit);
      // console.log(result);
      if (result.code == 200) {
        this.records = result.data.records;
        this.total = result.data.total;
      }
    },
    // 分页器大小变化
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    // 上架
    async onSale(row) {
      // console.log(row);
      let result = await this.$API.sku.reqOnSale(row.id)
      // console.log(result);
      if (result.code == 200) {
        this.$message({ type: 'success', message: `${row.skuName}  上架成功` });
        // this.getSkuList();
        row.isSale = 1;
      }
    },
    // 下架
    async cancelSale(row) {
      // console.log(row);
      let result = await this.$API.sku.reqCancelSale(row.id)
      // console.log(result);
      if (result.code == 200) {
        this.$message({ type: 'success', message: `${row.skuName}  下架成功` });
        // this.getSkuList();
        row.isSale = 0;
      }
    },
    // 编辑
    async edit(row) {
      this.$message('未开发！')
    },
    // 信息
    async getSkuInfo(row) {
      this.drawer = true;
      let result = await this.$API.sku.reqSkuById(row.id)
      console.log(result);
      if (result.code == 200) {
        this.skuInfo = result.data;
      }
    },
    // 抽屉关闭
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => { });
    // },
  },  // end methods
}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<style  scoped>
/* 抽屉样式 */
.el-col {
  margin: 10px 10px;
}
.el-row .el-col-5 {
  font-weight: bold;
  font-size: 18px;
  text-align: right;
}
</style>
