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
		       			:showSelectionColumn="showSelectionColumn"
		       			:showButtonEdit="showButtonEdit"
		       			v-on:search="onSearch"

	       							ref="tumitable"/>
	       	
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
  	
    return {
    	showSelectionColumn:true,
    	showButtonEdit:true,
    	showTools: {
    		tools:true,
      	no:true,
      	scenery:true,
      	date:true,
      	RFIDType:true
      },
    	contenttitl:{
    		name:'发射源管理',
    		description:'发射源统计',
    		tabledesctiption:'发射源统计记录',
    		unit:'条'
    	},
    	queryapi:'/device/fridlog/log/countbyfrid',
    	delapi:'/device/fridlog/log/del',
    	scenerySpotId:'',
    	editVisible:false,
    	addForm:{
    		sceneryId:'',
    		scenerySpotId:'',
    		type:0
    	},
    	editForm:{
    		id:'',
    		no:'',
    		address:'',
    		radius:'',
    		sceneryId:'',
    		scenerySpotId:'',
    		type:0,
    		lon:'',
    		lat:''
    	},
    	showAdd:false,
    	 numberValidateForm: {
          age: ''
        },
    	addVisible:false,
    	showQueryDate:true,

      showRFID:true,
			showScenery:true,
			scenerylist:[
				
			],
			sceneryspotlist:[],
			scenerylistquery:[
				
			],
			sceneryspoteditlist:[],
      tableitems: [
 {
          hasSubs: false,
          subs: [
            {
              label: "发射源编号",
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
              label: "地址",
              prop: "address",
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
              label: "访问次数",
              prop: "total",
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
              label: "景区服务商",
              prop: "sceneryName",
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
              label: "旅游景点",
              prop: "scenerySpotName",
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
        },{
          hasSubs: false,
          subs: [
            {
              label: "发射源类型",
              prop: "type",
              width: "200",
              type: "number",
              editable: true,
              searchable: true,
              addable: true,
              unsortable: true,
              align: "center",
              format:function(row){
              	if(row.type==0){
              		return "RFID";
              	}else{
              		return "位置版";
              	}
              }
            }
          ]
        },
         {
          hasSubs: false,
          subs: [
            {
              label: "创建时间",
              prop: "createTime",
              width: "200",
              type: "date",
              editable: false,
              searchable: true,
              addable: false,
              unsortable: true,
              align: "center",
              format:function(row){
              	return common.dateformat(row.createTime);
              }
            }
          ]
        },
      ]
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
			
			this.getTableData(sform);
    },
    getTableData(sform){
		
		
			var _scenerylist = this.scenerylist;
			var sceneryIds=[];
			//查询全部
			if(sform.sceneryIdId ===undefined || sform.sceneryIdId==0){

					for(var i = 0;i<_scenerylist.length;i++){	
							
							sceneryIds.push(_scenerylist[i].id)	
					}
					
	  	}else{
	  		sceneryIds.push(sform.sceneryIdId)
	  	}
	  	//判断查询的RFID类型
	  	
			if(sform.RFIDType !=undefined && sform.RFIDType!=-1){
				sform.type = sform.RFIDType;
			}
			
	  	//获取表格数据
	  	
	  	sform.sceneryIds=sceneryIds
	  	
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
  	
  }
};
</script>

<style lang="less">
	
	el-dialog .el-input__inner{
		width: 330px;
	}
</style>
