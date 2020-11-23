
// function lazyImg() {
//     echo.init({
//         offset: 100,//可视区域多少像素可以被加载
//         throttle: 0//设置图片延迟加载时间
//     });
// }
function localParam(search, hash) {
    search = search || window.location.search;
    hash = hash || window.location.hash;
    var fn = function (str, req) {
        if (str) {
            var data = {};
            str.replace(req, function ($0, $1, $2, $3) {
                data[$1] = $3;
            })
            return data;
        }
    }
    return {
        search: fn(search, new RegExp("([^?=&]+)(=([^&]*))?", "g")) || {},
        hash: fn(hash, new RegExp("([^#=&]+)(=([^&]*))?", "g")) || {}
    }
}
function setScrollTop(val=0) {
    //解决白屏
    setTimeout(() => {
        document.body.scrollTop = val;
        document.documentElement.scrollTop = val;
    }, 300);
}
//判断使用平台
function isSystem(){
    var isWeixin=/micromessenger/i.test(navigator.userAgent);
    var isQq=/QQ/i.test(navigator.userAgent);
    var isAndroid=/Android/i.test(navigator.userAgent);
    var isPhone=/iphone/i.test(navigator.userAgent);
    var isPcWindow=/window/i.test(navigator.userAgent);
    var isPcMac=/mac/i.test(navigator.userAgent);
    if(isWeixin){
        return 0;
    }
    else if(isPhone&&!isQq){
        return 1;
    }
    else if(isAndroid&&!isQq){
        return 2;
    }
    else if(isPcWindow){
        return 3;
    }
    else if(isPcMac&&!isQq){
        return 4;
    }
    else if(isQq){
        return 5;
    }
}
export {
    localParam,setScrollTop,isSystem
}