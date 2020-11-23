import React from 'react';
import style from './mypass.module.css';
import { connect } from 'react-redux';
import { InputItem, Switch } from 'antd-mobile'
class MyPass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:false,
            checked1:false,
            checked2:false,
        }

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
    //修改密码
    update(){

    }
    render() {
        return (
            <div className={style['my-pass']}>
                <div className={style['head']}>
                    <div className={style['my-pass-head-img']} onClick={this.return.bind(this)}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['my-pass-head-txt']}>
                        修改密码
                    </div>
                </div>
                <div className={style['content']}>
                    <div className={style['pas']}>
                        <div className={style['item']}>
                            <InputItem placeholder="请输入原密码" type={this.state.checked ? 'text' : 'password'} onChange={(e) => {
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
                    <div className={style['pas']}>
                        <div className={style['item']}>
                            <InputItem placeholder="请输入新密码" type={this.state.checked1 ? 'text' : 'password'} onChange={(e) => {
                                let num = '';
                                num = e;
                                this.pas = num;
                            }}></InputItem>
                        </div>
                        <div className={style['item1']}>
                            <div className={style['swtich']}>
                                <Switch checked={this.state.checked1} onChange={() => {
                                    this.setState({
                                        checked: !this.state.checked1
                                    })
                                }} color='#108EE9'></Switch>
                            </div>
                        </div>
                    </div>
                    <div className={style['pas']}>
                        <div className={style['item']}>
                            <InputItem placeholder="请确认新密码" type={this.state.checked2 ? 'text' : 'password'} onChange={(e) => {
                                let num = '';
                                num = e;
                                this.pas = num;
                            }}></InputItem>
                        </div>
                        <div className={style['item1']}>
                            <div className={style['swtich']}>
                                <Switch checked={this.state.checked2} onChange={() => {
                                    this.setState({
                                        checked: !this.state.checked2
                                    })
                                }} color='#108EE9'></Switch>
                            </div>
                        </div>
                    </div>
                    <div className={style['btn']} onClick={this.update.bind(this)}>修改</div>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(MyPass)