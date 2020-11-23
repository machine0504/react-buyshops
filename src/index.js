import React from 'react';
import ReactDOM from 'react-dom';
//引入全局跨组件变量
import './assets/js/conf/global';                        
import RouterComponent from './router'
import * as serviceWorker from './serviceWorker';
import 'whatwg-fetch';
//import Image from './image'
//IE兼容
import 'babel-polyfill';
import 'url-search-params-polyfill';
//引入redux
import { createStore} from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducer/index'
//2.商品装车
let store = createStore(reducers)
class Index extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Provider store={store}>
                    <RouterComponent></RouterComponent>
                </Provider>
            </React.Fragment>
        )
    }
}
ReactDOM.render(<Index />, document.getElementById('root'));
serviceWorker.unregister();
