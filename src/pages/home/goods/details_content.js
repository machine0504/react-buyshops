import React from 'react';
import style from '../../../assets/css/private/details_content.module.css';
import { request } from '../../../assets/js/libs/request';
export default class DetailsContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsImg: []
        }
    }
    componentDidMount(){
        this.getData()
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return;
        }
    }
    getData() {
        request('http://192.168.125.12:8082/detailsimg').then(res => {
            if (res.code === 200) {
                this.setState({
                    detailsImg: res.data
                })
            }
        })
    }
    render() {
        return (
            <div className={style['content']}>
                <div className={style['content-center']}>宝贝详情</div>
                <div className={style['title']}>
                    <div className={style['item1']}>
                        <div className={style['txt1']}>EVERY THING I DO</div>
                        <div className={style['txt2']}>I DO IT BIG</div>
                        <div className={style['txt3']}>亿万少年</div>
                    </div>
                    <div className={style['item2']}>
                        <div className={style['span']}>
                            <div>The farthest distance in the world</div>
                            <div>But you don't know I love you when I stand in front of you</div>
                        </div>
                    </div>
                </div>
                {this.state.detailsImg.map((item, index) => {
                    return (
                        <div className={style['content-img']} key={index}>
                            <img src={item.img} alt="" />
                        </div>
                    )
                })}
            </div>
        )
    }
}