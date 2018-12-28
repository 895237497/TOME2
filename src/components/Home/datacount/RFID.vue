<template>
  <div id="Emitters">

       		<ComTable 
       					:contenttitl="contenttitl"
		       			:showTools="showTools"
		       			:showRFID="showRFID"
		       			:tableitems='tableitems' 
		       			:queryapi="queryapi"
		       			:showScenery='showScenery'
								:showExport="showExport" 
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
    		name:'RFID管理',
    		description:'RFID发射源统计',
    		tabledesctiption:'共有RFID',
    		unit:'个'
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
      showExport:true, 
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
              label: "发射源编号",
              prop: "no",
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
              label: "地址",
              prop: "address",
              width: "436",
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
              label: "播报次数",
              prop: "total",
              width: "400",
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
              label: "旅游景点",
              prop: "sceneryName",
              width: "436",
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
         
				 
      ],
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
