<template>
   <section>
		<el-row>
			<div style="margin: 24px 0 0 13px;font:14px;color: #919191;border-left: 4px solid #F98319;padding-left:8px ;">
				{{tilte}}<strong style="color: #F98319;padding: 0 5px;font: 14px;">-</strong>
			</div>
		</el-row>
		<!--工具条-->
     <el-row style="margin:34px 0 0 89px;font: 14px;" v-if="showMenu">
	           	    <div class="input" v-if="showRFID">
                       <span class="label">发射源编号</span>
											 <div class="con">
												 <input type="text">
											 </div>
									</div>

									
	           	    
								 <div class="input" v-if="showDevice">
                       <span class="label">设备IMEI</span>
											 <div class="con">
												 <input type="text">
											 </div>
								 </div>

									<div class="input" v-if="showPhone">
                       <span class="label">手机号</span>
											 <div class="con">
												 <input type="text">
											 </div>
									</div>

									<div class="input" v-if="showService">
                       <span class="label">景区</span>
											 <div class="con">
												 <el-select v-model="value" placeholder="请选择">
															<el-option
																v-for="item in options"
																:key="item.value"
																:label="item.label"
																:value="item.value">
															</el-option>
														</el-select>
											 </div>
									</div>

									<div class="input" v-if="showAllot">
                       <span class="label">分配状态</span>
											 <div class="con">
												 <input type="text">
											 </div>
									</div>

									<div class="input" v-if="showDeviceNum">
                       <span class="label">设备号</span>
											 <div class="con">
												 <input type="text">
											 </div>
									</div>

									<div class="input" v-if="showVersion">
                       <span class="label">版本号</span>
											 <div class="con">
												 <input type="text">
											 </div>
									</div>

									<div class="input" v-if="showNameID">
                       <span class="label">用户名</span>
											 <div class="con">
												 <input type="text">
											 </div>
									</div>

									<div class="input" v-if="showLoginName">
                       <span class="label">登录名</span>
											 <div class="con">
												 <input type="text">
											 </div>
									</div>

									<div class="input" v-if="showRole">
                       <span class="label">角色</span>
											 <div class="con">
												 <input type="text">
											 </div>
									</div>

									<div class="input" v-if="showName">
                       <span class="label">名称</span>
											 <div class="con">
												 <input type="text">
											 </div>
									</div>

									<div class="input" v-if="showState">
                       <span class="label">状态</span>
											 <div class="con">
												 <el-select v-model="value" placeholder="状态">
															<el-option
																v-for="item in options"
																:key="item.value"
																:label="item.label"
																:value="item.value">
															</el-option>
														</el-select>
											 </div>
									</div>
	           	   
										<div class="input" v-if="showDate">
                       <span class="label">日期</span>
											 <div class="con">
												 <div class="block1" style="display: inline;">
														<el-date-picker
															v-model="value1"
															type="date">
														</el-date-picker>
													</div>
													<div class="block1" style="display: inline;">
														<el-date-picker
															v-model="value2"
															align="right"
															type="date"
															:picker-options="pickerOptions1">
														</el-date-picker>
												</div>
											 </div>
										 </div>

												<div class="input" v-if="showRobotNum">
                          <span class="label">机器码</span>
													<div class="con">
														<input type="text">
													</div>
								  	    </div>
									  
								
								
        </el-row>
        <el-row>
        	<el-col :span="24" align="rignth" >
        		<div style="float:right">
        				<!-- <img src="../assets/images/juse.png" alt="" srcset=""> -->
								<el-button round size="small" @click="alertMessege">查询</el-button>
								<el-button round size="small">重置</el-button>
        		</div>
        	</el-col>
        </el-row>
        <el-row>
        	<div style="width: 1512px;margin-left:34px;border-bottom: 1px solid #FED3B0;padding-bottom: 10px;padding-left: 53px;">
        		共有位置版发射源:2个
        	</div>
        </el-row>
        
         <el-row style="margin-left: 89px;">
        		<el-button round  @click="dialogFormVisible = true" size="small" v-if="Info">新增</el-button>
        		<el-button round size="small" v-if="del">删除</el-button>
        		<el-button round size="small" v-if="inc">导入</el-button>
        		<el-button round size="small" v-if="educe">导出</el-button>
        		<el-button round size="small" v-if="add">添加设备</el-button>
        		<el-button round size="small" v-if="assign">分配设备</el-button>
        		<el-button round size="small" v-if="incDevice">导入设备</el-button>
        		<el-button round size="small" v-if="expDev">导出设备</el-button>
						<el-button round size="small" v-if="SimJetSoft">一键关机</el-button>
         </el-row>
      
			     <!-- 模态框 -->
        <el-dialog title="新增" :visible.sync="dialogFormVisible">
						<el-form :model="form" >

               
									<el-form-item label="景区服务商*" :label-width="formLabelWidth" >
										<el-input v-model="form.name" autocomplete="off"></el-input>
									</el-form-item>
               
									<el-form-item label="通讯地址*" :label-width="formLabelWidth" >
										<el-input v-model="form.address" autocomplete="off"></el-input>
									</el-form-item>
               
									<el-form-item label="负责人*" :label-width="formLabelWidth" >
										<el-input v-model="form.person" autocomplete="off"></el-input>
									</el-form-item>
							 
									<el-form-item label="负责人电话*" :label-width="formLabelWidth" >
										<el-input v-model="form.phone" autocomplete="off"></el-input>
									</el-form-item>
							 	
							 
								<el-form-item label="经纬度*" :label-width="formLabelWidth" >
									<el-input v-model="form.jwd" autocomplete="off"></el-input>
								</el-form-item>

								<el-form-item label="景区*" :label-width="formLabelWidth" >
									<div><span>青城山</span>&nbsp;	&nbsp; <span>青城山</span>	&nbsp;	&nbsp;<span>青城山</span></div>
									<el-input v-model="form.jwd" autocomplete="off" placeholder="请选择景区...."></el-input>
								</el-form-item>

								<el-form-item label="景区*" :label-width="formLabelWidth" >
									<el-select v-model="value" placeholder="请选择">
												<el-option
													v-for="item in options"
													:key="item.value"
													:label="item.label"
													:value="item.value">
												</el-option>
											</el-select>
								</el-form-item>

								<el-card class="box-card">
									<div slot="header" class="clearfix">
										<span>用户名称</span>
									</div>
									<div v-for="o in 4" :key="o" class="text item">
											<el-checkbox v-model="checked">备选项</el-checkbox>
									</div>
								</el-card>
							 	
						</el-form>
							<div slot="footer" class="dialog-footer">
								<!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
								<el-button type="warning" @click="dialogFormVisible = false">添 加</el-button>
							</div>
        </el-dialog>


        <el-row>
        	&nbsp;
        </el-row>
    </section>
