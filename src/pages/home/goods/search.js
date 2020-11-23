import React from 'react';
import style from '../../../assets/css/private/search_index.module.css'
import config from '../../../assets/js/conf/config';
import { request } from '../../../assets/js/libs/request'
import { localParam } from '../../../assets/js/utils/util'
//引入搜索组件
//引入下拉刷新组件
import { PullToRefresh } from 'antd-mobile';
import SearchComponent from '../../../components/search/search'
export default class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            order: false,
            class: true,//点击筛选为true
            page: true,//头部展开
            page1: true,//底部展开
            clickTxt: '',//点击选中文本
            salesColor: false,//销量颜色
            pageStyle: { display: 'none' },//引入搜索组件
            aGoods: [],
            aLoad: [],//下拉加载刷新
            topPrice: [],//价格升序
            notFound: false,//搜索不到
            notaGoods: [],//搜索不到
            top: false,
            footPrice: [],//价格降序
            foot: false,
            salesNum: [],//销量
            sKey: '',
            //刷新属性
            refreshing: false,//是否刷新
            height: document.documentElement.clientHeight,
            aClass: [],//分类获取
            aPrice: [],//价格区间
            aSport: [],//品牌名称
            aSize: [],//产品样式
            fPrice1: 0,//选中价格一
            fPrice2: 0,//选中价格二
            aAttr: [],//选中样式品牌
        }
        this.bak = false;
        this.topPrice = [];//价格升序
        this.footPrice = [];//价格降序
        this.sKey = '';
        this.cid = '';
        this.fprice1 = '';
        this.fprice2 = '';
    }
    //返回
    goPage(url) {
        this.props.history.push(config.path + url)
    }
    //综合
    Swtich() {
        this.setState({
            order: true,
            salesColor: false
        })
    }
    toggle() {
        this.setState({
            order: false,
            salesColor: false
        })
    }
    componentDidMount() {
        this.handleScreen();
        this.getClass();
        this.getPrice();
        this.getAttr();
        this.sKey = decodeURIComponent(localParam(this.props.location.search).search.keywords)
        this.setState({
            sKey: this.sKey
        })
        this.getData();
    }
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    }
    //禁止滑动
    handleScreen() {
        this.refs['mask'].addEventListener('touchmove', function (e) {
            e.preventDefault()
        }, false)
        this.refs['screen'].addEventListener('touchmove', function (e) {
            e.preventDefault()
        }, false)
    }
    //点击筛选
    openScreen() {
        this.setState({
            class: false
        })
    }
    closeScreen() {
        this.getData()
        this.setState({
            class: true
        })
    }
    //切换背景
    changeColor(index) {
        let aClass = [];
        aClass = this.state.aClass
        if (aClass.length > 0) {
            for (let i = 0; i < aClass.length; i++) {
                if (i !== index) {
                    aClass[i].state = false
                }
            }
            if (aClass[index].state) {
                aClass[index].state = false;
                this.cid = '';
            } else {
                aClass[index].state = true;
                this.cid = aClass[index].cid
            }
        }
        this.setState({
            aClass: aClass,
            clickTxt: aClass[index].title
        })
    }
    changeColor1(index, price1, price2) {
        let aPrice = [];
        aPrice = this.state.aPrice
        if (aPrice.length > 0) {
            for (let i = 0; i < aPrice.length; i++) {
                if (i !== index) {
                    aPrice[i].state = false
                }
            }
            if (aPrice[index].state) {
                aPrice[index].state = false
                this.fprice1 = ""
                this.fprice2 = ""
            } else {
                aPrice[index].state = true;
                this.fprice1 = aPrice[index].price1;
                this.fprice2 = aPrice[index].price2;
            }
        }
        this.setState({
            aPrice: aPrice,
            fPrice1: price1,
            fPrice2: price2
        })
    }
    changeColor2(index) {
        let aSport = this.state.aSport;
        if (aSport[index].state) {
            aSport[index].state = false
        } else {
            aSport[index].state = true
        }
        this.setState({
            aSport: aSport
        })
    }
    changeColor3(index) {
        let aSize = this.state.aSize;
        if (aSize[index].state) {
            aSize[index].state = false
        } else {
            aSize[index].state = true
        }
        this.setState({
            aSize: aSize
        })
    }
    //展开隐藏
    closePageState() {
        this.setState({
            page: false
        })
    }
    openPageState() {
        this.setState({
            page: true
        })
    }
    closePageState1() {
        this.setState({
            page1: false
        })
    }
    openPageState1() {
        this.setState({
            page1: true
        })
    }
    //销量
    sales() {
        if (this.state.salesColor) {
            this.setState({
                salesColor: false
            })
        } else {
            this.setState({
                salesColor: true
            })
        }
        request('http://192.168.125.12:8082/search').then(res => {
            if (res.code === 200) {
                this.setState({
                    salesNum: res.data
                }, () => {
                    let newArr = this.state.salesNum;
                    function circle(a, b) {
                        return b.sales - a.sales
                    }
                    this.setState({
                        salesNum: newArr.sort(circle),
                    })
                })
            }
        })
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
    //访问数据
    getData() {
        request('http://192.168.125.12:8082/searchkey?keywords=' + this.sKey + "&cid=" + this.cid + "&price1=" + this.fprice1 + "&price2=" + this.fprice2).then(res => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            if (res.code === 200) {
                if (this.cid === '' && this.fprice1 === '') {
                    this.setState({
                        aGoods: res.data,
                        notFound: false
                    })
                } else if (this.cid !== '' && this.fprice1 === '') {
                    this.setState({
                        aGoods: res.data,
                        notFound: false
                    })
                } else {
                    this.setState({
                        aGoods: res.data,
                        notFound: false
                    })
                }
            } else {
                this.setState({
                    notaGoods: res.data,
                    notFound: true
                })
            }
        })
    }
    //选择价格升序
    upPrice() {
        request('http://192.168.125.12:8082/search').then(res => {
            if (res.code === 200) {
                this.setState({
                    topPrice: res.data,
                    top: true,
                    foot: false
                }, () => {
                    let newArr = this.state.topPrice;
                    function circle(a, b) {
                        return a.price - b.price
                    }
                    this.setState({
                        topPrice: newArr.sort(circle)
                    })
                })
            }
        })
    }
    //选择价格降序
    downPrice() {
        request('http://192.168.125.12:8082/search').then(res => {
            if (res.code === 200) {
                this.setState({
                    footPrice: res.data,
                    foot: true,
                    top: false
                }, () => {
                    let newArr = this.state.footPrice;
                    function circle(a, b) {
                        return b.price - a.price
                    }
                    this.setState({
                        footPrice: newArr.sort(circle),
                    })
                })
            }
        })
    }
    //组件传值
    getChildKeywords(val) {
        this.sKey = val;
        this.setState({
            sKey: val
        })
        this.props.history.push('/goods/search?keywords=' + val)
        this.getData();
        this.setState({
            pageStyle: { display: 'none' }
        })
    }
    //筛选品牌分类
    getClass() {
        request('http://192.168.125.12:8082/getnav').then(res => {
            if (res.code === 200) {
                this.setState({
                    aClass: res.data
                })
            }
        })
    }
    //获取价格区间
    getPrice() {
        request('http://192.168.125.12:8082/getprice').then(res => {
            if (res.code === 200) {
                this.setState({
                    aPrice: res.data
                })
            }
        })
    }
    //获取搜索的样式品牌
    getAttr() {
        request('http://192.168.125.12:8082/getattr?keywords=' + decodeURIComponent(localParam(this.props.location.search).search.keywords)).then(res => {
            if (res.code === 200) {
                this.setState({
                    aSport: res.data[0].param,
                    aSize: res.data[1].param
                })
            }
        })
    }
    //全部重置
    reset() {
        this.cid = '';
        this.fprice1 = '';
        this.fprice2 = '';
        this.getData()
        this.setState({
            class: true
        })
        let aClass = [];
        aClass = this.state.aClass;
        for (let i = 0; i < aClass.length; i++) {
            aClass[i].state = false
        }
        let aPrice = [];
        aPrice = this.state.aPrice;
        for (let i = 0; i < aPrice.length; i++) {
            aPrice[i].state = false;
        }
    }
    render() {
        return (
            <div className={style['page']}>
                <div className={style['search-head']}>
                    <div className={style['search-head-img']} onClick={this.goPage.bind(this, 'home/index')}><img alt='' src={require('../../../assets/images/home/goods/g1.png')}></img></div>
                    <div className={style['search-head-txt']} onClick={this.searchGoods.bind(this)}>
                        <div className={style['txt-img']}>
                            <img src={require('../../../assets/images/home/search/搜索.png')} alt="" />
                        </div>
                        <input type="text" placeholder={this.state.sKey} />
                    </div>
                    <div className={style['search-head-spa']} onClick={this.openScreen.bind(this)}>筛选</div>
                </div>
                <div className={style['search-price']}>
                    <div className={this.state.order === true ? style['order-wrap'] : style['order-wrap'] + " " + style['hide']} onClick={this.toggle.bind(this)}>
                        <div className={style['order']} style={{ color: 'rgb(255, 196, 0)' }}>综合</div>
                        <div className={style['order-img']}><img src={require('../../../assets/images/home/search/向上.png')} alt="" /></div>
                    </div>
                    <div className={this.state.order === true ? style['order-wrap'] + " " + style['hide'] : style['order-wrap']} onClick={this.Swtich.bind(this)}>
                        <div className={style['order']} style={{ color: '#000' }}>综合</div>
                        <div className={style['order-img']}><img src={require('../../../assets/images/home/search/向下.png')} alt="" /></div>
                    </div>
                    <div className={style['order-num']} onClick={this.sales.bind(this)} style={this.state.salesColor ? { color: 'rgb(255, 196, 0)' } : { color: '#000' }}>销量</div>
                </div>
                <div className={this.state.order ? style['order-item'] : style['order-item'] + " " + style['hide']}>
                    <div className={style['order-item1']} onClick={this.upPrice.bind(this)}>价格从低到高</div>
                    <div className={style['order-item1']} onClick={this.downPrice.bind(this)}>价格从高到低</div>
                </div>
                <div className={style['order-content']}>
                    {/* 引入下拉刷新组件 */}
                    <PullToRefresh onRefresh={() => {
                        request('http://192.168.125.12:8082/loading').then(res => {
                            if (res.code === 200) {
                                if (this.state.notfound === true) {
                                    this.setState({
                                        aLoad: []
                                    })
                                } else {
                                    this.setState({
                                        aLoad: res.data
                                    })
                                }
                            }
                        })
                        this.setState({
                            refreshing: true
                        });
                        setTimeout(() => {
                            this.setState({
                                refreshing: false
                            })
                        }, 1000);
                    }} damping={100} direction={'up'} refreshing={this.state.refreshing}>
                        {
                            this.state.notFound === true ? this.state.notaGoods.map((item, index) => {
                                return (
                                    <div className={style['notfound']} key={index}>
                                        <div className={style['font']}><span>{item.title}</span></div>
                                        <div className={style['image']}><img src={item.image} alt=''></img></div>
                                    </div>
                                )
                            }) :
                                this.state.salesColor === true ? this.state.salesNum.map((item, index) => {
                                    return (
                                        <div className={style['content-item']} key={index}>
                                            <div className={style['cont-img']}>
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className={style['content-txt']}>
                                                <div className={style['text']}>{item.title}</div>
                                                <div className={style['price']}>￥{item.price}</div>
                                                <div className={style['sold']}>销量<span>{item.sales}</span>件</div>
                                            </div>
                                        </div>
                                    )
                                }) : this.state.topPrice.length === 0 && this.state.footPrice.length === 0 ? this.state.aGoods.map((item, index) => {
                                    return (
                                        <div className={style['content-item']} key={index} onClick={this.goPage.bind(this,'goods/details')}>
                                            <div className={style['cont-img']}>
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className={style['content-txt']}>
                                                <div className={style['text']}>{item.title}</div>
                                                <div className={style['price']}>￥{item.price}</div>
                                                <div className={style['sold']}>销量<span>{item.sales}</span>件</div>
                                            </div>
                                        </div>
                                    )
                                }) : this.state.top === false ? this.state.footPrice.map((item, index) => {
                                    return (
                                        <div className={style['content-item']} key={index}>
                                            <div className={style['cont-img']}>
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className={style['content-txt']}>
                                                <div className={style['text']}>{item.title}</div>
                                                <div className={style['price']}>￥{item.price}</div>
                                                <div className={style['sold']}>销量<span>{item.sales}</span>件</div>
                                            </div>
                                        </div>
                                    )
                                }) : this.state.topPrice.map((item, index) => {
                                    return (
                                        <div className={style['content-item']} key={index}>
                                            <div className={style['cont-img']}>
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className={style['content-txt']}>
                                                <div className={style['text']}>{item.title}</div>
                                                <div className={style['price']}>￥{item.price}</div>
                                                <div className={style['sold']}>销量<span>{item.sales}</span>件</div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                        {this.state.notFound === true ? '' : this.state.aLoad !== [] ? this.state.aLoad.map((item, index) => {
                            return (
                                <div className={style['content-item']} key={index} onClick={this.goPage.bind(this,'goods/details')}>
                                    <div className={style['cont-img']}>
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className={style['content-txt']}>
                                        <div className={style['text']}>{item.title}</div>
                                        <div className={style['price']}>￥{item.price}</div>
                                        <div className={style['sold']}>销量<span>{item.sales}</span>件</div>
                                    </div>
                                </div>
                            )
                        }) : ''}
                    </PullToRefresh>
                </div>
                <div className={this.state.class ? style['mask'] + " " + style['hide'] : style['mask']} ref='mask' onClick={this.closeScreen.bind(this)}></div>
                <div className={this.state.class ? style['screen'] + " " + style['hide'] : style['screen']} ref='screen'>
                    <div className={style['s-item']}>
                        <div className={style['item']}>
                            <div className={style['item-txt']}>分类</div>
                            <div class={style['item-hide']}>{this.state.clickTxt}</div>
                            <div className={this.state.page ? style['item-arr'] : style['item-arr'] + " " + style['hide']} onClick={this.closePageState.bind(this)}>
                                <img src={require('../../../assets/images/home/search/向下.png')} alt="" />
                            </div>
                            <div className={this.state.page ? style['item-arr'] + " " + style['hide'] : style['item-arr']} onClick={this.openPageState.bind(this)}>
                                <img src={require('../../../assets/images/home/search/向上.png')} alt="" />
                            </div>
                        </div>
                        <div className={this.state.page ? style['content'] : style['content'] + " " + style['hide']}>
                            {this.state.aClass.map((item, index) => {
                                return (
                                    <div className={item.state ? style['conc-item'] + " " + style['back'] : style['conc-item']} onClick={this.changeColor.bind(this, index)} key={index}>{item.title}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style['s-price']}>
                        <div className={style['item']}>
                            <div className={style['item1']}>价格区间</div>
                            <div className={style['item-wrap']}>
                                <div className={style['item2']}>
                                    <input type="number" placeholder='最低价' value={this.state.fPrice1 === 0 ? '' : this.state.fPrice1} onChange={e => {
                                        this.setState({
                                            fPrice1: e.target.value
                                        })
                                    }} />
                                </div>
                                <div className={style['item3']}>——</div>
                                <div className={style['item4']}>
                                    <input type="number" placeholder='最高价' value={this.state.fPrice2 === 0 ? '' : this.state.fPrice2} onChange={e => {
                                        this.setState({
                                            fPrice2: e.target.value
                                        })
                                    }} />
                                </div>
                            </div>
                            <div className={this.state.page1 ? style['item5'] : style['item5'] + " " + style['hide']} onClick={this.closePageState1.bind(this)}>
                                <img src={require('../../../assets/images/home/search/向下.png')} alt="" />
                            </div>
                            <div className={this.state.page1 ? style['item5'] + " " + style['hide'] : style['item5']} onClick={this.openPageState1.bind(this)}>
                                <img src={require('../../../assets/images/home/search/向上.png')} alt="" />
                            </div>
                        </div>
                        <div className={this.state.page1 ? style['content'] : style['content'] + " " + style['hide']}>
                            {this.state.aPrice.map((item, index) => {
                                return (
                                    <div className={item.state ? style['conc-item'] + " " + style['back'] : style['conc-item']} onClick={this.changeColor1.bind(this, index, item.price1, item.price2)} key={index}>{item.price1}-{item.price2}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style['s-item']}>
                        <div className={style['item']}>
                            <div className={style['item-txt']}>品牌</div>
                            <div className={this.state.page ? style['item-arr'] : style['item-arr'] + " " + style['hide']} onClick={this.closePageState.bind(this)}>
                                <img src={require('../../../assets/images/home/search/向下.png')} alt="" />
                            </div>
                            <div className={this.state.page ? style['item-arr'] + " " + style['hide'] : style['item-arr']} onClick={this.openPageState.bind(this)}>
                                <img src={require('../../../assets/images/home/search/向上.png')} alt="" />
                            </div>
                        </div>
                        <div className={this.state.page ? style['content'] : style['content'] + " " + style['hide']}>
                            {this.state.aSport.map((item, index) => {
                                return (
                                    <div className={item.state ? style['conc-item'] + " " + style['back'] : style['conc-item']} onClick={this.changeColor2.bind(this, index)} key={index}>{item.title}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style['s-item']}>
                        <div className={style['item']}>
                            <div className={style['item-txt']}>衣长</div>
                            <div className={this.state.page ? style['item-arr'] : style['item-arr'] + " " + style['hide']} onClick={this.closePageState.bind(this)}>
                                <img src={require('../../../assets/images/home/search/向下.png')} alt="" />
                            </div>
                            <div className={this.state.page ? style['item-arr'] + " " + style['hide'] : style['item-arr']} onClick={this.openPageState.bind(this)}>
                                <img src={require('../../../assets/images/home/search/向上.png')} alt="" />
                            </div>
                        </div>
                        <div className={this.state.page ? style['content'] : style['content'] + " " + style['hide']}>
                            {this.state.aSize.map((item, index) => {
                                return (
                                    <div className={item.state ? style['conc-item'] + " " + style['back'] : style['conc-item']} onClick={this.changeColor3.bind(this, index)} key={index}>{item.title}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style['price-bak']}></div>
                    <div className={style['price-bottom']}>
                        <div className={style['bot1']}>共<span>18</span>件</div>
                        <div className={style['bot2']} onClick={this.reset.bind(this)}>全部重选</div>
                        <div className={style['bot3']} onClick={this.closeScreen.bind(this)}>确定</div>
                    </div>
                </div>
                <SearchComponent pageStyle={this.state.pageStyle} childStyle={this.getStyle.bind(this)}
                    isLoad='1' childKeywords={this.getChildKeywords.bind(this)} keywords={this.state.sKey}
                ></SearchComponent>
            </div>
        )
    }
}