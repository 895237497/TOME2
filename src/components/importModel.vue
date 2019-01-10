<template>
   <div class="wrap">
       <el-dialog title="请下载表格模板，填写再上传" :visible.sync="centerDialogVisible" width="30%" center :close-on-click-modal="false" :before-close="hide">
            <div class="btn_warp">
                <el-button size="medium" @click="download">点击下载模板</el-button>
                <el-upload class="upload-demo" :on-success="success" :headers="token" :show-file-list="false" :action="updateUrl" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="hide">取 消</el-button>
                <el-button type="primary" @click="hide">确 定</el-button>
            </span> -->
        </el-dialog>
   </div>
</template>
<script>
    export default {
        data(){
            return {
                token:{Authorization:'Bearer' + localStorage.getItem('token')}
            }
        },
        props: ["centerDialogVisible","updateUrl","downloadUrl"],
        
        methods : {
            hide(){
                this.$emit("hideCenterDialogVisible")
            },
            download(){
                this.$axios({
                    method: 'get',
                    url: this.downloadUrl,
                    responseType: 'blob',
                }).then((res) => {
                        console.log(res)
                        const link = document.createElement('a')
                        let blob = new Blob([res.data],{type: 'application/vnd.ms-excel'});
                        link.style.display = 'none'
                        link.href = URL.createObjectURL(blob);
                        let num = ''
                        for(let i=0;i < 10;i++){
                        num += Math.ceil(Math.random() * 10)
                        }
                        link.setAttribute('download', '导入模板' + '.xlsx')
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                    }).catch(error => {
                        console.log(error)
                    })
            },
            success(){
                this.$message({
                    type: 'success',
                    message: '导入成功'
                });
                setTimeout( ()=> {
                    this.$emit("hideCenterDialogVisible")
                },200)
            }
        }
    }
</script>
<style lang="less" scoped>
    .btn_warp{
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }
</style>

