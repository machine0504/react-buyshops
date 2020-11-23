import React from 'react';
import style from './mylove.module.css';
import config from '../../../../assets/js/conf/config';
import { connect } from 'react-redux';
import { request } from '../../../../assets/js/libs/request';
import { Toast, Modal } from 'antd-mobile'
class MyLove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adata: [],
            isdel: true
        }

    }
    componentDidMount() {
        this.getLoveData()
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }
    return() {
        this.props.history.goBack()
    }
    //加载收藏
    getLoveData() {
        let data = {
            uid: this.props.state.user.uid
        }
        request('http://192.168.125.12:8082/getlovedata', "post", data).then(res => {
            this.setState({
                adata: res
            })
        })
    }
    //返回商品详情页
    goodsIndex(gid) {
        this.props.history.push(config.path + 'goods/details/item?gid=' + gid)
    }
    //删除收藏
    deletegoods(gid) {
        const alert = Modal.alert;
        alert('', '确定删除收藏!', [
            { text: '取消', onPress: () => { }, style: 'default' },
            {
                text: '确认', onPress: () => {
                    let data = {
                        uid: this.props.state.user.uid
                    }
                    // let ws = new WebSocket("ws://192.168.125.12:8001");
                    // ws.onopen = function () {
                    //     console.log("client：打开连接");
                    //     ws.send(JSON.stringify(data));
                    // };
                    // ws.onmessage = function (e) {
                    //     console.log(e)
                    //     setTimeout(() => {
                    //         ws.close();
                    //     }, 100);
                    // };
                    // ws.onclose = function (params) {
                    //     console.log("client：关闭连接");
                    // };
                    request('http://192.168.125.12:8082/deletemylove', "post", data).then(res => {
                        if (res.code === 200) {
                            Toast.info('删除成功', 2, () => {
                                this.getLoveData()
                            });
                        }
                    })
                }
            },
        ]);
    }
    render() {
        return (
            <div className={style['my-love']}>
                <div className={style['head']}>
                    <div className={style['my-love-head-img']} onClick={this.return.bind(this)}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['my-love-head-txt']}>
                        我的收藏
                    </div>
                </div>
                <div className={style['content']}>
                    {this.state.adata.length>0?this.state.adata.map((item, index) => {
                        return (
                            <div className={style['item1']} key={index}>
                                <div className={style['top']} onClick={this.goodsIndex.bind(this, item.gid)}>
                                    <img src={item.img} alt="" />
                                </div>
                                <div className={style['cen']}>{item.title}</div>
                                <div className={style['cen1']}>￥{item.price}</div>
                                <div className={style['bot']}>
                                    <div className={style['b1']}  onClick={this.goodsIndex.bind(this, item.gid)}>购买</div>
                                    <div className={style['b2']} onClick={this.deletegoods.bind(this, item.gid)}>删除</div>
                                </div>
                            </div>
                        )
                    }):<div className={style['nodata']}>你还没有添加收藏</div>}
                </div>
            </div>
        )
    }
}
export default connect((state) => {
    return {
        state: state
    }
})(MyLove)