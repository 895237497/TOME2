export function MP(ak) {  
  return new Promise(function (resolve, reject) {  
    window.onload = function () {  
      resolve(BMap)  
    }  
    var script = document.createElement("script");  
    script.type = "text/javascript";  
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=yE8uOs6F5xXa4ZzTGCUc5hN05moh5Zck&callback=init";  
    script.onerror = reject;  
    document.head.appendChild(script);  
  })  
} 
