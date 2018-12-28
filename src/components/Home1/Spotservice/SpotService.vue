<template>
  <div id="Emitters">
    <ComTable
      :contenttitl="contenttitl"
      :showTools="showTools"
      :showRFID="showRFID"
      :tableitems="tableitems"
      :queryapi="queryapi"
      :showScenery="showScenery"
      :showImg="showImg"
      :showQueryDate="showQueryDate"
      :scenerylistquery="scenerylistquery"
      :showShutDown="showShutDown"
      :showImport="showImport"
      :showExport="showExport"
      :showDel="showDel"
      :showAdd2="showAdd2"
      :showAdd="showAdd"
      :delapi="delapi"
      :showresetButton="showresetButton"
      v-on:search="onSearch"
      v-on:addData2="addData2"
      v-on:editData="editData"
      ref="tumitable"
    />

    <!--发射源添加-->
    <el-dialog title :visible.sync="addVisible" style width="520px" :close-on-click-modal="false">
      <div
        style="margin:-30px 0 6px 29px;font: 18px '微软雅黑';border-left: 4px solid #F98319;padding-left: 9px;color:#FEA062 ;"
      >新增</div>
      <el-form
        :model="addForm"
        ref="addForm"
        label-width="100px"
        :rules="addFormRules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="景区服务商" prop="name">
          <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入景区"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="通讯地址" prop="address">
          <el-input v-model="addForm.address" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="负责人姓名" prop="chargeName">
          <el-input v-model="addForm.chargeName" autocomplete="off" placeholder="请填写负责人姓名"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="负责人电话" prop="chargeTelephone">
          <el-input v-model="addForm.chargeTelephone" autocomplete="off" placeholder="请填写负责人电话"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="经纬度" prop="lonLat">
          <el-input v-model="addForm.lonLat" autocomplete="off" placeholder="获取当前经纬度"></el-input>
          <span class="gain">获取</span>
        </el-form-item>
        <div class="map">
          <bmapcomponent @lngLat="getlngLat"/>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearData" size="small">清空</el-button>
        <el-button type="primary" style="background: #FA841A;" size="small" @click="save">保存</el-button>
      </span>
    </el-dialog>

    <!--发射源修改-->
    <el-dialog title :visible.sync="editVisible" style width="520px" :close-on-click-modal="false">
      <div
        style="margin:-30px 0 6px 29px;font: 18px '微软雅黑';border-left: 4px solid #F98319;padding-left: 9px;color:#FEA062 ;"
      >编辑</div>
      <el-form
        :model="editForm"
        ref="addForm"
        label-width="100px"
        :rules="addFormRules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="景区服务商" prop="name">
          <el-input v-model="editForm.name" autocomplete="off" placeholder="请输入景区"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="通讯地址" prop="address">
          <el-input v-model="editForm.address" autocomplete="off" placeholder="请输入地址"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="负责人姓名" prop="chargeName">
          <el-input v-model="editForm.chargeName" autocomplete="off" placeholder="请填写负责人姓名"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="负责人电话" prop="chargeTelephone">
          <el-input v-model="editForm.chargeTelephone" autocomplete="off" placeholder="请填写负责人电话"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="经纬度" prop="lonLat">
          <el-input v-model="editForm.lonLat" autocomplete="off" placeholder="获取当前经纬度"></el-input>
          <span class="gain">获取</span>
        </el-form-item>
        <div class="map">
          <bmapcomponent @lngLat="getlngLat"/>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="clearData" size="small">清空</el-button>-->
        <el-button type="primary" style="background: #FA841A;" size="small" @click="update">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ComTable from "../../ComTable";
import common from "../../common/common.js";
import { path } from "../../../api/api";
import Bmapcomponent from "./Bmapcomponent.vue";
import { MP } from "./map.js";

