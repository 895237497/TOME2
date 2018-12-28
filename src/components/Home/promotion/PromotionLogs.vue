<template>
    <div id="Emitters">
        <!-- 上面部分 -->
             <CommonInput
            :showMenu="showMenu"
            :showService="showService"
            :showDate="showDate"
         />
        <!-- 下面部分 -->
       <div class="bottom" style="display: flex;">
        <!-- 环形图 -->
        <div id="main" style="width:400px;height:600px;margin-top:15px"></div>
        <!-- 仪表图 -->
        <div id="main1" style="width:400px;height:600px;margin-top:15px"></div>
        <!-- 折线图 -->
        <div id="main2" style="width:800px;height:600px;margin-top:15px flex:1"></div>

    </div> 
    </div>
</template>
<script>
import CommonInput from "../../CommonInput";

var eCharts = require("echarts");
export default {
  components: {
    CommonInput
  },
  data() {
    return {
      showMenu: true,
      showImg: true,
      showService: true,
      showDate: true,
    };
  },
  mounted() {},

  methods: {
    // 仪表图表
    meterCharts1() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: {
              formatter: "{value}"
            },
            data: [
              {
                value: 50,
                name: "实时游客数"
              }
            ]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      setInterval(function() {
        option.series[0].data[0].value = (Math.random() * 10000).toFixed() - 0;
        myChart.setOption(option, true);
      }, 2000);
      // myChart.setOption(option);
    },
    // 仪表图表
    meterCharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main1"));
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: {
              formatter: "{value}"
            },
            data: [
              {
                value: 50,
                name: "累积游客数"
              }
            ]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      setInterval(function() {
        option.series[0].data[0].value = (Math.random() * 10000).toFixed() - 0;
        myChart.setOption(option, true);
      }, 2000);
      // myChart.setOption(option);
    },
    // 折线图表
    lineCharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main2"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "今日游客数"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["", "", "", "", ""]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {
              normal: {}
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: false,
                position: "top"
              }
            },
            areaStyle: {
              normal: {}
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.$nextTick(this.meterCharts1(), this.meterCharts(), this.lineCharts());
  }
};
</script>

<style lang="less">
</style>

