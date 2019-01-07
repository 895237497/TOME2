<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <img src="../../../assets/images/logo.png" alt srcset>
          <span>智 慧 全 域</span>

          <div class="carousel">
            <el-carousel :interval="5000"  height="60px">
              <el-carousel-item v-for="item in scenic" :key="item.name">
                <h5>{{ item.name }} {{item.guest}} , {{item.msg}} {{item.count}}</h5>
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="box">
            <span class="active">{{username}}</span>
            <span @click="backToLogin">退出</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
import { path } from "../../../api/api.js";
export default {
  name: "Header",
  data() {
    return {
      username: "",
      scenic:[
        {name:'青城山今日客流量：',guest:'6428 ',msg:"青城山今日人次：",count:"12000次"},
        {name:'武当山今日客流量：',guest:'1160 ',msg:"武当山今日人次：",count:"7623次"},
        {name:'圆明园今日客流量：',guest:'2973 ',msg:"圆明园今日人次：",count:"6597次"},
        {name:'武夷山今日客流量：',guest:'3500 ',msg:"武夷山今日人次：",count:"8266次"},
        {name:'龙宫今日客流量：',guest:'7921 ',msg:"龙宫今日人次：",count:"14305次"},
        {name:'九皇山今日客流量：',guest:'8375 ',msg:"九皇山今日人次：",count:"17032次"},
        {name:'火焰山今日客流量：',guest:'650 ',msg:"火焰山今日人次：",count:"3726次"},
        {name:'望江楼今日客流量：',guest:'7933 ',msg:"望江楼今日人次：",count:"10268次"},
        {name:'老牛湾今日客流量：',guest:'2706 ',msg:"老牛湾今日人次：",count:"6729次"},
        {name:'稻城亚丁今日客流量：',guest:'1139 ',msg:"稻城亚丁今日人次：",count:"4831次"},
        {name:'香格里拉今日客流量：',guest:'8762 ',msg:"香格里拉今日人次：",count:"12138次"},
        {name:'虎跳峡今日客流量：',guest:'16211 ',msg:"虎跳峡今日人次：",count:"2064次"},
        {name:'熊猫基地今日客流量：',guest:'3790 ',msg:"熊猫基地今日人次：",count:"7103次"},
        {name:'阆中古城今日客流量：',guest:'4900 ',msg:"阆中古城今日人次：",count:"8087次"},
        {name:'乐山大佛今日客流量：',guest:'10354 ',msg:"乐山大佛今日人次：",count:"10672次"},
        {name:'乌龙峡今日客流量：',guest:'267 ',msg:"乌龙峡今日人次：",count:"4530次"},
      ]
    };
  },
  methods: {
    backToLogin() {
      var api = "/sys/logout";
      var _this = this;
      var token = localStorage.getItem("token");
      this.$axios
        .get(path + api, {
          headers: {
            Authorization: "Bearer" + token
          }
        })
        .then(response => {
          console.log(response, "退出获取到的东西·····");

          if (response.data.resultStatus.resultCode === "0000") {
            console.log("退出登录");
          }
        });
    }
  },
  mounted() {
    var token = localStorage.getItem("token");
    //alert(token)
    var _this = this;
    var api = "/user/current";
    //var access_token=this.access_token
    var access_token = _this.token;
    axios
      .get(path + api, {
        headers: {
          Authorization: "Bearer" + token
        }
      })
      .then(response => {
        console.log(response);
        return (_this.username = response.data.username);
      });
  }
};
</script>

<style lang="less">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #fff;
  border-bottom: 1px #ffe6c9 solid;
  box-shadow: #ffe6c9 5px 2px 6px;
  position: relative;
  img {
    //   margin-top: 8px;
    margin-left: 20px;
  }
  span {
    display: inline-block;
    font-size: 26px;
    color: #ff6600;
    font-weight: 500;
    margin-top: 12px;
    margin-left: 20px;
  }
  .me {
    display: inline-block;
    width: 34px;
    height: 34px;
    border: 1px solid #ccc;
    border-radius: 13px;
  }
  .box {
    position: absolute;
    top: 12px;
    right: 60px;
    span {
      cursor: pointer;
      display: inline-block;
      font-size: 12px;
      color: #888;
      &.active {
        color: #ff6600;
      }
    }
  }
  .el-carousel__container {
    height: 30px;
    color: #f31f31;
  }
  .carousel {
    width: 65%;
    height: 50px;
    margin-top: 5px;
    position: absolute;
    top: 0px;
    left: 300px;
    .el-carousel__item.is-active{
      text-align: center;
      line-height: 50px;
    }
  }
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 60px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

