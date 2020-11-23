import React from 'react';
//引用封装函数
import { request } from '../../../assets/js/libs/request'
//导入私有样式
import style from '../../../assets/css/private/index_index.module.css';
//解决白屏
import { setScrollTop } from '../../../assets/js/utils/util'
//引入swiper文件
import '../../../assets/css/public/swiper.min.css'
import Swiper from '../../../assets/js/libs/swiper.min.js';
import config from '../../../assets/js/conf/config';
//引入搜索组件
import SearchComponent from '../../../components/search/search'
import { connect } from 'react-redux';
//判断使用平台
import {isSystem} from '../../../assets/js/utils/util';
//引入图片懒加载
import { echo } from '../../../assets/js/libs/echo'
class Indexindex extends React.Component {
    constructor() {
        super()
        this.state = {
            aSwiper: [],
            aNav: [],
            aGoods: [],
            aRec: [],
            bScroll: false,
            pageStyle: { display: 'none' }
        }
        this.bScroll = true;
    }
    componentDidMount() {
 
        setScrollTop(global.scrollTop.index)
        this.getSwiper();
        this.getNav();
        this.getGoods();
        this.getRec();
        window.addEventListener('scroll', this.eventScroll.bind(this), false)
    }
    //解决内存泄漏
    componentWillUnmount() {
        this.bScroll = false;
        window.removeEventListener('scroll', this.eventScroll.bind(this))
        this.setState = (state, callback) => {
            return
        }
    }
    //滚动事件
    eventScroll() {
        if (this.bScroll) {
            let iScroll = document.documentElement.scrollTop || document.body.scrollTop
            global.scrollTop.index = iScroll;
            if (iScroll > 400) {
                this.setState({
                    bScroll: true
                })
            } else {
                this.setState({
                    bScroll: false
                })
            }
        }
    }
    //对接数据
    //导入轮播图片
    getSwiper() {
        request('http://192.168.125.12:8082').then(res => {
            if (res.code === 200) {
                this.setState({
                    aSwiper: res.data
                }, () => {
                    var mySwiper = new Swiper("." + style['swiper-wrap'], {
                        autoplay: 3000,//可选选项，自动滑动
                        pagination: '.swiper-pagination',
                        autoplayDisableOnInteraction: false,
                        loop: true,
                    })
                })
            }
        })
    }
    //导入产品明细
    getNav() {
        request('http://192.168.125.12:8082/nav').then(res => {
            if (res.code === 200) {
                this.setState({
                    aNav: res.data
                })
            }
        })
    }
    //导入产品分类
    getGoods() {
        request('http://192.168.125.12:8082/goodslevel').then(res => {
            if (res.code === 200) {
                this.setState({
                    aGoods: res.data
                }, () => {
                    echo()
                })
            }
        })
    }
    //为你推荐
    getRec() {
        request('http://192.168.125.12:8082/recommend').then(res => {
            if (res.code === 200) {
                this.setState({
                    aRec: res.data
                }, () => {
                    echo()
                })
            }
        })
    }
    //跳转到商品分类界面
    pushPage(url) {
        this.props.history.push(config.path + url)
    }
    //搜索商品
    //父组件给子组件传值
    searchGoods() {
        this.setState({
            pageStyle: { display: 'block' }
        })
    }
    //接收子组件传值
    getStyle(style) {
        this.setState({
            pageStyle: style
        })
    }
    render() {
        return (
            <div className={style['page']}>
                {/* 顶部搜索 */}
                <div className={this.state.bScroll ? style['search-header'] + " " + style['red-bg'] : style['search-header']}>
                    <div className={style['classify-icon']} onClick={this.pushPage.bind(this, 'goods/classify/items')}></div>
                    <div className={style['search-wrap']} onClick={this.searchGoods.bind(this)}>
                        <div className={style['search-icon']}></div>
                        <div className={style['search-text']}>请输入宝贝信息</div>
                    </div>
                    <div className={style['login-wrap']}>
                        {this.props.state.user.isLogin ? <div className={style['myimg']} onClick={this.pushPage.bind(this, 'user/index')}>
                            <img src={require('../../../assets/images/home/my1.png')} alt="" />
                        </div> : <div className={style['login-text']} onClick={this.pushPage.bind(this, 'user/login')}>登录</div>}
                    </div>
                </div>
                {/* 轮播图 */}
                <div className={style['swiper-wrap']}>
                    <div className="swiper-wrapper">
                        {this.state.aSwiper.map((item, index) => {
                            return (
                                <div className="swiper-slide" key={index}><img src={item.image} alt={item.title}></img></div>
                            )
                        })}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                {/* 分类导航 */}
                <div className={style['quick-nav']}>
                    {this.state.aNav.map((item, index) => {
                        return (
                            <div className={style['item']} key={index}>
                                <div className={style['item-img']} onClick={this.pushPage.bind(this, 'goods/classify/items?cid=' + item.cid)}><img src={item.image}></img></div>
                                <div className={style['item-text']}>{item.title}</div>
                            </div>
                        )
                    })}
                </div>
                {/* 产品分类 */}
                {
                    this.state.aGoods.map((item, index) => {
                        return (
                            <div className={style['goods-group']} key={index}>
                                <div className={style['classify-title'] + " " + style['color' + (index + 1)]}>—— {item.title} ——</div>
                                {index % 2 === 0 ? <div className={style['classify-header']}>
                                    <div className={style['classify-header-left']} id="lazyimg">
                                        <div className={style['desc']}><span>{item.items[0].title}</span></div>
                                        <div className={style['text']}>
                                            <div className={style['left']}>{item.items[0].gid}</div>
                                            <div className={style['right'] + " " + style['color' + (index + 1)]}>{item.items[0].price}</div>
                                        </div>
                                        <img className={style['img']} src={require('../../../assets/images/home/index/timg.gif')} data-src={item.items[0].image} onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item.items[0].gid)} alt=''></img>
                                    </div>
                                    <div className={style['classify-header-right']}>
                                        <div className={style['top']}>
                                            <div className={style['left']}>
                                                <p>{item.items[1].title}</p>
                                                <p>{item.items[1].cid}</p>
                                            </div>
                                            <div className={style['right']} id='lazyimg'>
                                                <img src={require('../../../assets/images/home/index/timg.gif')} data-src={item.items[1].image} onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item.items[1].gid)} alt=''></img>
                                            </div>
                                        </div>
                                        <div className={style['bottom']}>
                                            <div className={style['left']}>
                                                <p>{item.items[2].title}</p>
                                                <p>{item.items[2].cid}</p>
                                            </div>
                                            <div className={style['right']} id='lazyimg'><img src={require('../../../assets/images/home/index/timg.gif')} data-src={item.items[2].image} onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item.items[2].gid)} alt=''></img></div>
                                        </div>
                                    </div>
                                </div>
                                    :
                                    <div className={style['classify-header1']}>
                                        <div className={style['item']}>
                                            <div className={style['desc']}>{item.items[0].title}</div>
                                            <div className={style['desc1']}>{item.items[0].gid}</div>
                                            <div className={style['img']} id="lazyimg"><img src={require('../../../assets/images/home/index/timg.gif')} data-src={item.items[0].image} onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item.items[0].gid)} alt=''></img></div>
                                        </div>
                                        <div className={style['item']}>
                                            <div className={style['desc']}>{item.items[1].title}</div>
                                            <div className={style['desc1']}>{item.items[1].gid}</div>
                                            <div className={style['img']} id='lazyimg'><img src={require('../../../assets/images/home/index/timg.gif')} data-src={item.items[1].image} onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item.items[1].gid)} alt=''></img></div>
                                        </div>
                                    </div>

                                }
                                <div className={style['classify-center']}>
                                    <div className={style['item']}>
                                        <div className={style['desc']}>{index === 1 ? item.items[2].title : item.items[3].title}</div>
                                        <div className={style['img']} id="lazyimg"><img src={require('../../../assets/images/home/index/timg.gif')} data-src={index === 1 ? item.items[2].image : item.items[3].image} onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + (index === 1 ? item.items[2].gid : item.items[3].gid))} alt=''></img></div>
                                        <div className={style['price']}>{index === 1 ? item.items[2].price : item.items[3].price}</div>
                                        <div className={style['delete']}><s>{index === 1 ? item.items[2].price * 2 : item.items[3].price * 2}</s></div>
                                    </div>
                                    <div className={style['item']}>
                                        <div className={style['desc']}>{index === 1 ? item.items[3].title : item.items[4].title} </div>
                                        <div className={style['img']} id="lazyimg"><img src={require('../../../assets/images/home/index/timg.gif')} data-src={index === 1 ? item.items[3].image : item.items[4].image} onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + (index === 1 ? item.items[3].gid : item.items[4].gid))} alt=''></img></div>
                                        <div className={style['price']}>{index === 1 ? item.items[3].price : item.items[4].price}</div>
                                        <div className={style['delete']}><s>{index === 1 ? item.items[3].price * 2 : item.items[4].price * 2}</s></div>
                                    </div>
                                    <div className={style['item']}>
                                        <div className={style['desc']}>{index === 1 ? item.items[4].title : item.items[5].title} </div>
                                        <div className={style['img']} id="lazyimg"><img src={require('../../../assets/images/home/index/timg.gif')} data-src={index === 1 ? item.items[4].image : item.items[5].image} onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + (index === 1 ? item.items[4].gid : item.items[5].gid))} alt=''></img></div>
                                        <div className={style['price']}>{index === 1 ? item.items[4].price : item.items[5].price}</div>
                                        <div className={style['delete']}><s>{index === 1 ? item.items[4].price * 2 : item.items[5].price * 2}</s></div>
                                    </div>
                                    <div className={style['item']}>
                                        <div className={style['desc']}>{index === 1 ? item.items[5].title : item.items[6].title}</div>
                                        <div className={style['img']} id="lazyimg"><img src={require('../../../assets/images/home/index/timg.gif')} data-src={index === 1 ? item.items[5].image : item.items[6].image} onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + (index === 1 ? item.items[5].gid : item.items[6].gid))} alt=''></img></div>
                                        <div className={style['price']}>{index === 1 ? item.items[5].price : item.items[6].price}</div>
                                        <div className={style['delete']}><s>{index === 1 ? item.items[5].price * 2 : item.items[6].price * 2}</s></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className={style['goods-group']}>
                    <div className={style['classify-recom']}>
                        <div className={style['left-line']}></div>
                        <div className={style['center-line']}>
                            <div className={style['img']}><img src={require('../../../assets/images/home/index/爱心.png')} alt=''></img></div>
                            <div className={style['text']}>为你推荐</div>
                        </div>
                        <div className={style['right-line']}></div>
                    </div>

                    {this.state.aRec.map((item, index) => {
                        return (
                            <div className={style['item-list']} key={index}>
                                <div className={style['left']}>
                                    <div className={style['container']} id='lazyimg' onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item.cid)} alt=''><img src={require('../../../assets/images/home/index/timg.gif')} alt='' data-src={item.image}></img></div>
                                    <div className={style['text']}>{item.title}</div>
                                    <div className={style['price']}>{item.price}</div>
                                </div>
                                <div className={style['left']}>
                                    <div className={style['container']} id='lazyimg' onClick={this.pushPage.bind(this, 'goods/details/item?gid=' + item.cid)} alt=''><img src={require('../../../assets/images/home/index/timg.gif')} data-src={item.image1} alt=''></img></div>
                                    <div className={style['text']}>{item.title1}</div>
                                    <div className={style['price']}>{item.price1}</div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={style['footer']}>↑上滑加载更多</div>
                </div>
                <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)}></SearchComponent>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(Indexindex)