<template>
  <div id="Emitters">
    <ComTable
      :contenttitl="contenttitl"
      :showTools="showTools"
      :showRFID="showRFID"
      :tableitems="tableitems"
      :queryapi="queryapi"
      :showScenery="showScenery"
      :showQueryDate="showQueryDate"
      :scenerylistquery="scenerylistquery"
      :showImg="showImg"
      :showDel="showDel"
      :showAdd2="showAdd2"
      :showAdd="showAdd"
      :delapi="delapi"
      :showresetButton="showresetButton"
      :powerOff="powerOff"
      v-on:search="onSearch"
      v-on:addData2="addData2"
      v-on:editData="editData"
      ref="tumitable"
      :role="role"
    />

    <!--添加-->
    <el-dialog title :visible.sync="addVisible" style width="520px" :close-on-click-modal="false">
      <div
        style="margin:-30px 0 6px 29px;font: 18px '微软雅黑';border-left: 4px solid #F98319;padding-left: 9px;color:#FEA062 ;"
      >创建角色</div>
      <el-form
        :model="addForm"
        ref="addForm"
        label-width="100px"
        :rules="addFormRules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="角色名" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="角色标识" prop="code">
          <el-input v-model="addForm.code" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="身份" style="margin: 30px auto;width: 330px;" prop="type">
          <select
            v-model="addForm.type"
            ref="getroleName"
            style="width:230px;height:40px; dispaly:inline;border:1px solid #e5e5e5;border-radius:6px;outline:none"
          >
            <option value="0">超级管理员</option>
            <option value="1">景区管理员</option>
          </select>
        </el-form-item>

        <el-form-item
          v-model="addForm.permissionIds"
          style="margin: 47px auto;width: 330px;"
          label="选择权限"
          prop="permissionIds"
        >
          <el-checkbox-group v-model="addForm.menuIds" v-for="item in menuList">
            <!-- 一级菜单 -->
            <p>
              <el-checkbox :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </p>
            <!-- 二级菜单 -->
            <span style="margin-left:15px;text-align:left">
              <el-checkbox v-for="(item1,index) in item.child" :label="item1.id">{{item1.name}}</el-checkbox>
            </span>
          </el-checkbox-group>

          <el-checkbox-group v-model="addForm.permissionIds" v-for="item in menuList">
            <!-- 循环子类 -->
            <span style="margin-left:16px">
              <el-checkbox
                v-for="(subItem,index) in item.permissionList"
                :label="subItem.id"
              >{{subItem.name}}</el-checkbox>
            </span>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="clearData" size="small">清空</el-button>
        <el-button type="primary" style="background: #FA841A;" size="small" @click="save">保存</el-button>
      </span>
    </el-dialog>

    <!--修改-->
    <el-dialog title :visible.sync="editVisible" style width="520px" :close-on-click-modal="false">
      <div
        style="margin:-30px 0 6px 29px;font: 18px '微软雅黑';border-left: 4px solid #F98319;padding-left: 9px;color:#FEA062 ;"
      >编辑</div>
      <el-form
        :model="editForm"
        ref="editForm"
        label-width="100px"
        :rules="addFormRules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="角色名" prop="name">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="角色标识" prop="code">
          <el-input v-model="editForm.code" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="身份" style="margin: 30px auto;width: 330px;" prop="type">
          <input type="text" :value="editForm.type===0 ? '超级管理员' : '景区管理员'">
          <!-- <select
            v-model="editForm.type"
            style="width:230px;height:40px; dispaly:inline;border:1px solid #e5e5e5;border-radius:6px;outline:none"
          >
            <option value="0">超级管理员</option>
            <option value="1">景区管理员</option>
          </select> -->
        </el-form-item>
        <el-form-item
          v-model="menuList"          
          style="margin: 47px auto;width: 330px;"
          label="选择权限"
          prop="menuIds"
        >
          <el-checkbox-group v-model="MenuPermList" @change="test($event)">
            <!-- 一级菜单 -->
            <el-checkbox-group v-model="menuList"  @change="test($event)">
              <div v-for="item in allMenuList" :key="item.id">
                <p><el-checkbox :label="item.id" ref="currentRoleId" >{{item.name}}</el-checkbox></p>
                <!-- 二级菜单 -->
                <span style="margin-left:15px;text-align:left" v-for="child in item.child" :key="child.id">
                  <el-checkbox :label="child.id" :disabled="menuList.indexOf(child.parentId) === -1 ? true : false">{{child.name}}</el-checkbox>
                </span>
                <el-checkbox-group v-model="permissionList" @change="test($event)">
                  <el-checkbox :label="permiss.id" v-if="item.permissionList" v-for="permiss in item.permissionList" :key="permiss.id" style="margin-left:15px;text-align:left" :disabled="menuList.indexOf(item.id) === -1 ? true : false">{{permiss.name}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-checkbox-group>
          </el-checkbox-group>

          <!-- <el-checkbox-group v-model="editForm.permissionIds" v-for="item in menuList" prop="roleId">
            <span style="margin-left:16px">
              <el-checkbox
                v-for="(subItem,index) in item.permissionList"
                :label="subItem.id"
                :key="subItem.id"
              >{{subItem.name}}</el-checkbox>
            </span>
          </el-checkbox-group> -->
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
      role: "role",
      isChecked:true,
      showresetButton: true,
      powerOff:true,
      menuList: [],
      permissionList: [],
      MenuPermList: [],
      allMenuList: [],
      contenttitl: {
        name: "账号管理",
        description: "角色分配",
        tabledesctiption: "共有角色",
        unit: "个"
      },
      queryapi: "/user/selectAllRole",
      delapi: "/user/deleteRoleByRoleIds",
      saveapi: "/user/addRole",
      updateapi: "/user/updatePermissionByRoleId",
      // scenerySpotId: "",
      editVisible: false,
      addForm: {
        type: "",
        code: "",
        menuIds: [],
        name: "",
        permissionIds: [],
      },
      editForm: {
        id: "",
        roleId:'',
        type: "",
        name: "",
        code: "",
        permissionIds: [],
        menuIds: []
      },
      showAdd: false,
      addVisible: false,
      showQueryDate: true,
      showImg: true,
      showDel: true,
      showAdd2: true,
      fridtype: 1,
      showTools: {
        tools: true,
        name: true
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
              label: "发射源id",
              prop: "id",
              width: "100",
              type: "number",
              editable: true,
              searchable: true,
              addable: true,
              hidden: true,
              unsortable: true,
              align: "center"
            }
          ]
        },
        {
          hasSubs: false,
          subs: [
            {
              label: "ID",
              prop: "id",
              width: "276",
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
              label: "角色名称",
              prop: "name",
              width: "300",
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
              label: "添加时间",
              prop: "createTime",
              width: "560",
              type: "date",
              editable: false,
              searchable: true,
              addable: false,
              unsortable: true,
              align: "center",
              format: function(row) {
                return common.dateformat(row.createTime);
              }
            }
          ]
        }
      ],
      addFormRules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        code: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      row: ""
    };
  },
  methods: {
    test(e) {
     this.editForm.menuIds = this.menuList
     this.editForm.permissionIds = this.permissionList
     console.log(this.editForm.menuIds,this.editForm.permissionIds)
     console.log(e)
    },
    //修改
    update() {
      
      var _this = this;
      var sform = this.editForm;
      var token = localStorage.getItem("token");
      console.log("update...............................");
      console.log(sform);
      var api = this.updateapi;
     if(this.menuList.length === 0){
       alert("请至少选择一项")
     }else{
        common.commonUpdateByPost(path + api, sform, token, function() {
          _this.refreshTable();
          _this.editVisible = false;
        });
     }
    },
     handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.isChecked = checkedCount === this.menuList.length;
        // this.isIndeterminate = checkedCount > 0 && checkedCount < this.menuList.length;
      },
    
    //编辑
    editData(row,list) {
      console.log("hhhhhhhhhhh",this.$refs["tumitable"])
      console.log(row,list)
      this.row = row;
      var _this = this;
      var roleId = _this.row.id;
      // console.log(roleId,"获取到当前的Id");
       
      var type = _this.row.menuList[0].type;
      var menuL= _this.row.menuList;
      var menuLists = []
      var menu = []
      var permiss = []
      var allMenuList = list
      // var allMenuListId = []
      menuL.forEach(item => {
        menuLists.push(item.id)
        menu.push(item.id)
        if(item.child){
          item.child.forEach(childItem => {
            menuLists.push(childItem.id)
            menu.push(childItem.id)
          })
        }
        if(item.permissionList){
          item.permissionList.forEach(permissItem => {
            menuLists.push(permissItem.id)
            permiss.push(permissItem.id)
          })
        }
      })
      // list.forEach(item => {
      //   allMenuListId.push(item.id)
      //   if(item.child){
      //     item.child.forEach(childItem => {
      //       allMenuListId.push(childItem.id)
      //     })
      //   }
      // })
      _this.allMenuList = allMenuList
      _this.MenuPermList = menuLists
      _this.menuList = menu
      _this.permissionList = permiss
      console.log("菜单",_this.menuList,"权限",_this.permissionList,"菜单权限",_this.MenuPermList,_this.allMenuList)
      //根据当前景区id获取景点信息
      
      //清空editForm
      common.clearattribute(_this.editForm);

      //复制row到editForm
      common.copyattribute(_this.editForm, row);
      _this.editForm.roleId = row.id
      _this.editForm.permissionIds = _this.permissionList
      _this.editForm.menuIds = _this.menuList
      console.log("对象复制",_this.editForm, row,this.row)
      //显示编辑页面
      this.editVisible = true;
                
       return  _this.editForm.type = type
               
    },
    //刷新表格
    refreshTable() {
      
      this.$refs["tumitable"].refreshTable();
      this.addVisible = false;
    },
    save() {
      console.log("ggg",this.addForm)
      console.log(this.$refs)
      var sform = this.addForm;
      var token = localStorage.getItem("token");
      var _this = this;
      var api = this.saveapi;
      common.commonUploadByPost(path + api, sform, token, function() {
        
        // console.log(_this.$refs["tumitable"])
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
          console.log(response)
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
      // sform.type = this.fridtype;
      // sform.sceneryIds=sceneryIds

      this.$refs["tumitable"].getTableData(sform);
    }
  },
  activated() {},
  mounted() {
    //查询景区服务商并并获取表格数据
    this.getSceneryList();
  },
  watch: {
    "addForm.type": function getmune(value) {
      var api = "/user/selectMenuByType";
      var _this = this;
      var token = localStorage.getItem("token");

      this.$axios
        .get(path + api + "?type=" + value, {
          headers: {
            Authorization: "Bearer" + token
          }
        })
        .then(response => {
          let list = {};
          list = JSON.parse(JSON.stringify(response.data.value));
          _this.menuList = list;
          let menus = [];
          for (var i = 0; i < list.length; i++) {
            menus.push(list[i].name);
          }
          console.log(response)
          // _this.addForm.menuIds=menus;
          console.log(_this.menuList, "获取到的菜单········");
        });
		},
		
  },
  // computed:{
  //   isChecked:function(val){
  //      return this.val= true;
  //   }
  // }
};
</script>

<style lang="less">
el-dialog .el-input__inner {
  width: 330px;
}
</style>
