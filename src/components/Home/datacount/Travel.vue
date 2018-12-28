<template>
  <div id="Emitters">

       		<ComTable 
       					:contenttitl="contenttitl"
		       			:showTools="showTools"
		       			:showRFID="showRFID"
		       			:tableitems='tableitems' 
		       			:queryapi="queryapi"
		       			:showScenery='showScenery'
		       			:showQueryDate='showQueryDate'
		       			:scenerylistquery='scenerylistquery'
		       			:delapi="delapi"
                :showAddtravel="showAddtravel"
                :showcleartravel ="showcleartravel"
		       			v-on:search="onSearch"
		       			v-on:addData2="addData2"
		       			v-on:editData="editData"
	       							ref="tumitable"/>
	       	
	   
	       	<!--发射源添加-->
   			 <el-dialog  title="" :visible.sync="addVisible" style="" width="520px" :close-on-click-modal="false">
            
            				<div style="margin:-30px 0 6px 29px;font: 18px '微软雅黑';border-left: 4px solid #F98319;padding-left: 9px;color:#FEA062 ;">添加行程</div>
							<el-form :model="addForm" ref="addForm" label-width="100px" :rules="addFormRules" style="width:100%;border-top: 2px solid #FCD4B0;">
								
							  <el-form-item style="margin: 47px auto 30px;width: 330px;" label="发布对象" prop="informRange" >
							    <el-select  v-model="addForm.informRange" placeholder="请选择范围">
							     <el-option v-for="item in sceneryspoteditlist" :label="item.name" :value="item.id"></el-option>
							    </el-select>
							  </el-form-item>

								<el-form-item style="margin: 30px auto;width: 330px;" label="行程名称" prop="name" >
							    <el-input  v-model="addForm.name" autocomplete="off"></el-input>
							  </el-form-item>
							  
							  <el-form-item style="margin: 30px auto;width: 330px;" label="行程内容" prop="content" >
							   <el-input
										type="textarea"
										:autosize="{ minRows: 2, maxRows: 4}"
										placeholder="请输入内容"
										v-model="addForm.content">
									</el-input>
							  </el-form-item>
							  
							 
							  
														  
							</el-form>
				        
				       <span slot="footer" class="dialog-footer">
							<el-button @click="clearData" size="small">清空</el-button>
							<el-button type="primary" style="background: #FA841A;"  size="small" @click="save">保存</el-button>
            </span>
        </el-dialog>	
        
        	
   			 		
	       							
				
    </div>
    
    
</template>

