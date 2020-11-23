import React from 'react';
import style from '../../../../assets/css/private/user_login.module.css'
import config from '../../../../assets/js/conf/config';
import { InputItem, Switch, Toast } from 'antd-mobile'
import { request } from '../../../../assets/js/libs/request';
import { connect } from 'react-redux';
import action from '../../../../actions/index';
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
        this.user = '';
        this.pas = ''
    }
    return(url) {
        this.props.history.push(config.path + url)
    }
    login() {
        request('http://192.168.125.12:8082/mobilelogin', "post", { user: this.user, pas: this.pas }).then(res => {
            if (res.code === 404) {
                Toast.info('手机号不存在')
            } else {
                if (res.code === 200) {
                    console.log(res)
                    Toast.info('登录成功');
                    console.log(res.data)
                    localStorage['uid']=res.data.uid;
                    localStorage['name']=res.data.name;
                    localStorage['isLogin']=true;
                    this.props.dispatch(action.user.login({ uid:res.data.uid,name:res.data.name,isLogin:true}));
                   this.return('home/index')
                } else {
                    Toast.info('密码错误')
                }
            }
        })
    }
    render() {
        return (
            <div className={style['login']}>
                <div className={style['head']}>
                    <div className={style['login-head-img']} onClick={this.return.bind(this, '/home/index')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['login-head-txt']}>
                        登录
                    </div>
                </div>
                <div className={style['content']}>
                    <div className={style['mobile']}>
                        <div className={style['item']}>
                            <InputItem placeholder="手机号" type='phone' onChange={(e) => {
                                let num = '';
                                num = e;
                                num = num.replace(/ /g, '');
                                this.user = num;
                            }}></InputItem>
                        </div>
                    </div>
                    <div className={style['pas']}>
                        <div className={style['item']}>
                            <InputItem placeholder="密码" type={this.state.checked ? 'text' : 'password'} onChange={(e) => {
                                let num = '';
                                num = e;
                                this.pas = num;
                            }}></InputItem>
                        </div>
                        <div className={style['item1']}>
                            <div className={style['swtich']}>
                                <Switch checked={this.state.checked} onChange={() => {
                                    this.setState({
                                        checked: !this.state.checked
                                    })
                                }} color='#108EE9'></Switch>
                            </div>
                        </div>
                    </div>
                    <div className={style['btn']} onClick={this.login.bind(this)}>登录</div>
                    <div className={style['icon']}>
                        <div className={style['left']}>
                            <div className={style['t1']}><img src={require('../../../../assets/images/home/index/密码.png')} alt="" /></div>
                            <div className={style['t2']}>忘记密码</div>
                        </div>
                        <div className={style['right']}>
                            <div className={style['t2']} onClick={this.return.bind(this, 'user/register')}>快速注册</div>
                            <div className={style['t1']}><img src={require('../../../../assets/images/home/index/手机.png')} alt="" /></div>
                        </div>
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
})(LoginPage)