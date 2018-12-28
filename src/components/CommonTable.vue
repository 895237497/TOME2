<template>
   <section>
		<el-row>
			<div style="margin: 24px 0 0 13px;font:14px;color: #919191;border-left: 4px solid #F98319;padding-left:8px ;">
				{{tilte}}<strong style="color: #F98319;padding: 0 5px;font: 14px;">-</strong>发射源访问日志
			</div>
		</el-row>
		<!--工具条-->
     <el-row style="margin:34px 0 0 89px;font: 14px;" v-if="showMenu">

		           <div style="display: inline-block;margin-right: 50px;" v-if="showRFID">
			           	<div style="display: inline-block;padding-right: 20px;">
		           			发射源编号
		           		</div>
		           		<div style="display: inline-block;">
           					<input type="" name="" id="" value="" style="width: 186px;background: #F0F1F5;border-radius: 5px;"/>
   						</div>
	           		
	           	    </div>
	           	    
	           	    
	           	    <div style="display: inline-block;margin-right: 50px;">
			           	<div style="display: inline-block;padding-right: 20px;">
		           			景区
		           		</div>
		           		<div style="display: inline-block;">
           					<input type="" name="" id="" value="" style="width: 186px;background: #F0F1F5;border-radius: 5px;"/>
   						</div>
	           		
	           	    </div>
	           	    
	           	    
	           	    <div style="display: inline-block;margin-right: 50px;">
			           	<div style="display: inline-block;padding-right: 20px;">
		           			发射源编号
		           		</div>
		           		<div style="display: inline-block;">
           					<input type="" name="" id="" value="" style="width: 186px;background: #F0F1F5;border-radius: 5px;"/>
   						</div>
	           		
	           	    </div>
	           	       

        </el-row>
        <el-row>
        	<el-col :span="24" align="rignth" >
        		<div style="float: right;">
        				<el-button type="warning" size="small" style="background: red;">查询</el-button>
        				<el-button size="small">重置</el-button>
        		</div>
        	</el-col>
        </el-row>
        <el-row>
        	<div style="width: 1512px;margin-left:34px;border-bottom: 1px solid #FED3B0;padding-bottom: 10px;padding-left: 53px;color: #FA841A;">
        		共有位置版发射源:2个
        	</div>
        </el-row>
        
         <el-row style="margin-left: 89px;">
        		<el-button round size="small">新增</el-button>
        		<el-button round size="small">删除</el-button>
        		<el-button round size="small">导入</el-button>
        		<el-button round size="small">导出</el-button>
         </el-row >
						
         <el-row style="margin-left: 89px;">
         	 <el-table :data="tableData" border highlight-current-row style="width:100%;" 
                  v-loading="loading" @sort-change="sortChange" id="tablearea">

 
 			<el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>

            <el-table-column
                    align="center"
                    type="index"
                    width="83"
                    label="索引"
                    fixed="left">
            </el-table-column>

            <div v-for="items in tableitems">
                <div v-if="items.hasSubs">
                    <el-table-column
                            :label="items.label"
                            header-align="center">


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
                        >
                        </el-table-column>
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
                    >
                   >
                    </el-table-column>
                </div>
            </div>

            <el-table-column label="操作" :width="btswidth" v-if="showImg" align="center">
                	
            </el-table-column>
            
             
        </el-table>
         </el-row>
         
         <!--工具条-->
       <!-- <el-col :span="24" v-if="!hidePagination" align="bottom" style="margin-top:5px;margin-bottom:5px">
            <el-col :span="24" align="right">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page="currentPage" :page-sizes="[20, 40, 80]" :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </el-col>
        </el-col>-->
        <el-row>
        	&nbsp;
        </el-row>
    </section>
</template>
<script>
	
export default {
    data() {
      return {
      	/*loading:false,
      	hidePagination:false,
      	showRFID:false,
      	showMenu:false,*/
      	tilte:"RFID管理",
      	 
      }
    },
    props:[
    	'showMenu',"showRFID",'tableitems'
    ]
  }
</script>

<style lang="less">

</style>

