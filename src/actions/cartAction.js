//购物车添加
function addCart(data) {
    return {
        type: 'addCart',
        data: data
    }
}
//删除商品
function delItem(data) {
    return {
        type: 'delItem',
        data: data
    }
}
//选中商品
function checkItem(data) {
    return {
        type: 'checkItem',
        data: data
    }
}
//点击全选
function setAllCheck(data) {
    return {
        type: 'setAllCheck',
        data: data
    }
}
//增加数量
function addCount(data) {
    return {
        type: 'addCount',
        data: data
    }
}
//减少数量
function reduceCount(data) {
    return {
        type: 'reduceCount',
        data: data
    }
}
//安全退出清空购物车
function clearCart(data) {
    return {
        type: 'clearCart',
        data: data
    }
}
export {
    addCart, delItem, checkItem, setAllCheck, addCount, reduceCount,clearCart
}