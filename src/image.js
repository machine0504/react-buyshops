import React from 'react';
import $ from 'jquery';
export default class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            src: 'http://192.168.125.12:5000/img/lunbo1.jpg'
        }
    }
    image() {
        var inp = document.getElementById('inp');
        var getData = inp.files[0];
        var fs = new FormData();
        fs.append('imageIcon', getData);
        $.ajax({
            method: 'POST',
            url: 'http://192.168.125.12:5000/ajaxUpload',
            processData: false,
            contentType: false,
            data: fs,
            success: data=> {
                this.setState({
                    src:data
                })
            }
        })
    }
    render() {
        return (
            <div>
                <img src={this.state.src}></img>
                <input type="file" id='inp' />
                <button onClick={this.image.bind(this)}>提交</button>
            </div>
        )
    }
}