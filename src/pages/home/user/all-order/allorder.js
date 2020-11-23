import React from 'react';
import style from './allorder.module.css';
import config from '../../../../assets/js/conf/config';
import { connect } from 'react-redux';
import { request } from '../../../../assets/js/libs/request';
import { Toast, Modal } from 'antd-mobile'
class AllOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: [],
            orderData1: [],
            orderData2: [],
            orderData3: [],
        }
    }
    componentDidMount() {
        let data = {
            uid: this.props.state.user.uid
        }
        //加载待付款
        request('http://192.168.125.12:8082/selectorder', 'post', data).then(res => {
            this.setState({
                orderData: res
            })
        })
        //加载待收货
        request('http://192.168.125.12:8082/suregoods', 'post', data).then(res => {
            this.setState({
                orderData1: res
            })
        })
        //加载评价
        request('http://192.168.125.12:8082/loadreview', 'post', data).then(res => {
            this.setState({
                orderData2: res
            })
        })
        //加载完成
        request('http://192.168.125.12:8082/selectoverorder', 'post', data).then(res => {
            this.setState({
                orderData3: res
            })
        })
    }
    componentWillUnmount() {
        this.setState = (state) => {
            return;
        }
    }
    //修改订单数据
    changeOrderData(id, param) {
        let data = {
            id: id
        }
        request('http://192.168.125.12:8082/' + param, 'post', data).then(res => {
            if (res.code === 200) {
                Toast.info('操作成功')
            }
        })
    }
    //删除订单
    deleteOrderdata(id) {
        let data = {
            id:id
        }
        const alert = Modal.alert;
        alert('', '是否删除？', [
            { text: '取消', onPress: () => { }, style: 'default' },
            {
                text: '确认', onPress: () => {
                    request('http://192.168.125.12:8082/deleteoverorder', 'post', data).then(res => {
                        this.setState({
                            orderData3: res
                        }, () => {
                            Toast.info('删除成功')
                        })
                    })
                }
            },
        ]);
    }
    //跳转到订单详情界面
    orderdetails(url,id){
        this.props.history.push(config.path+url+'?id='+id)
    }
    render() {
        return (
            <div className={style['content']}>
                {this.state.orderData.map((item, index) => {
                    return (
                        <div className={style['item']} key={index}>
                            <div className={style['item1']}>
                                <div className={style['con1']}>订单编号:{item.data.orderid}</div>
                                <div className={style['con2']}>待付款</div>
                            </div>
                            {item.data.goodsdata.map((item1, index1) => {
                                return (
                                    <div className={style['item2']} key={index1}>
                                        <div className={style['left']}>
                                            <img src={item1.img} alt="" />
                                        </div>
                                        <div className={style['right']}>
                                            <div className={style['text']}>{item1.title}</div>
                                            <div className={style['num']}>x {item1.count}</div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className={style['item3']}>
                                <div className={style['left']}>实付金额:￥{Number(item.data.total) + Number(item.data.freight)}</div>
                                <div className={style['right']}>
                                    <button>确认付款</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {this.state.orderData1.map((item, index) => {
                    return (
                        <div className={style['item']} key={index}>
                            <div className={style['item1']}>
                                <div className={style['con1']}>订单编号:{item.data.orderid}</div>
                                <div className={style['con2']}>待收货</div>
                            </div>
                            {item.data.goodsdata.map((item1, index1) => {
                                return (
                                    <div className={style['item2']} key={index1}>
                                        <div className={style['left']}>
                                            <img src={item1.img} alt="" />
                                        </div>
                                        <div className={style['right']}>
                                            <div className={style['text']}>{item1.title}</div>
                                            <div className={style['num']}>x {item1.count}</div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className={style['item3']}>
                                <div className={style['left']}>实付金额:￥{Number(item.data.total) + Number(item.data.freight)}</div>
                                <div className={style['right']}>
                                    <button onClick={this.changeOrderData.bind(this, item._id, 'surereview')}>确认收货</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {this.state.orderData2.map((item, index) => {
                    return (
                        <div className={style['item']} key={index}>
                            <div className={style['item1']}>
                                <div className={style['con1']}>订单编号:{item.data.orderid}</div>
                                <div className={style['con2']}>待评价</div>
                            </div>
                            {item.data.goodsdata.map((item1, index1) => {
                                return (
                                    <div className={style['item2']} key={index1}>
                                        <div className={style['left']}>
                                            <img src={item1.img} alt="" />
                                        </div>
                                        <div className={style['right']}>
                                            <div className={style['text']}>{item1.title}</div>
                                            <div className={style['num']}>x {item1.count}</div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className={style['item3']}>
                                <div className={style['left']}>实付金额:￥{Number(item.data.total) + Number(item.data.freight)}</div>
                                <div className={style['right']}>
                                    <button>评价</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {this.state.orderData3.map((item, index) => {
                    return (
                        <div className={style['item']} key={index}>
                            <div className={style['item1']}>
                                <div className={style['con1']}>订单编号:{item.data.orderid}</div>
                                <div className={style['con2']}>已完成</div>
                            </div>
                            {item.data.goodsdata.map((item1, index1) => {
                                return (
                                    <div className={style['item2']} key={index1} onClick={this.orderdetails.bind(this,'order/orderdetails',item._id)}>
                                        <div className={style['left']}>
                                            <img src={item1.img} alt="" />
                                        </div>
                                        <div className={style['right']}>
                                            <div className={style['text']}>{item1.title}</div>
                                            <div className={style['num']}>x {item1.count}</div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className={style['item3']}>
                                <div className={style['left']}>实付金额:￥{Number(item.data.total) + Number(item.data.freight)}</div>
                                <div className={style['right']}>
                                    <button onClick={this.deleteOrderdata.bind(this,item._id)}>删除订单</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(AllOrder)