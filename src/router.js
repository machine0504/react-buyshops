/*HashRouter有#号,
BrowserRouter没有#号,
Switch只有匹配到一个地址,不往下匹配,
Link跳转界面,
exact完全匹配路由*/
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
//import Index from './pages/home/index/index'
import asyncComponent from './components/async/async';
import config from './assets/js/conf/config'
// import Private from './routes/private'
const Homeindex = asyncComponent(() => import('./pages/home/home/index'))
const Goodspage = asyncComponent(() => import('./pages/home/goods/classify'))
const SearchPage = asyncComponent(() => import('./pages/home/goods/search'))
const DetailsPage = asyncComponent(() => import('./pages/home/goods/details'))
const LoginPage = asyncComponent(() => import('./pages/home/user/login/login'))
const Register = asyncComponent(() => import('./pages/home/user/register/register'))
const Userindex = asyncComponent(() => import('./pages/home/user/index/index'))
const OrderIndex = asyncComponent(() => import('./pages/home/user/order/index'))
const AddressIndex = asyncComponent(() => import('./pages/home/user/address/index'))
const Add_addressIndex = asyncComponent(() => import('./pages/home/user/add_address/index'))
const Edit_AddressIndex = asyncComponent(() => import('./pages/home/user/edit_address/index'))
const Order_Details = asyncComponent(() => import('./pages/home/user/order_details/index'))
const Order_End = asyncComponent(() => import('./pages/home/user/order_end/index'))
const User_Info = asyncComponent(() => import('./pages/home/user/user_info/index'))
const AllOrderIndex = asyncComponent(() => import('./pages/home/user/all-order/index'))
const OrderDetails = asyncComponent(() => import('./pages/home/user/order/orderdetails'))
const GoodsReview = asyncComponent(() => import('./pages/home/user/order/goodsreview'))
const MyMobile = asyncComponent(() => import('./pages/home/user/mymobile/index'))
const MyPass = asyncComponent(() => import('./pages/home/user/mymobile/mypassword'))
const MyLove = asyncComponent(() => import('./pages/home/user/mymobile/mylove'))
//中转使用
const Tranfer = asyncComponent(() => import('./pages/home/tranfer/index'))
//主路由
export default class RouterComponent extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <div>
                        <Switch>
                            <Route path={config.path + 'home'} component={Homeindex}></Route>
                            <Route path={config.path + 'goods/classify'} component={Goodspage}></Route>
                            <Route path={config.path + 'goods/search'} component={SearchPage}></Route>
                            <Route path={config.path + 'goods/details'} component={DetailsPage}></Route>
                            <Route path={config.path + 'user/index'} component={Userindex}></Route>
                            <Route path={config.path + 'user/login'} component={LoginPage}></Route>
                            <Route path={config.path + 'user/register'} component={Register}></Route>
                            <Route path={config.path + 'user/order'} component={OrderIndex}></Route>
                            <Route path={config.path + 'user/address'} component={AddressIndex}></Route>
                            <Route path={config.path + 'user/add_address'} component={Add_addressIndex}></Route>
                            <Route path={config.path + 'user/edit_address'} component={Edit_AddressIndex}></Route>
                            <Route path={config.path + 'user/order_details'} component={Order_Details}></Route>
                            <Route path={config.path + 'user/order_end'} component={Order_End}></Route>
                            <Route path={config.path + 'user/user_info'} component={User_Info}></Route>
                            <Route path={config.path + 'user/all-order'} component={AllOrderIndex}></Route>
                            <Route path={config.path + 'order/orderdetails'} component={OrderDetails}></Route>
                            <Route path={config.path + 'order/goodsreview'} component={GoodsReview}></Route>
                            <Route path={config.path + 'mobile/index'} component={MyMobile}></Route>
                            <Route path={config.path + 'mobile/mypassword'} component={MyPass}></Route>
                            <Route path={config.path + 'mobile/mylove'} component={MyLove}></Route>
                            <Route path={config.path + 'tanfer'} component={Tranfer}></Route>
                            {/* 自动跳转到首页 */}
                            <Redirect to={config.path + 'home/index'}></Redirect>
                        </Switch>
                    </div>
                </Router>
            </React.Fragment>
        )
    }
}
