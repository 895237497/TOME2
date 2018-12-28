<template>
  <div id="Emitters">
    <ComTable
      :contenttitl="contenttitl"
		       			:showTools="showTools"
		       			:showRFID="showRFID"
		       			:tableitems='tableitems' 
		       			:showImg="showImg" 
		       			:queryapi="queryapi"
		       			:showScenery='showScenery'
		       			:showQueryDate='showQueryDate'
		       			:scenerylistquery='scenerylistquery'
		       			:showImport='showImport'
		       			:showDel="showDel"
		       			:showAdd2="showAdd2"
		       			:showAdd="showAdd"
		       			:delapi="delapi"
                :showresetButton="showresetButton"
                :powerOff ="powerOff"
		       			v-on:search="onSearch"
		       			v-on:addData2="addData2"
                v-on:editData="editData" 
	       							ref="tumitable"/>

    <!--设备添加-->
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
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="用户名" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="成员类型" prop="name">
           <span>导游</span>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="电话" prop="telephone">
          <el-input v-model="addForm.telephone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="证件" prop="name">
           <span>导游证</span>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="证件号码" prop="credentialsNumber">
          <el-input v-model="addForm.credentialsNumber" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="性别" prop="sex">
          <select v-model="addForm.sex" aria-placeholder="请选择线路性别···" style="width:230px;height:36px;border:1px solid #e5e5e5;border-radius:6px">
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </el-form-item>

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
        :model="editForm"
        ref="editForm"
        label-width="100px"
        :rules="addFormRules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="用户名" prop="name">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="成员类型" prop="name">
           <span>导游</span>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="电话" prop="telephone">
          <el-input v-model="editForm.telephone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="证件" prop="name">
           <span>导游证</span>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="证件号码" prop="credentialsNumber">
          <el-input v-model="editForm.credentialsNumber" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="性别" prop="sex">
          <select v-model="editForm.type" aria-placeholder="请选择线路性别···" style="width:230px;height:36px;border:1px solid #e5e5e5;border-radius:6px">
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </el-form-item>

        
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
        name:'设备/成员',
    		description:'导游信息',
    		tabledesctiption:'共有导游',
    		unit:'名'
      },
      queryapi: "/tourists/guide/selectGuide",
      delapi: "/tourists/guide/deleteGuideBath	",
      saveapi: "/tourists/guide/addGuide",
      updateapi: "/tourists/guide/updateGuide",
      scenerySpotId: "",
      editVisible: false,
      addForm: {
        name:'',
        telephone:'',
        credentialsNumber:'',
        sex:'',
      },
      editForm: {
          name:'',
          telephone:'',
          credentialsNumber:'',
          sex:'',
          id:''
      },
     
      showAdd: false,
      numberValidateForm: {
        age: ""
      },
      addVisible: false,

      showQueryDate: true,
      showImg: true,
      showDel: true,
      showImport:true,
      showAdd2:true,
      fridtype: 1,
      showTools: {
        tools:true,
      	usename:true,
        mobile:true,
        cardnum:true,
        sex:true,
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
              label: "序号",
              prop: "no",
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
              label: "用户名",
              prop: "name",
              width: "174",
              type: "text",
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
              label: "电话",
              prop: "telephone",
              width: "200",
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
              label: "类型",
              prop: "state",
              width: "200",
              type: "selection",
              selectlist: [{},{}],
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
              label: "证件号码",
              prop: "credentialsNumber",
              width: "200",
               type: "selection",
              selectlist: [{},{}],
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
              label: "性别",
              prop: "sex",
              width: "200",
               type: "selection",
              selectlist: [{},{}],
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
              label: "更新时间",
              prop: "updateTime",
              width: "200",
              type: "date",
              editable: false,
              searchable: true,
              addable: false,
              unsortable: true,
              align: "center",
              // format:function(row){
              // 	return common.dateformat(row.accessTime);
              // }
            }
          ]
        },
      ],
      addFormRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],

        telephone: [
          { required: true, message: "请输入电话", trigger: "blur" }
        ],
        
        credentialsNumber: [
          { required: true, message: "请输入证件号码", trigger: "blur" }
        ],
       
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
    
    clearData() {
      var _this = this;
      //清空editForm
      common.clearattribute(_this.addForm);
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addData2() {
      this.addVisible = true;
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
