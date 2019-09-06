<template>
  <el-card>
    <el-form ref="form" label-width="110px" label-position="left">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="排序方式">
            <el-date-picker
              v-model="value"
              type="daterange"
              align="left"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button
            type="primary"
            @click="getList()"
          >查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-card>
      <el-row :gutter="60" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <i class="el-icon-edit-outline" style="font-size:40px" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                总单数
              </div>
              <div class="card-panel-num">
                {{ data.allNum }}
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-message">
              <i style="font-size:40px" class="el-icon-tickets" />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">
                总金额
              </div>
              <div class="card-panel-num">
                {{ data.allPrice }}
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <lineChart
          :chart-data="chartData1"
          width="100%"
          height="300px"
        />
      </el-row>
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <chart
          :chart-data="chartData"
          width="100%"
          height="300px"
        />
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
import chart from '@/components/chart/chart'
import lineChart from '@/components/chart/line'
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
      value: [new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 30), new Date()],
      data: ''
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
        this.data = res.data
        const xData = this.data.workerList.map(item => {
          return item.name
        })
        const lineData = this.data.workerList.map(item => {
          return item.allNum
        })
        const barData = this.data.workerList.map(item => {
          return item.allPrice
        })
        const xData1 = this.data.priceList.map(item => {
          return item.stime
        })
        const line1 = this.data.priceList.map(item => {
          return Number(item.price)
        })
        const line2 = this.data.numList.map(item => {
          return Number(item.num)
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
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
