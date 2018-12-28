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
      :showAdd2="showAdd2"
      :showImport="showImport"
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
      >新增</div>
      <el-form
        :model="addForm"
        ref="addForm"
        label-width="100px"
        :rules="addFormRules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="景点名称" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <!-- <el-form-item label="所属线路" style="margin: 30px auto;width: 330px;" prop="touristRouteIds">
          <el-select v-model="addForm.touristRouteIds" placeholder="请选择线路">
            <el-option v-for="item in touristRouteIdslist" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->

          <el-form-item label="所属线路" style="margin: 30px auto;width: 330px;" prop="touristRouteIds">
          <!-- <el-select v-model="editForm.touristRouteIds" placeholder="请选择线路">
            <el-option v-for="item in touristRouteIdslist" :label="item.name" :value="item.id"></el-option>
          </el-select> -->
          <el-checkbox-group v-model="addForm.touristRouteIds" size="small">
           <el-checkbox-button v-for="item in touristRouteIdslist" :label="item.id" :value="item.id" :key="item.id">{{item.name}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="状态" style="margin: 30px auto;width: 330px;" prop="status">
          <!-- <el-select v-model="addForm.status" placeholder="请选择状态">
            <el-option v-for="item in scenerylist" :label="item.name" :value="item.id"></el-option>
          </el-select> -->
          <select v-model="addForm.status" aria-placeholder="请选择状态···" style="width:230px;height:36px;border:1px solid #e5e5e5;border-radius:6px">
            <option value="0">无效</option>
            <option value="1">有效</option>
          </select>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="经纬度" prop="lonLat">
          <el-input v-model="addForm.lonLat" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="景点地址" prop="address">
          <el-input v-model="addForm.address" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="景点介绍" prop="introduction" >
							    <el-input  v-model="addForm.introduction" autocomplete="off"></el-input>
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
      >修改</div>
      <el-form
        :model="editForm"
        ref="editForm"
        label-width="100px"
        :rules="addFormRules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="景点名称" prop="name">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

       

        <el-form-item label="所属线路" style="margin: 30px auto;width: 330px;" prop="touristRouteIds">
          <el-checkbox-group v-model="editForm.touristRouteIds" size="small">
           <el-checkbox-button v-for="item in touristRouteIdslist" :label="item.id" :value="item.name" >{{item.name}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="状态" style="margin: 30px auto;width: 330px;" prop="status">
           <select v-model="editForm.status" aria-placeholder="请选择状态···" style="width:230px;height:36px;border:1px solid #e5e5e5;border-radius:6px">
            <option value="0">无效</option>
            <option value="1">有效</option>
          </select>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="经纬度" prop="lonLat">
          <el-input v-model="editForm.lonLat" autocomplete="off"></el-input>
        </el-form-item>

        

        <el-form-item style="margin: 30px auto;width: 330px;" label="景点地址" prop="address">
          <el-input v-model="editForm.address" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="景点介绍" prop="introduction" >
							    <el-input  v-model="editForm.introduction" autocomplete="off"></el-input>
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
import Bmapcomponent from './Bmapcomponent.vue'
import { MP } from "./map.js";

const touristRouteIds=[this.touristRouteIds]
export default {
  components: {
    ComTable,
    Bmapcomponent
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
      touristRouteIdslist:[],
      contenttitl: {
        name: "首页",
        description: "景点信息",
        tabledesctiption: "共有景点",
        unit: "个"
      },
      queryapi: "/scenery/scenerySpot/selectScenerySpot",
      delapi: "/scenery/scenerySpot/deleteScenerySpotBath",
      saveapi: "/scenery/scenerySpot/addScenerySpot",
      updateapi: "/scenery/scenerySpot/updateScenerySpot",
      scenerySpotId: "",
      editVisible: false,
      addForm: {
        name:'',
        touristRouteIds:[],
        status:'',
        lonLat:'',
        address:'',
        introduction:'',
      },
      editForm: {
        id:'',
        name:'',
        touristRouteIds:[],
        status:'',
        lonLat:'',
        address:'',
        introduction:'',
        
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
      showImport:true,
      showAdd2:true,
      fridtype: 1,
      showTools: {
        tools: true,
        username:true
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
              label: "景点名称",
              prop: "name",
              width: "300",
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
              label: "景点地址",
              prop: "address",
              width: "650",
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
              label: "状态",
              prop: "status",
              width: "300",
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
       
      ],
      addFormRules: {
        
        name: [{ required: true, message: "请输入景点名称", trigger: "blur" }],
        status:[{required:true,message:"状态是必选的",trigger:"blur"}],

        touristRouteIds: [
          { required: true, message: "请选择线路", trigger: "blur" }
        ],
        // radius: [
        //   { validator: validatePass,required: true, trigger: 'blur' }
        // ],
        address: [
          { required: true, message: "请输入景点地址", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "请输入景点介绍", trigger: "blur" }
        ],
        lonLat: [
          {
            required: true,
            message: "请输入合法经纬度，例如111.12,30.22",
            trigger: "blur"
          }
        ],
        
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
    savedata(){
      var api="/route/touristRoute/selectTouristRouteIdAndName";
      var token=localStorage.getItem("token");
      var _this=this;
      this.$axios.get(path + api, {
        headers: {
          Authorization: "Bearer" + token
        }
      }).then(response=>{
        return this.touristRouteIdslist = response.data.value
      })
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
    this.savedata();
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
.map {
  width: 480px;
  height: 200px;
  border: 1px solid #ccc;
  margin: 0 auto;
}
</style>