</template>
<script>
export default {
  data() {
    return {
      checked:'',
      value:'',
      /*showRFID: false,
      showMenu: false,
      showRobotNum: false,
      showDevice: false,
      showPhone: false,
      showService: false,
      showAllot: false,
      showDeviceNum: false,
      showVersion: false,
      showNameID: false,
      showLoginName: false,
      showRole: false,
      showName: false,
      showState: false,
      showDate: false,
      Info: false,
      del: false,
      inc: false,
      educe: false,
      add: false,
      assign: false,
      incDevice: false,
      expDev: false,
      SimJetSoft: false,*/
      tilte: "景区服务商",
      //模态框
  /*    showform: false,
      showInputName: false,
      showInputAddress: false,
      showInputPerson: false,
      showInputphone: false,
      showInputjwd: false,*/

      // 模态框
      dialogFormVisible: false,
      form: {
        name: "",
        address: "",
        person: "",
        phone: "",
        jwd: ""
      },
      formLabelWidth: "100px",

      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value3: "",
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  },
  props: [
    "showMenu",
    "showRFID",
    "showRobotNum",
    "showDevice",
    "showPhone",
    "showService",
    "showAllot",
    "showDeviceNum",
    "showVersion",
    "showNameID",
    "showLoginName",
    "showRole",
    "showName",
    "showState",
    "showDate",
    "Info",
    "del",
    "inc",
    "educe",
    "add",
    "assign",
    "incDevice",
    "expDev",
    "SimJetSoft",
    "showForm",
    "showInputName",
    "showInputAddress",
    "showInputPerson",
    "showInputPhone",
    "showInputjwd"
  ],
  methods:{
  	alertMessege:function(){
  		alert('111');
  		this.$emit('showSetting', 'ljb')
  	}
  }
};
</script>

<style lang="less">
section {
  .input {
    display: inline-block;
    margin-right: 50px;
    margin-top: 20px;
  }
  .label {
    display: inline;
    font-size: 16px;
    text-align: right;
  }
  .con {
    display: inline;
    input {
      width: 186px;
      height: 30px;
      background: #f0f1f5;
      border-radius: 5px;
      margin-left: -26px;
    }
    .block {
      display: inline;
    }
    .el-input__icon {
      margin-top: -4px;
      margin-left: -20px;
    }
    .el-input__icon {
      color: #ff6600;
    }
  }
  // 模态框
  .el-dialog__header {
    border-bottom: #ff6600 1px solid;
  }
  .el-dialog__title {
    color: #ff6600;
  }
  .el-input__inner {
    width: 285px;
  }
  .el-dialog__footer {
    width: 95%;
    text-align: center;
  }
  .el-button--warning {
    width: 100px;
    span {
      font-size: 16px;
    }
  }
  .el-dialog {
    width: 520px;
  }
  .el-card.box-card.is-always-shadow {
    width: 285px;
    margin-left: 100px;
    text-align: center;
    border: 1px solid #ff6600;
    .el-card__header {
      background: #ffefdd;
      span {
        color: #fb8c32;
      }
    }
    // .el-dialog__body {
    //   .el-checkbox__inner {
    //     display: inline-block;
    //     position: relative;
    //     left: -15px;
    //   }
    // }
  }
  .el-pagination {
    .el-input__inner {
      width: 100px;
    }
  }
}
</style>

