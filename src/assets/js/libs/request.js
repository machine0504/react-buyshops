import ReactDOM from 'react-dom';
let show = ReactDOM.findDOMNode(document.getElementById('page-load'));
function request(pUrl, pType = 'get'.toLocaleLowerCase(), data = {}) {
    showLoad();
    let config = {}, params = '', headers = {}
    if(pType==='file'.toLocaleLowerCase()){
        pType='post';
        if(data instanceof Object){
            params=new FormData();
            for(let key in data){
                params.append(key,data[key]);
            }
        }
        config={
            method:pType,
            body:params
        }
    }
    else if (pType === 'get'.toLocaleLowerCase()) {
        config = {
            method: pType
        }
    }
    //封装post请求
    else {
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        if (data instanceof Object) {
            for (let key in data) {
                params += `&${key}=${encodeURIComponent(data[key])}`
            }
            params = params.slice(1)
        }
        config = {
            method: pType,
            body: params,
            headers
        }
    }
    return fetch(pUrl, config).then(res => {
        hideLoad();
        return res.json()
    });
}
function showLoad() {
    show.style.display = 'block'
}
function hideLoad() {
    show.style.display = 'none'
}
export { request };
