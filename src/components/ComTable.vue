<template>
  <section>
    <!--页面信息描述-->
    <el-row>
      <div
        style="margin: 24px 0 0 13px;font:16px;color: #919191;border-left: 4px solid #F98319;padding-left:8px ;"
      >
        {{contenttitl.name}}
        <strong style="color: #F98319;padding: 0 5px;font: 14px;">-</strong>
        {{contenttitl.description}}
      </div>
    </el-row>
    <!--工具条组件-->
    <tool-menu
      :scenerylistquery="scenerylistquery"
      :showTools="showTools"
      v-on:search="onSearch"
      ref="menutool"
    ></tool-menu>

    <el-row>
      <div
        style="width: 1512px;margin-left:34px;border-bottom: 1px solid #FED3B0;padding-bottom: 10px;padding-left: 53px;color: #FD974F;"
      >{{contenttitl.tabledesctiption}}:&nbsp;{{total}}{{contenttitl.unit}}</div>
    </el-row>

    <!--表格按钮-->
    <el-row style="margin-left: 89px;">
      <el-button round @click="addData2" size="small" v-if="showAdd2">新增</el-button>
      <el-button round @click="importDatas" size="small" v-if="showImport">导入</el-button>
      <el-button round @click="exportDatas" size="small" v-if="showExport">导出</el-button>
      <el-button round size="small" v-if="showDel" @click="showDelVisible">删除</el-button>

      <el-button round  @click="addData2" size="small" v-if="showAddDevice">添加设备</el-button>
      <el-button round @click="taskData" size="small" v-if="showAllDevice">分配设备</el-button>
      <el-button round @click="addData2" size="small" v-if="showAddtravel">添加行程</el-button>
      <el-button round @click="showDelVisible"  size="small" v-if="showcleartravel">清空行程</el-button>

      <el-button round  size="small" v-if="showEnergizer">添加围栏</el-button>
      <el-button round @click="imports" size="small" v-if="showImpDevice">导入设备</el-button>
      <el-button round @click="exportReceipt" size="small" v-if="showExpDevice">导出设备</el-button>
      <el-button round size="small" v-if="showShutDown">一键关机</el-button>
    </el-row>

    <!--表格开始-->
    <el-row style="margin-left: 74px;">
      <el-table
        :data="tableData"
        border
        highlight-current-row
        style="width:100%;"
        :height="500"
        v-loading="loading"
        id="tablearea"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" fixed="left"></el-table-column>
        <div v-for="items in tableitems">
          <div v-if="items.hasSubs">
            <el-table-column :label="items.label" header-align="center">
              <el-table-column
                v-for="tableitem in items.subs"
                v-if="!tableitem.hidden"
                :prop="tableitem.prop"
                :label="tableitem.label"
                header-align="center"
                :align="tableitem.align"
                :sortable="!tableitem.unsortable"
                :width="tableitem.width"
                :formatter="tableitem.format"
              ></el-table-column>
            </el-table-column>
          </div>
          <div v-if="!items.hasSubs">
            <el-table-column
              v-for="tableitem in items.subs"
              v-if="!tableitem.hidden"
              :prop="tableitem.prop"
              :label="tableitem.label"
              header-align="center"
              :align="tableitem.align"
              :sortable="!tableitem.unsortable"
              :width="tableitem.width"
              :formatter="tableitem.format"
            ></el-table-column>
          </div>
        </div>

        <el-table-column label="操作" :width="340" v-if="showImg" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="!showButtonEdit"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button size="mini"  @click="openDelete(scope.$index, scope.row)">删除</el-button>

            <el-button size="mini" v-if="!showresetButton" type="warning" @click="resetpwd(scope.$index, scope.row)">重置密码</el-button>
            <el-button size="mini" v-if="!powerOff" type="danger" @click="downOff(scope.$index, scope.row)">关机</el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="float: right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-row>

    <!--各种dialog-->
    <!--删除提示框-->
    <el-dialog title="提示" :visible.sync="delVisible" width="30%" custom-class="deleteTip">
      <div class="el-message-box__status el-icon-warning" style="padding-bottom: 10px;"></div>
      <div style="margin-left:50px;vertical-align:middle;">确定删除吗?此操作不可恢复!</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteByIds" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--重置密码  -->

       <el-dialog title :visible.sync="resetVisible" style width="520px" :close-on-click-modal="false">
      <div
        style="margin:-30px 0 6px 29px;font: 18px '微软雅黑';border-left: 4px solid #F98319;padding-left: 9px;color:#FEA062 ;"
      >修改密码</div>
      <el-form
        :model="Form"
        ref="Form"
        label-width="100px"
        :rules="Rules"
        style="width:100%;border-top: 2px solid #FCD4B0;"
      >
        <el-form-item label="新密码" style="margin-top:30px" prop='oldPassword'>
          <el-input v-model="Form.oldPassword" autocomplete="off"  style="width:300px;margin:0 auto;" placeholder="请输入您的新密码"></el-input>
        </el-form-item>
        <el-form-item label="再次确认" style="margin-top:30px" prop='newPassword'>
          <el-input v-model="Form.newPassword" autocomplete="off" style="width:300px;margin:0 auto;" placeholder="请再次输入您的新密码"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetVisible = false" size="small">清空</el-button>
        <el-button type="primary" style="background: #FA841A;" size="small" @click="save">保存</el-button>
      </span>
    </el-dialog>

    

    <!--添加-->
    <!--表格添加-->
    <add-form
      :addtitle="addtitle"
      :addVisible="addFormVisible"
      :addloading="addloading"
      :additems="tableitems"
      :addFormRules="typeof(addFormRules)=='undefined'?editFormRules:addFormRules"
      :dialogsize="dialogsize"
      :ref="af"
    ></add-form>

    <el-row></el-row>
    <el-row>
      &nbsp;
      &nbsp;
    </el-row>
  </section>