<script>
import ComTable from "../../ComTable";
import common from "../../common/common.js";
import {path} from '../../../api/api'
export default {
  components: {
    ComTable
  },
  data() {
  	
  	//自定义校验，播报半径校验，正整数
  	var validatePass = (rule, value, callback) => {
        if (value==undefined || value === '') {
          callback(new Error('播报半径不能为空'));
        } else {
          if (this.addForm.radius !== '') {
          	var num = Number(value);
          	if(typeof num === 'number' && num%1 === 0 && num>0){
          		 callback();
          	}else{
          		callback(new Error('播报半径必须为正整数'));
          	}
            
          }
         
        }
      };
    return {
			
    	contenttitl:{
    		name:'首页',
    		description:'行程信息',
    		tabledesctiption:'共有行程',
    		unit:'条'
    	},
    	queryapi:'/tourists/trip/selectTrip',
    	delapi:'/tourists/trip/deleteTrip',
    	saveapi:'/tourists/trip/addTrip',
    	// updateapi:'/device/rfid/update',
    	scenerySpotId:'',
    	editVisible:false,
    	addForm:{
    		// sceneryId:'',
    		scenerySpotId:'',
				informRange:'',
				name:'',
				content:'',
    	},
    	
    	showAdd:false,
			numberValidateForm: {
		     age: ''
	    },
    	addVisible:false,
    	showQueryDate:true,
    	// fridtype:1,
      showTools: {
      	tools:true,
      	travel:true,
      	date:true
      },
      showRFID:true,
      showAddtravel:true,
      showcleartravel:true,
			showScenery:true,
			scenerylist:[
				
			],
			sceneryspotlist:[],
			scenerylistquery:[
				
			],
			sceneryspoteditlist:[],
      tableitems:[
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
              hidden:true,
              unsortable: true,
              align: "center"
            }
          ]
       },
        {
          hasSubs: false,
          subs: [
            {
              label: "行程名称",
              prop: "name",
              width: "360",
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
              label: "旅游团",
              prop: "receiver",
              width: "360",
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
              label: "行程内容",
              prop: "content",
              width: "390",
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
              hidden:true,
              searchable: true,
              addable: true,
              unsortable: true,
              align: "center"
            }
          ]
        },{
          hasSubs: false,
          subs: [
            {
              label: "景点id",
              prop: "scenerySpotId",
              width: "200",
              type: "number",
              editable: true,
              searchable: true,
              hidden:true,
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
              prop: "createTimeStr",
              width: "360",
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
      ],
      	addFormRules:{
    		 no: [
            { required: true, message: '请输入发射源编号', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          radius: [
            { validator: validatePass,required: true, trigger: 'blur' }
          ],
          sceneryId: [
            { required: true, message: '请选择景区', trigger: 'change' }
          ],
          scenerySpotId: [
            {  required: true, message: '请选择景点', trigger: 'change' }
          ],
          lon: [
            {type:'number', required: true, message: '请输入合法经度，例如111.123456', trigger: 'blur' }
          ],
          lat: [
            {type:'number', required: true, message: '请输入合法纬度，例如39.123456', trigger: 'blur' }
          ]
    	},
      row:''
    };
  },
  methods:{
  	//修改
  	update(){
  		
  		
  		var _this = this;
  		var sform = this.editForm;
  		sform.type=1;
			var token = localStorage.getItem("token");
  		console.log('update...............................')
  		console.log(sform)
  		var api = this.updateapi;
  		common.commonUpdateByPost(path+api,sform,token,function(){
  				_this.refreshTable();
  				_this.editVisible=false;
  		});
  		
  	},
  	//编辑
  	editData(row){
  		this.row = row;
  		var _this = this;
  		
  		//根据当前景区id获取景点信息
  		
  		//清空editForm
  		common.clearattribute(_this.editForm);
  		
  		//复制row到editForm
  		common.copyattribute(_this.editForm,row);
  		
  		//显示编辑页面
  		this.editVisible=true;

  	},
  	//刷新表格
  	refreshTable(){
  		
  		this.$refs['tumitable'].refreshTable();
  		this.addVisible=false;
  	},
  	save(){
  		var sform = this.addForm;
			var token = localStorage.getItem("token");
  		var _this = this;
  		var api = this.saveapi;
  		common.commonUploadByPost(path+api,sform,token,function(){
  				_this.refreshTable();
  		});
  	},
  	clearData(){
  		var _this = this;
  		//清空editForm
  		common.clearattribute(_this.addForm)
  	},
  	submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      
    },
  	addData2(){
  		this.addVisible=true
  	},
  	showSetting:function(name){
  		alert('hello:'+name)
  	},
  	getSceneryList(){
  			var token = localStorage.getItem("token");

		    //alert(token)
		    var _this = this;
		
		    
		     this.$axios.post(path+"/scenery/scenery/selectSceneryIdAndName", {}, {
		        headers: {
		            'Authorization':"Bearer " + token
		        }
		    }).then(function (response) {
				
				
		    	let data = response.data.value;
		    	
		    	let scenerylist= data.slice();
		    	
		    	_this.scenerylist=scenerylist;
		    	
		    	//data.push({id: 0, name: "查询全部"})
		    	data.splice(0, 0, {id: 0, name: "查询全部"});
		    	_this.scenerylistquery = data;

		    	//获取表格数据
		    	_this.getTableData({});
		    })
  	},
  	onSearch(sform){

			sform.type=this.fridtype;
			
			this.getTableData(sform);
    },
    getTableData(sform){
		
		
			var _scenerylist = this.scenerylist;
			var sceneryId=[];
			//查询全部
			if(sform.sceneryIdId ===undefined || sform.sceneryIdId==0){

					for(var i = 0;i<_scenerylist.length;i++){	
							
							sceneryId.push(_scenerylist[i].id)	
					}
					
	  	}else{
	  		sceneryId.push(sform.sceneryIdId)
	  	}
			
	  	//获取表格数据
	  	sform.type = this.fridtype;
	  	sform.sceneryId=sceneryId
	  	
	  	this.$refs['tumitable'].getTableData(sform);
	    }
  },
  activated() {
           
  },
  mounted() {
  	
  	//查询景区服务商并并获取表格数据
	  	this.getSceneryList();

  },
  watch:{
  	"addForm.sceneryId": function sceneryId(){
				//通过检测景区id的修改查询景点id
				var api = "/scenery/webdata/getsceneryspotbysceneryid";
				let token = localStorage.getItem("token");
				let sform = {
					sceneryId:this.addForm.sceneryId
				}
				var vm = this;
				this.addForm.scenerySpotId='';
			
			    	
			    	 common.commonPost(path+api,sform,token,function(data){
			    	 	vm.sceneryspotlist=data.value
			    	 });
			 },
			 "editForm.sceneryId": function sceneryId(value){
			 	//alert(value != )
			 	
			 	if(this.row.sceneryId == value){
			 		this.editForm.scenerySpotId = this.row.scenerySpotId;
			 	}else{
			 		this.editForm.scenerySpotId=''
			 	}
				//通过检测景区id的修改查询景点id
				var api = "/scenery/webdata/getsceneryspotbysceneryid";
				let token = localStorage.getItem("token");
				let sform = {
					sceneryId:this.editForm.sceneryId
				}
				var vm = this;
				this.addForm.scenerySpotId='';

	    	 common.commonPost(path+api,sform,token,function(data){
	    	 		vm.sceneryspoteditlist=data.value
	    	 });
			 }
  }
};
</script>

<style lang="less">
	
	el-dialog .el-input__inner{
		width: 330px;
	}
</style>
