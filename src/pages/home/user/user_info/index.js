import React from 'react';
import style from './user_info.module.css';
import config from '../../../../assets/js/conf/config';
import { List, InputItem, Radio, ImagePicker, Picker, Toast } from 'antd-mobile'
import { request } from '../../../../assets/js/libs/request';
import { connect } from 'react-redux';
import action from '../../../../actions/index';
class User_Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            colorValue: ['1'],
            nickName: '',//昵称
            headImg: this.props.state.user.isCheckHeadImg?this.props.state.user.userHeadImg:require('../../../../assets/images/home/index/头像.png')
        }
        this.sex = ''
        this.data = [
            { value: 0, label: '男' },
            { value: 1, label: '女' },
        ];
        this.colorStyle = {
            display: 'inline-block',
            verticalAlign: 'middle',
            width: '16px',
            height: '16px',
            marginRight: '10px',
        };
        this.colors = [
            {
                label:
                    (<div>
                        <span
                            style={{ ...this.colorStyle }}
                        />
                        <span>男</span>
                    </div>),
                value: '1',
            },
            {
                label:
                    (<div>
                        <span
                            style={{ ...this.colorStyle }}
                        />
                        <span>女</span>
                    </div>),
                value: '2',
            },
        ];
    }
    componentDidMount() {
        //加载基本信息
        console.log(this.state.headImg)
        //判断是否登录
        if (!this.props.state.user.isLogin) {
            this.return('user/login')
        }
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    onchange(value) {
        this.setState({
            value: value
        })
    }
    onChangeColor = (color) => {
        this.setState({
            colorValue: color,
        });
    };
    return(url) {
        this.props.history.push(config.path + url)
    }
    //保存基本信息
    save() {
        if (this.state.value === 0) {
            this.sex = '男'
        } else {
            this.sex = '女'
        }
        let data = {
            uid: this.props.state.user.uid,
            nickName: this.state.nickName === '' ? '皮皮虾' + this.props.state.user.uid : this.state.nickName,
            sex: this.sex,
            headImg: this.state.headImg
        }
        request('http://192.168.125.12:8082/uploaduserinfo', 'post', data).then(res => {
            if (res.code === 200) {
                localStorage['isCheckHeadImg']=true;
                localStorage['userHeadImg'] = res.data[0].data.headImg;
                this.props.dispatch(action.user.checkHeadImg({isCheckHeadImg:true,userHeadImg:res.data[0].data.headImg}))
                Toast.info('保存成功', 2, () => {
                    this.return('user/index')
                })
            }
        })
    }
    //图片上传
    uploadImg() {
        console.log(this.refs['headfile'].files[0])
        request('http://192.168.125.12:8082/uploadimg', 'file', { headfile: this.refs['headfile'].files[0] }).then(res => {
            console.log(res);
            if (res.code === 200) {
                this.setState({
                    headImg: res.img
                })
            }
        })
    }
    render() {
        return (
            <div className={style['user-info']}>
                <div className={style['head']}>
                    <div className={style['user-info-head-img']} onClick={this.return.bind(this, 'home/user')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['user-info-head-txt']}>
                        个人信息
                    </div>
                    <div className={style['save']} onClick={this.save.bind(this)}>
                        保存
                    </div>
                </div>
                <div className={style['content']}>
                    <div className={style['uploadimg']}>
                        <div className={style['text']}>头像</div>
                        <img src={this.props.state.user.isCheckHeadImg?this.state.headImg+'?'+Math.random():this.state.headImg} alt="" />
                        <input type='file' className={style['input-file']} onChange={this.uploadImg.bind(this)} ref='headfile'
                        >
                        </input>
                        <div className={style['arrow']}></div>
                    </div>
                    <List>
                        <List.Item arrow='horizontal'>
                            <InputItem defaultValue={this.props.state.user.name}
                                clear
                                onChange={(v) => {
                                    this.setState({
                                        nickName: v
                                    })
                                }}
                            >昵称</InputItem>
                        </List.Item>
                        <List.Item>
                            <List renderHeader={() => '请选择性别'}>
                                {this.data.map(i => (
                                    <Radio.RadioItem key={i.value} checked={this.state.value === i.value} onChange={() => this.onchange(i.value)} thumb={i.value === 1 ? require('../../../../assets/images/home/index/icon1.png') : require('../../../../assets/images/home/index/icon2.png')}>
                                        {i.label}
                                    </Radio.RadioItem>
                                ))}
                            </List>
                        </List.Item>
                    </List>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(User_Info)