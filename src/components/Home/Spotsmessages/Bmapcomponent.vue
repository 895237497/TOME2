<template>
  <div id="allmap" ref="allmap"></div>
</template>

<script>
import { MP } from "./map.js";
import BMap from "BMap";
export default {
  data() {
    return {};
  },
  methods: {
    //  百度地图
    map() {
      let _this = this;
      let map = new BMap.Map(this.$refs.allmap); // 创建Map实例
      let geoc = new BMap.Geocoder(); //地址解析对象
      let markersArray = [];
      let geolocation = new BMap.Geolocation();
      let point = new BMap.Point(116.404412, 39.914714);
      map.centerAndZoom(point, 12); // 中心点
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            let mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            map.enableScrollWheelZoom(true);
          }
        },
        {
          enableHighAccuracy: true
        }
      );
      map.addEventListener("click", showInfo);

      //清除标识
      function clearOverlays() {
        if (markersArray) {
          for (let i in markersArray) {
            map.removeOverlay(markersArray[i]);
          }
        }
      }
      //地图上标注
      function addMarker(point) {
        let marker = new BMap.Marker(point);
        markersArray.push(marker);
        clearOverlays();
        map.addOverlay(marker);
      }
      //点击地图时间处理
      function showInfo(e) {
        _this.$emit("lngLat", { lng: e.point.lng, lat: e.point.lat });
        // _this.lnglot = _this.$emit("lngLat", { lng: e.point.lng, lat: e.point.lat });
        console.log(e);
       
        console.log("经度:" + e.point.lng, "纬度:" + e.point.lat, markersArray);
        geoc.getLocation(e.point, function(rs) {
          let addComp = rs.addressComponents;
          let address =
            addComp.province +
            addComp.city +
            addComp.district +
            addComp.street +
            addComp.streetNumber;
          // if (confirm("确定要地址是" + address + "?")) {
          // document.getElementById('allmap').style.display = 'none';
          // document.getElementById('address').value = address;
          // }
        });
        addMarker(e.point);
      }
    }
  },
  mounted() {
    this.map();
  }
};
</script>

<style lang="less">
#allmap {
  width: 100%;
  height: 100%;
}

</style>
