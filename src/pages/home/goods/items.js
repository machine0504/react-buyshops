import React from 'react';
import style from '../../../assets/css/private/items_index.module.css'
import '../../../assets/css/public/public.css'
import { request } from '../../../assets/js/libs/request';
import IScroll from '../../../assets/js/libs/iscroll'
import { localParam } from '../../../assets/js/utils/util'
import config from '../../../assets/js/conf/config';
export default class Itemspage extends React.Component {
    constructor() {
        super()
        this.state = {
            aGoods: [],
            txt:''
        }
        this.myScroll = null;
        this.item = [];
    }
    componentDidMount() {
        this.getData(this.props)
        //console.log(this.props.location)
    }
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    }
    UNSAFE_componentWillReceiveProps(newprops){
        this.getData(newprops)
    }
    //接口数据
    getData(props) {
        let cid = props.location.search ? localParam(props.location.search).search.cid : ''
        fetch('http://192.168.125.12:8082/goodsitems?cid=' + cid).then(res => {
            return res.json()
        }).then(res => {
            if (res.code === 200) {
                this.item = res.data;
                this.setState({
                    aGoods: this.item,
                    txt:''
                }, () => {
                    this.eventScroll()
                })
            }
            else {
              this.setState({
                  txt:res.data
              })
            }
        })
    }
    //滑动事件
    eventScroll() {
        document.getElementById('class-items').addEventListener('touchmove', function (e) {
            e.preventDefault()
        }, false);
        this.myScroll = new IScroll('#class-items', {
            // eventPassthrough : true,
            scrollX: false,
            scrollY: true,
            preventDefault: false
            //click:true
        });
    }
    //商品链接跳转
    pushPage(url){
        this.props.history.push(config.path+url)
    }
    render() {
        return (
            <React.Fragment>
                <div className={style['goods-content']} id='class-items'>
                    <div>
                        {this.state.txt === '没有相关的产品' ? <div className={style['null-item']}>{this.state.txt}</div> :
                            this.state.aGoods.map((item, index) => {
                                return (
                                    <div className={style['goods-wrap']} key={index}>
                                        <div className={style['goods-text']}><span>{item.title}</span></div>
                                        <div className={style['goods-items']}>
                                            {item.goods.map((item2, index2) => {
                                                return (
                                                    <div className={style['goods-index']} key={index2} onClick={this.pushPage.bind(this,'goods/details/item?gid='+item2.gid)}>
                                                        <div className={style['img']}><img src={item2.image} alt="" /></div>
                                                        <div className={style['span']}><span>{item2.title}</span></div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}