import React from 'react';
import style from '../../../assets/css/private/cart_index.module.css'
import config from '../../../assets/js/conf/config';
import { SwipeAction,Toast} from 'antd-mobile'
import { connect } from 'react-redux';
import action from '../../../actions/index';
import { request } from '../../../assets/js/libs/request';
class Cartindex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Count: 1,
            bAllCheck: false
        }
    }
    componentDidMount() {
        this.isAllCheckd();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    //返回
    return(url) {
        this.props.history.push(config.path + url)
    }
    //去结算
    goback(url) {
        if (this.props.state.cart.total > 0) {
            this.props.history.push(config.path + url)
        }
    }
    //点选购物车
    checkItem(index, checked) {
        if (this.props.state.cart.aCartData.length > 0) {
            this.props.dispatch(action.cart.checkItem({ index: index, checked: checked }))
            this.isAllCheckd()
        }
    }
    //减少数量
    reduceCount(index) {
        if (this.props.state.cart.aCartData.length > 0) {
            if (this.props.state.cart.aCartData[index].checked) {
                this.props.dispatch(action.cart.reduceCount({ index: index }))
            }
        }
    }
    //增加数量
    addCount(index) {
        if (this.props.state.cart.aCartData.length > 0) {
            if (this.props.state.cart.aCartData[index].checked) {
                this.props.dispatch(action.cart.addCount({ index: index }))
            }
        }
    }
    //删除商品
    // delItem(index) {
    //     if (this.props.state.cart.aCartData.length > 0) {
    //         this.props.dispatch(action.cart.delItem({ index: index }));
    //     }
    //     this.isAllCheckd();
    // }
    //是否全选
    isAllCheckd() {
        if (this.props.state.cart.aCartData.length > 0) {
            let bChecked = true;
            for (let key in this.props.state.cart.aCartData) {
                if (!this.props.state.cart.aCartData[key].checked) {
                    this.setState({
                        bAllCheck: false
                    });
                    bChecked = false;
                    break;
                }
            }
            if (bChecked) {
                this.setState({
                    bAllCheck: true
                });
            }
        } else {
            this.setState({
                bAllCheck: false
            });
        }
    }
    //点击全选按钮
    setAllCheck(checked) {
        this.setState({
            bAllCheck: checked
        })
        if (this.props.state.cart.aCartData.length > 0) {
            this.props.dispatch(action.cart.setAllCheck({ checked: checked }))
        }
    }
    render() {
        return (
            <div className={style['cart']}>
                <div className={style['cart-head']}>
                    <div className={style['cart-head-img']} onClick={this.return.bind(this, '/home/index')}>
                        <img src={require('../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['cart-head-txt']}>
                        购物车
                    </div>
                </div>
                <div className={style['wrapper']} id='wrapper'>
                    {this.props.state.cart.aCartData.length > 0 ? this.props.state.cart.aCartData.map((item, index) => {
                        return (
                            <SwipeAction key={index}
                                autoClose
                                right={[
                                    {
                                        text: '找相似',
                                        onPress: () => console.log('cancel'),
                                        style: { backgroundColor: 'rgb(254,148,2)', color: 'white', fontSize: '0.8rem' },
                                    },
                                    {
                                        text: '加入收藏',
                                        onPress: () => {
                                            let goodsdata=this.props.state.cart.aCartData[index]
                                            let data={
                                                uid:this.props.state.user.uid,
                                                gid:goodsdata.gid,
                                                title:goodsdata.title,
                                                price:goodsdata.price,
                                                img:goodsdata.img,
                                            }
                                            request('http://192.168.125.12:8082/addmylove', "post", data).then(res => {
                                                if (res.code === 200) {
                                                    Toast.info('收藏成功!')
                                                }
                                            })
                                        },
                                        style: { backgroundColor: 'rgb(255,109,0)', color: 'white', fontSize: '0.8rem' },
                                    },
                                    {
                                        //删除商品
                                        text: '删除',
                                        onPress: (index) => {
                                            if (this.props.state.cart.aCartData.length > 0) {
                                                this.props.dispatch(action.cart.delItem({ index: index }));
                                            }
                                            this.isAllCheckd()
                                        },
                                        style: { backgroundColor: 'rgb(253,59,49)', color: 'white', fontSize: '0.8rem' },
                                    }
                                ]}>
                                <div className={style['cart-content']} id='cart-content'>
                                    <div className={style['cart-content-left']}>
                                        <div className={item.checked ? style['check'] + " " + style['active'] : style['check']} onClick={this.checkItem.bind(this, index, !item.checked)}></div>
                                    </div>
                                    <div className={style['cart-content-right']}>
                                        <div className={style['item1']}>
                                            <div className={style['item-img']}>
                                                <img src={item.img} alt="" />
                                            </div>
                                        </div>
                                        <div className={style['item2']}>
                                            <div className={style['item-head']}>{item.title}</div>
                                            <div className={style['item-cont']}>
                                                {item.attrs.length > 0 ? item.attrs.map((item2, index2) => {
                                                    return (
                                                        <span key={index2}>{item2.title}:{
                                                            item2.param.length > 0 ? item2.param.map((item3, index3) => {
                                                                return (
                                                                    <span key={index3}>{item3.value}</span>
                                                                )
                                                            }) : ''
                                                        }</span>
                                                    )
                                                }) : ''
                                                }
                                            </div>
                                            <div className={style['item-foot']}>
                                                <div className={style['price']}>￥{item.price}</div>
                                                <div className={style['num']}>
                                                    <div className={style['border']}>
                                                        <div className={style['b1']} onClick={this.reduceCount.bind(this)} onClick={this.reduceCount.bind(this, index)}>-</div>
                                                        <div className={style['b2']}>{item.count}</div>
                                                        <div className={style['b3']} onClick={this.addCount.bind(this)} onClick={this.addCount.bind(this, index)}>+</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwipeAction>
                        )
                    }) : <div className={style['nocart']}>
                            <img src={require('../../../assets/images/home/index/addcart.jpg')} alt=''></img>
                            <div className={style['notext']}>你的购物车为空快去添加吧！</div>
                        </div>}
                        
                </div>
                <div className={style['cart-foot']}>
                    <div className={style['item1']}>
                        <div className={this.state.bAllCheck ? style['check'] + " " + style['active'] : style['check']} onClick={this.setAllCheck.bind(this, !this.state.bAllCheck)}></div>
                        <div className={style['txt']}>全选</div>
                        <div className={style['total']}>合计:</div>
                        <div className={style['price']}>￥{this.props.state.cart.total}</div>
                    </div>
                    <div className={this.props.state.cart.total > 0 ? style['item2'] + " " + style['active'] : style['item2']} onClick={this.goback.bind(this, 'user/order')}>去结算</div>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(Cartindex)
