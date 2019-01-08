<template>
  <div id="map">
    <div id="allmap" ref="allmap"></div>
    <div class="count">
      <!-- 设备总数 -->
      <div class="sum">
        <span>设备总数</span>
        <p>{{sum.count}}</p>
      </div>
      <!-- 在线总数 -->
      <div class="sum">
        <span>在线总数</span>
        <p>{{sum.onLineCount}}</p>
      </div>
    </div>
    <!-- 当天人流量 -->
    <div id="flux">
      <span>实时客流量</span>
      <div>
        <p v-for="item in personCount">{{item.value[1]}}</p>
      </div>
      <div id="main2"></div>
    </div>
    <!-- 图标 -->
    <div class="os">
      <ul>
        <li>
          <img src="../../../assets/images/relitu.png">
        </li>
        <li>
          <img src="../../../assets/images/dingwei.png">
        </li>
        <li>
          <img src="../../../assets/images/quanju.png">
        </li>
        <li>
          <img src="../../../assets/images/fangda.png">
        </li>
        <li>
          <img src="../../../assets/images/suoxiao.png">
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { MP } from "./map.js";
import BMap from "BMap";
import { path } from "../../../api/api.js";
import axios from "axios";
import common from "../../common/date.js";
var eCharts = require("echarts");

