import React from 'react';
import config from '../../../../assets/js/conf/config';
import ReactDOM from 'react-dom';
import style from '../../../../assets/css/private/user_register.module.css';
import { canvasImg } from '../../../../assets/js/libs/yanzhen';
import { InputItem, Switch, Button, Toast } from 'antd-mobile';
import { request } from '../../../../assets/js/libs/request'
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bak: false,
            num: 60,
            length: 0,
            mobileregis: [],
            regis: 0
        }
        this.num = 60;
        this.pas = '';
        //禁止重复提交
        this.submit=true;
    }
    componentDidMount() {
        canvasImg("canvas", "text", "btn", (as) => {
            if (this.pas.length >= 8) {
                this.props.history.push(as);
                request('http://192.168.125.12:8082/mobile', "post", { regis: this.state.regis, pas: this.pas }).then(res => {
                    if (res.code === 200) {
                        console.log(res)
                    }
                })
            } else {
                Toast.info('密码长度不符合要求!')
            }
        });
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    //定时器
    clickTime() {
        var time = setInterval(() => {
            this.num = this.num - 1;
            this.setState({
                num: this.num
            })
            if (this.state.num === 0) {
                clearInterval(time);
                this.setState({
                    bak: false
                })
            }
        }, 1000);
    }
    return(url) {
        this.props.history.push(config.path + url)
    }
    render() {
        return (
            <div className={style['register']}>
                <div className={style['head']}>
                    <div className={style['register-head-img']} onClick={this.return.bind(this, '/home/index')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['register-head-txt']}>
                        注册
                    </div>
                </div>
                <div className={style['content']}>
                    <div className={style['verify']}>
                        <div className={style['text']}>
                            <input type="text" placeholder="验证码" id="text" />
                        </div>
                        <div className={style['img']}>
                            <canvas id="canvas" width='98.22' height='44'></canvas>
                        </div>
                    </div>
                    <div className={style['mobile']}>
                        <div className={style['item1']}>
                            <InputItem placeholder="手机号" type='phone' onChange={(e) => {
                                let num = '';
                                num = e;
                                num = num.replace(/ /g, '');
                                this.setState({
                                    length: num.length,
                                    regis: num
                                })
                            }}></InputItem>
                        </div>
                        <div className={style['item2']}>
                            {this.state.bak ? <button className={style['but']}>{this.state.num}s</button> :
                                <Button type='primary' style={{ fontSize: '0.7rem', height: '2.2rem', lineHeight: '2.2rem' }}
                                    className={style['am-button-primary']} onClick={() => {
                                        request('http://192.168.125.12:8082/mobileregis').then(res => {
                                            if (res.code === 200) {
                                                this.setState({
                                                    mobileregis: res.data
                                                })
                                                var kk = res.data.find(e => {
                                                    return e.mobile === this.state.regis

                                                })
                                                if (kk) {
                                                    Toast.info('该手机号已经注册!');
                                                }
                                                else {
                                                    if (this.state.length === 11) {
                                                        this.setState({
                                                            bak: true
                                                        })
                                                        this.clickTime();
                                                    } else {
                                                        Toast.info('请输入正确的手机号!')
                                                    }
                                                }
                                            }
                                        })

                                    }}>获取短信验证</Button>}
                        </div>
                    </div>
                    <div className={style['card']}>
                        <input type="number" placeholder="请输入短信验证码" />
                    </div>
                    <div className={style['pas']}>
                        <div className={style['item']}>
                            <InputItem placeholder="请输入8到12位密码" type={this.state.checked ? 'text' : 'password'} onChange={(e) => {
                                let pas = '';
                                pas = e;
                                this.pas = pas;
                            }} maxLength='12' onBlur={() => {
                                if (this.pas.length < 8) {
                                    Toast.info('密码长度不符合要求!')
                                }
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
                    <div className={style['btn']} id='btn'>注册</div>
                </div>
            </div>
        )
    }
}