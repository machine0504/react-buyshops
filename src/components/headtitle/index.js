import React from 'react';
import style from './index.module.css';
import { withRouter } from 'react-router'
class TopTitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    goBack() {
        this.props['clickreturn']()
    }
    //test组件绑定事件
    getclick() {
        this.props['onclickbtn']()
    }
    render() {
        return (
            <div className={style['head']}>
                <div className={style['user-head-img']} onClick={this.goBack.bind(this)}>
                    <img src={require('../../assets/images/home/goods/g1.png')} alt="" />
                </div>
                <div className={style['user-head-txt']} onClick={this.getclick.bind(this)}>
                    {this.props.title}
                </div>
            </div>
        )
    }
}
export default withRouter(TopTitle)