export default {
  data() {
    return {
      sum: "",
      personCount: ""
    };
  },
  methods: {
    map() {
      var map = new BMap.Map("allmap", { minZoom: 6, maxZoom: 18 }); // 创建Map实例,设置地图允许的最小/大级别
      var point = new BMap.Point(114.346071, 30.678385);
      map.enableScrollWheelZoom();
      map.addControl(new BMap.NavigationControl()); //添加默认缩放平移控件
      map.centerAndZoom(point, 6);
       
      map.addEventListener("tilesloaded", function() {
        var api = "/device/terminal/selectTerminalCoordinate";
        var token = localStorage.getItem("token");
        var myIcon = new BMap.Icon(
          //  "http://developer.baidu.com/map/jsdemo/img/fox.gif",
          "http://tomepicture.zhihuiquanyu.com/online-icon.png",
          new BMap.Size(34, 41)
        );
        var myIcon1 = new BMap.Icon(
          "http://tomepicture.zhihuiquanyu.com/offline-icon.png",
          new BMap.Size(34, 41)
        );
        axios
          .get(path + api, {
            headers: {
              Authorization: "Bearer" + token
            }
          })
          .then(response => {
            // console.log(response);
            let resdata = response.data.value;
            // console.log(resdata);

            for (var i = 0; i < resdata.length; i++) {
              // 判断是否在线
              if (resdata[i].isOnline == 1) {
                var p1 = new BMap.Point(resdata[i].lon, resdata[i].lat);
                var id = resdata[i].id
                // console.log(id);
                var marker2 = new BMap.Marker(p1, { icon: myIcon }); // 创建标注
                map.addOverlay(marker2); // 将标注添加到地图中
                var opts = {
                  width: 200, // 信息窗口宽度
                  height: 150, // 信息窗口高度
                  // title: "海底捞王府井店", // 信息窗口标题
                  enableMessage: true //设置允许信息窗发送短息
                };
                var infoWindow = new BMap.InfoWindow(
                  "地址：北京市东城区王府井大街88号乐天银泰百货八层",
                  opts
                ); // 创建信息窗口对象
                
                marker2.addEventListener("click", function() {  
                  var api ='/device/terminal/selectTerminalInfo'
                  var _this = this                  
                  var token = localStorage.getItem('token')
                  axios.get(path + api,{
                    id:_this.id
                  },{
                    headers:{
                      Authorization:"Bearer" + token
                    }
                  }).then(response=>{
                    console.log(response,"定位信息框");
                    
                  })
                  // console.log(p1,"信息窗口位置");
                  map.openInfoWindow(infoWindow, p1); //开启信息窗口
                });
              } else {
                var p1 = new BMap.Point(resdata[i].lon, resdata[i].lat);
                 var id = resdata[i].id
                // console.log(id);
                // console.log("离线的p1",p1);
                var marker2 = new BMap.Marker(p1, { icon: myIcon1 }); // 创建标注
                // marker2.addEventListener("click", attribute);
                map.addOverlay(marker2); // 将标注添加到地图中
                var opts = {
                  width: 200, // 信息窗口宽度
                  height: 150, // 信息窗口高度
                  // title: "海底捞王府井店", // 信息窗口标题
                  enableMessage: true //设置允许信息窗发送短息
                };
                var infoWindow = new BMap.InfoWindow(
                  "地址：北京市东城区王府井大街88号乐天银泰百货八层",
                  opts
                ); // 创建信息窗口对象
                marker2.addEventListener("click", function() {
                  console.log(p1, "信息窗口位置");
                  map.openInfoWindow(infoWindow, p1); //开启信息窗口
                });
              }
            }

            
          });
      });
      map.addEventListener("tilesloaded", function() {
        var api = "/scenery/webdata/sos/query";
        var myIcon2 = new BMap.Icon(
          "http://tomepicture.zhihuiquanyu.com/SOS.png",
          new BMap.Size(71, 83)
        );
        var token = localStorage.getItem("token");
        axios
          .post(
            path + api,
            {},
            {
              headers: {
                Authorization: "Bearer" + token
              }
            }
          )
          .then(response => {
            var res = response.data.value.list;
            console.log("res", res);

            for (var i = 0; i < res.length; i++) {
              // 获取经纬度
              var reslon = res[i].lon;
              var reslat = res[i].lat;
              var pt = new BMap.Point(reslon, reslat); //添加标注点
              var marker2 = new BMap.Marker(pt, { icon: myIcon2 }); //创建标注
              map.addOverlay(marker2); //将标注添加到地图中
              marker2.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
              var opts = {
                width: 300, // 信息窗口宽度
                height: 240, // 信息窗口高度
                title: "用户信息", // 信息窗口标题
                enableMessage: true //设置允许信息窗发送短息
              };
              var infoWindow = new BMap.InfoWindow(
                "性别：" +
                  res[i].sex +
                  " <br/>" +
                  "年龄：" +
                  res[i].age +
                  " <br/>" +
                  "地址：" +
                  res[i].address +
                  "<br/>" +
                  "电话：" +
                  res[i].phone +
                  " <br/>" +
                  "设备信息" +
                  " <br/>" +
                  "imei:" +
                  res[i].imei +
                  " <br/>" +
                  "电量：" +
                  res[i].battery +
                  "%" +
                  "<br/>" +
                  "经纬度：" +
                  res[i].lon +
                  "," +
                  res[i].lat +
                  "<br/>" +
                  "当前位置：" +
                  res[i].location +
                  "<br/>" +
                  "所属团：" +
                  res[i].touristTeamName +
                  " <br/>" +
                  "所属景区：" +
                  res[i].sceneryName +
                  " <br/>" +
                  "时间：" +
                  res[i].createTime +
                  " <br/>",
                   // 日期转换
              function timeStamp(createTime){
                  var date = new date(createTime *1000);
                  var  Y = date.getFullYear()+'/';
                  var M =(date.getMonth()+1 <10? '0' +(date.getMonth()+1): date.getMonth()+1)+'/';
                  var D = date.getDate()+'/';
                  var h = date.getHours()+ '/';
                  var m = date.getMinutes()+'/';
                  var s = date.getSeconds();
                  return Y+M+D+h+m+s
              },
              // timeStamp(createTime);
              // console.log(timeStamp(createTime));
                opts
              ); // 创建信息窗口对象
              // 日期转换
              // function timeStamp(createTime){
              //     var date = new date(createTime *1000);
              //     var  Y = date.getFullYear()+'/';
              //     var M =(date.getMonth()+1 <10? '0' +(date.getMonth()+1): date.getMonth()+1)+'/';
              //     var D = date.getDate()+'/';
              //     var h = date.getHours()+ '/';
              //     var m = date.getMinutes()+'/';
              //     var s = date.getSeconds();
              //     return Y+M+D+h+m+s
              // }
              // timeStamp(createTime)
              // console.log(timeStamp(createTime));
              
              marker2.addEventListener("click", function() {
                map.openInfoWindow(infoWindow, pt); //开启信息窗口
              });
            }
          });
      });
    },

    // 统计图表
    lineCharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main2"));
      // 指定图表的配置项和数据
      function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
          name: now.toString(),
          value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
            Math.round(value)
          ]
        };
      }

      var data = [];
      var now = +new Date(1970, 1, 1);
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 10000;
      for (var i = 0; i < 1000; i++) {
        data.push(randomData());
      }

      let option = {
        // title: {
        //   text: "动态数据 + 时间坐标轴"
        // },
        // tooltip: {
        //   trigger: "axis",
        //   formatter: function(params) {
        //     params = params[0];
        //     var date = new Date(params.name);
        //     // return (
        //     //   date.getDate() +
        //     //   "/" +
        //     //   (date.getMonth() + 1) +
        //     //   "/" +
        //     //   date.getFullYear() +
        //     //   " : " +
        //     //   params.value[1]
        //     // );
        //   },
        //   axisPointer: {
        //     animation: false
        //   }
        // },
        xAxis: {
          type: "time",
          spliNumber: 2,
          scale: true,
          show: false,
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          spliNumber: 2,
          scale: true,
          show: false,
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            data: data
          }
        ]
      };

      setInterval(function() {
        for (var i = 0; i < 5; i++) {
          data.shift();
          data.push(randomData());
        }

        myChart.setOption({
          series: [
            {
              data: data
            }
          ]
        });
      }, 600);

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      // console.log("data", data);
      // console.log("------------");
      // console.log(this.personCount);
      // console.log("------------");
      //  this.personCount = JSON.parse(JSON.stringify(data))
      this.personCount = data;
    },

    // 查询设备总数及在线数量
    finddevicecount() {
      var api = "/device/terminal/selectTerminalCount";
      var _this = this;
      var token = localStorage.getItem("token");
      console.log(token);

      this.$axios
        .get(path + api, {
          headers: {
            Authorization: "Bearer" + token
          }
        })
        .then(response => {
          console.log(response, "查询设备总数及在线数量事件-----");
          return (_this.sum = response.data.value);
        });
    }
  },

  mounted() {
    //调用上面的函数
    this.map();

    this.finddevicecount();
    this.lineCharts();
  }
};
</script>


