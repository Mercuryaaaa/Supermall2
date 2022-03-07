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
        min:0,
        max:100,
      },
      yAxis: {
        show: false,
        type: 'category',
      },
      series: [
        {
          type: 'bar',
          data: [11],
          color: '',
          // 宽度
          barWidth:15,
          // 背景颜色
          showBackground: true,
          backgroundStyle:{
            color:'#eee'
          },
          // 文本标签
          label:{
            show:true,
            // 文本内容
            // formatter:'|',
            position:'right'
          }
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
      tooltip: {}
    })
  }
}
</script>

<style>
</style>