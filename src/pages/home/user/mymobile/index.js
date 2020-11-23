import React from 'react';
import style from './index.module.css';
import { connect } from 'react-redux';
import { Toast, NoticeBar, InputItem, Switch } from 'antd-mobile'
class MyMobile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '获取验证码',
            num: 60,
            length: 0,
            length1: 0
        }
        this.isClick = false;
        this.num = 60;
        this.user = ''
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    return() {
        this.props.history.goBack()
    }
    //获取验证码
    getData() {
        if (this.state.length === 11) {
            if (this.state.length1 > 0) {
                this.isClick = true;
                this.clickTime();
                this.setState({
                    content: '重发'
                })
            }
            else {
                Toast.info('请输入验证码')
            }

        } else {
            Toast.info('手机号格式不正确')
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
                this.isClick = false;
                this.setState({
                    content: '获取验证码'
                })
            }
        }, 1000);
    }
    goBack() {
        if (this.state.length === 11) {
            if (this.state.length1 > 0) {
                Toast.info('绑定成功')
                this.props.history.goBack();
            }
            else {
                Toast.info('请输入验证码')
            }

        } else {
            Toast.info('手机号格式不正确')
        }
    }
render() {
    return (
        <div className={style['my-mobile']}>
            <div className={style['head']}>
                <div className={style['my-mobile-head-img']} onClick={this.return.bind(this)}>
                    <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                </div>
                <div className={style['my-mobile-head-txt']}>
                    绑定手机
                    </div>
            </div>
            <div className={style['content']}>
                <div className={style['notice']}>
                    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
                        Notice: 新手机验证后,即可绑定成功.
                        </NoticeBar>
                </div>
                <div className={style['mobile']}>
                    <div className={style['item']}>
                        <InputItem placeholder="绑定手机号" type='phone' onChange={(e) => {
                            let num = '';
                            num = e;
                            num = num.replace(/ /g, '');
                            this.user = num;
                            this.setState({
                                length: num.length
                            })
                        }}></InputItem>
                    </div>
                </div>
                {this.isClick ? <div className={style['pas']}>
                    <div className={style['item']}>
                        <InputItem placeholder="验证码" type='text' onChange={(e) => {
                            this.setState({
                                length1: e.length
                            })
                        }}></InputItem>
                    </div>
                    <div className={style['item1']} onClick={this.getData.bind(this)}>
                        <div className={style['swtich']}>
                            {this.state.content}{this.state.num}
                        </div>
                    </div>
                </div> : <div className={style['pas']}>
                        <div className={style['item']}>
                            <InputItem placeholder="验证码" type='text'></InputItem>
                        </div>
                        <div className={style['item1']} onClick={this.getData.bind(this)}>
                            <div className={style['swtich']}>
                                {this.state.content}
                            </div>
                        </div>
                    </div>}
                <div className={style['item2']}>
                    <button className={style['btn']} onClick={this.goBack.bind(this)}>下一步</button>
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
})(MyMobile)