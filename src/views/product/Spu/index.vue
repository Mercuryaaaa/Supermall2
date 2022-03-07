<template>
  <div>
    <el-card style="margin: 20px 0px">
      <categorySelect @getCategoryId="getCategoryId" :show="scene != 0" />
    </el-card>
    <el-card>
      <!-- spu列表数据 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 0 0 10px"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table border="" style="width: 100%" :data="records">
          <!-- 序号 -->
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          ></el-table-column>
          <!-- spu名称 -->
          <el-table-column
            prop="spuName"
            label="spu名称"
            width="width"
            align="center"
          ></el-table-column>
          <!-- spu描述 -->
          <el-table-column
            prop="description"
            label="spu描述"
            width="width"
            align="center"
          ></el-table-column>
          <!-- 操作 -->
          <el-table-column prop="" label="操作" width="width" align="center">
            <template slot-scope="{ row, $index }">
              <hint-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSku(row)"
              ></hint-button>
              <hint-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></hint-button>
              <hint-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu全部sku列表"
                @click="showSkuList(row)"
              ></hint-button>
              <el-popconfirm
                title="确定删除该spu？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除spu"
                  slot="reference"
                >
                </hint-button>
              </el-popconfirm>
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
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        />
      </div>
      <!-- 添加、修改spu -->
      <spuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spu"
      ></spuForm>
      <!-- 添加sku -->
      <skuForm
        v-show="scene == 2"
        @changeScene2="changeScene2"
        ref="sku"
      ></skuForm>
    </el-card>
    <!-- 查看sku列表对话框 -->
    <el-dialog
      :title="`${spu.spuName} 的SKU列表`"
      :visible.sync="dialogTableVisible"
      :before-close="closeDialog"
    >
      <!-- sku列表数据表格 -->
      <el-table :data="skuList" v-loading="loading">
        <el-table-column
          align="center"
          prop="skuName"
          label="名称"
          width="400px"
        ></el-table-column>
        <el-table-column
          prop="price"
          align="center"
          label="价格"
          width="width"
        ></el-table-column>
        <el-table-column
          prop="weight"
          align="center"
          label="重量"
          width="width"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="默认图片"
          width="width"
        >
          <template slot-scope="{ row, $index }">
            <img :src="row.skuDefaultImg" style="width: 80px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm';
import SkuForm from './SkuForm';
export default {
  name: 'Spu',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // show: true,
      limit: 5,
      page: 1,
      total: 0,
      records: [],
      // div显示场景  0 spu数据； 1 添加、修改spu； 2 添加sku；
      scene: 0,
      // sku数据列表显隐
      dialogTableVisible: false,
      spu: {},
      skuList: [],
      loading: true,
    }
  },
  mounted() {
    // this.getSpuList()
  },
  methods: {
    // 三级联动自定义事件，向父组件传数据
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
        this.getSpuList();
      }
    },
    // 获取spu列表数据
    async getSpuList(pages = 1) {
      this.page = pages;
      const { page, limit, category3Id } = this;
      let result = await this.$API.spu.reqSpuList(page, limit, category3Id)
      // console.log(result);
      if (result.code = 200) {
        this.total = result.data.total;
        this.records = result.data.records;
        // console.log('r',this.records);
      } else {
        alert('getSpuList file!')
      }
    },
    // 分页器每页数量变化
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSpuList();
    },
    // 添加SPU按钮
    addSpu() {
      this.scene = 1;
      // 通知子组件发请求
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 修改spu按钮
    updateSpu(row) {
      this.scene = 1;
      // console.log('父组件',this.$refs);
      // 在父组件中可以通过$refs获取子组件
      // 获取子组件initSpuData方法
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件
    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag == '添加') {
        this.getSpuList();
      } else {
        this.getSpuList(this.page);
      }
    },
    changeScene2(scene) {
      this.scene = scene;
    },
    // 删除spu按钮
    async deleteSpu(row) {
      let result = await this.$API.spu.reqDeleteSpu(row.id);
      // console.log(result);
      if (result.code == 200) {
        this.$message({ type: 'success', message: '删除成功！' })
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1);
      }
    },
    // 添加sku
    addSku(row) {
      this.scene = 2;
      // 让子组件发请求
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
      // console.log(this.$refs);
    },
    // 显示sku列表数据按钮
    async showSkuList(row) {
      // console.log(row);
      this.dialogTableVisible = true;
      this.spu = row;
      // 发请求
      let result = await this.$API.spu.reqSkuList(row.id);
      // console.log(result);
      if (result.code == 200) {
        this.skuList = result.data;
        // 隐藏loading
        this.loading = false;
      }
    },
    // 关闭sku数据列表按钮
    closeDialog(done) {
      this.loading = true;
      this.skuList = [];
      done();
    }
  },  // end methods
  components: {
    SpuForm,
    SkuForm,
  }
}
</script>

<style>
</style>