export default {
  components: {
    ComTable,
    Bmapcomponent
  },
  data() {
    //自定义校验，播报半径校验，正整数
    var chargeTelephone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      contenttitl: {
        name: "景区服务商",
        // description:'升级日志',
        tabledesctiption: "共有景区",
        unit: "个"
      },
      queryapi: "/scenery/scenery/selectScenery",
      delapi: "/scenery/scenery/deleteSceneryBath",
      saveapi: "/scenery/scenery/addScenery",
      updateapi: "/scenery/scenery/updateScenery",
      scenerySpotId: "",
      editVisible: false,
      addForm: {
        name: "",
        address: "",
        chargeName: "",
        chargeTelephone: "",
        lonLat: "",
        id: "",
        name: ""
      },
      editForm: {
        name: "",
        address: "",
        chargeName: "",
        chargeTelephone: "",
        // type:1,
        id: "",
        lonLat: ""
      },
      showAdd: false,
      numberValidateForm: {
        age: ""
      },
      addVisible: false,
      showQueryDate: true,
      showImg: true,
      showresetButton: true,
      showImport: true,
      showExport: true,
      showDel: true,
      showAdd2: true,
      showShutDown: true,
      fridtype: 1,
      showTools: {
        tools: true,
        // codeMachine:true,
        // device:true,
        // version:true,
        scenery: true
        // date:true,
      },
      showRFID: true,
      showScenery: true,
      scenerylist: [],
      sceneryspotlist: [],
      scenerylistquery: [],
      sceneryspoteditlist: [],
      tableitems: [
        // {
        //     hasSubs: false,
        //     subs: [
        //       {
        //         label: "发射源id",
        //         prop: "id",
        //         width: "100",
        //         type: "number",
        //         editable: true,
        //         searchable: true,
        //         addable: true,
        //         hidden:true,
        //         unsortable: true,
        //         align: "center"
        //       }
        //     ]
        //  },
        // {
        //   hasSubs: false,
        //   subs: [
        //     {
        //       label: "发射源编号",
        //       prop: "no",
        //       width: "100",
        //       type: "number",
        //       editable: true,
        //       searchable: true,
        //       addable: false,
        //       unsortable: true,
        //       align: "center"
        //     }
        //   ]
        // },
        {
          hasSubs: false,
          subs: [
            {
              label: "景区服务商",
              prop: "name",
              width: "160",
              type: "selection",
              selectlist: [{}, {}],
              editable: true,
              searchable: true,
              addable: true,
              unsortable: true,
              align: "center"
            }
          ]
        },
        {
          hasSubs: false,
          subs: [
            {
              label: "设备总数",
              prop: "terminalTotalNum",
              width: "160",
              type: "number",
              editable: true,
              searchable: true,
              addable: true,
              unsortable: true,
              align: "center"
            }
          ]
        },

        {
          hasSubs: false,
          subs: [
            {
              label: "在线总数",
              prop: "onLineTerminalTotalNum",
              width: "160",
              type: "number",
              editable: true,
              searchable: true,
              addable: true,
              unsortable: true,
              align: "center"
            }
          ]
        },
        {
          hasSubs: false,
          subs: [
            {
              label: "离线总数",
              prop: "offLineTerminalTotalNum",
              width: "160",
              type: "selection",
              selectlist: [{}, {}],
              editable: true,
              searchable: true,
              addable: true,
              unsortable: true,
              align: "center"
            }
          ]
        },
        {
          hasSubs: false,
          subs: [
            {
              label: "负责人姓名",
              prop: "chargeName",
              width: "160",
              type: "number",
              editable: true,
              searchable: true,
              addable: true,
              unsortable: true,
              align: "center"
              // format: function (row) {
              //     return row.lon +","+row.lat;
              // }
            }
          ]
        },
        {
          hasSubs: false,
          subs: [
            {
              label: "景区id",
              prop: "sceneryId",
              width: "200",
              type: "number",
              editable: true,
              hidden: true,
              searchable: true,
              addable: true,
              unsortable: true,
              align: "center"
            }
          ]
        },
        {
          hasSubs: false,
          subs: [
            {
              label: "景点id",
              prop: "scenerySpotId",
              width: "200",
              type: "number",
              editable: true,
              searchable: true,
              hidden: true,
              addable: true,
              unsortable: true,
              align: "center"
            }
          ]
        },
        {
          hasSubs: false,
          subs: [
            {
              label: "负责人电话",
              prop: "chargeTelephone",
              width: "160",
              type: "date",
              editable: false,
              searchable: true,
              addable: false,
              unsortable: true,
              align: "center"
              // format:function(row){
              // 	return common.dateformat(row.createTime);
              // }
            }
          ]
        },
        {
          hasSubs: false,
          subs: [
            {
              label: "通讯地址",
              prop: "address",
              width: "168",
              type: "date",
              editable: false,
              searchable: true,
              addable: false,
              unsortable: true,
              align: "center"
              // format:function(row){
              // 	return common.dateformat(row.createTime);
              // }
            }
          ]
        }
      ],
      addFormRules: {
        name: [{ required: true, message: "请输入景区名称", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        // radius: [
        //   { validator: validatePass,required: true, trigger: 'blur' }
        // ],
        chargeName: [
          { required: true, message: "请输入负责人姓名", trigger: "blur" }
        ],
        chargeTelephone: [
          {
            required: true,
            validator: chargeTelephone,

            trigger: "blur"
          }
        ],
        lonLat: [
          {
            type: "number",
            required: true,
            message: "请输入合法经度，例如111.123456",
            trigger: "blur"
          }
        ]
        // lat: [
        //   {type:'number', required: true, message: '请输入合法纬度，例如39.123456', trigger: 'blur' }
        // ]
      },
      row: ""
    };
  },
  methods: {
    getlngLat(lngLat) {
      var _this = this;
      _this.addForm.lonLat = lngLat.lng + "," + lngLat.lat;
      _this.editForm.lonLat = lngLat.lng + "," + lngLat.lat;
    },
    //修改
    update() {
      var _this = this;
      var sform = this.editForm;
      sform.type = 1;
      var token = localStorage.getItem("token");
      console.log("update...............................");
      console.log(sform);
      var api = this.updateapi;
      common.commonUpdateByPost(path + api, sform, token, function() {
        _this.refreshTable();
        _this.editVisible = false;
      });
    },
    //编辑
    editData(row) {
      this.row = row;
      var _this = this;

      //根据当前景区id获取景点信息

      //清空editForm
      common.clearattribute(_this.editForm);

      //复制row到editForm
      common.copyattribute(_this.editForm, row);

      this.editForm.lonLat = row.lon + "," + row.lat;

      //显示编辑页面
      this.editVisible = true;
    },
    //刷新表格
    refreshTable() {
      this.$refs["tumitable"].refreshTable();
      this.addVisible = false;
    },
    save() {
      var sform = this.addForm;
      var token = localStorage.getItem("token");
      var _this = this;
      var api = this.saveapi;
      common.commonUploadByPost(path + api, sform, token, function() {
        _this.refreshTable();
      });
    },
    clearData() {
      var _this = this;
      //清空editForm
      common.clearattribute(_this.addForm);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addData2() {
      this.addVisible = true;
    },
    showSetting: function(name) {
      alert("hello:" + name);
    },
    getSceneryList() {
      var token = localStorage.getItem("token");

      //alert(token)
      var _this = this;

      this.$axios
        .post(
          path + "/scenery/scenery/selectSceneryIdAndName",
          {},
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        )
        .then(function(response) {
          let data = response.data.value;

          let scenerylist = data.slice();

          _this.scenerylist = scenerylist;

          //data.push({id: 0, name: "查询全部"})
          data.splice(0, 0, { id: 0, name: "查询所有" });
          _this.scenerylistquery = data;

          //获取表格数据
          _this.getTableData({});
        });
    },
    onSearch(sform) {
      // sform.type=this.fridtype;

      this.getTableData(sform);
    },
    getTableData(sform) {
      var _scenerylist = this.scenerylist;
      var sceneryIds = [];
      //查询全部
      if (sform.sceneryIdId === undefined || sform.sceneryIdId == 0) {
        for (var i = 0; i < _scenerylist.length; i++) {
          sceneryIds.push(_scenerylist[i].id);
        }
      } else {
        sceneryIds.push(sform.sceneryIdId);
      }

      //获取表格数据
      // sform.type = this.fridtype;
      // sform.sceneryIds=sceneryIds

      this.$refs["tumitable"].getTableData(sform);
    }

    // 百度地图
  },

  activated() {},
  mounted() {
    //查询景区服务商并并获取表格数据
    this.getSceneryList();
  },
  watch: {
    "addForm.sceneryId": function sceneryId() {
      //通过检测景区id的修改查询景点id
      var api = "/scenery/webdata/getsceneryspotbysceneryid";
      let token = localStorage.getItem("token");
      let sform = {
        sceneryId: this.addForm.sceneryId
      };
      var vm = this;
      this.addForm.scenerySpotId = "";

      common.commonPost(path + api, sform, token, function(data) {
        vm.sceneryspotlist = data.value;
      });
    },
    "editForm.sceneryId": function sceneryId(value) {
      //alert(value != )

      if (this.row.sceneryId == value) {
        this.editForm.scenerySpotId = this.row.scenerySpotId;
      } else {
        this.editForm.scenerySpotId = "";
      }
      //通过检测景区id的修改查询景点id
      var api = "/scenery/webdata/getsceneryspotbysceneryid";
      let token = localStorage.getItem("token");
      let sform = {
        sceneryId: this.editForm.sceneryId
      };
      var vm = this;
      this.addForm.scenerySpotId = "";

      common.commonPost(path + api, sform, token, function(data) {
        vm.sceneryspoteditlist = data.value;
      });
    }
  }
};
</script>

<style lang="less">
el-dialog .el-input__inner {
  width: 330px;
}

.gain {
  position: relative;
  left: 240px;
  top: -40px;
  color: #ff6600;
  cursor: pointer;
}
.map {
  width: 480px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 0 auto;
}
</style>
