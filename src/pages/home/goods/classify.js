import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from '../../../components/async/async';
import config from '../../../assets/js/conf/config';
import IScroll from '../../../assets/js/libs/iscroll'
import style from '../../../assets/css/private/goods_index.module.css';
import '../../../assets/css/public/public.css'
//引用封装函数
import { request } from '../../../assets/js/libs/request'
import { localParam } from '../../../assets/js/utils/util'
import SearchComponent from '../../../components/search/search'
const Itemspage = asyncComponent(() => import('./items'))
export default class Goopage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aClassify: [],
            pageStyle: { display: 'none' }
        }
        this.myScroll = null;
        this.color = [];
        this.cid = props.location.search ? localParam(props.location.search).search.cid : '492'
    }
    componentDidMount() {
        this.getClassifyData();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    //返回主界面
    goPage(url) {
        this.props.history.push(config.path + url)
    }
    //滑动事件
    eventScroll() {
        // document.getElementById('classify-scroll').addEventListener('touchmove', function (e) {
        //     e.preventDefault()
        // }, false);
        this.myScroll = new IScroll('#classify-scroll', {
            // eventPassthrough : true,
            scrollX: false,
            scrollY: true,
            preventDefault: false
            //click:true
        });
    }
    //左侧商品分类
    getClassifyData() {
        request('http://192.168.125.12:8082/goodsclass').then(res => {
            if (res.code === 200) {
                this.color = res.data;
                this.setState({
                    aClassify: this.color
                }, () => {
                    this.eventScroll();//异步问题
                    this.defaultStyle();
                })
            }
        })
    }
    //点击切换商品
    repalcePage(url) {
        this.props.history.replace(config.path + url)
    }
    //导航栏切换颜色
    changeColor(url, index) {
        this.repalcePage(url);
        for (let i = 0; i < this.color.length; i++) {
            this.color[i].style = false;
        }
        this.handleScroll(index)
        this.color[index].style = true;
    }
    //操纵滚动动画函数
    handleScroll(pIndex) {
        // let oScrollClassify=document.getElementById('classify-scroll')
        let iTopheight = Math.round(parseInt(this.refs['items-' + pIndex].offsetHeight) * pIndex);//计算点击导航目录到顶部的高度
        // let iHalfHeight=Math.round(oScrollClassify.offsetHeight/3);
        // let iBottomHeight=oScrollClassify.scrollHeight-iTopheight;
        if (iTopheight >= 164) {
            this.myScroll.scrollTo(0, -164, 300, IScroll.utils.ease.elastic)
        }
        if (iTopheight >= 205) {
            this.myScroll.scrollTo(0, -180, 300, IScroll.utils.ease.elastic)
        }
    }
    //刷新执行
    defaultStyle() {
        if (this.color.length > 0) {
            for (let i = 0; i < this.color.length; i++) {
                if (this.color[i].cid === this.cid) {
                    this.color[i].style = true;
                    break;
                }
            }
            this.setState({
                aClassify: this.color
            })
        }
    }
    //接收子组件传值
    getStyle(style) {
        this.setState({
            pageStyle: style
        })
    }
    //搜索商品
    //父组件给子组件传值
    searchGoods() {
        this.setState({
            pageStyle: { display: 'block' }
        })
    }
    render() {
        return (
            <div>
                <div className={style['goods-header']}>
                    <div className={style['left']}><img src={require('../../../assets/images/home/goods/g1.png')} onClick={this.goPage.bind(this, 'home/index')} alt=''></img></div>
                    <div className={style['right']} onClick={this.searchGoods.bind(this)}><input type='text' placeholder='请输入宝贝名称'></input></div>
                </div>
                <div className={style['goods-main']}>
                    <div className={style['classify-wrap']} id='classify-scroll'>
                        <div className={style['show']}>
                            {this.state.aClassify.map((item, index) => {
                                return (
                                    <div ref={'items-' + index} key={index} onClick={this.changeColor.bind(this, 'goods/classify/items?cid=' + item.cid, index)} className={item.style ? style['color'] + " " + style['active'] : style['color']}>{item.title}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style['goods-content']}>
                        <Switch>
                            <Route path={config.path + 'goods/classify/items'} component={Itemspage}></Route>
                        </Switch>
                    </div>
                </div>
                <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)}></SearchComponent>
            </div>
        )
    }
}