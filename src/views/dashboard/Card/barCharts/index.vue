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
        type: 'category',
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: 'bar',
          data: [1, 34, 54, 34, 67, 22],
          color:''
        },
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