import React from 'react';
import style from '../../../../assets/css/private/user_index.module.css';
import config from '../../../../assets/js/conf/config';
import { List, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import action from '../../../../actions/index';
import TopTitle from '../../../../components/headtitle/index'
class Userindex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    return(url) {
        this.props.history.push(config.path + url)
    }
    //安全退出
    outlogin(url) {
        const alert = Modal.alert;
        alert('', '若退出,所有数据将被清空!', [
            { text: '取消', onPress: () => { }, style: 'default' },
            {
                text: '确认', onPress: () => {
                    this.props.dispatch(action.user.outlogin())
                    this.props.dispatch(action.cart.clearCart())
                    this.props.history.push(config.path + url)
                }
            },
        ]);
    }
    //test组件绑定事件
    testPro() {
        console.log('11')
    }
    render() {
        return (
            <div className={style['user']}>
                <TopTitle title='会员中心' onclickbtn={this.testPro.bind(this)} clickreturn={this.return.bind(this, 'home/index')}></TopTitle>
                <div className={style['wrapper']}>
                    <div className={style['avtar']}>
                        <div className={style['img']} onClick={this.return.bind(this, 'user/user_info')}>
                            {/* <img src={require('../../../../assets/images/home/index/头像.png')} alt="" /> */}
                            <img src={this.props.state.user.isCheckHeadImg ? this.props.state.user.userHeadImg : require('../../../../assets/images/home/index/头像.png')} alt="" />
                        </div>
                        <span className={style['sp1']}>{this.props.state.user.name ? this.props.state.user.name : '昵称'}</span>
                        <span className={style['sp2']}>我的积分:0</span>
                    </div>
                    <div className={style['ident']}>
                        <div className={style['left']}>全部订单</div>
                        <div className={style['right']} onClick={this.return.bind(this, 'user/all-order/order?status=0')}>查看全部订单</div>
                    </div>
                    <div className={style['order']}>
                        <div className={style['item1']} onClick={this.return.bind(this, 'user/all-order/pay?status=1')}>
                            <div className={style['item2']}>
                                <img src={require('../../../../assets/images/home/index/待支付.png')} alt="" />
                            </div>
                            <div className={style['item3']}>
                                <span>待付款</span>
                            </div>
                        </div>
                        <div className={style['item1']}>
                            <div className={style['item2']}>
                                <img src={require('../../../../assets/images/home/index/待发货.png')} alt="" />
                            </div>
                            <div className={style['item3']}>
                                <span>待发货</span>
                            </div>
                        </div>
                        <div className={style['item1']} onClick={this.return.bind(this, 'user/all-order/set?status=2')}>
                            <div className={style['item2']}>
                                <img src={require('../../../../assets/images/home/index/待收货.png')} alt="" />
                            </div>
                            <div className={style['item3']}>
                                <span>待收货</span>
                            </div>
                        </div>
                        <div className={style['item1']} onClick={this.return.bind(this, 'user/all-order/review?status=3')}>
                            <div className={style['item2']}>
                                <img src={require('../../../../assets/images/home/index/待评价.png')} alt="" />
                            </div>
                            <div className={style['item3']}>
                                <span>待评价</span>
                            </div>
                        </div>
                        <div className={style['item1']}>
                            <div className={style['item2']}>
                                <img src={require('../../../../assets/images/home/index/退款.png')} alt="" />
                            </div>
                            <div className={style['s-item3']}>
                                <span>退款/售后</span>
                            </div>
                        </div>
                    </div>
                    <div className={style['inline']}></div>
                    <div className={style['list']}>
                        <List renderHeader={() => '设置'}>
                            <List.Item
                                thumb={require('../../../../assets/images/home/index/p1.png')}
                                arrow="horizontal"
                                onClick={() => {
                                    this.props.history.push(config.path + 'user/user_info')
                                }}
                            >个人资料</List.Item>
                            <List.Item
                                thumb={require('../../../../assets/images/home/index/p2.png')}
                                onClick={() => {
                                    this.props.history.push(config.path + 'user/address')
                                }}
                                arrow="horizontal">地址管理
                         </List.Item>
                            <List.Item
                                thumb={require('../../../../assets/images/home/index/p3.png')}
                                onClick={() => {
                                    this.props.history.push(config.path + 'mobile/index')
                                }}
                                arrow="horizontal">绑定手机
                         </List.Item>
                            <List.Item
                                thumb={require('../../../../assets/images/home/index/p4.png')}
                                onClick={() => {
                                    this.props.history.push(config.path + 'mobile/mypassword')
                                }}
                                arrow="horizontal">修改密码
                         </List.Item>
                            <List.Item
                                thumb={require('../../../../assets/images/home/index/p5.png')}
                                onClick={() => {
                                    this.props.history.push(config.path + 'mobile/mylove')
                                }}
                                arrow="horizontal">我的收藏
                         </List.Item>
                        </List>
                    </div>
                    {this.props.state.user.isLogin ? <div className={style['btn']} onClick={this.outlogin.bind(this, 'home/index')}>安全退出</div>
                        :
                        <div className={style['btn']} onClick={this.return.bind(this, 'user/login')}>登录/注册</div>}
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(Userindex)