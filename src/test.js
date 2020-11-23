import React from 'react';
import {request} from '../src/assets/js/libs/request'
export default class Test extends React.Component {
    constructor() {
        super();
        this.state = {
            text: ''
        }
    }
    componentDidMount(){
        this.test()
    }
    test() {
        fetch('http://127.0.0.1:8082/testo').then(res=>{
            alert(res.status)
            console.log(res)
        })
        request('http://127.0.0.1:8082/testo').then(res => {
        alert(res)
            if (res!==null) {
                this.setState({
                    text: res
                })
                alert('ok')
            }
        }).catch(error=>{
            alert(error)
        })
    }
    render() {
        return (
            <div>
                {this.state.text}
            </div>
        )
    }
}