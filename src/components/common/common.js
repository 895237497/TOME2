import axios from 'axios'
import {path} from '../../api/api'

export default {
	
	//对象属性复制
	copyattribute(oldObj,newObj){
		for(var att in oldObj){
			if(newObj[att] !=undefined && newObj[att] !=''){
				oldObj[att]=newObj[att]
			}
		}
	},
	//清空对象属性
	clearattribute(obj){
		for(var att in obj){
			obj[att]=''
		}
	},
	//日期转换,Long转字符串
	dateformat: function (longtime) {
        if (longtime == "" || longtime == null) {
            return ""
        }
        var nTime = new Date(longtime);
        var month = nTime.getMonth() + 1;
        var day = nTime.getDate();
        var hour = nTime.getHours();
        var minute = nTime.getMinutes();
        var second = nTime.getSeconds();
        return nTime.getFullYear() + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day) + " " + (hour < 10 ? ("0" + hour) : hour) + ":" + (minute < 10 ? ("0" + minute) : minute) + ":" + (second < 10 ? ("0" + second) : second)
   },
   commonPost:function(url,sform,token,fn){
   	
   	 return axios.post(url,sform,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token
            }
        }).then(function (response) {
			console.log('====================================================================')
			console.log(response.data)
			fn(response.data)
		
        }).catch(function (error) {
        	console.log("请求出错")
           return {};
        })
   	   	
   },
   commonUploadByPost:function(url,sform,token,fn){
   		//fn();
   		
   		axios.post(url,sform,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token
            }
        }).then(function (response) {
			console.log('====================================================================')
			console.log(response.data,"添加获取到的数据-----")
			fn();
		
        }).catch(function (error) {
        	console.log("请求出错")
           return {};
        })
   },
   commonUpdateByPost:function(url,sform,token,fn){
   		//fn();
   		
   		axios.post(url,sform,{
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + token
            }
        }).then(function (response) {

			fn();
		
        }).catch(function (error) {
        	console.log("请求出错")
           return {};
        })
   }
   
}