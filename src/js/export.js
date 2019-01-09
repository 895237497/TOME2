import axios from 'axios'
import {MessageBox,Message} from 'element-ui'
function exportData(url){
    MessageBox.confirm('此操作将数据导出为excel表格, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let headers = { 'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json; application/octet-stream',
                        'Authorization':"Bearer" + localStorage.getItem("token")
                      }   
        axios({
            method: 'get',
            url: url,
            headers: headers,
            responseType: 'blob',
        }).then((res) => {
            Message.success({
              message: '导出成功!'
              });
              console.log(res)
              const link = document.createElement('a')
              let blob = new Blob([res.data],{type: 'application/vnd.ms-excel'});
              link.style.display = 'none'
              link.href = URL.createObjectURL(blob);
              let num = ''
              for(let i=0;i < 10;i++){
                num += Math.ceil(Math.random() * 10)
              }
              link.setAttribute('download', '用户_' + num + '.xlsx')
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }).catch(error => {
                console.log(error)
            })
       
      }).catch(() => {
        Message.info({
          message: '已取消导出'
        });          
      });
    
  }
  export default exportData