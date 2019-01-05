<template>
  <div id="map">
    <div id="allmap" ref="allmap"></div>

    <div id="l-map"></div>
    <div id="result">
      <button id="open">打开</button>
      <button id="close">关闭</button>
    </div>
    <!--城市列表-->
    <div class="sel_container">
      <strong id="curCity">北京市</strong> [
      <a id="curCityText" href="javascript:void(0)">更换城市</a>]
    </div>
    <div class="map_popup" id="cityList" style="display:none;">
      <div class="popup_main">
        <div class="title">城市列表</div>
        <div class="cityList" id="citylist_container"></div>
        <button id="popup_close"></button>
      </div>
    </div>

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
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.404, 39.915);
      map.enableScrollWheelZoom();
      map.addControl(new BMap.NavigationControl()); //添加默认缩放平移控件
      map.centerAndZoom(point, 15);
      map.addEventListener("tilesloaded", function() {
        var api = "/device/terminal/selectTerminalCoordinate";
        var token = localStorage.getItem("token");
        var myIcon = new BMap.Icon(
          //  "http://developer.baidu.com/map/jsdemo/img/fox.gif",
          "http://tomepicture.zhihuiquanyu.com/online-icon.png",
          new BMap.Size(30, 40)
        );
        var myIcon1 = new BMap.Icon(
          "http://tomepicture.zhihuiquanyu.com/offline-icon.png",
          new BMap.Size(30, 40)
        );
        axios
          .get(path + api, {
            headers: {
              Authorization: "Bearer" + token
            }
          })
          .then(response => {
            console.log(response);
            //let resdata = response.data.value
            let resdata = [
              { id: 1, lon: 116.39119, lat: 39.927303, isOnline: 1 },
              { id: 2, lon: 116.386896, lat: 39.915692, isOnline: 0 },
              { id: 3, lon: 116.386465, lat: 39.923771, isOnline: 0 },
              { id: 4, lon: 116.403425, lat: 39.917933, isOnline: 1 },
              { id: 5, lon: 116.367924, lat: 39.915332, isOnline: 0 },
              { id: 6, lon: 116.392789, lat: 39.909798, isOnline: 0 },
              { id: 7, lon: 116.389412, lat: 39.919593, isOnline: 1 },
              { id: 8, lon: 116.414277, lat: 39.909853, isOnline: 0 },
              { id: 9, lon: 116.409031, lat: 39.904042, isOnline: 0 },
              { id: 10, lon: 116.387615, lat: 39.90382, isOnline: 1 },
              { id: 11, lon: 116.37935, lat: 39.910739, isOnline: 0 },
              { id: 12, lon: 116.396957, lat: 39.904263, isOnline: 0 },
              { id: 13, lon: 116.376692, lat: 39.923467, isOnline: 1 },
              { id: 14, lon: 116.412193, lat: 39.922249, isOnline: 0 },
              { id: 15, lon: 116.409318, lat: 39.909743, isOnline: 0 },
              { id: 16, lon: 116.397317, lat: 39.90847, isOnline: 1 },
              { id: 17, lon: 116.394945, lat: 39.899558, isOnline: 0 },
              { id: 18, lon: 116.38395, lat: 39.918874, isOnline: 0 },
              { id: 19, lon: 116.41442, lat: 39.904374, isOnline: 1 },
              { id: 20, lon: 116.387327, lat: 39.911292, isOnline: 0 },
              { id: 21, lon: 116.376117, lat: 39.916328, isOnline: 0 },
              { id: 22, lon: 116.396239, lat: 39.922913, isOnline: 1 },
              { id: 23, lon: 116.372523, lat: 39.914889, isOnline: 0 },
              { id: 24, lon: 116.420744, lat: 39.91832, isOnline: 1 },
              { id: 25, lon: 116.383231, lat: 39.926676, isOnline: 0 },
              { id: 26, lon: 116.376763, lat: 39.910628, isOnline: 0 },
              { id: 27, lon: 116.396814, lat: 39.915332, isOnline: 1 },
              { id: 28, lon: 116.391855, lat: 39.907363, isOnline: 0 },
              { id: 29, lon: 116.396382, lat: 39.919317, isOnline: 0 },
              { id: 30, lon: 116.390561, lat: 39.923854, isOnline: 1 },
              { id: 31, lon: 116.403497, lat: 39.91251, isOnline: 0 },
              { id: 32, lon: 116.390849, lat: 39.916494, isOnline: 0 },
              { id: 33, lon: 116.412767, lat: 39.917546, isOnline: 1 },
              { id: 34, lon: 116.393148, lat: 39.918929, isOnline: 0 },
              { id: 35, lon: 116.399688, lat: 39.912344, isOnline: 0 },
              { id: 36, lon: 116.4017, lat: 39.905093, isOnline: 1 },
              { id: 37, lon: 116.383303, lat: 39.916439, isOnline: 0 },
              { id: 38, lon: 116.382584, lat: 39.923356, isOnline: 0 },
              { id: 39, lon: 116.401341, lat: 39.914723, isOnline: 1 },
              { id: 40, lon: 116.418517, lat: 39.910849, isOnline: 0 },
              { id: 41, lon: 116.418517, lat: 39.910849, isOnline: 0 },
              { id: 42, lon: 116.401054, lat: 39.924905, isOnline: 1 },
              { id: 43, lon: 116.409462, lat: 39.913617, isOnline: 0 }
            ];
            console.log(resdata);

            for (var i = 0; i < resdata.length; i++) {
              // 判断是否在线
              if (resdata[i].isOnline == 1) {
                var p1 = new BMap.Point(resdata[i].lon, resdata[i].lat);
                console.log(p1, myIcon1);

                //var marker2 = ; // 创建标注
                var marker2 = new BMap.Marker(p1, { icon: myIcon }); // 创建标注
                map.addOverlay(marker2); // 将标注添加到地图中
                //map.addOverlay(new BMap.Marker(p1, { icon: myIcon1 })); // 将标注添加到地图中
                console.log("加载在线图标111");
              } else {
                var p1 = new BMap.Point(resdata[i].lon, resdata[i].lat);
                var marker2 = new BMap.Marker(p1, { icon: myIcon1 }); // 创建标注
                map.addOverlay(marker2); // 将标注添加到地图中
                console.log("加载离线图标");
              }
            }
          });
      });

      // 编写自定义函数,创建标注
      // function addMarker(point) {
      //   var marker = new BMap.Marker(point);
      //   map.addOverlay(marker);
      // }
      // 随机向地图添加25个标注
      // var bounds = map.getBounds();
      // var sw = bounds.getSouthWest();
      // var ne = bounds.getNorthEast();
      // var lngSpan = Math.abs(sw.lng - ne.lng);
      // var latSpan = Math.abs(ne.lat - sw.lat);
      // for (var i = 0; i < 25; i++) {
      //   var point = new BMap.Point(
      //     sw.lng + lngSpan * (Math.random() * 0.7),
      //     ne.lat - latSpan * (Math.random() * 0.7)
      //   );
      //   addMarker(point);
      // }
      // var map = new BMap.Map("allmap"); // 创建地图实例
      // var point = new BMap.Point(116.403694, 39.927552); // 创建点坐标
      // map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      // map.enableScrollWheelZoom();
      // map.addControl(new BMap.NavigationControl()); //添加默认缩放平移控件
      // var customLayer;
      // function addCustomLayer(keyword) {
      //   if (customLayer) {
      //     map.removeTileLayer(customLayer);
      //   }
      //   customLayer = new BMap.CustomLayer({
      //     geotableId: 30960,
      //     q: "", //检索关键字
      //     tags: "", //空格分隔的多字符串
      //     filter: "" //过滤条件,参考http://lbsyun.baidu.com/lbs-geosearch.htm#.search.nearby
      //   });
      //   map.addTileLayer(customLayer);
      //   customLayer.addEventListener("hotspotclick", callback);
      // }
      // function callback(e) {
      //   //单击热点图层
      //   var customPoi = e.customPoi; //poi的默认字段
      //   var contentPoi = e.content; //poi的自定义字段
      //   var content =
      //     '<p style="width:280px;margin:0;line-height:20px;">地址：' +
      //     customPoi.address +
      //     "<br/>价格:" +
      //     contentPoi.dayprice +
      //     "元" +
      //     "</p>";
      //   var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
      //     title: customPoi.title, //标题
      //     width: 290, //宽度
      //     height: 40, //高度
      //     panel: "panel", //检索结果面板
      //     enableAutoPan: true, //自动平移
      //     enableSendToPhone: true, //是否显示发送到手机按钮
      //     searchTypes: [
      //       BMAPLIB_TAB_SEARCH, //周边检索
      //       BMAPLIB_TAB_TO_HERE, //到这里去
      //       BMAPLIB_TAB_FROM_HERE //从这里出发
      //     ]
      //   });
      //   var point = new BMap.Point(customPoi.point.lng, customPoi.point.lat);
      //   searchInfoWindow.open(point);
      // }
      // // document.getElementById("open").onclick = function() {
      // //   addCustomLayer();
      // // };
      // document.getElementById("open").click();
      // document.getElementById("close").onclick = function() {
      //   if (customLayer) {
      //     map.removeTileLayer(customLayer);
      //   }
      // };
      // // 创建CityList对象，并放在citylist_container节点内
      // var myCl = new BMapLib.CityList({
      //   container: "citylist_container",
      //   map: map
      // });

      //click--点击事件获取经纬度
      // map.addEventListener("click", function(e) {
      //   var lng = e.point.lng;
      //   var lat = e.point.lat;
      //   var p1 = new BMap.Point(lng, lat);
      //   console.log(lng, lat);
      //   // var marker = new BMap.Marker(p1);  // 创建标注
      //   var api = "/device/terminal/selectTerminalCoordinate";
      //   var token = localStorage.getItem("token");
      //   var myIcon = new BMap.Icon(
      //     //  "http://developer.baidu.com/map/jsdemo/img/fox.gif",
      //     "http://tomepicture.zhihuiquanyu.com/online-icon.png",
      //     new BMap.Size(30, 40)
      //   );
      //   var myIcon1 = new BMap.Icon(
      //     "http://tomepicture.zhihuiquanyu.com/offline-icon.png",
      //     new BMap.Size(30, 40)
      //   );
      //   axios
      //     .get(path + api, {
      //       headers: {
      //         Authorization: "Bearer" + token
      //       }
      //     })
      //     .then(response => {
      //       let res = response;
      //       // console.log("是否在线返回的数据", res.data.value);
      //       var resdata = res.data.value;
      //       for (var i = 1; i < resdata.length; i++) {
      //         // 判断是否在线
      //         if (resdata[i].isOnline == 1) {
      //           // var lng = e.point.resdata[i].lon
      //           // var lat = e.point.resdata[i].lat
      //           // var p1 = new BMap.point(lng,lat)
      //           // var p1 = [resdata[i].lon + "," + resdata[i].lat];
      //           // p1.push(myIcon);
      //           console.log( "加载在线图标");

      //         } else {
      //           // var p1 = [resdata[i].lon + "," + resdata[i].lat];
      //           // p1.push(myIcon1);
      //           console.log( "加载离线图标" );
      //         }
      //         var marker2 = new BMap.Marker(p1, { icon: myIcon, myIcon1 }); // 创建标注
      //         map.addOverlay(marker2); // 将标注添加到地图中
      //       }
      //     });
      // var myIcon = new BMap.Icon(
      //   "http://developer.baidu.com/map/jsdemo/img/fox.gif",
      //   // "../../../assets/images/zaixian.png",
      //   new BMap.Size(300, 157)
      // );
      // var marker2 = new BMap.Marker(p1, { icon: myIcon, myIcon1 }); // 创建标注
      // map.addOverlay(marker2); // 将标注添加到地图中
      // map.addOverlay(marker2); // 将标注添加到地图中
      // });

      // // 给城市点击时，添加相关操作
      // myCl.addEventListener("cityclick", function(e) {
      //   // 修改当前城市显示
      //   document.getElementById("curCity").innerHTML = e.name;

      //   // 点击后隐藏城市列表
      //   document.getElementById("cityList").style.display = "none";
      // });
      // // 给“更换城市”链接添加点击操作
      // document.getElementById("curCityText").onclick = function() {
      //   var cl = document.getElementById("cityList");
      //   if (cl.style.display == "none") {
      //     cl.style.display = "";
      //   } else {
      //     cl.style.display = "none";
      //   }
      // };
      // // 给城市列表上的关闭按钮添加点击操作
      // document.getElementById("popup_close").onclick = function() {
      //   var cl = document.getElementById("cityList");
      //   if (cl.style.display == "none") {
      //     cl.style.display = "";
      //   } else {
      //     cl.style.display = "none";
      //   }
      // };
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
  // body, html{
  // 		width: 100%;
  // 		height: 100%;
  // 		margin:0;
  // 		font-family:"微软雅黑";
  // 		font-size:14px;
  // 	}
  // 	#l-map {
  // 		width:100%;
  // 		height:500px;
  // 		overflow: hidden;
  // 	}
  // 	#result{
  // 		width:100%;
  // 	}
  // 	li{
  // 		line-height:28px;
  // 	}
  // 	.cityList{
  // 		height: 320px;
  // 		width:372px;
  // 		overflow-y:auto;
  // 	}
  // 	.sel_container{
  // 		z-index:9999;
  // 		font-size:12px;
  // 		position:absolute;
  // 		right:0px;
  // 		top:0px;
  // 		width:140px;
  // 		background:rgba(255,255,255,0.8);
  // 		height:30px;
  // 		line-height:30px;
  // 		padding:5px;
  // 	}
  // 	.map_popup {
  // 		position: absolute;
  // 		z-index: 200000;
  // 		width: 382px;
  // 		height: 344px;
  // 		right:0px;
  // 		top:40px;
  // 	}
  // 	.map_popup .popup_main {
  // 		background:#fff;
  // 		border: 1px solid #8BA4D8;
  // 		height: 100%;
  // 		overflow: hidden;
  // 		position: absolute;
  // 		width: 100%;
  // 		z-index: 2;
  // 	}
  // 	.map_popup .title {
  // 		background: url("http://map.baidu.com/img/popup_title.gif") repeat scroll 0 0 transparent;
  // 		color: #6688CC;
  // 		font-weight: bold;
  // 		height: 24px;
  // 		line-height: 25px;
  // 		padding-left: 7px;
  // 	}
  // 	.map_popup button {
  // 		background: url("http://map.baidu.com/img/popup_close.gif") no-repeat scroll 0 0 transparent;
  // 		cursor: pointer;
  // 		height: 12px;
  // 		position: absolute;
  // 		right: 4px;
  // 		top: 6px;
  // 		width: 12px;
  // 	}
}
</style>

