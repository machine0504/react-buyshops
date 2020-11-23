//登录信息获取
let userData = {
    uid: localStorage['uid'] !== undefined ? localStorage['uid'] : '',
    name: localStorage['name'] !== undefined ? localStorage['name'] : '',
    isLogin: localStorage['isLogin'] !== undefined ? localStorage['isLogin'] : false,
    isCheckHeadImg: localStorage['isCheckHeadImg'] !== undefined ? localStorage['isCheckHeadImg'] : false,
    userHeadImg: localStorage['userHeadImg'] !== undefined ? localStorage['userHeadImg'] : '',
    //orderid:localStorage['orderid']!==undefined?localStorage['orderid']:'',
}
function userReducer(state = userData, action) {
    switch (action.type) {
        case 'login':
            state.uid = action.uid;
            state.name = action.name;
            state.isLogin = action.isLogin;
            return Object.assign({}, state, action.data);
        case 'outlogin':
            localStorage.removeItem('uid');
            localStorage.removeItem('name');
            localStorage.removeItem('isLogin');
            localStorage.removeItem('isCheckHeadImg');
            localStorage.removeItem('userHeadImg');
            state.uid = '';
            state.name = '';
            state.isLogin = false;
            state.isCheckHeadImg = false;
            state.userHeadImg = '';
            return Object.assign({}, state, action.data);
        case 'edit':
            return Object.assign({}, state, action.data);
        case 'checkHeadImg':
            state.checkHeadImg = action.checkHeadImg;
            state.userHeadImg = action.userHeadImg;
            return Object.assign({}, state, action.data);
        // case 'addorderdata':
        //     state.orderid=action.orderid;
        //     return Object.assign({}, state, action.data);
        default:
            return state;
    }
}
export default userReducer;