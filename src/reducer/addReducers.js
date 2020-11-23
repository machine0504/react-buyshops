//最近搜索添加
let aKeyWords=localStorage['add']!==undefined?JSON.parse(localStorage['add']):[]
function addReducer(state = { keywords: aKeyWords }, action) {
    switch (action.type) {
        case 'addhk':
            console.log(Object.assign({}, state, action))
            return Object.assign({}, state, action);
        default:
            return state;
    }

}
export default addReducer;