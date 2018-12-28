<template>
  <el-row
    style="margin: 34px 0 47px 89px;font:'microsoft yahei' 18px/32px ;"
    v-if="showTools.tools"
  >
    <div style="display: inline;margin-right: 84px;" v-if="showTools.no">
      <span style="margin-right: 18px;">发射源编号</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入发射源编号"
        v-model="sform.no"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.codeMachine">
      <span style="margin-right: 18px;">机器码</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入机器码"
        v-model="sform.codeMachine"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.line">
      <span style="margin-right: 18px;">线路名称</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入线路名称"
        v-model="sform.line"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.username">
      <span style="margin-right: 18px;">景点名称</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入景点名称"
        v-model="sform.name"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.mold">
      <span style="margin-right: 18px;">线路类型</span>
      <!-- <el-select  size="small" v-model="sform.type" placeholder="请输入线路类型">
				    <el-option st
				      v-for="item in scenerylistquery"
				      :key="item.id"
				      :label="item.name"
				      :value="item.sceneryId">
				    </el-option>
      </el-select>-->
      <select
        v-model="sform.type"
        aria-placeholder="请选择线路类型···"
        style="width:160px;height:36px;border:1px solid #e5e5e5;border-radius:6px"
      >
        <option value="1">出境游</option>
        <option value="2">短途游</option>
        <option value="3">长途游</option>
      </select>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.isAllot">
      <span style="margin-right: 18px;">分配状态</span>
      <!-- <el-select  size="small" v-model="sform.isAllot" placeholder="请选择景区·····">
				    <el-option st
				      v-for="item in isAllot"
				      :key="item.id"
				      :label="item.name"
				      :value="item.sceneryId">
				    </el-option>
      </el-select>-->
      <select
        v-model="sform.isAllot"
        style="width:140px;height:30px;border:1px solid #e5e5e5;border-radius:6px;outline:none"
      >
        <option value="0">未分配</option>
        <option value="1">已分配</option>
      </select>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.imei">
      <span style="margin-right: 18px;">设备IMEI</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入设备IMEI号"
        v-model="sform.imei"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.telephone">
      <span style="margin-right: 18px;">手机号</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入手机号"
        v-model="sform.telephone"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.usename">
      <span style="margin-right: 18px;">姓名</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入姓名"
        v-model="sform.name"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.cardnum">
      <span style="margin-right: 18px;">证件号码</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入证件号码"
        v-model="sform.credentialsNumber"
        clearable
      ></el-input>
    </div>

    <!-- <div style="display: inline;margin-right: 84px;" v-if="showTools.device" >
 				<span style="margin-right: 18px;">设备号</span>
 				<el-input style="display: inline-block;" size="small"
				  placeholder="请输入设备号"
				  v-model="sform.device"
				  clearable>
				</el-input>
    </div>-->
    <div style="display: inline;margin-right: 84px;" v-if="showTools.version">
      <span style="margin-right: 18px;">版本号</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入版本"
        v-model="sform.version"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.mobile">
      <span style="margin-right: 18px;">电话</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入电话"
        v-model="sform.mobile"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.sex">
      <span style="margin-right: 18px;">性别</span>
      <!-- <el-select  size="small" v-model="sform.isAllot" placeholder="请选择景区·····">
				    <el-option st
				      v-for="item in isAllot"
				      :key="item.id"
				      :label="item.name"
				      :value="item.sceneryId">
				    </el-option>
      </el-select>-->
      <select
        v-model="sform.sex"
        style="width:140px;height:30px;border:1px solid #e5e5e5;border-radius:6px;outline:none"
      >
        <option value="1">男</option>
        <option value="2">女</option>
      </select>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.terminal">
      <span style="margin-right: 18px;">终端</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入终端imei号"
        v-model="sform.terminal"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.name">
      <span style="margin-right: 18px;">名称</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入名称"
        v-model="sform.name"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.loginname">
      <span style="margin-right: 18px;">登录名</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入登录名"
        v-model="sform.loginname"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.role">
      <span style="margin-right: 18px;">角色</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入角色"
        v-model="sform.role"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.travel">
      <span style="margin-right: 18px;">行程名称</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入行程名称"
        v-model="sform.travel"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.scenery">
      <span style="margin-right: 18px;">景区</span>
      <!-- <el-select  size="small" v-model="sform.scenery" placeholder="请选择景区·····">
				    <el-option st
				      v-for="item in scenerylistquery"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
      </el-select>-->
      <el-select v-model="sform.scenery" size="small" filterable placeholder="请选择景区·····">
        <el-option
          v-for="item in scenerylistquery"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.genre">
      <span style="margin-right: 18px;">类型</span>
      <el-select size="small" v-model="sform.genre" placeholder="请选择类型···">
        <el-option
          v-for="item in scenerylistquery"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.service">
      <span style="margin-right: 18px;">服务类型</span>
      <el-select size="small" v-model="sform.service" placeholder="请选择类型···">
        <el-option
          v-for="item in scenerylistquery"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.group">
      <span style="margin-right: 18px;">旅游团</span>
      <el-select size="small" v-model="sform.touristTeamName" placeholder="请选择旅游团···">
        <el-option
          st
          v-for="item in scenerylistquery"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.group">
      <span style="margin-right: 18px;">旅游团</span>
      <el-input
        style="display: inline-block;"
        size="small"
        placeholder="请输入角色"
        v-model="sform.touristTeamName"
        clearable
      ></el-input>
    </div>

    <div style="display: inline;margin-right: 84px;" v-if="showTools.date">
      <span style="margin-right: 18px;">日期</span>
      <el-date-picker size="small" v-model="sform.startTime" type="date" placeholder="开始日期"></el-date-picker>
      <el-date-picker size="small" v-model="sform.endTime" type="date" placeholder="结束日期"></el-date-picker>
    </div>

    <div style="display: inline;margin-left: 70px;">
      <el-button size="small" style="background: #FA841A;color: white; " @click="query">查询</el-button>
      <el-button size="small" @click="resetForm">重置</el-button>
      <el-button size="small" @click="query">刷新</el-button>
    </div>
  </el-row>
