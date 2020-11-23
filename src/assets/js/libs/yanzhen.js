import { Toast } from 'antd-mobile'
function canvasImg(canvasid, inputid, btnid, fn) {
    var canvas = document.getElementById(canvasid);
    var context = canvas.getContext("2d");
    var input = document.getElementById(inputid);
    var btn = document.getElementById(btnid);
    draw();
    canvas.onclick = function () {
        context.clearRect(0, 0, 98.22, 44);
        draw();
    }
    function getColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }
    function draw() {
        context.strokeRect(0, 0, 98.22, 44);
        var aCode = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var arr = [];
        var num;
        for (let i = 0; i < 4; i++) {
            var x = 20 + i * 20;
            var y = 20 + 10 * Math.random();
            var index = Math.floor(Math.random() * aCode.length);
            var txt = aCode[index];
            context.font = "bold 20px 微软雅黑";
            context.fillStyle = getColor();
            context.translate(x, y);
            var deg = 90 * Math.random() * Math.PI / 180;
            context.rotate(deg);
            context.fillText(txt, 0, 0);
            context.rotate(-deg);
            context.translate(-x, -y);
            arr[i] = txt
        }
        num = arr[0] + arr[1] + arr[2] + arr[3];
        for (var i = 0; i < 8; i++) {
            context.beginPath();//起始一条路径，或重置当前路径
            context.moveTo(Math.random() * 120, Math.random() * 40);//把路径移动到画布中的随机点，不创建线条
            context.lineTo(Math.random() * 120, Math.random() * 40);//添加一个新点，然后在画布中创建从该点到最后指定点的线条
            context.strokeStyle = getColor();//随机线条颜色
            context.stroke();// 	绘制已定义的路径
        }
        for (var i = 0; i < 20; i++) {
            context.beginPath();
            var x = Math.random() * 120;
            var y = Math.random() * 40;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.strokeStyle = getColor();
            context.stroke();
        }
        btn.onclick = function () {
            var text = input.value //获取输入框的值
            if (text === '') {
                Toast.info('请输入手机号!')
            } else {
                if (text === num) {
                    Toast.info('验证成功');
                    var state = '/user/login';
                    fn(state)
                } else {
                    Toast.info('验证失败')
                }
            }
        }
    }
}
export {
    canvasImg
}