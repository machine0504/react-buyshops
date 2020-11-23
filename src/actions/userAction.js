//登录信息获取
function login(data) {
    return {
        type: 'login',
        data: data
    }
}
//安全退出
function outlogin() {
    return {
        type: 'outlogin',
        data: {}
    }
}
//修改地址
function edit(data) {
    return {
        type: 'edit',
        data: data
    }
}
//修改头像
function checkHeadImg(data){
    return{
        type: 'checkHeadImg',
        data: data 
    }
}
// function addorderdata(data){
//     return{
//         type:'addorderdata',
//         data:data
//     }
// }
export {
    login,outlogin,edit,checkHeadImg
}