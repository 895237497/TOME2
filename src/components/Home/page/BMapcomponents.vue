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
      <span>当天人流量</span>
      <p></p>
    </div>
  </div>
</template>
<script>
import { MP } from "./map.js";
import BMap from "BMap";
import { path } from "../../../api/api.js";
export default {
  data() {
    return {
      sum: ""
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

        //click--点击事件获取经纬度
        map.addEventListener("click",function(e){
                    var lng = e.point.lng;
                    var lat = e.point.lat;
                    var p1 = new BMap.Point(lng, lat);
                    // var marker = new BMap.Marker(p1);  // 创建标注
                      var myIcon = new BMap.Icon(
            "http://developer.baidu.com/map/jsdemo/img/fox.gif",
            new BMap.Size(300, 157)
          );
          var marker2 = new BMap.Marker(p1, { icon: myIcon }); // 创建标注
          map.addOverlay(marker2); // 将标注添加到地图中
                    map.addOverlay(marker2);              // 将标注添加到地图中
        })

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

    // 查询设备总数和在线数量
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
    // this.$nextTick(function(init) {
    //   var _this = this;
    //   MP(_this.ak).then(BMap => {
    //     //在此调用api
    //     this.map();
    //   });
    // });
    this.finddevicecount();
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
  }
  .count {
    width: 500px;
    height: 150px;
    // border: solid 1px #ccc;
    position: absolute;
    top: 40px;
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
    top: 220px;
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
    p {
      background: #fbfbfbc7;
      height: 270px;
      font-size: 30px;
      // line-height: 120px;
    }
  }
}

body, html{
			width: 100%;
			height: 100%;
			margin:0;
			font-family:"微软雅黑";
			font-size:14px;
		}
		#l-map {
			width:100%; 
			height:500px;
			overflow: hidden;
		}
		#result{
			width:100%;
		}
		li{
			line-height:28px;
		}
		.cityList{
			height: 320px;
			width:372px;
			overflow-y:auto;
		}
		.sel_container{
			z-index:9999;
			font-size:12px;
			position:absolute;
			right:0px;
			top:0px;
			width:140px;
			background:rgba(255,255,255,0.8);
			height:30px;
			line-height:30px;
			padding:5px;
		}
		.map_popup {
			position: absolute;
			z-index: 200000;
			width: 382px;
			height: 344px;
			right:0px;
			top:40px;
		}
		.map_popup .popup_main { 
			background:#fff;
			border: 1px solid #8BA4D8;
			height: 100%;
			overflow: hidden;
			position: absolute;
			width: 100%;
			z-index: 2;
		}
		.map_popup .title {
			background: url("http://map.baidu.com/img/popup_title.gif") repeat scroll 0 0 transparent;
			color: #6688CC;
			font-weight: bold;
			height: 24px;
			line-height: 25px;
			padding-left: 7px;
		}
		.map_popup button {
			background: url("http://map.baidu.com/img/popup_close.gif") no-repeat scroll 0 0 transparent;
			cursor: pointer;
			height: 12px;
			position: absolute;
			right: 4px;
			top: 6px;
			width: 12px;
		}	
</style>

