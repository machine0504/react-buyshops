import React from 'react';
import style from '../../../assets/css/private/details_review.module.css';
import { request } from '../../../assets/js/libs/request';
export default class DetailsReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalReviews1: [],
            totalReviews2: [],
            totalNum: 0,
        }
    }
    componentDidMount(){
        this.getTotalReviews();
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    //获取全部评价
    getTotalReviews() {
        request('http://192.168.125.12:8082/reviewdata').then(res => {
            if (res.code === 200) {
                this.setState({
                    totalReviews1: res.data,
                    totalReviews2: res.data1,
                    totalNum: res.pageinfo.total

                })
            }
        })
    }
    render() {
        return (
            <div className={style['item']}>
                <div className={style['recommen']}>
                    <div className={style['txt']}>商品评价({this.state.totalNum})</div>
                    {this.state.totalReviews1.map((item, index) => {
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
                    {this.state.totalReviews2.map((item1, index1) => {
                        return (
                            <div className={style['view']} key={index1}>
                                <div className={style['user']}>
                                    <img src={item1.head} alt="" />
                                    <div className={style['name']}>{item1.nickname}</div>
                                </div>
                                <div className={style['point']}>{item1.content}</div>
                                <div className={style['time']}>{item1.times}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}