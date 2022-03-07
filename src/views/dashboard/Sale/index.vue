<template>
  <el-card style="margin-top: 10px">
    <div class="clearfix">
      <!-- 头左 -->
      <el-tabs class="header-left" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <!-- 头右 -->
      <div class="header-right">
        <a @click="today">本日</a>
        <a @click="week">本周</a>
        <a @click="month">本月</a>
        <a @click="year">本年</a>
        <el-date-picker
          class="date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          v-model="date"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <!-- 柱状图 -->
        <el-col :span="18">
          <div class="barCharts" ref="barCharts"></div>
        </el-col>
        <!-- 排名 -->
        <el-col :span="6">
          <div class="rank">
            <h3>门店{{ title }}排名</h3>
            <ul>
              <li>
                <span class="index">1</span>
                <span>肯德基</span>
                <span class="value">123</span>
              </li>
              <li>
                <span class="index">2</span>
                <span>肯德基</span>
                <span class="value">123</span>
              </li>
              <li>
                <span class="index">3</span>
                <span>肯德基</span>
                <span class="value">123</span>
              </li>
              <li>
                <span class="index">4</span>
                <span>肯德基</span>
                <span class="value">123</span>
              </li>
              <li>
                <span class="index">5</span>
                <span>肯德基</span>
                <span class="value">123</span>
              </li>
              <li>
                <span class="index">6</span>
                <span>肯德基</span>
                <span class="value">123</span>
              </li>
              <li>
                <span class="index">7</span>
                <span>肯德基</span>
                <span class="value">123</span>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';
import dayjs from 'dayjs';
export default {
  data() {
    return {
      activeName: 'sale',
      myCharts: null,
      // 日历数据
      date: []
    }
  },
  mounted() {
    // 初始化echarts实例
    this.myCharts = echarts.init(this.$refs.barCharts)
    // 配置数据
    this.myCharts.setOption({
      title: {
        text: this.title + '趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '80%',
          data: [10, 52, 200, 334, 390, 330, 220, 323, 454, 543, 343, 364]
        }
      ]
    })
  },
  watch: {
    title() {
      this.myCharts.setOption({
        title: {
          text: this.title + '趋势'
        }
      })
    }
  },
  computed: {
    title() {
      return this.activeName == 'sale' ? '销售额' : '访问量'
    }
  },
  methods: {
    // 本日
    today() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    },
    // 本周
    week() {
      const start = dayjs().day(0).format('YYYY-MM-DD')
      const end = dayjs().day(6).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 本月
    month() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    // 本年
    year() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    },
  }
}

</script>

<style scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.header-left {
  width: 100%;
}
.header-right {
  position: absolute;
  top: 0;
  right: 0;
}
.header-right span {
  margin: 0 10px;
}
.date {
  /* width: 200px; */
  margin-left: 20px;
}
.barCharts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}
ul li {
  height: 8%;
  margin: 10px 0;
}
span {
  margin: 0 10px;
}
a {
  margin: 0 10px;
  font-size: 14px;
  color: #999;
}
.index {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  text-align: center;
  line-height: 20px;
}
.value {
  float: right;
}
</style>