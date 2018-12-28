<template>
  <div id="content">
    <!-- 左边菜单 -->
    <div class="left">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <!-- <el-radio-button :label="false"><img src="../../assets/images/dianji.png"/></el-radio-button> -->
        <el-radio-button :label="true">
          <img src="../../assets/images/dianji.png">
        </el-radio-button>
      </el-radio-group>
      <!-- <ul v-for="(list,index) in lists">
              <span></span>
             <li>{{list.name}}</li>
      </ul>-->
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        theme="dark"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="icon iconfont icon-shouye"></i>
            <span>首页</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/TestMap">首页</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="icon iconfont icon-jingqu"></i>
            <span>景区服务商</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/SpotService">景区服务商</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="icon iconfont icon-shouji"></i>
            <span>设备管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Management">设备信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="icon iconfont icon-wifi"></i>
            <span>发射源管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Emitters">发射源统计</el-menu-item>
            <el-menu-item index="/MachineCount">机器码统计</el-menu-item>
            <el-menu-item index="/EmittersLog">发射源访问日志</el-menu-item>
            <el-menu-item index="/EmittersCount">发射源</el-menu-item>
            <el-menu-item index="/Place">位置版</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="icon iconfont icon-shujutongjiweixuanzhong"></i>
            <span>数据统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/PlantLeasing">设备租赁次数统计表</el-menu-item>
            <el-menu-item index="/Sos">SOS统计</el-menu-item>
            <el-menu-item index="/PeopleCounting">客流统计</el-menu-item>
            <el-menu-item index="/Fence">电子围栏统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="icon iconfont icon-update"></i>
            <span>设备升级</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Promotion">升级情况</el-menu-item>
            <el-menu-item index="/PromotionLog">升级日志</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="icon iconfont icon-zhanghao00"></i>
            <span>账号分配</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/AccountManage">账号管理</el-menu-item>
            <el-menu-item index="/Role">角色分配</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <!-- 右边内容 -->
    <div class="right">
      <div class="con">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/font/iconfont.css";
export default {
  name: "Menu",
  data() {
    return {
      isCollapse: true,
      lists: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
  // mounted() {
  //   var token = localStorage.getItem("token");
  //   //alert(token)
  //   var _this = this;
  //   //var access_token=this.access_token
  //   var access_token = "58a38873-7471-4104-baca-b07884447136 ";
  //   axios
  //     .get("http://192.168.0.39:8080/manager/me", {
  //       headers: {
  //         Authorization: "Bearer" + token
  //       }
  //     })
  //     .then(response => {
  //       console.log(response);
  //       if (response.data.resultStatus.resultCode === "0000") {
  //         return (this.lists = response.data.value);
  //       }
  //     });
  // }
};
</script>
<style lang="less">
#content {
  display: flex;
  width: 100%;
  height: 100%;
  
  .left {
    width: 12%;
    height: 100%;
    border-bottom: none;
    border-right: 1px solid #ffe6c9;
    box-shadow: #ffe6c9 8px 2px 4px;
      .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 90%;
    min-height: 400px;
    border: none;
  }
    .el-tree-node__label {
      font-size: 20px;
      color: #ff6600;
    }
    .el-submenu__title {
      font-size: 16px;
      color: #7e7876;
    }
    .icon {
      color: #ff6600;
    }
    .el-radio-button__inner {
      border: none;
      position: relative;
      width: 20px;
      height: 24px;
      margin-left: 164px;
      margin-top: 16px;
      background: none;
      border: none;
      img {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 15px;
        left: 34px;
      }
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      box-shadow: -1px 0 0 0 #ccc;
    }
    .el-submenu .el-menu-item {
      color: #ff6600;
      background: #fcf8f9;
      &:focus{
        width: 100%;
        height: 50px;
        background: bisque;
      }
    }
  }
  .right {
    width: 88%;
    flex: 1;
    // display: flex;
    background: #f9f8f4;
    .con {
      width: 96%;
      height: 100%;
      background: #fff;
      margin-top: 20px;
      margin-left: 20px;
    }
  }
 
}
</style>