<style lang="less">
#map {
  width: 100%;
  height: 100%;
  position: relative;
  #allmap {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    z-index: 1;
    // background-image: url(../../../../assets/images/zaixian.png);
  }
  .count {
    width: 500px;
    height: 150px;
    // border: solid 1px #ccc;
    position: absolute;
    top: 10px;
    right: 20px;
    display: flex;
    .sum {
      flex: 1;
      text-align: center;
      z-index: 9999999999;

      span {
        display: inline-block;
        width: 100%;
        height: 30px;
        font-size: 20px;
        line-height: 30px;
        background: #ed5001;
        color: #fff;
      }
      p {
        background: #fbfbfbc7;
        height: 120px;
        font-size: 40px;
        line-height: 120px;
        color: #8c8c8c;
      }
    }
  }
  #flux {
    width: 500px;
    height: 300px;
    // border: solid 1px #ccc;
    position: absolute;
    top: 180px;
    right: 20px;
    span {
      display: inline-block;
      width: 100%;
      height: 30px;
      font-size: 20px;
      line-height: 30px;
      background: #ed5001;
      color: #fff;
      text-align: center;
    }
    div {
      height: 60px;
      overflow: hidden;
      p {
        background: #fbfbfbc7;
        // height: 270px;
        font-size: 40px;
        text-align: center;
        line-height: 60px;
        color: #8c8c8c;
      }
    }
    #main2 {
      width: 100%;
      height: 72%;
      background: #fbfbfbc7;
    }
  }
  .os {
    width: 80px;
    position: absolute;
    top: 480px;
    right: 10px;
    ul {
      li {
        margin: 10px auto;
        cursor: pointer;
        img {
          width: 64px;
          background: #fbfbfbc7;
        }
      }
    }
  }
}
</style>

