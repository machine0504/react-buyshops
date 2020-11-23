import React from 'react';
// import $ from 'jquery'
// import {swiperDelete} from './swiperdelete'
import './pest.css'
export default class Pest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        // $(function(){
        //    console.log(swiperDelete)
        //     $('.list-li').touchWipe({itemDelete: '.btn'});
        // })
    }
    render() {
        return (

            <div>
                <header>
                    <h2>消息列表</h2>
                </header>
                <section class="list">
                    <ul class="list-ul">
                        <li id="li" class="list-li">
                            <div class="con">
                                你的快递到了，请到楼下签收
             </div>
                            <div class="btn">删除</div>
                        </li>
                        <li class="list-li">
                            <div class="con">
                                哇，你在干嘛，快点来啊就等你了
             </div>
                            <div class="btn">删除</div>
                        </li>
                    </ul>
                </section>

                <p>X: <span id="X"></span></p>
                <p>objX: <span id="objX"></span></p>
                <p>initX: <span id="initX"></span></p>
                <p>moveX: <span id="moveX"></span></p>
            </div>
        )
    }
}