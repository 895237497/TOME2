export function MP(ak) {  
  return new Promise(function (resolve, reject) {  
    window.onload = function () {  
      resolve(BMap)  
    }  
    var script = document.createElement("script");  
    script.type = "text/javascript";  
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=8rfzjZUiuce8cTopKFRyQVMYn7qFqG0N&callback=init";  
    script.onerror = reject;  
    document.head.appendChild(script);  
  })  
} 



