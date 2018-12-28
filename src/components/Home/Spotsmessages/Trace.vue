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
      :delapi="delapi"
      :showresetButton="showresetButton"
      :powerOff="powerOff"
      v-on:search="onSearch"
      v-on:addData2="addData2"
      v-on:editData="editData"
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
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="线路名称" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <div style="margin-left:74px">
          <el-form-item
            label="目的地"
            style="margin: 30px auto;width: 330px;display:inline;"
            prop="sceneryId"
          >
            <!-- <el-select v-model="addForm.province" style="width:116px;" placeholder="请选择省">
            <el-option v-for="item in scenerylist" :label="item.name" :value="item.id"></el-option>
            </el-select>-->
            <el-select
              v-model="addForm.province"
              @change="choseProvince"
              style="width:116px;"
              placeholder="请选择省"
            >
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>

            <el-select
              v-model="addForm.city"
              @change="choseCity"
              style="width:116px;"
              placeholder="请选择市"
            >
              <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
            <!-- <el-select v-model="addForm.city" style="width:116px;" placeholder="请选择市">
            <el-option v-for="item in scenerylist" :label="item.name" :value="item.id"></el-option>
            </el-select>-->
          </el-form-item>
        </div>

        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="线路详情" prop="detail">
          <el-input v-model="addForm.detail" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="线路类型" style="margin: 30px auto;width: 330px;" prop="type">
          <select
            v-model="addForm.type"
            aria-placeholder="请选择线路类型···"
            style="width:230px;height:36px;border:1px solid #e5e5e5;border-radius:6px"
          >
            <option value="1">出境游</option>
            <option value="2">短途游</option>
            <option value="3">长途游</option>
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
        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="线路名称" prop="name">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <div style="margin-left:74px">
          <el-form-item
            label="目的地"
            style="margin: 30px auto;width: 330px;display:inline;"
            prop="sceneryId"
          >
            <!-- <el-select v-model="addForm.province" style="width:116px;" placeholder="请选择省">
            <el-option v-for="item in scenerylist" :label="item.name" :value="item.id"></el-option>
            </el-select>-->
            <el-select
              v-model="editForm.province"
              @change="choseProvince"
              style="width:116px;"
              placeholder="请选择省"
            >
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>

            <el-select
              v-model="editForm.city"
              @change="choseCity"
              style="width:116px;"
              placeholder="请选择市"
            >
              <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
            </el-select>
            <!-- <el-select v-model="addForm.city" style="width:116px;" placeholder="请选择市">
            <el-option v-for="item in scenerylist" :label="item.name" :value="item.id"></el-option>
            </el-select>-->
          </el-form-item>
        </div>

        <el-form-item style="margin: 47px auto 30px;width: 330px;" label="线路详情" prop="detail">
          <el-input v-model="editForm.detail" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="线路类型" style="margin: 30px auto;width: 330px;" prop="type">
          <select
            v-model="editForm.type"
            aria-placeholder="请选择线路类型···"
            style="width:230px;height:36px;border:1px solid #e5e5e5;border-radius:6px"
          >
            <option value="1">出境游</option>
            <option value="2">短途游</option>
            <option value="3">长途游</option>
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
import axios from "axios";
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
      showresetButton: true,
      powerOff: true,
      mapJson: "../../../../static/map.json",
      province: [],
      sheng: "",
      shi: "",
      shi1: [],
      city: "",

      contenttitl: {
        name: "景区服务商",
        description: "线路信息",
        tabledesctiption: "共有线路",
        unit: "个"
      },
      queryapi: "/route/touristRoute/selectTouristRoute",
      delapi: "/route/touristRoute/deleteTouristRouteBath",
      saveapi: "/route/touristRoute/addTouristRoute",
      updateapi: "/route/touristRoute/updateTouristRoute",
      scenerySpotId: "",
      editVisible: false,
      addForm: {
        name: "",
        province: "",
        city: "",
        detail: "",
        type: ""
      },
      editForm: {
        name: "",
        province: "",
        city: "",
        detail: "",
        type: "",
        id: ""
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
      showAdd2: true,
      // fridtype: 1,
      showTools: {
        tools: true,
        line: true,
        mold: true
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
              label: "线路类型",
              prop: "type",
              width: "420",
              // type: "number",
              editable: true,
              searchable: true,
              addable: false,
              unsortable: true,
              align: "center",
            }
          ]
        },
        {
          hasSubs: false,
          subs: [
            {
              label: "线路名称",
              prop: "name",
              width: "420",
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
              label: "目的地",
              prop: "destination",
              width: "420",
              type: "selection",
              selectlist: [{}, {}],
              editable: true,
              searchable: true,
              addable: true,
              unsortable: true,
              align: "center"
            }
          ]
        }
      ],
      addFormRules: {
        name: [{ required: true, message: "请输入线路名称", trigger: "blur" }],
        province: [{ required: true, message: "请选择省份", trigger: "blur" }],
        // radius: [
        //   { validator: validatePass,required: true, trigger: 'blur' }
        // ],
        city: [{ required: true, message: "请选择市区", trigger: "blur" }],
        detail: [{ required: true, message: "请填写详情", trigger: "change" }],
        type: [
          {
            required: true,
            message: "请选择类型",
            trigger: "blur"
          }
        ]
      },
      row: ""
    };
  },
  methods: {
    // 加载china地点数据，三级
    getCityData() {
      var that = this;

      axios
        .get(that.mapJson)
        .then(function(response) {
          if (response.status == 200) {
            var data = response.data;
            console.log(data, "这是打印的数据--------");

            that.province = [];
            that.city = [];
            //that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {
                //省
                that.province.push({
                  id: item,
                  value: data[item],
                  children: []
                });
              } else if (item.match(/00$/)) {
                //市
                that.city.push({ id: item, value: data[item], children: [] });
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (
                  that.province[index].id.slice(0, 2) ===
                  that.city[index1].id.slice(0, 2)
                ) {
                  that.province[index].children.push(that.city[index1]);
                }
              }
            }
            // 分类区级
          } else {
            console.log(response.status);
          }
        })
        .catch(function(error) {
          console.log(typeof +error);
        });
    },
    // 选省
    choseProvince: function(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].children;
          this.shi = this.province[index2].children[0].value;
        }
      }
    },
    // 选市
    choseCity: function(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.qu1 = this.city[index3].children;
          // console.log(this.E)
        }
      }
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

    //  导出设备
    exportReceipt() {},
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
      // sform.sceneryIds = sceneryIds;

      this.$refs["tumitable"].getTableData(sform);
    }
  },
  activated() {},
  
  computed: {

    getType() {
      return function(type) {
        return type == 1 ? "出境游" : "短途游" ;
      }
    }
    
  },

  mounted() {
    //查询景区服务商并并获取表格数据
    this.getSceneryList();
    this.getCityData();
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
