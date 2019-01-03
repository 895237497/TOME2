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
      var map = new BMap.Map("allmap"); // 创建地图实例
      var point = new BMap.Point(116.403694, 39.927552); // 创建点坐标
      map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom();
      map.addControl(new BMap.NavigationControl()); //添加默认缩放平移控件
      var customLayer;
      function addCustomLayer(keyword) {
        if (customLayer) {
          map.removeTileLayer(customLayer);
        }
        customLayer = new BMap.CustomLayer({
          geotableId: 30960,
          q: "", //检索关键字
          tags: "", //空格分隔的多字符串
          filter: "" //过滤条件,参考http://lbsyun.baidu.com/lbs-geosearch.htm#.search.nearby
        });
        map.addTileLayer(customLayer);
        customLayer.addEventListener("hotspotclick", callback);
      }
      function callback(e) {
        //单击热点图层
        var customPoi = e.customPoi; //poi的默认字段
        var contentPoi = e.content; //poi的自定义字段
        var content =
          '<p style="width:280px;margin:0;line-height:20px;">地址：' +
          customPoi.address +
          "<br/>价格:" +
          contentPoi.dayprice +
          "元" +
          "</p>";
        var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
          title: customPoi.title, //标题
          width: 290, //宽度
          height: 40, //高度
          panel: "panel", //检索结果面板
          enableAutoPan: true, //自动平移
          enableSendToPhone: true, //是否显示发送到手机按钮
          searchTypes: [
            BMAPLIB_TAB_SEARCH, //周边检索
            BMAPLIB_TAB_TO_HERE, //到这里去
            BMAPLIB_TAB_FROM_HERE //从这里出发
          ]
        });
        var point = new BMap.Point(customPoi.point.lng, customPoi.point.lat);
        searchInfoWindow.open(point);
      }
      // document.getElementById("open").onclick = function() {
      //   addCustomLayer();
      // };
      document.getElementById("open").click();
      document.getElementById("close").onclick = function() {
        if (customLayer) {
          map.removeTileLayer(customLayer);
        }
      };
      // 创建CityList对象，并放在citylist_container节点内
      var myCl = new BMapLib.CityList({
        container: "citylist_container",
        map: map
      });

      //var ary = new Array();
      //arylist = result.split(";");
      //for (var i = 0; i < arylist.length; i++) {
      //    var strary = new Array();
      //    strary = arylist[i].split(",");
      //    var poi = new BMap.Point(strary[2], strary[3]);
      //    map.centerAndZoom(poi, 20);
      //    var myIcon = new BMap.Icon("/img/heart.png", new BMap.Size(35, 35));
      //    if (strary[7] == '1') {
      //        myIcon = new BMap.Icon("/img/mark_b3.png", new BMap.Size(35, 35));
      //    }
      //    else {
      //        myIcon = new BMap.Icon("/img/mark_gray3.png", new BMap.Size(35, 35));
      //    }
      //    var marker = new BMap.Marker(poi, { icon: myIcon });
      //    map.addOverlay(marker);

      //    var infoWindow = new BMap.InfoWindow(getInfoContent(strary[5].replace(/%/g, ","), strary[4], strary[1], strary[6], strary[0], strary[7], strary[9], strary[10], strary[11]), { width: 128 });
      //    marker.openInfoWindow(infoWindow, poi);
      //    (function () {
      //        var infoWindow = new BMap.InfoWindow(getInfoContent(strary[5].replace(/%/g, ","), strary[4], strary[1], strary[6], strary[0], strary[7], strary[9], strary[10], strary[11]), { width: 128 });
      //        marker.addEventListener("click", function (e) { this.openInfoWindow(infoWindow, e.point); });
      //    })();
      //}

      //click--点击事件获取经纬度
      map.addEventListener("click", function(e) {
        var lng = e.point.lng;
        var lat = e.point.lat;
        var p1 = new BMap.Point(lng, lat);
        // var marker = new BMap.Marker(p1);  // 创建标注
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
            let res = response;
            console.log("是否在线返回的数据", res.data.value);

            var resdata = res.data.value;
            for (var i = 0; i < resdata.length; i++) {
              if (resdata[i].isOnline === 1) {
                // console.log("lon:", resdata[i].lon, ",lat:" + resdata[i].lat);
                console.log("加载在线图标");
                myIcon;
              } else {
                console.log("加载离线图标");
                myIcon;
              }
            }
          });
        // var myIcon = new BMap.Icon(
        //   "http://developer.baidu.com/map/jsdemo/img/fox.gif",
        //   // "../../../assets/images/zaixian.png",
        //   new BMap.Size(300, 157)
        // );
        var marker2 = new BMap.Marker(p1, { icon: myIcon, myIcon1 }); // 创建标注
        map.addOverlay(marker2); // 将标注添加到地图中
        // map.addOverlay(marker2); // 将标注添加到地图中
      });

      // 给城市点击时，添加相关操作
      myCl.addEventListener("cityclick", function(e) {
        // 修改当前城市显示
        document.getElementById("curCity").innerHTML = e.name;

        // 点击后隐藏城市列表
        document.getElementById("cityList").style.display = "none";
      });
      // 给“更换城市”链接添加点击操作
      document.getElementById("curCityText").onclick = function() {
        var cl = document.getElementById("cityList");
        if (cl.style.display == "none") {
          cl.style.display = "";
        } else {
          cl.style.display = "none";
        }
      };
      // 给城市列表上的关闭按钮添加点击操作
      document.getElementById("popup_close").onclick = function() {
        var cl = document.getElementById("cityList");
        if (cl.style.display == "none") {
          cl.style.display = "";
        } else {
          cl.style.display = "none";
        }
      };
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
    console.log("sdfsd", this.personCount[0].value[1]);
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

