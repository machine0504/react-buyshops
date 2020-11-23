import { Toast } from 'antd-mobile'
//购物车添加
let cartData = {
    aCartData: localStorage['cartData'] !== undefined ? JSON.parse(localStorage['cartData']) : [],
    //aCartData: [],
    total: localStorage['total'] !== undefined ? parseFloat(localStorage['total']) : 0,
    freight: localStorage['freight'] !== undefined ? parseFloat(localStorage['freight']) : 0
}
//localStorage.clear();
function cartReducer(state = cartData, action) {
    switch (action.type) {
        case 'addCart':
            addCart(state, action.data);
            return Object.assign({}, state, action);
        case 'delItem':
            delItem(state, action.data);
            return Object.assign({}, state, action);
        case 'checkItem':
            checkItem(state, action.data);
            return Object.assign({}, state, action);
        case 'setAllCheck':
            setAllCheck(state, action.data);
            return Object.assign({}, state, action);
        case 'addCount':
            addCount(state, action.data);
            return Object.assign({}, state, action);
        case 'reduceCount':
            reduceCount(state, action.data);
            return Object.assign({}, state, action);
        case 'clearCart':
            clearCart(state, action.data);
            return Object.assign({}, state, action);
        default:
            return state;
    }

}
//添加商品
function addCart(state, action) {
    let bSameItem = false;
    if (state.aCartData.length > 0) {
        for (let key in state.aCartData) {
            //有相同的商品让它数量加一
            if (state.aCartData[key].gid === action.gid) {
                if (state.aCartData[key].attrs.length > 0) {
                    for (let i in state.aCartData[key].attrs) {
                        if (state.aCartData[key].attrs[i].param.length > 0) {
                            for (let j in state.aCartData[key].attrs[i].param) {
                                if (state.aCartData[key].attrs[i].param[j].value === action.attrs[0].param[0].value) {
                                    for (let a in state.aCartData) {
                                        for (let b in state.aCartData[key].attrs) {
                                            for (let c in state.aCartData[key].attrs[i].param) {
                                                if (state.aCartData[a].attrs[b].param[c].value === action.attrs[1].param[0].value) {
                                                    state.aCartData[a].count += action.count;
                                                    bSameItem = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    //没有相同的商品在添加数据
    if (!bSameItem) {
        state.aCartData.push(action);
    }
    setTotal(state);
    setFreight(state);
    localStorage['cartData'] = JSON.stringify(state.aCartData);
}
//删除购物车里面的商品
function delItem(state, action) {
    state.aCartData.splice(action.index, 1)
    localStorage['cartData'] = JSON.stringify(state.aCartData);
    setTotal(state);
    setFreight(state);
}
//重新计算商品价格封装
function setTotal(state) {
    let total = 0;
    for (let key in state.aCartData) {
        if (state.aCartData[key].checked) {
            total += parseFloat(state.aCartData[key].price) * parseInt(state.aCartData[key].count)
        }
    }
    state.total = parseFloat(Math.round(total).toFixed(2));
    //长期存储
    localStorage['total'] = state.total
}
//计算运费价格封装
function setFreight(state) {
    let aFreight = [];
    for (let key in state.aCartData) {
        aFreight.push(state.aCartData[key].freight);
    }
    state.freight = Math.max.apply(null, aFreight);
    localStorage['freight'] = state.freight;
}
//选中商品
function checkItem(state, action) {
    state.aCartData[action.index].checked = action.checked;
    setTotal(state);
    setFreight(state);
}
//点击全选
function setAllCheck(state, action) {
    if (action.checked) {
        for (let key in state.aCartData) {
            state.aCartData[key].checked = true;
        }
    } else {
        for (let key in state.aCartData) {
            state.aCartData[key].checked = false;
        }
    }
    setTotal(state);
    setFreight(state);
    localStorage['cartData'] = JSON.stringify(state.aCartData);
}
//增加商品数量
function addCount(state, action) {
    if (state.aCartData[action.index].count > 19) {
        Toast.info('不能再多了!')
    } else {
        state.aCartData[action.index].count += 1;
        localStorage['cartData'] = JSON.stringify(state.aCartData);
        setTotal(state);
    }
}
//减少商品数量
function reduceCount(state, action) {
    if (state.aCartData[action.index].count > 1) {
        state.aCartData[action.index].count -= 1;
        localStorage['cartData'] = JSON.stringify(state.aCartData);
        setTotal(state);
    } else {
        Toast.info('不能再少了!')
    }
}
//安全退出清空购物车
function clearCart(state,action){
    localStorage.removeItem('cartData');
    localStorage.removeItem('total');
    localStorage.removeItem('freight');
    state.aCartData=[];
    state.total=0;
    state.freight=0;
}
export default cartReducer;