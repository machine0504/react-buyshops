import React from 'react';
import style from '../../../../assets/css/private/address_index.module.css';
import config from '../../../../assets/js/conf/config';
import { request } from '../../../../assets/js/libs/request';
import { Modal, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import action from '../../../../actions/index';
class AddressIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: []
        }
    }
    componentDidMount() {
        //判断是否登录
        if (!this.props.state.user.isLogin) {
            this.return('user/login')
        }
        this.getAddress()
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    return(url) {
        this.props.history.push(config.path + url)
    }
    //获取地址
    getAddress() {
        request('http://192.168.125.12:8082/selectaddress', 'post', { 'uid': this.props.state.user.uid }).then(res => {
            this.setState({
                address: res
            })
        })
    }
    //清除地址
    clearAddress(index) {
        const alert = Modal.alert;
        alert('', '你确定要删除嘛?', [
            { text: '取消', onPress: () => { }, style: 'default' },
            {
                text: '确认', onPress: () => {
                    let data = {
                        uid: this.props.state.user.uid,
                        province: this.state.address[index].data.province,
                        city: this.state.address[index].data.city,
                        area: this.state.address[index].data.area,
                        detailsAddress: this.state.address[index].data.detailsAddress,
                        connector: this.state.address[index].data.connector,
                        mobile: this.state.address[index].data.mobile
                    }
                    request('http://192.168.125.12:8082/deleteaddress', 'post', data).then(res => {
                        if (res.code === 200) {
                            this.getAddress();
                        }
                    })
                }
            },
        ]);
    }
    //修改地址
    editAddress(index) {
        let data = {
            province: this.state.address[index].data.province,
            city: this.state.address[index].data.city,
            area: this.state.address[index].data.area,
            detailsAddress: this.state.address[index].data.detailsAddress,
            connector: this.state.address[index].data.connector,
            mobile: this.state.address[index].data.mobile,
            defaultState: this.state.address[index].data.defaultState
        }
        this.props.dispatch(action.user.edit(data))
        this.props.history.push(config.path + 'user/edit_address')
    }
    //跳转地址
    selectAddress(connector, mobile, province, city, area) {
        sessionStorage['connector'] = connector;
        sessionStorage['mobile'] = mobile;
        sessionStorage['province'] = province;
        sessionStorage['city'] = city;
        sessionStorage['area'] = area;
        sessionStorage['isCheck'] = true;
        this.props.history.push(config.path + 'user/order')
    }
    render() {
        return (
            <div className={style['address']}>
                <div className={style['head']}>
                    <div className={style['address-head-img']} onClick={this.return.bind(this, 'user/index')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['address-head-txt']}>
                        选择收货地址
                    </div>
                </div>
                <div className={style['title']}>
                    <div className={style['left']}>配送地址</div>
                    <div className={style['right']}>
                        <div className={style['img']} onClick={this.return.bind(this, 'user/add_address')}></div>
                        <div className={style['text']}>新增收货地址</div>
                    </div>
                </div>
                {this.state.address.length > 0 ? this.state.address.map((item, index) => {
                    return (
                        <div className={style['content']} key={index}>
                            <div className={style['item1']}>
                                <div className={style['top']} onClick={this.selectAddress.bind(this, item.data.connector, item.data.mobile, item.data.province, item.data.city, item.data.area)}>
                                    {item.data.defaultState === '1' ? <div className={style['left']}></div> : ''}
                                    <div className={style['right']}>
                                        <div className={style['r-top']}>
                                            <span>{item.data.connector}</span>
                                            <span>{item.data.mobile}</span>
                                        </div>
                                        <div className={style['content']}>
                                            {item.data.defaultState === '1' ?
                                                <div className={style['left']}>默认</div> : ''
                                            }
                                            <div className={style['right']}>{item.data.province}{item.data.city}{item.data.area}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style['bot']}>
                                    <div className={style['edit']} onClick={this.editAddress.bind(this, index)}></div>
                                    <div className={style['delete']} onClick={this.clearAddress.bind(this, index)}></div>
                                </div>
                            </div>
                        </div>
                    )
                }) :
                    <div className={style['alert']}>
                        你还没添加收货地址!
                    </div>
                }
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(AddressIndex)