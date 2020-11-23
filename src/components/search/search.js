import React from 'react';
import config from '../../assets/js/conf/config';
import { request } from '../../assets/js/libs/request'
//引入警告对话框
import { Modal, Toast } from 'antd-mobile';
import style from './search.module.css'
import { connect } from 'react-redux'
import action from '../../actions/index';
//子组件使用路由
import { withRouter } from 'react-router'
class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bHistory: true,
            aWords: [],
            searchTxt: '',
        }
        this.addKeysHistory = props.state.add.keywords
    }
    componentDidMount() {
        //做最近搜索的判断
        if (this.props.state.add.keywords.length > 0) {
            this.setState({
                bHistory: true
            })
        } else {
            this.setState({
                bHistory: false
            })
        }
        this.getWords()
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
            return
        }
    }
    //清除历史记录
    clearHistory() {
        const alert = Modal.alert;
        alert('', '你确定要删除嘛?', [
            { text: '取消', onPress: () => { }, style: 'default' },
            {
                text: '确认', onPress: () => {
                    this.setState({
                        bHistory: false
                    })
                    //删除最近搜索
                    localStorage.removeItem('add');
                    this.props.dispatch(action.add.addHistory({ keywords: [] }))
                    this.addKeysHistory = []
                }
            },
        ]);
    }
    //热门搜索关键词
    getWords() {
        request('http://192.168.125.12:8082/words').then(res => {
            if (res.code === 200) {
                this.setState({
                    aWords: res.data
                })
            }
        })
    }
    //添加最近搜索
    addHistory() {
        if (this.state.searchTxt !== '') {
            for (let i = 0; i < this.addKeysHistory.length; i++) {
                if (this.addKeysHistory[i] === this.state.searchTxt) {
                    this.addKeysHistory.splice(i--, 1)
                }
            }
            this.addKeysHistory.unshift(this.state.searchTxt)
            //localStorage只能接收字符串格式
            localStorage['add'] = JSON.stringify(this.addKeysHistory);
            //1.选购商品
            this.props.dispatch(action.add.addHistory({ keywords: this.addKeysHistory }))
            this.setState({
                bHistory: true
            })
            this.goPage('goods/search?keywords=' + this.state.searchTxt, this.state.searchTxt)
        } else {
            //ant-degin组件
            Toast.info('请输入宝贝名称 !!!', 2);
        }
    }
    //跳转链接
    goPage(url, searchTxt) {
        if (this.props.isLoad === '1') {
            //组件传值
            this.props.childKeywords(searchTxt)
        } else {
            this.props.history.push(config.path + url)
        }
    }
    render() {
        return (
            <div className={style['page']} style={this.props.pageStyle}>
                <div className={style['search-head']}>
                    <div className={style['search-x']} onClick={this.props.childStyle.bind(this, { display: 'none' })}>
                        <img src={require('../../assets/images/home/search/x.png')} alt="" />
                    </div>
                    <div className={style['search-center']}>
                        <input type="text" name="" id="" defaultValue={this.props.keywords} placeholder='请输入宝贝名称' onChange={e => {
                            this.setState({
                                searchTxt: e.target.value
                            })
                        }} />
                        <button type='button' className={style['search-btn']} onClick={this.addHistory.bind(this)}></button>
                    </div>
                </div>
                <div className={this.state.bHistory ? style['search-content'] : style['search-content'] + " hide"}>
                    <div className={style['search-title-wrap']}>
                        <div className={style['search-title']}>最近搜索</div>
                        <div className={style['bin']} onClick={this.clearHistory.bind(this)}></div>
                    </div>
                    <div className={style['search-word-wrap']}>
                        {this.props.state.add.keywords.map((item, index) => {
                            return (
                                <div className={style['search-word']} key={index} onClick={this.goPage.bind(this, 'goods/search?keywords=' + item, item)}>{item}</div>
                            )
                        })}
                    </div>
                </div>
                <div className={style['search-classify']}>
                    <div className={style['search-title-wrap']}>
                        <div className={style['search-title']}>热门搜索</div>
                    </div>
                    <div className={style['search-word-wrap']}>
                        {this.state.aWords.map((item, index) => {
                            return (
                                <div className={style['search-word']} key={index} onClick={this.goPage.bind(this, 'goods/search?keywords=' + item.title, item.title)}>{item.title}</div>
                            )
                        })}
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
})(withRouter(SearchComponent))