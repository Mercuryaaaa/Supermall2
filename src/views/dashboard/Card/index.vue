<template>
  <div>
    <el-row :gutter="10">
      <!-- 总销售额 -->
      <el-col :span="6">
        <el-card>
          <detail title="总销售额" count="￥ 11111">
            <template slot="charts">
              <span
                >周同比 &nbsp; 56.67%<svg
                  t="1646473955076"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4884"
                  width="16"
                  height="16"
                >
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    p-id="4885"
                    fill="#36ab60"
                  ></path>
                </svg>
              </span>
              <span
                >日同比 &nbsp; 19.96%<svg
                  t="1646473790234"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3644"
                  width="16"
                  height="16"
                >
                  <path
                    d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
                    p-id="3645"
                    fill="#d81e06"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer"> 日访问量 1234 </template>
          </detail>
        </el-card>
      </el-col>
      <!-- 访问量 -->
      <el-col :span="6"
        ><el-card
          ><detail title="访问量" count="11111">
            <template slot="charts">
              <lineCharts style="height: 100%; width: 100%" />
            </template>
            <template slot="footer"> 转化率 65% </template></detail
          >
        </el-card></el-col
      >
      <!-- 支付笔数 -->
      <el-col :span="6">
        <el-card>
          <detail title="支付笔数" count="11111">
            <template slot="charts">
              <barCharts style="height: 100%; width: 100%" />
            </template>
            <template slot="footer"> 日销售额￥12311 </template>
          </detail>
        </el-card>
      </el-col>
      <!-- 运营活动效果 -->
      <el-col :span="6">
        <el-card>
          <detail title="运营活动效果" count="11%">
            <template slot="charts">
              <progressCharts style="width:100%;height:100%"/>
            </template>
            <template slot="footer">
              <span
                >周同比 &nbsp; 56.67%
                <svg
                  t="1646473955076"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4884"
                  width="16"
                  height="16"
                >
                  <path
                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                    p-id="4885"
                    fill="#36ab60"
                  ></path>
                </svg>
              </span>
              <span
                >日同比 &nbsp; 19.96%
                <svg
                  t="1646473790234"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3644"
                  width="16"
                  height="16"
                >
                  <path
                    d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
                    p-id="3645"
                    fill="#d81e06"
                  ></path>
                </svg>
              </span>
            </template>
          </detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail';
import lineCharts from './lineCharts';
import barCharts from './barCharts';
import progressCharts from './progressCharts';
export default {
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts
  }
}
</script>

<style>
</style>