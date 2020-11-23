import React from 'react';
import style from './orderdetails.module.css';
import config from '../../../../assets/js/conf/config';
import { connect } from 'react-redux';
import { request } from '../../../../assets/js/libs/request';
import { localParam } from '../../../../assets/js/utils/util';
class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsData: [],
        }
        this.skey = ''
    }
    componentDidMount() {
        this.skey = localParam(this.props.location.search).search.id;
        let data = {
            id: this.skey
        }
        request('http://192.168.125.12:8082/selectorderdetails', 'post', data).then(res => {
            console.log(res)
            this.setState({
                detailsData: res
            }, () => {
                console.log(this.state.detailsData)
            })
        })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    return(url) {
        this.props.history.push(config.path + url)
    }
    render() {
        return (
            <div className={style['order-details']}>
                <div className={style['head']}>
                    <div className={style['order-details-head-img']} onClick={this.return.bind(this, 'user/all-order/order?status=0')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['order-details-head-txt']}>
                        订单详情
                    </div>
                </div>
                {this.state.detailsData.map((item, index) => {
                    return (
                        <div className={style['content']} key={index}>
                            <div className={style['item1']}>订单编号:{item.data.orderid}</div>
                            <div className={style['item2']}>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                            </div>
                            <div className={style['item3']}>
                                <div className={style['top']}>
                                    <div className={style['lef']}>
                                        <img src={require('../../../../assets/images/home/order/1.png')} alt="" />
                                        <span>缪代旭</span>
                                    </div>
                                    <div className={style['rig']}>
                                        <img src={require('../../../../assets/images/home/order/2.png')} alt="" />
                                        <span>18483671471</span>
                                    </div>
                                </div>
                                <div className={style['bot']}>
                                    业成科技北大门
                                </div>
                            </div>
                            <div className={style['item2']}>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                                <div className={style['item']}></div>
                            </div>
                            <div className={style['item4']}>购买的商品</div>
                            <div className={style['wrapper']}>
                                {item.data.goodsdata.map((item1, index1) => {
                                    return (
                                        <div className={style['item5']} key={index1} onClick={this.return.bind(this,'goods/details/item?gid='+item1.gid)}>
                                            <div className={style['left']}>
                                                <img src={item1.img} alt="" />
                                            </div>
                                            <div className={style['right']}>
                                                <div className={style['le']}>
                                                    <div className={style['text']}>{item1.title}</div>
                                                    <div className={style['deta']}>
                                                        <span>x1</span>
                                                        <span>{item1.attrs[0].title}:{item1.attrs[0].param[0].value}</span>
                                                        <span>{item1.attrs[1].title}:{item1.attrs[1].param[0].value}</span>
                                                    </div>
                                                </div>
                                                <div className={style['ri']}>￥{item1.price}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={style['item6']}>
                                <div className={style['left']}>支付状态</div>
                                <div className={style['right']}>已完成</div>
                            </div>
                            <div className={style['item7']}>
                                <div className={style['top']}>
                                    <div className={style['left']}>商品总额</div>
                                    <div className={style['right']}>￥{item.data.total}</div>
                                </div>
                                <div className={style['bot']}>
                                    <div className={style['left']}>+运费</div>
                                    <div className={style['right']}>￥{item.data.freight}</div>
                                </div>
                            </div>
                            <div className={style['item8']}>实付金额:<span>￥{Number(item.data.total) + Number(item.data.freight)}</span></div>
                            <div className={style['item9']}>下单时间:2020-01-08</div>
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
})(OrderDetails)