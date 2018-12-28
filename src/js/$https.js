function $https (url, method, param/*键值对*/, callback/*回调函数*/) {


	if(method == "GET"){

		console.log("get method...")
		console.log("token="+localStorage.getItem("token"))

		var newUrl = '';

		if(param){
		
			// newUrl = 'http://192.168.0.158:9090' + url + '?' + param + '&time=' + new Date().getTime()    // 权限接口根路径
			newUrl =  url + '?' + param + '&time=' + new Date().getTime()+'&token='+sessionStorage.getItem("token")
			

		}else{

			// newUrl = 'http://192.168.0.158:9090' + url + '?time=' + new Date().getTime()    // 权限接口根路径
			newUrl =  url + '?' + 'time=' + new Date().getTime()
		}
		console.log('newUrl: ' + newUrl)

		fetch(newUrl)
			.then((res) => {
				console.log(res.json())
				return res.json()

			})
			.then((data) => {
				console.log("获取到数据了")
				callback(data)
			})
			.catch((error) => {
				console.log('error is', error)
			})

	}else if(method == "POST"){

		console.log('method: '+ method)
		// let headers = {
		// 	'Access-Control-Allow-Origin': '*',
		// 	'Content-Type': 'application/json',
		// }

		let headers = new Headers({    
			'Access-Control-Allow-Origin': '*',
    		'Content-Type': 'application/json',

    	})

		if(localStorage.hasOwnProperty('loginToken')){
			
			let token = JSON.parse(localStorage.getItem('loginToken')).token
			// let token = 'dG9rZW4tMmFjY2VhZDZjMDAzNDY3OTkyM2E5YTBmMjBlZmJhNzQ='

			headers.append('token', token);

		}


		// fetch ('http://192.168.0.158:9090'+url, {    // 权限接口根路径
		fetch(url + '?' + 'time=' + new Date().getTime(), {
			// credentials: 'include',
			method: method,      
			body: JSON.stringify(param),   
			headers: headers,
			mode: 'cors'
		})
		.then((res) => {

			return res.json()
		})
		.then((data) => {
			callback(data)
		})
	}
	
}

export default $https;