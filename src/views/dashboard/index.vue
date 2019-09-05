<template>
  <el-card>
    <el-form ref="form" label-width="110px" label-position="left">
      <el-date-picker
        v-model="value"
        type="daterange"
        align="left"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions2"
      />
      <el-button
        type="primary"
        @click="getList()"
      >查询</el-button>
    </el-form>
    <el-card>
      <el-row>
        <el-col :span="12">
          <chart
            :chart-data="chartData"
            width="500px"
            height="300px"
          />
        </el-col>
        <el-col :span="12">
          <lineChart
            :chart-data="chartData1"
            width="500px"
            height="300px"
          />
        </el-col>
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
import chart from '@/components/chart/chart'
import lineChart from '@/components/chart/line'
import { addDate } from '@/utils/tools'
import { count } from '@/api/system'
export default {
  components: {
    chart,
    lineChart
  },
  data() {
    return {
      chartData: {},
      chartData1: {
        expectedData: [1, 2, 3, 4, 5],
        actualData: [100, 200, 300, 400, 500]
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 30), new Date()]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const that = this
      count({
        startTime: this.value[0],
        endTime: this.value[1]
      }).then(res => {
        const xData = res.data.workerList.map(item => {
          return item.name
        })
        const lineData = res.data.workerList.map(item => {
          return item.allNum
        })
        const barData = res.data.workerList.map(item => {
          return item.allPrice
        })
        const xData1 = res.data.priceList.map(item => {
          return item.stime
        })
        const line1 = res.data.priceList.map(item => {
          return item.price
        })
        const line2 = res.data.numList.map(item => {
          return item.num
        })
        that.chartData = {
          xData: xData,
          barData: barData,
          lineData: lineData
        }
        that.chartData1 = {
          xData: xData1,
          line1: line1,
          line2: line2
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
