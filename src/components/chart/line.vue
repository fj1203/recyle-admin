<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      default: 'chartLine'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      // this.setOptions(this.chartData)
      // this.chart = echarts.init(document.getElementById(this.id))
    },
    setOptions({ xData, line1, line2 } = {}) {
      this.chart.setOption({
        xAxis: {
          data: xData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        title: {
          text: '收益统计',
          x: '20',
          top: '15',
          textStyle: {
            color: '#34bfa3',
            fontSize: '16'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        grid: {
          left: '9%',
          right: '9%',
          bottom: 40,
          top: 50,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['成交额', '成交数']
        },
        series: [{
          name: '成交额', itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: line1,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '成交数',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: line2,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
