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
      :showDel="showDel"
      :showAddDevice="showAddDevice"
      :showAllDevice="showAllDevice"
      :showImpDevice="showImpDevice"
      :showExpDevice="showExpDevice"
      :delapi="delapi"
      :showresetButton="showresetButton"
      :powerOff="powerOff"
      v-on:search="onSearch"
      v-on:addData2="addData2"
      v-on:editData="editData"
      v-on:taskData="taskData"
      ref="tumitable"
    />

    <!--设备添加-->
    <el-dialog title :visible.sync="addVisible" style width="520px" :close-on-click-modal="false">
      <div
        style="margin:-30px 0 6px 29px;font: 18px '微软雅黑';border-left: 4px solid #F98319;padding-left: 9px;color:#FEA062 ;"
      >添加设备</div>
      <el-form
        :model="addForm"
        ref="addForm"
        label-width="100px"
        :rules="addFormRules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="设备IMEI" prop="imei">
          <el-input v-model="addForm.imei" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="机器码" prop="codeMachine">
          <el-input v-model="addForm.codeMachine" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="手机号码" prop="telephone">
          <el-input v-model="addForm.telephone" autocomplete="off"></el-input>
        </el-form-item>

        <!-- <el-form-item style="margin: 30px auto;width: 330px;" label="状态" prop="isAllot" >
							    <el-input  v-model="addForm.isAllot" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="景区" style="margin: 30px auto;width: 330px;" prop="sceneryId">
          <el-select v-model="addForm.sceneryId" placeholder="请选择景区">
            <el-option v-for="item in scenerylist" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item ref="select1" label="状态" style="margin: 30px auto;width: 330px;" prop="isAllot">
							    <el-select  v-model="addForm.scenerySpotId" placeholder="请选择活景点">
							    	
							     <el-option v-for="item in sceneryspotlist" :label="item.name" :value="item.id"></el-option>
							    </el-select>
        </el-form-item>-->
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
      >修改</div>
      <el-form
        :model="addForm"
        ref="addForm"
        label-width="100px"
        :rules="addFormRules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="设备IMEI" prop="imei">
          <el-input v-model="editForm.imei" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="机器码" prop="codeMachine">
          <el-input v-model="editForm.codeMachine" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="手机号码" prop="telephone">
          <el-input v-model="editForm.telephone" autocomplete="off"></el-input>
        </el-form-item>

        <!-- <el-form-item style="margin: 30px auto;width: 330px;" label="状态" prop="isAllot" >
							    <el-input  v-model="addForm.isAllot" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="景区" style="margin: 30px auto;width: 330px;" prop="sceneryId">
          <el-select v-model="editForm.sceneryId" placeholder="请选择景区">
            <el-option v-for="item in scenerylist" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item ref="select1" label="状态" style="margin: 30px auto;width: 330px;" prop="isAllot">
							    <el-select  v-model="addForm.scenerySpotId" placeholder="请选择活景点">
							     <el-option v-for="item in sceneryspotlist" :label="item.name" :value="item.id"></el-option>
							    </el-select>
        </el-form-item>-->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="clearData" size="small">清空</el-button>-->
        <el-button type="primary" style="background: #FA841A;" size="small" @click="update">保存</el-button>
      </span>
    </el-dialog>

    <!--分配设备-->
    <el-dialog title :visible.sync="taskVisible" style width="520px" :close-on-click-modal="false">
      <div
        style="margin:-30px 0 6px 29px;font: 18px '微软雅黑';border-left: 4px solid #F98319;padding-left: 9px;color:#FEA062 ;"
      >分配设备</div>
      <el-form
        :model="taskForm"
        ref="taskForm"
        label-width="100px"
        :rules="addFormRules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <!-- <el-form-item style="margin: 47px auto 30px;width: 330px;" label="设备IMEI" prop="imei" >
							    <el-input  v-model="editForm.imei" autocomplete="off"></el-input>
							  </el-form-item>
							  
							  <el-form-item style="margin: 30px auto;width: 330px;" label="机器码" prop="codeMachine" >
							    <el-input  v-model="editForm.codeMachine" autocomplete="off"></el-input>
							  </el-form-item>
							  
							  <el-form-item style="margin: 30px auto;width: 330px;" label="手机号码" prop="telephone" >
							    <el-input  v-model="editForm.telephone" autocomplete="off"></el-input>
        </el-form-item>-->
        <!-- <el-form-item style="margin: 30px auto;width: 330px;" label="状态" prop="isAllot" >
							    <el-input  v-model="addForm.isAllot" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item
          label="景区"
          style="margin: 30px auto;width: 330px;margin-top:30px"
          prop="sceneryId"
        >
          <el-select v-model="taskForm.sceneryId" placeholder="太行山">
            <el-option v-for="item in scenerylist" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item ref="select1" label="状态" style="margin: 30px auto;width: 330px;" prop="isAllot">
							    <el-select  v-model="addForm.scenerySpotId" placeholder="请选择活景点">
							    	
							     <el-option v-for="item in sceneryspotlist" :label="item.name" :value="item.id"></el-option>
							    </el-select>
        </el-form-item>-->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="clearData" size="small">清空</el-button>-->
        <el-button type="primary" style="background: #FA841A;" size="small" @click="saveData">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ComTable from "../../ComTable";