</template>

<script>
import axios from "axios";
import common from "../common/common.js";
import { path } from "../../api/api.js";
export default {
  name: "tools_vue",
  data() {
    return {
      showToolrs: false,
      showRFID: true,
      sform: {
        no: "",
        codeMachine: "",
        line: "",
        // username:'',
        type: "",
        isAllot: "",
        imei: "",
        telephone: "",
        name: "",
        credentialsNumber: "",
        version: "",
        mobile: "",
        sex: "",
        terminal: "",
        name: "",
        loginname: "",
        role: "",
        travel: "",
        scenery: "",
        genre: "",
        service: "",
        touristTeamName: "",
        startTime: "",
        endTime: ""
      }
    };
  },
  props: ["scenerylistquery", "showTools"],
  methods: {
    query() {
      var ssform = this.sform;
      var formdata = {};
      var scenerylist = this.scenerylistquery;
      var isAllot = this.isAllot;

      //封装表单数据
      for (var att in ssform) {
        if (ssform[att] != "undefined" && ssform[att] !== "") {
          if (att.endsWith("Time")) {
            if (
              ssform[att] != null &&
              ssform[att] != undefined &&
              ssform[att] !== ""
            ) {
              formdata[att] = ssform[att].getTime();
            }
          } else {
            formdata[att] = ssform[att];
          }
        }
      }

      //将searchForm传递给父组件
      this.$emit("search", formdata);
    },
    resetForm() {
      var ssform = this.sform;
      var resetfrom = {};
      for (var att in ssform) {
        resetfrom.att = "";
      }
      this.queryTime = "";
      this.sform = resetfrom;
    },
   
  },
  watch: {},
  activated() {},
  mounted() {}
};
</script>
<style type="text/css">
.el-date-editor .el-range__icon {
  color: #ff6600;
}
.check-left {
  margin-right: 18px;
}

.el-input__icon {
  color: #ff6600;
}

.el-input__icon {
  color: #ff6600;
}

/*section .el-input__inner{
    	width: 150px;
    }*/
.el-row .el-input {
  width: 150px;
}
.el-button--small,
.el-button--small.is-round {
  margin-top: 15px;
}
/*.el-input__inner{
		width: 150px;
	}*/
</style>