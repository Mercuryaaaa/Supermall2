<template>
  <div>
    <div class="header">
      <span>搜索用户数</span>
      <svg
        t="1646470497825"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2216"
        width="15"
        height="15"
      >
        <path
          d="M480 437.344h64v309.312h-64v-245.312h-64v-64h64zM512 288a53.344 53.344 0 1 1 0 106.656A53.344 53.344 0 0 1 512 288z m0-224c246.4 0 448 201.6 448 448s-201.6 448-448 448S64 758.4 64 512 265.6 64 512 64z m0 69.824C304.16 133.824 133.824 304.16 133.824 512c0 207.84 170.336 378.176 378.176 378.176 207.84 0 378.176-170.336 378.176-378.176 0-207.84-170.336-378.176-378.176-378.176z"
          p-id="2217"
        ></path>
      </svg>
    </div>
    <div class="content" style="margin-top: 5px">
      <span style="margin-right: 30px">1212</span>
      <span style="margin-right: 5px">12</span>
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
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  mounted() {
    // console.log(echarts);
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts)
    // 配置数据
    lineCharts.setOption({
      xAxis: {
        show: false,
        // 均分
        type: 'category',
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: 'line',
          data: [1, 34, 54, 34, 67, 22],
          smooth: true,
          // 拐点样式
          itemStyle: {
            opacity: 0
          },
          // 线条样式
          lineStyle: {
            color: 'blue',
          },
          // 填充颜色
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'blue',
                },
                {
                  offset: 1,
                  color: '#fff',
                },
              ],
              global: false
            },
          },
        }
      ],
      // 布局调试
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      // 提示信息
      tooltip: {}
    })
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #999;
}
.content{
  font-size: 13px;
}
.charts {
  width: 100%;
  height: 50px;
}
</style>