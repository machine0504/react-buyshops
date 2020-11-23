import React from 'react';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '../../../components/async/async';
import config from '../../../assets/js/conf/config'
import { connect } from 'react-redux';
//公共样式引入
import '../../../assets/css/public/public.css'
//私有样式引入
import style from '../../../assets/css/private/home_index.module.css'
//import语句要放在最前面
const Indexindex = asyncComponent(() => import('../index/index'))
const Cartindex = asyncComponent(() => import('../cart/index'))
const Userindex = asyncComponent(() => import('../user/index/index'))
class Homeindex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bHome: true,
            bCart: false,
            bUser: false
        }
    }
    goPage(pUrl) {
        this.props.history.replace(config.path + pUrl);
        //图标切换
        this.setState({
            bHome: pUrl === 'home/index' ? true : false,
            bCart: pUrl === 'home/cart' ? true : false,
            bUser: pUrl === 'home/user' ? true : false
        })
    }
    render() {
        return (
            <div>
                {/* 子路由 */}
                <React.Fragment>
                    <Switch>
                        <Route path={config.path + 'home/index'} component={Indexindex}></Route>
                        <Route path={config.path + 'home/cart'} component={Cartindex}></Route>
                        <Route path={config.path + 'home/user'} component={Userindex}></Route>
                    </Switch>
                </React.Fragment>
                <div className={style['bottom-nav']}>
                    <ul onClick={this.goPage.bind(this, 'home/index')}>
                        <li className={this.state.bHome ? style['home'] + " " + style['active'] : style['home']}></li>
                        <li className={this.state.bHome ? style['text'] + " " + style['active'] : style['text']}>首页</li>
                    </ul>
                    <ul onClick={this.goPage.bind(this, 'home/cart')}>
                        <li className={this.state.bCart ? style['cart'] + " " + style['active'] : style['cart']}>
                            <div className={this.props.state.cart.aCartData.length > 0 ? style['spot'] : style['spot'] + " " + style['hide']}></div>
                        </li>
                        <li className={this.state.bCart ? style['text'] + " " + style['active'] : style['text']}>购物</li>
                    </ul>
                    <ul onClick={this.goPage.bind(this, 'home/user')}>
                        <li className={this.state.bUser ? style['my'] + " " + style['active'] : style['my']}></li>
                        <li className={this.state.bUser ? style['text'] + " " + style['active'] : style['text']}>我的</li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(Homeindex)