import common from "../../common/common.js";
import { path } from "../../../api/api";
export default {
  components: {
    ComTable
  },
  data() {
    //自定义校验，播报半径校验，正整数
    var validatePass = (rule, value, callback) => {
      if (value == undefined || value === "") {
        callback(new Error("播报半径不能为空"));
      } else {
        if (this.addForm.radius !== "") {
          var num = Number(value);
          if (typeof num === "number" && num % 1 === 0 && num > 0) {
            callback();
          } else {
            callback(new Error("播报半径必须为正整数"));
          }
        }
      }
    };
    return {
       showresetButton:true,
       powerOff:true,
      contenttitl: {
        name: "设备管理",
        description: "设备信息",
        tabledesctiption: "共有设备",
        unit: "个"
      },
      queryapi: "/device/terminal/selectTerminal",
      delapi: "/device/terminal/deleteTerminalBath",
      saveapi: "/device/terminal/addTerminal",
      updateapi: "/device/terminal/updateTerminal",
      scenerySpotId: "",
      editVisible: false,
      addForm: {
        sceneryId: "",
        scenerySpotId: "",
        imei: "",
        codeMachine: "",
        telephone: "",
        isAllot: "",
        type: 1
      },
      editForm: {
        id: "",
        sceneryId: "",
        scenerySpotId: "",
        imei: "",
        codeMachine: "",
        telephone: "",
        isAllot: "",
        type: 1
      },
      taskForm:{
       sceneryId:'',
       ids:[]
      },
      showAdd: false,
      numberValidateForm: {
        age: ""
      },
      addVisible: false,
      taskVisible: false,

      showQueryDate: true,
      showImg: true,
      showDel: true,
      showAddDevice: true,
      showAllDevice: true,
      showImpDevice: true,
      showExpDevice: true,
      fridtype: 1,
      showTools: {
        tools: true,
        codeMachine: true,
        imei: true,
        scenery: true,
        isAllot:true,
        telephone:true,
      },
      showRFID: true,
      showScenery: true,
      scenerylist: [],
      sceneryspotlist: [],
      scenerylistquery: [],
      sceneryspoteditlist: [],
      tableitems: [
        {
          hasSubs: false,
          subs: [
            {
              label: "设备IMEI",
              prop: "imei",
              width: "100",
              type: "number",
              editable: true,
              searchable: true,
              addable: false,
              unsortable: true,
              align: "center"
            }
          ]
        },
        {
          hasSubs: false,
          subs: [
            {
              label: "机器码",
              prop: "codeMachine",
              width: "190",
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
              label: "旅游团",
              prop: "touristTeamName",
              width: "190",
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
              label: "景区",
              prop: "sceneryName",
              width: "190",
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
              label: "分配状态",
              prop: "isAllot",
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
              label: "通讯号码",
              prop: "telephone",
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
              label: "软件版本",
              prop: "version",
              width: "120",
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
              label: "电量",
              prop: "battery",
              width: "80",
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
        // {
        //   hasSubs: false,
        //   subs: [
        //     {
        //       label: "状态",
        //       prop: "createTime",
        //       width: "80",
        //       type: "date",
        //       editable: false,
        //       searchable: true,
        //       addable: false,
        //       unsortable: true,
        //       align: "center",
        //       // format:function(row){
        //       // 	return common.dateformat(row.createTime);
        //       // }
        //     }
        //   ]
        // },
      ],
      addFormRules: {
        imei: [{ required: true, message: "请输入IMEI号", trigger: "blur" }],
        codeMachine: [
          { required: true, message: "请输入机器码", trigger: "blur" }
        ],
        // radius: [
        //   { validator: validatePass,required: true, trigger: 'blur' }
        // ],
        telephone: [
          { required: true, message: "请输入电话号码", trigger: "blur" }
        ],
        sceneryId: [
          { required: false, message: "请选择景点", trigger: "change" }
        ],
        lon: [
          {
            type: "number",
            required: true,
            message: "请输入合法经度，例如111.123456",
            trigger: "blur"
          }
        ],
        lat: [
          {
            type: "number",
            required: true,
            message: "请输入合法纬度，例如39.123456",
            trigger: "blur"
          }
        ]
      },
      row: ""
    };
  },
  methods: {
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

      //显示编辑页面
      this.editVisible = true;
    },
    //刷新表格
    refreshTable() {
      this.$refs["tumitable"].refreshTable();
      this.addVisible = false;
      this.taskVisible = false;
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
    saveData(){
      var sform = this.taskForm;
      var token= localStorage.getItem("token");
      var _this=this;
      var api="/device/terminal/allotTerminal";
      common.commonUploadByPost(path + api,sform, token, function() {
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
    // 分配设备
    taskData(multipleSelection) {
      
      console.log('设备绑定=================')
      console.log(multipleSelection)
      var ids =[]
      for(var i = 0; i< multipleSelection.length;i++){
        ids.push(multipleSelection[i].id)
      }
      this.taskForm.ids=ids
      this.taskVisible = true;
    },
    //  导出设备
    exportReceipt(){
    
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
          data.splice(0, 0, { id: 0, name: "查询全部" });
          _this.scenerylistquery = data;

          //获取表格数据
          _this.getTableData({});
        });
    },
    onSearch(sform) {
      sform.type = this.fridtype;

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
      sform.type = this.fridtype;
      sform.sceneryIds = sceneryIds;

      this.$refs["tumitable"].getTableData(sform);
    }
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
</style>
