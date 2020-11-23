import React from 'react';
import style from './goodsreview.module.css';
import config from '../../../../assets/js/conf/config';
import { connect } from 'react-redux';
import { request } from '../../../../assets/js/libs/request';
import { localParam } from '../../../../assets/js/utils/util';
import { Toast } from 'antd-mobile'
class GoodsReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsData: [],
            serives: [
                {
                    rsid: 1,
                    title: '服务',
                    scroes: [
                        { checked: false, scroe: 1 },
                        { checked: false, scroe: 2 },
                        { checked: false, scroe: 3 },
                        { checked: false, scroe: 4 },
                        { checked: false, scroe: 5 },
                    ]
                },
                {
                    rsid: 2,
                    title: '质量',
                    scroes: [
                        { checked: false, scroe: 1 },
                        { checked: false, scroe: 2 },
                        { checked: false, scroe: 3 },
                        { checked: false, scroe: 4 },
                        { checked: false, scroe: 5 },
                    ]
                },
                {
                    rsid: 3,
                    title: '物流',
                    scroes: [
                        { checked: false, scroe: 1 },
                        { checked: false, scroe: 2 },
                        { checked: false, scroe: 3 },
                        { checked: false, scroe: 4 },
                        { checked: false, scroe: 5 },
                    ]
                }
            ],
            content: ''
        }
        this.skey = '';
    }
    componentDidMount() {
        this.skey = localParam(this.props.location.search).search.id
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    return(url) {
        this.props.history.push(config.path + url)
    }
    //选择分数
    selectscrole(in1, in2) {
        let service = this.state.serives;
        for (let i = 0; i < service[in1].scroes.length; i++) {
            service[in1].scroes[i].checked = false;
        }
        for (let i = 0; i <= in2; i++) {
            service[in1].scroes[i].checked = true;
        }
        this.setState({
            serives: service
        })
    }
    //提交数据
    changedata() {
        let data = {
            id: this.skey
        }
        let isChecked = false;
        for (let i = 0; i < this.state.serives.length; i++) {
            isChecked = false;
            for (let j = 0; j < this.state.serives[i].scroes.length; j++) {
                if (this.state.serives[i].scroes[j].checked) {
                    isChecked = true;
                    break;
                }
            }
            if (!isChecked) {
                Toast.info('请选择' + this.state.serives[i].title, 2);
                return;
            }
        }
        if (this.state.content === '') {
            Toast.info('清留下你宝贵的意见', 2);
            return;
        }
        request('http://192.168.125.12:8082/overorder', 'post', data).then(res => {
            if (res.code === 200) {
                Toast.info('提交成功', 2, () => {
                    this.props.history.goBack();
                })
            }
        })
    }
    render() {
        return (
            <div className={style['goods-review']}>
                <div className={style['head']}>
                    <div className={style['goods-review-head-img']} onClick={this.return.bind(this, 'user/all-order/order?status=0')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['goods-review-head-txt']}>
                        商品评价
                    </div>
                </div>
                <div className={style['content']}>
                    {this.state.serives.map((item, index) => {
                        return (
                            <div className={style['item1']} key={index}>
                                <div className={style['le']}>{item.title}</div>
                                <div className={style['ri']}>
                                    {item.scroes.map((item2, index2) => {
                                        return (
                                            <div className={item2.checked ? style['img'] + " " + style['active'] : style['img']} key={index2} onClick={this.selectscrole.bind(this, index, index2)}></div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <textarea name="" id="" cols="30" rows="10" placeholder='来分享你的消费观' className={style['text']} ref='text' onChange={
                        (e) => {
                            this.setState({
                                content: e.target.value
                            })
                        }
                    }></textarea>
                    <div className={style['item2']}>
                        <button className={style['btn']} onClick={this.changedata.bind(this)}>提交</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(GoodsReview)