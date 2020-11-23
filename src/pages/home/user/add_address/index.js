import React from 'react';
import style from '../../../../assets/css/private/add_address_index.module.css';
import config from '../../../../assets/js/conf/config';
import { Picker, Tag, Toast } from 'antd-mobile';
import { request } from '../../../../assets/js/libs/request';
import { connect } from 'react-redux';
const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#fff', paddingLeft: 15 }}
    >
        <div className="test" style={{ display: 'flex', height: '2.5rem', lineHeight: '2.5rem', position: 'relative', borderBottom: 0 }}>
            <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.7rem', color: '#000000', fontFamily: 'Times New Roman' }}>{props.children}</div>
            <div style={{ textAlign: 'right', color: '#000000', marginRight: 15, fontSize: '0.7rem', fontFamily: 'Times New Roman', fontWeight: 'bold' }}>{props.extra}</div>
        </div>
    </div>
);
class Add_addressIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValue: [],
            detailsAddress: '',//详细地址
            connector: '',//联系人
            mobile: '',//手机号
            defaultState: true,//默认状态        
        }
        this.province = '';
        this.city = '';
        this.area = '';
        this.submit = true;

    }
    componentDidMount() {
        //console.log(this.props.state.user.uid)
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    return(url) {
        this.props.history.push(config.path + url)
    }
    //校验事件
    save() {
        if (this.submit) {
            //禁止重复提交
            this.submit = false;
            var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
            if (this.province === '' || this.province === null || this.province === undefined) {
                Toast.info('请填写所在地区');
            } else {
                if (this.state.detailsAddress === '') {
                    Toast.info('请填写收货地址');
                } else {
                    if (this.state.connector === '') {
                        Toast.info('请填写联系人')
                    } else {
                        if (this.state.mobile === '') {
                            Toast.info('请填写手机号')
                        } else {
                            if (reg.test(this.state.mobile)) {
                                let data = {
                                    uid: this.props.state.user.uid,
                                    province: this.province,
                                    city: this.city,
                                    area: this.area,
                                    detailsAddress: this.state.detailsAddress,
                                    connector: this.state.connector,
                                    mobile: this.state.mobile,
                                    defaultState: this.state.defaultState ? '1' : '0'
                                }
                                request('http://192.168.125.12:8082/insertaddress', "post", data).then(res => {
                                    if (res.code === 200) {
                                        Toast.info('添加成功', 2, () => {
                                            this.return('user/address')
                                        })
                                    }
                                });
                            } else {
                                Toast.info('输入的手机格式不正确')
                            }
                        }
                    }
                }
            }
        }
    }
    //切换默认状态
    change() {

    }
    render() {
        let antdDistrict = [];
        let districtData = require('../../../../assets/json/address.json');
        Object.keys(districtData).forEach((index) => {
            let itemLevel1 = {};
            let itemLevel2 = {};
            itemLevel1.value = districtData[index].code;
            itemLevel1.label = districtData[index].name;
            itemLevel1.children = [];
            let data = districtData[index].cities;
            Object.keys(data).forEach((index) => {
                itemLevel2.value = data[index].code;
                itemLevel2.label = data[index].name;
                itemLevel2.children = [];
                let data2 = data[index].districts;
                let itemLevel3 = {};
                itemLevel3.children = [];
                Object.keys(data2).forEach((index) => {
                    itemLevel3.value = index;
                    itemLevel3.label = data2[index];
                    itemLevel2.children.push(itemLevel3);
                    itemLevel3 = {};
                });
                itemLevel1.children.push(itemLevel2);
                itemLevel2 = {};
            });
            antdDistrict.push(itemLevel1)
        });
        return (
            <div className={style['add_address']}>
                <div className={style['head']}>
                    <div className={style['add_address-head-img']} onClick={this.return.bind(this, 'user/address')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['add_address-head-txt']}>
                        新增收货地址
                    </div>
                </div>
                <div className={style['content']}>
                    <div className={style['user-address']}>
                        <Picker title='Areas' extra='请点击(可选)' data={antdDistrict} value={this.state.pickerValue}
                            onChange={v => {
                                this.setState({
                                    pickerValue: v
                                })
                            }} onOk={v => {
                                this.setState({
                                    pickerValue: v
                                })
                                for (let key in antdDistrict) {
                                    if (v[0] === antdDistrict[key].value) {
                                        this.province = antdDistrict[key].label
                                        for (let asc in antdDistrict[key].children) {
                                            if (v[1] === antdDistrict[key].children[asc].value) {
                                                this.city = antdDistrict[key].children[asc].label;
                                                for (let dec in antdDistrict[key].children[asc].children) {
                                                    if (v[2] === antdDistrict[key].children[asc].children[dec].value) {
                                                        this.area = antdDistrict[key].children[asc].children[dec].label
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }} onClick={() => {
                                console.log('xx')
                            }}>
                            <CustomChildren>收货地址:</CustomChildren>
                        </Picker>
                    </div>
                    <div className={style['details-address']}>
                        <div className={style['item1']}>门牌号:</div>
                        <div className={style['item2']}>
                            <input type="text" placeholder='详细地址,例:16号楼5层501室' onChange={e => {
                                this.setState({
                                    detailsAddress: e.target.value
                                })
                            }} />
                        </div>
                    </div>
                    <div className={style['details-address']}>
                        <div className={style['item1']}>联系人:</div>
                        <div className={style['item2']}>
                            <input type="text" placeholder='请填写收货人的姓名' onChange={e => {
                                this.setState({
                                    connector: e.target.value
                                })
                            }} />
                        </div>
                    </div>
                    <div className={style['details-address']}>
                        <div className={style['item1']}>手机号:</div>
                        <div className={style['item2']}>
                            <input type="text" placeholder='请填写收货手机号码' onChange={e => {
                                this.setState({
                                    mobile: e.target.value
                                })
                            }} />
                        </div>
                    </div>
                    <div className={style['set']}>
                        <div className={style['item1']}>默认地址:</div>
                        <div className={style['item2']}>
                            <input type="checkbox" checked={this.state.defaultState} onChange={() => {
                                this.setState({
                                    defaultState: !this.state.defaultState
                                })
                            }} />
                        </div>
                    </div>
                    <div className={style['remark']}>
                        <div className={style['item']}>标签:</div>
                        <div className={style['tag']}>
                            <Tag selected>家</Tag>
                            <Tag>公司</Tag>
                            <Tag>学校</Tag>
                        </div>
                    </div>
                    <div className={style['save']}>
                        <button onClick={this.save.bind(this)}>保存</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(Add_addressIndex)