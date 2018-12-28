<template>
    <div id="table">
           <div class="tab">
                 <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="设备IMIE"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.num }}</template>
                    </el-table-column>
                     <el-table-column
                    label="机器码"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.address }}</template>
                    </el-table-column>
                     <el-table-column
                    label="旅游团"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.count }}</template>
                    </el-table-column>
                     <el-table-column
                    label="景区"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.service }}</template>
                    </el-table-column>
                     <el-table-column
                    label="分配状态"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.spot }}</template>
                    </el-table-column>
                    <el-table-column
                    label="通讯号码"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.spot }}</template>
                    </el-table-column>
                    <el-table-column
                    label="软件版本"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.spot }}</template>
                    </el-table-column>
                    <el-table-column
                    label="电量"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.spot }}</template>
                    </el-table-column>
                    <el-table-column
                    label="状态"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.spot }}</template>
                    </el-table-column>
                   <el-table-column label="操作">
                         <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                             <el-button
                            size="mini"
                            type="danger"
                            @click="handleClose(scope.$index, scope.row)">关机</el-button>
                         </template>
                       </el-table-column>
                </el-table>
            </div> 
             <!-- 分页 -->
         <div class="pag">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
                </el-pagination>            
         </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      tableData3: [
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="less">
#table {
  .tab {
    margin-top: 20px;
    border: 1px solid #ccc;
  }
  .pag {
    margin-top: 20px;
    margin-left: 64%;
  }
}
</style>
