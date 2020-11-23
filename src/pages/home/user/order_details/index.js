import React from 'react';
import style from '../../../../assets/css/private/order_details.module.css';
import config from '../../../../assets/js/conf/config';
export default class Order_Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    return(url){
        this.props.history.push(config.path+url)
    }
    render() {
        return (
            <div className={style['order_details']}>
                <div className={style['head']}>
                    <div className={style['order_details-head-img']} onClick={this.return.bind(this, 'user/order')}>
                        <img src={require('../../../../assets/images/home/goods/g1.png')} alt="" />
                    </div>
                    <div className={style['order_details-head-txt']}>
                        订单详情
                    </div>
                </div>
                <div className={style['content']}>
                    <div className={style['item1']}>
                        <div className={style['left']}>
                            <div className={style['img']}></div>
                        </div>
                        <div className={style['right']}>
                            <div className={style['item1']}>缪代旭&nbsp;<span>86-18483671471</span></div>
                            <div className={style['item2']}>四川省&nbsp;成都市&nbsp;郫都区&nbsp;合作街道&nbsp;高新青年公寓二号苑</div>
                        </div>
                    </div>
                    <div className={style['inline']}></div>
                </div>
            </div>
        )
    }
}