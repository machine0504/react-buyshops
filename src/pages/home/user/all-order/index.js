import React from 'react';
import style from './all_order.module.css';
import {connect} from 'react-redux'
import config from '../../../../assets/js/conf/config';
import { Route, Switch, Redirect } from 'react-router-dom';
import { localParam } from '../../../../assets/js/utils/util';
import asyncComponent from '../../../../components/async/async';
const AllOrder = asyncComponent(() => import('./allorder'))
const OrderPay = asyncComponent(() => import('./orderpay'))
const OrdeReview = asyncComponent(() => import('./orderreview'))
const OrderSet = asyncComponent(() => import('./orderset'))
class AllOrderIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state1: true,
            state2: false,
            state3: false,
            state4: false,
            title: '全部订单'
        }
        this.skey = 0;
    }
    componentDidMount() {
        this.skey = localParam(this.props.location.search).search.status
        switch (Number(this.skey)) {
            case 0: this.return('user/all-order/order?status=0',0);
                break;
            case 1: this.return('user/all-order/pay?status=1',1);
                break;
            case 2: this.return('user/all-order/set?status=2',2);
                break;
            case 3: this.return('user/all-order/review?status=3',3);
                break;
        }
    }
    return(url, index) {
        this.props.history.push(config.path + url);
        switch (index) {
            case 0: this.setState({
                state1: true,
                state2: false,
                state3: false,
                state4: false,
                title: '全部订单'
            });
                break;
            case 1: this.setState({
                state2: true,
                state1: false,
                state3: false,
                state4: false,
                title: '待付款'
            });
                break;
            case 2: this.setState({
                state3: true,
                state2: false,
                state1: false,
                state4: false,
                title: '待收货'
            });
                break;
            case 3: this.setState({
                state3: false,
                state2: false,
                state1: false,
                state4: true,
                title: '待评价'
            });
                break;
        }
    }
    render() {
        return (
            <div className={style['all-order']}>
                <div className={style['head']}>
                    <div className={style['all-order-head-img']} onClick={this.return.bind(this, '/home/user')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['all-order-head-txt']}>
                        {this.state.title}
                    </div>
                </div>
                <div className={style['navigation']}>
                    <div onClick={this.return.bind(this, 'user/all-order/order?status=0', 0)} style={this.state.state1 ? { borderBottom: '1px solid red' } : {}}>全部订单</div>
                    <div onClick={this.return.bind(this, 'user/all-order/pay?status=1', 1)} style={this.state.state2 ? { borderBottom: '1px solid red' } : {}}>待付款</div>
                    <div onClick={this.return.bind(this, 'user/all-order/set?status=2', 2)} style={this.state.state3 ? { borderBottom: '1px solid red' } : {}}>待收货</div>
                    <div onClick={this.return.bind(this, 'user/all-order/review?status=3', 3)} style={this.state.state4 ? { borderBottom: '1px solid red' } : {}}>待评价</div>
                </div>
                <div className={style['components']}>
                    <Switch>
                        <Route path='/user/all-order/order' component={AllOrder}></Route>
                        <Route path='/user/all-order/pay' component={OrderPay}></Route>
                        <Route path='/user/all-order/set' component={OrderSet}></Route>
                        <Route path='/user/all-order/review' component={OrdeReview}></Route>
                        {/* <Redirect to={config.path + 'user/all-order?status=0'}></Redirect> */}
                    </Switch>
                </div>
            </div>
        )
    }
}
export default connect((state)=>{
    return{
        state:state
    }
})(AllOrderIndex)