import React from 'react';
import ReactDOM from 'react-dom';
import style from '../../../assets/css/private/details_item.module.css';
import Swiper from '../../../assets/js/libs/swiper.min.js';
import TweenMax from '../../../assets/js/libs/TweenMax.min.js';
import { request } from '../../../assets/js/libs/request';
import { Toast } from 'antd-mobile'
import config from '../../../assets/js/conf/config';
import { localParam } from '../../../assets/js/utils/util';
//redux
import { connect } from 'react-redux';
import action from '../../../actions/index';
class DetailsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aSwiper: {},
            aImg: [],
            afistImg: '',
            aReview: [],
            totalRewiew: 0,
            pStyle: false,
            goodsInfo: [],//获取商品详细样式
            goodsSize: [],//获取商品详细大小,
            bakColor: false,
            Count: 1,
            gid: '',
            title: '',
            price: '',
            freight: 0,
            sales: 0,
            aAttr: []
        }
        this.skey = '';
        this.bMove = false
    }
    componentDidMount() {
        //解决白屏
        setTimeout(() => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }, 30);
        this.getReviews();
        this.getSwiper();
        this.getGoddsInfo();
        // this.refs['mask'].addEventListener('touchmove', function(e) {
        //     e.preventDefault()
        // }, false)
        this.skey = localParam(this.props.location.search).search.gid
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    //导入轮播图片
    getSwiper() {
        request('http://192.168.125.12:8082/imgdata?gid=' + localParam(this.props.location.search).search.gid).then(res => {
            if (res.code === 200) {
                this.setState({
                    aSwiper: res,
                    aImg: res.images,
                    afistImg: res.images[0]
                }, () => {
                    var mySwiper = new Swiper(this.refs['swiper-wrap'], {
                        autoplay: 3000,//可选选项，自动滑动
                        pagination: '.swiper-pagination',
                        autoplayDisableOnInteraction: false,
                        loop: true,
                    })
                })
            }
        })
    }
    //点击加入购物车
    getBtn() {
        this.setState({
            pStyle: true,
        })
    }
    //关闭弹窗
    getClose() {
        if (!this.bMove) {
            this.setState({
                pStyle: false,
            })
        }
    }
    //点击收藏
    collect() {
        console.log(this.props.state.user.uid)
        let data = {
            title: this.state.aSwiper.title,
            price: this.state.aSwiper.price,
            img: this.state.aSwiper.images[0],
            gid: this.state.aSwiper.gid,
            uid:this.props.state.user.uid
        }
        request('http://192.168.125.12:8082/addmylove', "post", data).then(res => {
            if (res.code === 200) {
                Toast.info('收藏成功!')
            }
        })
    }
    //页面跳转
    goPage(url) {
        this.props.history.push(config.path + url)
    }
    //导入产品信息详细样式
    getGoddsInfo() {
        request('http://192.168.125.12:8082/goodsinfo').then(res => {
            if (res.code === 200) {
                this.setState({
                    goodsInfo: res.data[0].values,
                    goodsSize: res.data[1].values,
                    aAttr: res.data
                })
            }
        })
    }
    //选择属性值
    clickState1(index) {
        let arr1 = []
        arr1 = this.state.goodsInfo;
        if (arr1.length > 0) {
            for (let i = 0; i < arr1.length; i++) {
                if (i !== index) {
                    arr1[i].checked = false
                }
            }
            if (arr1[index].checked) {
                arr1[index].checked = false;
            } else {
                arr1[index].checked = true;
            }
        }
        this.setState({
            goodsInfo: arr1
        })
    }
    clickState2(index) {
        let arr1 = []
        arr1 = this.state.goodsSize;
        if (arr1.length > 0) {
            for (let i = 0; i < arr1.length; i++) {
                if (i !== index) {
                    arr1[i].checked = false
                }
            }
            if (arr1[index].checked) {
                arr1[index].checked = false;
            } else {
                arr1[index].checked = true;
            }
        }
        this.setState({
            goodsSize: arr1
        })
    }
    //减少数量
    reduceCount() {
        if (this.state.Count === 1) {
            Toast.info('不能再少了!')
        } else {
            let Count = this.state.Count;
            Count--
            this.setState({
                Count: Count
            })
        }
    }
    //增加数量
    addCount() {
        if (this.state.Count === 99) {
            Toast.info('不能再多了!')
        } else {
            let Count = this.state.Count;
            Count++
            this.setState({
                Count: Count
            })
        }
    }
    //加入购物车
    //检测是否选中属性值
    checkAttr() {
        this.setState({
            gid: this.skey,
            title: this.state.aSwiper.title,
            price: this.state.aSwiper.price,
            freight: this.state.aSwiper.freight,
            sales: this.state.aSwiper.sales
        })
        let arr1 = [];
        let arr1State = false;
        let arr2State = false;
        arr1 = this.state.goodsInfo;
        if (arr1.length > 0) {
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i].checked === true) {
                    arr1State = true;
                    break;
                }
            }
            let arr2 = [];
            arr2 = this.state.goodsSize;
            if (arr2.length > 0) {
                for (let i = 0; i < arr2.length; i++) {
                    if (arr2[i].checked === true) {
                        arr2State = true;
                        break;
                    }
                }
            }
            if (!arr1State) {
                Toast.info('请选择颜色')
            } else {
                if (!arr2State) {
                    Toast.info('请选择尺码')
                } else {
                    if (!this.bMove) {
                        this.bMove = true;
                        let stateImg = this.refs['goods-img'];
                        let cloneImg = stateImg.cloneNode(true);
                        cloneImg.style.cssText = "position:absolute;z-index:1;left:0px;top:0px;width:0.6rem;height:0.6rem"
                        let goodsDesc = this.refs['goods-left'];
                        goodsDesc.append(cloneImg)
                        let srcImgX = stateImg.offsetLeft;
                        let cartIcon = ReactDOM.findDOMNode(document.getElementById('cart-icon'));
                        let srcImgY = window.screen.height - ReactDOM.findDOMNode(document.getElementById('cart-panel')).offsetHeight
                        TweenMax.to(cloneImg, 2, {
                            bezier: [{ x: srcImgX, y: stateImg.offsetTop }, { x: srcImgX, y: -110 }, { x: cartIcon.offsetLeft, y: -srcImgY }], onComplete: () => {
                                cloneImg.remove();
                                this.bMove = false;
                                this.getClose();
                                //1.将商品添加redux
                                let aAttrs = [], aParam = [];
                                if (this.state.aAttr.length > 0) {
                                    for (let i in this.state.aAttr) {
                                        if (this.state.aAttr[i].values.length > 0) {
                                            aParam = [];
                                            for (let j in this.state.aAttr[i].values) {
                                                if (this.state.aAttr[i].values[j].checked) {
                                                    aParam.push({ paramid: this.state.aAttr[i].values[j].vid, value: this.state.aAttr[i].values[j].value })
                                                }
                                            }
                                        }
                                        aAttrs.push({ attrid: this.state.aAttr[i].attrid, title: this.state.aAttr[i].title, param: aParam });
                                    }
                                }
                                this.props.dispatch(action.cart.addCart({
                                    gid: this.state.gid, title: this.state.title, price: this.state.price, count: this.state.Count,
                                    freight: this.state.aSwiper.freight, sales: this.state.aSwiper.sales, img: this.state.afistImg, checked: false, attrs: aAttrs
                                }))
                            }
                        });
                        TweenMax.to(cloneImg, 0.2, { rotation: 360, repeat: -1 })
                    }
                }
            }
        }
    }
    //获取评论
    getReviews() {
        request('http://192.168.125.12:8082/reviewdata').then(res => {
            if (res.code === 200) {
                this.setState({
                    aReview: res.data,
                    totalRewiew: res.pageinfo.total
                })
            }
        })
    }
    render() {
        return (
            <div className={style['item']}>
                <div className={style['center']}>
                    {/* 轮播图 */}
                    <div className={style['swiper-wrap']} ref='swiper-wrap'>
                        <div className="swiper-wrapper">
                            {this.state.aImg.map((item, index) => {
                                return (
                                    <div className="swiper-slide" key={index}><img src={item} alt='' key={index}></img></div>
                                )
                            })}
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                    <div className={style['center-txt']}>{this.state.aSwiper.title}</div>
                    <div className={style['center-price']}>{this.state.aSwiper.price}</div>
                    <div className={style['center-total']}>
                        <div className={style['total-item1']}>快递:{this.state.aSwiper.freight}元</div>
                        <div className={style['total-item2']}>月销量{this.state.aSwiper.sales}件</div>
                    </div>
                </div>
                <div className={style['back-inine']}></div>
                <div className={style['recommen']}>
                    <div className={style['txt']}>商品评价({this.state.totalRewiew})</div>
                    {this.state.aReview.map((item, index) => {
                        return (
                            <div className={style['view']} key={index}>
                                <div className={style['user']}>
                                    <img src={item.head} alt="" />
                                    <div className={style['name']}>{item.nickname}</div>
                                </div>
                                <div className={style['point']}>{item.content}</div>
                                <div className={style['time']}>{item.times}</div>
                            </div>
                        )
                    })}
                    <div className={style['btn']} onClick={this.goPage.bind(this, 'goods/details/review?gid=' + this.skey)}>查看更多评价</div>
                </div>
                <div className={style['footer']}>
                    <div className={style['like']} onClick={this.collect.bind(this)}>收藏</div>
                    <div className={style['join-cart']} onClick={this.getBtn.bind(this)}>加入购物车</div>
                </div>

                {/* 点击弹出选项面板 */}
                <div className={style['mask']} onClick={this.getClose.bind(this)} ref='mask' id='mask' style={this.state.pStyle ? { display: 'block' } : { display: 'none' }}></div>
                <div className={this.state.pStyle ? style['panel'] + " " + style['up'] : style['panel'] + " " + style['down']} id='cart-panel'>
                    <div className={style['desc']} ref='goods-desc'>
                        <div className={style['left']} ref="goods-left">
                            <div className={style['clone']} ref='goods-img'>
                                <img src={this.state.afistImg} alt="" />
                            </div>
                        </div>
                        <div className={style['right']}>
                            <div className={style['txt']}>{this.state.aSwiper.title}</div>
                            <div className={style['price']}>
                                <div className={style['item1']}>{this.state.aSwiper.price}</div>
                                <div className={style['item2']}>商品编码:143208071</div>
                            </div>
                        </div>
                        <div className={style['close']} onClick={this.getClose.bind(this)}>
                            <img src={require('../../../assets/images/home/index/close.png')} alt="" />
                        </div>
                    </div>
                    <div className={style['banner']}>
                        <div className={style['iScroll']}>
                            <div className={style['header']}>颜色</div>
                            <div className={style['item']}>
                                {this.state.goodsInfo.map((item, index) => {
                                    return (
                                        <div key={index} className={item.checked ? style['bak-color'] + " " + style['color'] : style['bak-color']} onClick={this.clickState1.bind(this, index)}>{item.value}</div>
                                    )
                                })}
                            </div>
                            <div className={style['header']}>尺码</div>
                            <div className={style['item']}>
                                {this.state.goodsSize.map((item, index) => {
                                    return (
                                        <div key={index} className={item.checked ? style['bak-color'] + " " + style['color'] : style['bak-color']} onClick={this.clickState2.bind(this, index)}>{item.value}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={style['number']}>
                            <div className={style['item1']}>购买数量</div>
                            <div className={style['item2']}>
                                <div className={style['border']}>
                                    <div className={style['b1']} onClick={this.reduceCount.bind(this)}>-</div>
                                    <div className={style['b2']}>{this.state.Count}</div>
                                    <div className={style['b3']} onClick={this.addCount.bind(this)}>+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style['inline']}></div>
                    <div className={style['sure']} onClick={this.checkAttr.bind(this)}>确定</div>
                </div>

            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(DetailsItem)