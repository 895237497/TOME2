<template>
  <div id="Emitters">
    <ComTable
      :contenttitl="contenttitl"
      :showTools="showTools"
      :showRFID="showRFID"
      :tableitems="tableitems"
      :showImg="showImg"
      :queryapi="queryapi"
      :showScenery="showScenery"
      :showQueryDate="showQueryDate"
      :scenerylistquery="scenerylistquery"
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
    />

    <!--添加-->
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
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="用户名" prop="nickname">
          <el-input v-model="addForm.nickname" autocomplete="off" placeholder="请输入真实姓名"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="登录名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="登录密码" prop="password">
          <el-input v-model="addForm.password" autocomplete="off" placeholder="请设置您的密码"></el-input>
        </el-form-item>

        <el-form-item label="角色" style="margin: 30px auto;width: 330px;" prop="roleId">
          <el-select v-model="addForm.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleIdList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          ref="select1"
          label="景区"
          style="margin: 30px auto;width: 330px;"
          prop="name"
        >
          <span v-model="addForm.userSceneries" ></span>
        </el-form-item>

        <el-form-item style="width:330px;margin: 30px auto;" prop="name">
          <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入相关景区"></el-input>                           
        </el-form-item>

        <el-form-item prop="name">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>用户名</span>
            </div>
            <div  v-for="item in nameList" :key="item.id"  class="text item">
              <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
            </div>
          </el-card>
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
       <el-form-item style="margin: 47px auto 30px;width: 330px;" label="用户名" prop="nickname">
          <el-input v-model="editForm.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="登录名" prop="username">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="margin: 30px auto;width: 330px;" label="登录密码" prop="password">
          <el-input v-model="editForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" style="margin: 30px auto;width: 330px;" prop="roleId">
          <el-select v-model="editForm.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleIdList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          ref="select1"
          label="景区"
          style="margin: 30px auto;width: 330px;"
          prop="sceneryName"
        >
          <span>00000</span>
          <el-input v-model="editForm.sceneryName" autocomplete="off" placeholder="请输入相关景区"></el-input>
        </el-form-item>

        <el-form-item prop="sceneryId">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>用户名</span>
            </div>
            <div v-for="item in nameList" :key="item.id" :value="item.id" class="text item">
              <el-checkbox >{{item.name}}</el-checkbox>
            </div>
          </el-card>
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
       showresetButton:false,
       powerOff:true,
        pageSize:10,
        pageNum:1,
        contenttitl: {
        name: "账号分配",
        description: "账号管理",
        tabledesctiption: "共有位置版发射源",
        unit: "个"
      },
      queryapi: "/user/selectUserByPage",
      delapi: "/user/ forbidUser",
      saveapi: "/user/register",
      updateapi: "/user/updateUserByUserId",
      scenerySpotId: "",
      editVisible: false,
      addForm: {
        nickname: '',
        username: '',
        password: '',
        // sceneryName: '',
        name:'',
        userSceneries:[],
        id:'',
        roleId:''
				
			
      },
      editForm: {
        id: "",
        nickname: '',
        username: '',
        password: '',
        // sceneryName: '',
        name:'',
        // sceneryId:'',
        roleId:''
      },
      showAdd: false,
      numberValidateForm: {
        age: ""
      },
      addVisible: false,
      showQueryDate: true,

      showDel: true,
      showAdd2: true,
      fridtype: 1,
      showTools: {
        tools: true,
        username: true,
        loginname: true,
        scenery: true,
        role: true
      },
      showImg: true,
      showRFID: true,
      showScenery: true,
      scenerylist: [],
      sceneryspotlist: [],
			roleIdList: [],
			nameList:[],
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
        {
          hasSubs: false,
          subs: [
            {
              label: "用户名",
              prop: "nickname",
              width: "200",
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
              label: "登录名",
              prop: "username",
              width: "220",
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
              label: "景区数",
              prop: "count",
              width: "220",
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
              label: "景区",
              prop: "sceneryNames",
              width: "220",
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
              label: "角色",
              prop: "name",
              width: "220",
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
        // {
        //   hasSubs: false,
        //   subs: [
        //     {
        //       label: "坐标",
        //       prop: "coodrinte",
        //       width: "200",
        //       type: "number",
        //       editable: true,
        //       searchable: true,
        //       addable: true,
        //       unsortable: true,
        //       align: "center",
        //       format: function (row) {
        //           return row.lon +","+row.lat;
        //  		  }
        //     }
        //   ]
        // },
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
        }
        //  {
        // hasSubs: false,
        // subs: [
        //     {
        //       label: "访问时间",
        //       prop: "createTime",
        //       width: "268",
        //       type: "date",
        //       editable: false,
        //       searchable: true,
        //       addable: false,
        //       unsortable: true,
        //       align: "center",
        //       format:function(row){
        //       	return common.dateformat(row.createTime);
        //       }
        //     }
        //   ]
        // },
      ],
      addFormRules: {
        username: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入登录名", trigger: "blur" }
        ],
        password: [
          {
            validate: validatePass,
            message: "请填写密码",
            required: true,
            trigger: "blur"
          }
        ],
        roleId: [{ message: "请选择角色", required: true, trigger: "blur" }],
        // sceneryId: [{ required: true, message: "请选择景区", trigger: "blur" }],
        // sceneryName: [
        //   { required: true, message: "请选择景点", trigger: "blur" }
        // ]
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
    },
    save() {
      var sform = this.addForm;       
      var token = localStorage.getItem("token");
      var _this = this;
      var api = this.saveapi;
      common.commonUploadByPost(path + api, sform, token, function() {
        _this.refreshTable();
      });
       console.log(this.addForm,"表单传入的值是？？");

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
		// 获取角色id
    getroleId() {
      var api = "/user/selectAllRole";
      var _this = this;
			var token = localStorage.getItem("token");
      this.$axios
        .post(
          path + api,
          {
            pageSize:_this.pageSize,
            pageNum: _this.pageNum
          },
          { headers: { Authorization: "Bearer " + token } }
        )
        .then(response => {
          console.log(response,"我要的list集合的数据是--------");
          
					return _this.roleIdList = response.data.value.list;
					//  console.log(_this.roleIdList,"拿到的数据是----");
					 
        });
		},
		// 获取景区名字
		 getname() {
      var api = "/user/selectAllScenery";
      var _this = this;
			var token = localStorage.getItem("token");
      this.$axios
        .get(
          path + api,
          
          { headers: { Authorization: "Bearer " + token } }
        )
        .then(response => {
          return   _this.nameList = response.data.value	
             console.log(_this.nameList,"我要的景区名字的数据是----");
             			 
        });
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
    this.getroleId();
    this.getname();

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
.el-card {
  width: 70%;
  height: 10%;
  margin: 0 auto;
  border: 1px solid #ff6600;
  .el-card__header {
    background: #ffefdd;
    .clearfix {
      text-align: center;
      span {
        color: #fa8d30;
      }
    }
  }
  .el-card__body {
    .text.item {
      text-align: center;
    }
  }
}
</style>
