import React from 'react';
import style from '../../../assets/css/private/details_index.module.css';
import config from '../../../assets/js/conf/config';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../../../components/async/async';
import { localParam } from '../../../assets/js/utils/util';
import { connect } from 'react-redux';
const DetailsItem = asyncComponent(() => import('./details_item'))
const DetailsContent = asyncComponent(() => import('./details_content'))
const DetailsReview = asyncComponent(() => import('./details_review'))
class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state1: true,
            state2: false,
            state3: false,
        }
        this.skey = ''
    }
    //页面跳转
    goPage(url, index) {
        this.props.history.push(config.path + url);
        switch (index) {
            case 1: this.setState({
                state1: true,
                state2: false,
                state3: false
            });
                break;
            case 2: this.setState({
                state2: true,
                state1: false,
                state3: false,
            });
                break;
            case 3: this.setState({
                state3: true,
                state2: false,
                state1: false
            });
                break;
        }
    }
    componentDidMount() {
        this.skey = localParam(this.props.location.search).search.gid
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    //跳转到购物车界面
    goCartIndex(url){
        this.props.history.push(config.path+url)
    }
    render() {
        return (
            <div className={style['page']}>
                <div className={style['header']}>
                    <div className={style['return']} onClick={this.goPage.bind(this, 'home/index')}>
                        <img src={require('../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['content']}>
                        <div className={style['goods']} onClick={this.goPage.bind(this, 'goods/details/item?gid=' + this.skey, 1)} style={this.state.state1 ? { borderBottom: '2px solid #FDA208' } : {}}>商品</div>
                        <div className={style['details']} onClick={this.goPage.bind(this, 'goods/details/content?gid=' + this.skey, 2)} style={this.state.state2 ? { borderBottom: '2px solid #FDA208' } : {}}>详情</div>
                        <div ref='command' className={style['command']} onClick={this.goPage.bind(this, 'goods/details/review?gid=' + this.skey, 3)} style={this.state.state3 ? { borderBottom: '2px solid #FDA208' } : {}}>评价</div>
                    </div>
                    <div className={style['cart']} id="cart-icon" onClick={this.goCartIndex.bind(this,'home/cart')}>
                        <div className={this.props.state.cart.aCartData.length>0?style['spot']:style['spot']+" "+style['hide']}></div>
                    </div>
                </div>
                <div className={style['components']}>
                    <Switch>
                        <Route path='/goods/details/item' component={DetailsItem}></Route>
                        <Route path='/goods/details/content' component={DetailsContent}></Route>
                        <Route path='/goods/details/review' component={DetailsReview}></Route>
                        <Redirect to={config.path + 'goods/details/item'}></Redirect>
                    </Switch>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(DetailsPage)