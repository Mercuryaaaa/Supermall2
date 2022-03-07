<template>
  <div class="charts" ref="charts"></div>
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
            color: 'purple',
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
                  color: 'purple',
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
      tooltip:{}
    })
  }
}
</script>

<style>
</style>