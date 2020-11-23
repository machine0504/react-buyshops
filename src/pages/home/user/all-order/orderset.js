import React from 'react';
import style from './allorder.module.css';
import { connect } from 'react-redux';
import { request } from '../../../../assets/js/libs/request';
import { Toast } from 'antd-mobile'
class OrderSet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderData: []
        }
    }
    componentDidMount() {
        let data = {
            uid: this.props.state.user.uid
        }
        request('http://192.168.125.12:8082/suregoods', 'post', data).then(res => {
            this.setState({
                orderData: res
            })
        })
    }
    componentWillUnmount() {
        this.setState = (state) => {
            return;
        }
    }
    //修改订单数据
    changeOrderData(id) {
        let data = {
            id: id
        }
        request('http://192.168.125.12:8082/surereview', 'post', data).then(res => {
            if (res.code === 200) {
                Toast.info('确认成功',1,()=>{
                    this.props.history.push('/user/all-order/review?status=3')
                });
            }
        })
    }
    render() {
        return (
            <div className={style['content']}>
                {this.state.orderData.map((item, index) => {
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
                                    <button onClick={this.changeOrderData.bind(this, item._id)}>确认收货</button>
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
})(OrderSet)