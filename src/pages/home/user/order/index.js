import React from 'react';
import style from '../../../../assets/css/private/order_index.module.css';
import config from '../../../../assets/js/conf/config';
import action from '../../../../actions/index';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile'
import { request } from '../../../../assets/js/libs/request';
class OrderIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getDetaultAddress: [],
            address: []
        }
        //禁止重复提交
        this.submit = true;
    }
    componentDidMount() {
        //判断是否登录
        if (!this.props.state.user.isLogin) {
            this.return('user/login')
        }
        this.getDetaultAddress()
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    return(url) {
        this.props.history.push(config.path + url)
    }
    //获取默认地址
    getDetaultAddress() {
        let data = {
            defaultState: '1'
        }
        request('http://192.168.125.12:8082/getDetaultAddress', 'post', data).then(res => {
            this.setState({
                getDetaultAddress: res
            })
        })
        request('http://192.168.125.12:8082/selectaddress', 'post', { 'uid': this.props.state.user.uid }).then(res => {
            this.setState({
                address: res
            })
        })
    }
    //提交订单
    setOrder() {
        if (this.props.state.cart.aCartData.length > 0) {
            if (this.submit) {
                this.submit = false;
                //let now = new Date().toLocaleString();
                var date = new Date();
                var d = date.getFullYear() + "/" + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
                    "/" + (date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())) + " " + (date.getHours() > 9 ? date.getHours() : ('0' + date.getHours())) +
                    ":" + (date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())) + ":" + (date.getSeconds() > 9 ? date.getSeconds() : ('0' + date.getSeconds()));
                let len = d.length;
                let orderid = 'VK' + d.substring(0, 10).replace(/\//g, '') + d.substring(len - 8, len).replace(/:/g, '')
                //替换斜杠
                let orderData=[];
                this.props.state.cart.aCartData.map((item,index)=>{
                    if(item.checked){
                        orderData.push(item)
                    }
                })
                let data = {
                    uid: this.props.state.user.uid,
                    total: this.props.state.cart.total,
                    freight: this.props.state.cart.freight,
                    goodsdata: JSON.stringify(orderData),
                    orderid: orderid
                }
                // localStorage['orderid']=orderid;
                // this.props.dispatch(action.user.addorderdata({orderid:orderid}))
                request('http://192.168.125.12:8082/addorder', 'post', data).then(res => {
                    if (res.code === 200) {
                        //sessionStorage['_id']=res._id;
                        //sessionStorage['orderid']=res.data.orderid;
                        this.props.history.push(config.path + 'user/order_end');
                    }
                })
            }
        }
        else {
            Toast.info('你的购物车为空,快去添加商品吧!')
        }
    }
    render() {
        return (
            <div className={style['order']}>
                <div className={style['head']}>
                    <div className={style['order-head-img']} onClick={this.return.bind(this, 'home/cart')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['order-head-txt']}>
                        确认订单
                    </div>
                </div>
                {this.state.address.length > 0 ? sessionStorage['isCheck'] ?
                    <div className={style['nomals']}>
                        <div className={style['details']}>
                            <div className={style['top']}>
                                <div className={style['name']}>收货人:{sessionStorage['connector']}</div>
                                <div className={style['mobile']}>{sessionStorage['mobile']}</div>
                            </div>
                            <div className={style['left']}>
                                <div className={style['item1']}></div>
                                <div className={style['item2']}>{sessionStorage['province']}{sessionStorage['city']}{sessionStorage['area']}</div>
                            </div>
                        </div>
                        <div className={style['rows']} onClick={this.return.bind(this, 'user/address')}>
                            <div className={style['link']}></div>
                        </div>
                    </div>
                    : this.state.getDetaultAddress.map((item, index) => {
                        return (
                            <div className={style['nomals']} key={index}>
                                <div className={style['details']}>
                                    <div className={style['top']}>
                                        <div className={style['name']}>收货人:{item.data.connector}</div>
                                        <div className={style['mobile']}>{item.data.mobile}</div>
                                    </div>
                                    <div className={style['left']}>
                                        <div className={style['item1']}></div>
                                        <div className={style['item2']}>{item.data.province}{item.data.city}{item.data.area}</div>
                                    </div>
                                </div>
                                <div className={style['rows']} onClick={this.return.bind(this, 'user/address')}>
                                    <div className={style['link']}></div>
                                </div>
                            </div>
                        )
                    }) :
                    <div className={style['address']}>
                        <div className={style['text']}>您的收货地址为空,点击添加收货地址</div>
                        <div className={style['right']} onClick={this.return.bind(this, 'user/address')}></div>
                    </div>}
                <div className={style['inline']}>
                    <div className={style['item1']}></div>
                    <div className={style['item2']}></div>
                    <div className={style['item1']}></div>
                    <div className={style['item2']}></div>
                    <div className={style['item1']}></div>
                    <div className={style['item2']}></div>
                    <div className={style['item1']}></div>
                    <div className={style['item2']}></div>
                    <div className={style['item1']}></div>
                    <div className={style['item2']}></div>
                </div>
                {this.props.state.cart.aCartData.length > 0 ? this.props.state.cart.aCartData.map((item, index) => {
                    return (
                        item.checked ? <div className={style['wrapper']} key={index}>
                            <div className={style['bak']}></div>
                            <div className={style['bar']}>
                                <div className={style['left']}>
                                    <img src={item.img} alt="" />
                                </div>
                                <div className={style['right']}>
                                    <div className={style['item1']}>{item.title}</div>
                                    <div className={style['item2']}>x&nbsp;{item.count}&nbsp;({item.attrs[0].title}:{item.attrs[0].param[0].value};{item.attrs[1].title}:{item.attrs[1].param[0].value})</div>
                                    <div className={style['item3']}>￥{item.price}</div>
                                </div>
                            </div>
                        </div> : ''
                    )
                }) : ''}
                <div className={style['price']}>
                    <div className={style['bak']}></div>
                    <div className={style['total']}>
                        <div className={style['item1']}>
                            <div className={style['left']}>商品总额</div>
                            <div className={style['right']}>￥{this.props.state.cart.total}</div>
                        </div>
                        <div className={style['item2']}>
                            <div className={style['left']}>运费</div>
                            <div className={style['right']}>+￥{this.props.state.cart.freight >= 0 ? this.props.state.cart.freight : 0}</div>
                        </div>
                    </div>
                </div>
                <div className={style['foot']}>
                    <div className={style['left']}>
                        实付金额:<span>￥{this.props.state.cart.total + (this.props.state.cart.freight >= 0 ? this.props.state.cart.freight : 0)}</span>
                    </div>
                    <div className={style['right']} onClick={this.setOrder.bind(this)}>提交订单</div>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(OrderIndex)