</template>
<script>
import ToolMenu from "./subs/tools";
import { path } from "../api/api";
import axios from "axios";
import AddForm from "./subs/form/AddForm";
import exportData from ".././js/export.js"
export default {
  components: {
    ToolMenu,
    AddForm
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value == undefined || value === "") {
        callback(new Error("密码不能为空"));
      } else {
        if (this.Form !== "") {
          var num = Number(value);
          if (typeof num === "number" && num % 1 === 0 && num > 0) {
            callback();
          } else {
            callback(new Error("密码不正确"));
          }
        }
      }
    };
    return {
      
      centerDialogVisible: true,
      addtitle: "表格添加",
      addFormVisible: false,
      addloading: false,
      af: "addref",
      pageSize: 10,
      loading: false,
      hidePagination: false,
      total: 0,
      delVisible: false,
      resetVisible:false,
      multipleSelection: "",
      currentPage: 1,
      sceneryId: "1",
      tableData: [],
      Form:{
        oldPassword:'',
        newPassword:'',
        id:''
      },
     Rules: {
        oldPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ],
      },
      row:''
    };
  },
  props: [
    "contenttitl",
    "tableitems",
    "showImg",
    "queryapi",
    "showTools",
    "showRFID",
    "showScenery",
    "showQueryDate",
    "scenerylistquery",
    "delapi",
    "showAdd",
    "showImport",
    "showExport",
    "showDel",
    "fridtype",
    "addFormRules",
    "editFormRules",
    "dialogsize",
    "showAdd2",
    "showTools",
    "showButtonEdit",
    "showresetButton",
    "powerOff",
    "showAddDevice",
    "showAllDevice",
    "showImpDevice",
    "showExpDevice",
    "showShutDown",
    "showEnergizer",
    "showAddtravel",
    "showcleartravel",
    "role",
    "sign"
  ],
  methods: {
    
    // 重置密码
    save(row){
      var api = '/user/resetPassword'
      var _this = this
      var token = localStorage.getItem('token')
      this.$axios.post(path + api,{
        id:_this.Form.id,
        oldPassword:_this.Form.oldPassword,
        newPassword:_this.Form.newPassword
      },{
        headers:{Authorization:"Bearer" + token}
      }).then(response=>{
        if(response.data.resultStatus.resultCode === "0000"){
          this.$message({
            message:"密码修改成功",
            type:'success',  
            duration: 1200
          })
          
        }else{
          this.$message({
            message:"密码修改失败",
             type:'error',
            duration:900
          })
          refreshTable(Form)
        }
        
      })
    },
    //添加数据
    addData() {
      this.addFormVisible = true;
    },
    //调用父组件自定义添加dialog
    addData2() {
      this.$emit("addData2");
    },
    //导入数据
    importDatas() {
      this.$emit("imports",this.centerDialogVisible)
    },
    //导出数据
    exportDatas() {
      console.log(this.sign)
      if(this.sign === "rfid"){
        var url =  path + "/device/rfid/exportrfid"
      }else if(this.sign === "rfidPosition"){
        var url = path + "/device/rfid/exportposition"
      }
       exportData(url)
    },
    // 分配设备
    taskData(){
      // alert("这是分配设备事件");
      var multipleSelection = this.multipleSelection;
      console.log('-------------------------')
      console.log(multipleSelection);
      this.$emit("taskData",multipleSelection)
    },
    //导入设备
    imports(){
      this.$emit("imports",this.centerDialogVisible)

    },
    // 导出设备
    exportReceipt(){
      let url = path + "/device/terminal/exportTerminal"
      exportData(url)
      // return
      // this.$confirm('此操作将设备信息导出为excel表格, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     let headers = { 'Access-Control-Allow-Origin': '*',
      //                     'Content-Type': 'application/json; application/octet-stream',
      //                     'Authorization':"Bearer" + localStorage.getItem("token")
      //                   }   
      //     this.$axios({
      //         method: 'get',
      //         url: 'http://39.98.168.124:8080/device/terminal/exportTerminal',
      //         headers: headers,
      //         responseType: 'blob',
      //     }).then((res) => {
      //           this.$message({
      //           type: 'success',
      //           message: '导出成功!'
      //           });
      //           console.log(res)
      //           const link = document.createElement('a')
      //           let blob = new Blob([res.data],{type: 'application/vnd.ms-excel'});
      //           link.style.display = 'none'
      //           link.href = URL.createObjectURL(blob);
      //           let num = ''
      //           for(let i=0;i < 10;i++){
      //             num += Math.ceil(Math.random() * 10)
      //           }
      //           link.setAttribute('download', '用户_' + num + '.xlsx')
      //           document.body.appendChild(link)
      //           link.click()
      //           document.body.removeChild(link)
      //         }).catch(error => {
      //             console.log(error)
      //         })
         
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     });          
      //   });
      
    },
    
    // 操作按钮
    handleEdit(index, row) {
      console.log("data",row,this.role)
      if(this.role === "role"){
        var api = "/user/selectMenuByType";
        var value = row.menuList.length === 0 ? "" : row.menuList[0].type
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
              this.$emit("editData",row,list);
              console.log(list, "获取到的菜单········");
            });
            console.log("index",index, "row",row);
        }else{
             this.$emit("editData",row);
        }
     
    },
    showDelVisible() {
      var multipleSelection = this.multipleSelection;
      if (multipleSelection == undefined || multipleSelection.length == 0) {
        this.$message({
          message: "未选中数据",
          type: "error",
          duration: 1200
        });
        return;
      }
      this.delVisible = true;
    },
    // 重置密码
    // showResetVisible() {
    //   var multipleSelection = this.multipleSelection;
    //   if (multipleSelection == undefined || multipleSelection.length == 0) {
    //     this.$message({
    //       message: "未选中数据",
    //       type: "error",
    //       duration: 1200
    //     });
    //     return;
    //   }
    //   this.resetVisible = true;
    // },
    deleteByIds() {
      var multipleSelection = this.multipleSelection;
      var delIds = [];
      for (var i = 0; i < multipleSelection.length; i++) {
        delIds.push(multipleSelection[i].id);
      }

      //删除
      var vm = this;
      var api = this.delapi;
      var dform = { ids: delIds };
      let token = localStorage.getItem("token");
      //发送请求,删除id为row.id的数据

      this.$axios
        .post(path + api, dform, {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token
          }
        })
        .then(function(response) {
          let ret = response.data;

          //删除成功
          if (ret.resultStatus.resultCode == "0000") {
            // if (ret > 0) {
            //删除成功
            vm.$refs["menutool"].query();
            vm.$message({
                        message: '删除成功!',
                        type: 'success',
                        duration: 600
                    });
          } else {
            //更新失败
            vm.$message({
              message: "删除失败",
              type: "error",
              duration: 1200
            });
          }

          vm.delVisible = false;
        })
        .catch(function(error) {
          setTimeout(() => {
            vm.alertInfo("请求失败!" + error);
          }, 150);
        });

      console.log(delIds);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    // console.log("只是点击获取值的时间-------");
    
    },
    openDelete(index, row) {
      var arr = new Array();
      arr.push(row);
      this.multipleSelection = arr;
      //this.deleteByIds();
      this.delVisible = true;
    },
    resetpwd(index,row){
     console.log(index, row);
      var _this = this
      _this.Form.id = row.id
      console.log(" _this.form.id", _this.Form.id);
      
     this.resetVisible = true;
    },
    // 分页
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.$refs["menutool"].query();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      this.$refs["menutool"].query();
    },
    //拉取表格数据
    getTableData(sform) {
      var vm = this;
      this.loading = true;

      var api = this.queryapi;
      
      sform.pageSize = this.pageSize;
      sform.pageNum = this.currentPage;

      let token = localStorage.getItem("token");
      console.log("query.................");
      console.log(sform);
      console.log("query.................");
      this.$axios
        .post(path + api, sform, {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + token
          }
        })
        .then(function(response) {
          let ret = response;
          console.log(ret.data.value,"这是我要的数据----");
          if (ret.status == "200") {
            let arrData = []
            arrData.push(ret.data.value)
            vm.tableData = ret.data.value.list ? ret.data.value.list.map(item => {
              if(item.status){
                item.status = item.status === 0 ? "无效" : "有效"
              }
              if(item.radius){
                item.radius = item.radius + "km"
              }
              if(item.isOnline){
                item.isOnline = item.isOnline === 1 ? "在线" : "离线"
              }
              if(item.sex){
                item.sex = item.sex === 1 ? "男" : "女"
              }
              if(item.state){
                item.state = item.state === 1 ? "启用" : "停用"
              }
              if(item.type){
                if(item.type === 1){
                  item.type = "出境游"
                }else if(item.type === 2){
                  item.type = "短途游"
                }else{
                  item.type ="长途游"
                }
              }
              return item
            }) : arrData
            // console.log(vm.tableData[0].isOnline === 0)
            console.log(vm.tableData);
            console.log("查询单个景点");
            vm.total = ret.data.value.total;
            vm.loading = false;
            vm.$message({
              message: "更新成功!",
              type: "success",
              duration: 900
            });
          }
        })
        .catch(err => {
          console.log("请求成功，为什么会走这里呢")
          setTimeout(() => {
            vm.alertInfo("请求失败!!!" + err);
          }, 150);
          
        });
    },
    alertInfo(msg) {
      this.$alert(msg, "提示", {
        confirmButtonText: "确定",
        type: "warning",
        callback: action => {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("token");
          this.$router.push("/login");
        }
      });
    },
    onSearch(sform) {
      // console.log(sform)
      //this.getTableData(sform);
      //将searchForm传递给父组件
      this.$emit("search", sform);
    },
    refreshTable() {
      this.$refs["menutool"].query();
    }
  }
};
</script>

<style lang="less">
// section{
//   width: 100%;
//   height: 100%;
//   #tablearea{
//     width: 80%;
//   }
// }

</style>

