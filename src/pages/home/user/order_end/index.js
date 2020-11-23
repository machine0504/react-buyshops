import React from 'react';
import style from './order_end.module.css';
import config from '../../../../assets/js/conf/config';
export default class Order_End extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    return(url) {
        this.props.history.push(config.path + url)
    }
    render() {
        return (
            <div className={style['order-end']}>
                <div className={style['head']}>
                    <div className={style['order-end-head-img']} onClick={this.return.bind(this, 'home/index')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['order-end-head-txt']}>
                        订单结束
                    </div>
                </div>
                <div className={style['content']}>
                    <div className={style['item1']}>订购成功!</div>
                    <div className={style['item2']}>订单编号:{sessionStorage['orderid']}</div>
                    <div className={style['item3']} onClick={this.return.bind(this, 'user/all-order/order?status=0')}>查看订单</div>
                    <div className={style['item4']}>去付款</div>
                </div>
            </div>
        )
    }
}